onunhandledrejection = (e) => {
  throw e.reason
}

onmessage = function (e) {
  if (marked) {
    load().then(() => parse(e))
  }
}

let marked = {}

function load() {
  return import('./demo.esm.js').then((module) => {
    marked = module
  })
}

function parse(e) {
  switch (e.data.inputType) {
    case 'default': {
      const { parsed, lexed, time } = marked.renderMarkdown(e.data.markdown)
      postMessage({
        id: e.data.id,
        task: e.data.task,
        parsed,
        lexed: jsonString(lexed),
        svg: marked.tex2svg(parsed),
        type: e.data.inputType,
        time
      })
      break
    }
    case 'compact': {
      const { parsed, lexed, time } = marked.renderMarkdownCompact(
        e.data.markdown
      )
      postMessage({
        id: e.data.id,
        task: e.data.task,
        parsed,
        lexed: jsonString(lexed),
        svg: marked.tex2svg(parsed),
        type: e.data.inputType,
        time
      })
      break
    }
  }
}

function jsonString(input, level) {
  level = level || 0
  if (Array.isArray(input)) {
    if (input.length === 0) {
      return '[]'
    }
    const items = []
    let i
    if (
      !Array.isArray(input[0]) &&
      typeof input[0] === 'object' &&
      input[0] !== null
    ) {
      for (i = 0; i < input.length; i++) {
        items.push(' '.repeat(2 * level) + jsonString(input[i], level + 1))
      }
      return '[\n' + items.join('\n') + '\n]'
    }
    for (i = 0; i < input.length; i++) {
      items.push(jsonString(input[i], level))
    }
    return '[' + items.join(', ') + ']'
  } else if (typeof input === 'object' && input !== null) {
    const props = []
    for (const prop in input) {
      props.push(prop + ':' + jsonString(input[prop], level))
    }
    return '{' + props.join(', ') + '}'
  } else {
    return JSON.stringify(input)
  }
}
