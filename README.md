# mmarked

[![npm version](https://badge.fury.io/js/%40mathcrowd%2Fmmarked.svg)](https://www.npmjs.com/package/@mathcrowd/mmarked)
[![npm downloads](https://img.shields.io/npm/dt/@mathcrowd/mmarked.svg)](https://www.npmjs.com/package/@mathcrowd/mmarked)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-yellow.svg)](https://creativecommons.org/licenses/by-nc/4.0)

![icon.png](./icon.png)

[中文文档](./README.zh.md) | [Demo](https://mathedu4all.github.io/mmarked/) | [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=MCLab.mmarked) | [Logseq Plugin](https://github.com/mathedu4all/mmarked-logseq-extension)

## 📖 Overview

Transform your Markdown experience with **mmarked** - a powerful TypeScript library designed for educational and mathematical content. Built for real-time rendering of complex LaTeX formulas, theorem blocks, and custom educational syntax.

**Perfect for:**

- 📚 **Educators** creating math course materials
- 🎓 **Students** writing technical notes and assignments
- 📝 **Researchers** authoring academic papers
- 💻 **Developers** building educational platforms
- 💡 **Anyone** working with mathematical notation in Markdown

## ✨ Features

### Core Capabilities

- ✅ **Full CommonMark Support** - Complete compatibility with standard Markdown syntax
- 🔗 **Easy Integration** - Works seamlessly in Node.js and browser environments
- 📦 **Lightweight Core** - Minimal dependencies, extensible architecture
- ⚡ **High Performance** - Optimized rendering pipeline for fast output

### Mathematical Content

- 🧮 **Advanced LaTeX Rendering** - Powered by MathJax for professional-quality formulas
- 📐 **TeX to SVG Conversion** - High-quality SVG output for equations
- 🔢 **Auto-Numbered Footnotes** - Easy-to-use reference system with automatic numbering

### Educational Features

- 📘 **Theorem-Like Blocks** - Dedicated syntax for theorems, lemmas, definitions, and examples
  - Auto-numbering support
  - Cross-reference linking with `[~id]` syntax
  - Customizable titles
- 🔍 **Collapsible Solution Blocks** - Hide/show answers and proofs with toggle functionality
- 🎯 **Syntax Highlighting** - Code blocks enhanced by highlight.js

### Media & Customization

- 🖼️ **Enhanced Images** - Flexible sizing with simple `=WIDTHxHEIGHT` syntax
- 📹 **Video Support** - Same sizing options for video elements
- 🎨 **Extensible** - Built on marked.js for easy customization

## 🚀 Quick Start

### Installation

```bash
npm install @mathcrowd/mmarked mathjax-full highlight.js
```

### Basic Usage

```typescript
import { renderMarkdown } from '@mathcrowd/mmarked'

// Render markdown with LaTeX support
const result = renderMarkdown(`
# Pythagorean Theorem

\`\`\`[theorem,pythagoras,Pythagorean Theorem]
For a right triangle with sides $a$, $b$ and hypotenuse $c$:
$$a^2 + b^2 = c^2$$
\`\`\`

This fundamental theorem (see [~pythagoras]) relates the sides of right triangles.
`)

console.log(result.parsed) // HTML output
console.log(result.time)   // Rendering time in ms
```

### License Configuration (Node.js Only)

**Important:** License validation is **only required for Node.js server-side usage**. Browser environments do not require license configuration.

For commercial use in Node.js applications, you must configure a valid license:

```typescript
import { configureLicense, renderMarkdown } from '@mathcrowd/mmarked'

// Configure your license (do this once at application startup)
configureLicense({
  apiKey: 'MMARKED-XXXX-XXXX-XXXX-XXXX'
})

// Now you can use the library
const result = renderMarkdown('# Hello World')
```

**Without license configuration in Node.js:**
```typescript
import { renderMarkdown } from '@mathcrowd/mmarked'

// This will work but show a warning in console
const result = renderMarkdown('# Hello')
// Console output:
// ⚠️  No valid license configured for Node.js server-side usage.
// For commercial use, please configure a license using configureLicense().
// Contact charles@mathcrowd.cn for commercial licensing.
// Browser usage does not require a license.
```

**Requirements:**
- **Node.js 18+** for remote license validation (uses fetch API)

**Get Your License:**
- 📧 Email: **charles@mathcrowd.cn**
- 🌐 Visit: [lab.mathcrowd.cn](https://lab.mathcrowd.cn)

### Browser Usage

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>mmarked Demo</title>
</head>
<body>
    <div id="content"></div>
    <script type="module">
        import { renderMarkdown } from 'https://cdn.jsdelivr.net/npm/@mathcrowd/mmarked/dist/index.mjs'

        const markdown = `
# Einstein's Mass-Energy Equivalence

The famous equation $E = mc^2$ relates energy and mass.

**Where:**
- $E$ is energy
- $m$ is mass
- $c$ is the speed of light
        `

        document.getElementById('content').innerHTML = renderMarkdown(markdown).parsed
    </script>
</body>
</html>
```

## 📚 Extended Syntax Guide

### Theorem Blocks with Auto-Numbering

```markdown
\`\`\`[theorem,fermat,Fermat's Last Theorem]
No three positive integers $a$, $b$, and $c$ satisfy the equation
$a^n + b^n = c^n$ for any integer value of $n > 2$.
\`\`\`

\`\`\`[lemma,helper,Helper Lemma]
This lemma supports the proof of [~fermat].
\`\`\`
```

**Supported block types:** `theorem`, `lemma`, `corollary`, `axiom`, `definition`, `example`

**Custom blocks:** Use any keyword for custom theorem-like blocks with independent numbering.

**Hide numbering:** Add `*` after the keyword (e.g., `theorem*`) to hide the number while maintaining sequence.

### Interactive Solution Blocks

```markdown
**Problem:** Solve the quadratic equation $x^2 - 5x + 6 = 0$

~~~[solution]
**Solution:**

Factoring the equation:
$$(x-2)(x-3) = 0$$

Therefore, the solutions are:
- $x = 2$
- $x = 3$
~~~

~~~[proof]
**Verification:** Substituting $x=2$: $(2)^2 - 5(2) + 6 = 4 - 10 + 6 = 0$ ✓
~~~
```

### Enhanced Images and Videos

```markdown
![Logo](https://example.com/logo.svg "Company Logo =300x100")

![Screenshot](./images/demo.png "Demo Screenshot =800x600")
```

### Auto-Numbered Footnotes

```markdown
The Riemann Hypothesis[^riemann] is one of the most important unsolved problems.

Another famous conjecture is the Twin Prime Conjecture[^twin].

[^riemann]: Proposed by Bernhard Riemann in 1859.
[^twin]: States that there are infinitely many twin primes.
```

## 🔧 API Reference

### License Management (Node.js Only)

#### `configureLicense(config: LicenseConfig)`

Configure license for commercial use in Node.js environments. Must be called before using render functions.

**Parameters:**
```typescript
interface LicenseConfig {
  apiKey: string  // Your license key (format: MMARKED-XXXX-XXXX-XXXX-XXXX)
}
```

**Example:**
```typescript
// Minimal configuration (recommended)
configureLicense({
  apiKey: 'MMARKED-XXXX-XXXX-XXXX-XXXX'
})
```

### Core Functions

#### `renderMarkdown(markdown: string)`

Renders Markdown to HTML with full feature support.

**License:** Requires valid license for commercial use in Node.js. Free in browsers.

**Returns:**
```typescript
{
  parsed: string,  // HTML output
  lexed: Token[],  // Marked.js tokens
  time: number     // Rendering time in milliseconds
}
```

**Example:**
```typescript
const { parsed, time } = renderMarkdown('# Hello $x^2$')
console.log(`Rendered in ${time}ms`)
```

#### `renderMarkdownCompact(markdown: string)`

Renders Markdown without wrapping `<p>` tags, ideal for inline content.

**License:** Requires valid license for commercial use in Node.js. Free in browsers.

**Returns:** Same structure as `renderMarkdown()`

**Use case:** Rendering single-line content without block-level elements.

```typescript
const { parsed } = renderMarkdownCompact('**Bold** and $x^2$ inline')
// Output: <strong>Bold</strong> and <svg>...</svg> inline
```

#### `tex2svg(html: string): string`

Converts LaTeX expressions to SVG within HTML content.

**Parameters:**
- `html`: HTML string containing LaTeX expressions (`$...$` for inline, `$$...$$` for block)

**Returns:** HTML with LaTeX converted to SVG graphics

**Example:**
```typescript
const html = '<p>Einstein: $E=mc^2$</p>'
const withSvg = tex2svg(html)
```

### ⚠️ Security Warning

**Always sanitize HTML output** using [DOMPurify](https://github.com/cure53/DOMPurify) before inserting into the DOM:

```typescript
import DOMPurify from 'dompurify'
import { renderMarkdown } from '@mathcrowd/mmarked'

// Safe rendering of user input
const userMarkdown = getUserInput()
const { parsed } = renderMarkdown(userMarkdown)
const safeHtml = DOMPurify.sanitize(parsed)

document.getElementById('content').innerHTML = safeHtml
```

## 🔌 Editor Integrations

Enhance your editing experience with official integrations:

- **[VSCode Extension](https://marketplace.visualstudio.com/items?itemName=MCLab.mmarked)** - Real-time preview with theme support
- **[Logseq Plugin](https://github.com/mathedu4all/mmarked-logseq-extension)** - Seamless integration for note-taking

## 📖 Documentation & Resources

- 🏠 **[Product Homepage](https://lab.mathcrowd.cn/products/mmarked)** - Official product page
- 📘 **[Complete Documentation](https://lab.mathcrowd.cn/docs/mmarked)** - Full syntax guide (Chinese)
- 🎮 **[Interactive Demo](https://mathedu4all.github.io/mmarked/)** - Try it live with quick reference built-in

## 🏗️ Built With

- **[marked.js](https://marked.js.org/)** - Fast Markdown parser
- **[MathJax](https://www.mathjax.org/)** - Beautiful math rendering
- **[highlight.js](https://highlightjs.org/)** - Syntax highlighting

## 🏢 About Mathcrowd

**Mathcrowd** is revolutionizing mathematics education in China through innovative technology. Founded by experienced developers and math educators, we're building tools and communities that make math learning more accessible and engaging.

- 🌐 **Mathcrowd Labs:** [lab.mathcrowd.cn](https://lab.mathcrowd.cn)
- 💬 **Join Discord:** [discord.gg/6VMUVA5Yq2](https://discord.gg/6VMUVA5Yq2)

## 📄 License

Licensed under [CC BY-NC 4.0](./LICENSE.md) - Free for non-commercial use.

For commercial licensing, contact: **charles@mathcrowd.cn**

## 💬 Support

- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/mathedu4all/mmarked/discussions)

---

<div align="center">

Made with ❤️ by the [Mathcrowd](https://mathcrowd.cn) team

</div>
