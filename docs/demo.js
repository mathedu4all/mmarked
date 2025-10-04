onunhandledrejection = (e) => {
  throw e.reason
}

const $loadingElem = document.querySelector('#loading')
const $mainElem = document.querySelector('#main')
const $markdownElem = document.querySelector('#markdown')
const $outputTypeElem = document.querySelector('#outputType')
const $inputTypeElem = document.querySelector('#inputType')
const $responseTimeElem = document.querySelector('#responseTime')
const $previewElem = document.querySelector('#preview')
const $previewIframe = document.querySelector('#preview iframe')
const $tex2svgIframe = document.querySelector('#tex2svg iframe')
const $htmlElem = document.querySelector('#html')
const $lexerElem = document.querySelector('#lexer')
const $panes = document.querySelectorAll('.pane')
const $permalinkElem = document.querySelector('#permalink')

let lastInput = ''
let inputDirty = true
let $activeOutputElem = null
const search = searchToObject()

let delayTime = 1
let checkChangeTimeout = null
let markedWorker

$previewIframe.addEventListener('load', handleIframeLoad)
$outputTypeElem.addEventListener('change', handleOutputChange, false)
$inputTypeElem.addEventListener('change', handleInputChange, false)
$markdownElem.addEventListener('change', handleInput, false)
$markdownElem.addEventListener('keyup', handleInput, false)
$markdownElem.addEventListener('keypress', handleInput, false)
$markdownElem.addEventListener('keydown', handleInput, false)

Promise.all([
  setInitialQuickref(),
  setInitialOutputType(),
  setInitialInputType(),
  setInitialText()
])
  .then(() => {
    handleOutputChange()
    checkForChanges()
    setScrollPercent(0)
    $loadingElem.style.display = 'none'
    $mainElem.style.display = 'block'
  })
  .catch(() => {
    $loadingElem.classList.add('loadingError')
    $loadingElem.textContent =
      'Failed to load marked. Refresh the page to try again.'
  })

function setInitialText() {
  if ('text' in search) {
    $markdownElem.value = search.text
  } else {
    return fetch('./initial.md')
      .then((res) => res.text())
      .then((text) => {
        if ($markdownElem.value === '') {
          $markdownElem.value = text
        }
      })
  }
}

function setInitialQuickref() {
  return fetch('./quickref.md')
    .then((res) => res.text())
    .then((text) => {
      document.querySelector('#quickref').value = text
    })
}

function setInitialInputType() {
  if (search.inputType) {
    $inputTypeElem.value = search.inputType
  }
}

function setInitialOutputType() {
  if (search.outputType) {
    $outputTypeElem.value = search.outputType
  }
}

function handleIframeLoad() {
  lastInput = ''
  inputDirty = true
}

function handleInput() {
  inputDirty = true
}

function handleOutputChange() {
  $activeOutputElem = handleChange($panes, $outputTypeElem.value)
  updateLink()
}

function handleInputChange() {
  updateLink()
  handleInput()
}

function handleChange(panes, visiblePane) {
  let active = null
  for (let i = 0; i < panes.length; i++) {
    if (panes[i].id === visiblePane) {
      panes[i].style.display = ''
      active = panes[i]
    } else {
      panes[i].style.display = 'none'
    }
  }
  return active
}

function searchToObject() {
  // modified from https://stackoverflow.com/a/7090123/806777
  const pairs = location.search.slice(1).split('&')
  const obj = {}

  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i] === '') {
      continue
    }

    const pair = pairs[i].split('=')

    obj[decodeURIComponent(pair.shift())] = decodeURIComponent(pair.join('='))
  }

  return obj
}

function getScrollSize() {
  if (!$activeOutputElem) {
    return 0
  }

  const e = $activeOutputElem

  return e.scrollHeight - e.clientHeight
}

function getScrollPercent() {
  if (!$activeOutputElem) {
    return 1
  }

  const size = getScrollSize()

  if (size <= 0) {
    return 1
  }

  return $activeOutputElem.scrollTop / size
}

function setScrollPercent(percent) {
  if ($activeOutputElem) {
    $activeOutputElem.scrollTop = percent * getScrollSize()
  }
}

function updateLink() {
  const outputType = 'outputType=' + $outputTypeElem.value + '&'

  $permalinkElem.href =
    '?' +
    outputType +
    'text=' +
    encodeURIComponent($markdownElem.value) +
    '&inputType=' +
    $inputTypeElem.value
  history.replaceState('', document.title, $permalinkElem.href)
}

function checkForChanges() {
  if (inputDirty) {
    inputDirty = false
    const markdown = $markdownElem.value
    const inputType = $inputTypeElem.value
    const hash = markdown + inputType
    if (lastInput !== hash) {
      lastInput = hash
      delayTime = 100
      messageWorker({
        inputType,
        markdown
      })
    }
  }
  checkChangeTimeout = window.setTimeout(checkForChanges, delayTime)
}

function setResponseTime(ms) {
  let amount = ms
  let suffix = 'ms'
  if (ms > 1000 * 60 * 60) {
    amount = 'Too Long'
    suffix = ''
  } else if (ms > 1000 * 60) {
    amount = '>' + Math.floor(ms / (1000 * 60))
    suffix = 'm'
  } else if (ms > 1000) {
    amount = '>' + Math.floor(ms / 1000)
    suffix = 's'
  }
  $responseTimeElem.textContent = amount + suffix
  $responseTimeElem.animate(
    [{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
    200
  )
}

function setParsed(parsed, lexed, svg, type) {
  try {
    const markdownClass = type === 'default' ? 'article-markdown' : ''

    const previewIframeDoc = $previewIframe.contentDocument
    const tex2svgIframeDoc = $tex2svgIframe.contentDocument

    if (previewIframeDoc && tex2svgIframeDoc) {
      const previewSection = previewIframeDoc.body.querySelector('section')
      const tex2svgSection = tex2svgIframeDoc.body.querySelector('section')
      const sections = [previewSection, tex2svgSection]

      sections.forEach((section) => {
        if (section) {
          section.classList.add('markdown')
          if (markdownClass) {
            section.classList.add(markdownClass)
          }
        }
      })

      if (previewSection) previewSection.innerHTML = parsed || ''
      if (tex2svgSection) tex2svgSection.innerHTML = svg || ''
    }
  } catch (err) {
    console.error('Error updating iframe content:', err)
  }

  $htmlElem.value = parsed
  $lexerElem.value = lexed
}

const workerPromises = {}
function messageWorker(message) {
  if (!markedWorker || markedWorker.working) {
    if (markedWorker) {
      clearTimeout(markedWorker.timeout)
      markedWorker.terminate()
    }
    markedWorker = new Worker('worker.js')
    markedWorker.onmessage = (e) => {
      clearTimeout(markedWorker.timeout)
      markedWorker.working = false

      $previewElem.classList.remove('error')
      $htmlElem.classList.remove('error')
      $lexerElem.classList.remove('error')
      const scrollPercent = getScrollPercent()
      setParsed(e.data.parsed, e.data.lexed, e.data.svg, e.data.type)
      setScrollPercent(scrollPercent)
      setResponseTime(e.data.time)

      clearTimeout(checkChangeTimeout)
      delayTime = 10
      checkForChanges()
      workerPromises[e.data.id]()
      delete workerPromises[e.data.id]
    }
    markedWorker.onerror = markedWorker.onmessageerror = (err) => {
      clearTimeout(markedWorker.timeout)
      let error = 'There was an error in the Worker'
      if (err) {
        if (err.message) {
          error = err.message
        } else {
          error = err
        }
      }
      error = error.replace(/^Uncaught Error: /, '')
      $previewElem.classList.add('error')
      $htmlElem.classList.add('error')
      $lexerElem.classList.add('error')
      setParsed(error, error, error)
      setScrollPercent(0)
    }
  }
  if (message.task !== 'defaults') {
    markedWorker.working = true
    workerTimeout(0)
  }
  return new Promise((resolve) => {
    message.id = uniqueWorkerMessageId()
    workerPromises[message.id] = resolve
    markedWorker.postMessage(message)
  })
}

function uniqueWorkerMessageId() {
  let id
  do {
    id = Math.random().toString(36)
  } while (id in workerPromises)
  return id
}

function workerTimeout(seconds) {
  markedWorker.timeout = setTimeout(() => {
    seconds++
    markedWorker.onerror(
      'Marked has taken longer than ' +
        seconds +
        ' second' +
        (seconds > 1 ? 's' : '') +
        ' to respond...'
    )
    workerTimeout(seconds)
  }, 1000)
}
