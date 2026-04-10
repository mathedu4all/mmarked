# mmarked

[![npm version](https://badge.fury.io/js/%40mathcrowd%2Fmmarked.svg)](https://www.npmjs.com/package/@mathcrowd/mmarked)
[![npm downloads](https://img.shields.io/npm/dt/@mathcrowd/mmarked.svg)](https://www.npmjs.com/package/@mathcrowd/mmarked)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-yellow.svg)](https://creativecommons.org/licenses/by-nc/4.0)

![icon.png](./icon.png)

[English](./README.md) | [在线演示](https://mathedu4all.github.io/mmarked/) | [VSCode 扩展](https://marketplace.visualstudio.com/items?itemName=MCLab.mmarked) | [Logseq 插件](https://github.com/mathedu4all/mmarked-logseq-extension)

## 📖 概述

用 **mmarked** 改变你的 Markdown 体验 —— 一个专为教育和数学内容设计的强大 TypeScript 库。支持实时渲染复杂 LaTeX 公式、定理块和自定义教育语法。

**完美适用于：**

- 📚 **教育工作者** 制作数学课程材料
- 🎓 **学生** 撰写技术笔记和作业
- 📝 **研究人员** 编写学术论文
- 💻 **开发者** 构建教育平台
- 💡 **任何人** 在 Markdown 中使用数学符号

## ✨ 功能特性

### 核心能力

- ✅ **完整 CommonMark 支持** - 与标准 Markdown 语法完全兼容
- 🌐 **多语言支持** - 内置中英文 locale，定理、证明、脚注等标签自动切换
- 🔗 **轻松集成** - 在 Node.js 和浏览器环境中无缝运行
- 📦 **轻量核心** - 最少依赖，可扩展架构
- ⚡ **高性能** - 优化的渲染管道，输出快速

### 数学内容

- 🧮 **高级 LaTeX 渲染** - 由 MathJax 驱动，呈现专业品质的公式
- 📐 **TeX 转 SVG** - 高质量 SVG 格式的方程输出
- 🔢 **自动编号脚注** - 易用的引用系统，自动编号

### 教育功能

- 📘 **定理样式块** - 专用语法支持定理、引理、定义和例子
  - 自动编号支持
  - 使用 `[~id]` 语法进行交叉引用
  - 可自定义标题
- 🔍 **可折叠解答块** - 通过切换功能隐藏/显示答案和证明
- 🎯 **语法高亮** - highlight.js 增强的代码块

### 媒体与自定义

- 🖼️ **增强图片** - 使用简单的 `=宽x高` 语法灵活调整尺寸
- 📹 **视频支持** - 视频元素支持相同的尺寸选项
- 🎨 **可扩展** - 基于 marked.js 构建，易于自定义

## 🚀 快速开始

### 安装

```bash
npm install @mathcrowd/mmarked mathjax-full highlight.js
```

### 基本用法

```typescript
import { renderMarkdown } from '@mathcrowd/mmarked'

// 渲染带 LaTeX 支持的 Markdown
const result = renderMarkdown(`
# 勾股定理

\`\`\`[theorem,pythagoras,勾股定理]
对于直角三角形，设两直角边为 $a$、$b$，斜边为 $c$：
$$a^2 + b^2 = c^2$$
\`\`\`

这个基本定理（见 [~pythagoras]）描述了直角三角形边长的关系。
`)

console.log(result.parsed) // HTML 输出
console.log(result.time)   // 渲染耗时（毫秒）

// 使用英文 locale 渲染
const enResult = renderMarkdown(`...`, { locale: 'en' })
// 定理 → "Theorem"，证明 → "Proof"，脚注 → "Footnotes"
```

### 许可证配置（仅 Node.js）

**重要提示：** 许可证验证**仅适用于 Node.js 服务端使用**。浏览器环境不需要配置许可证。

在 Node.js 应用中商业使用时，必须配置有效的许可证：

```typescript
import { configureLicense, renderMarkdown } from '@mathcrowd/mmarked'

// 配置你的许可证（在应用启动时执行一次）
configureLicense({
  apiKey: 'MMARKED-XXXX-XXXX-XXXX-XXXX'
})

// 现在可以使用库了
const result = renderMarkdown('# Hello World')
```

**在 Node.js 中未配置许可证：**
```typescript
import { renderMarkdown } from '@mathcrowd/mmarked'

// 可以正常工作，但会在控制台显示警告
const result = renderMarkdown('# Hello')
// 控制台输出：
// ⚠️  未配置 Node.js 服务端有效许可证。
// 商业使用请通过 configureLicense() 配置许可证。
// 联系 charles@mathcrowd.cn 获取商业许可。
// 浏览器使用无需许可证。
```

**系统要求：**
- **Node.js 18+** 用于远程许可证验证（使用 fetch API）

**获取许可证：**
- 📧 邮箱：**charles@mathcrowd.cn**
- 🌐 访问：[lab.mathcrowd.cn](https://lab.mathcrowd.cn)

### 浏览器端使用

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>mmarked 演示</title>
</head>
<body>
    <div id="content"></div>
    <script type="module">
        import { renderMarkdown } from 'https://cdn.jsdelivr.net/npm/@mathcrowd/mmarked/dist/index.mjs'

        const markdown = `
# 爱因斯坦质能方程

著名的方程 $E = mc^2$ 描述了能量与质量的关系。

**其中：**
- $E$ 是能量
- $m$ 是质量
- $c$ 是光速
        `

        document.getElementById('content').innerHTML = renderMarkdown(markdown).parsed
    </script>
</body>
</html>
```

## 📚 扩展语法指南

### 自动编号的定理块

```markdown
\`\`\`[theorem,fermat,费马大定理]
对于任意大于 2 的整数 $n$，不存在正整数 $a$、$b$、$c$
使得 $a^n + b^n = c^n$。
\`\`\`

\`\`\`[lemma,helper,辅助引理]
这个引理支持 [~fermat] 的证明。
\`\`\`
```

**支持的块类型：** `theorem`（定理）、`lemma`（引理）、`corollary`（推论）、`axiom`（公理）、`definition`（定义）、`example`（例）

**自定义块：** 使用任何关键字创建自定义定理样式块，独立编号。

**隐藏编号：** 在关键字后添加 `*`（如 `theorem*`）可隐藏编号，但保持序列。

### 交互式解答块

```markdown
**问题：** 解方程 $x^2 - 5x + 6 = 0$

~~~[solution]
**解答：**

因式分解方程：
$$(x-2)(x-3) = 0$$

因此，解为：
- $x = 2$
- $x = 3$
~~~

~~~[proof]
**验证：** 代入 $x=2$：$(2)^2 - 5(2) + 6 = 4 - 10 + 6 = 0$ ✓
~~~
```

### 增强的图片和视频

```markdown
![Logo](https://example.com/logo.svg "公司 Logo =300x100")

![截图](./images/demo.png "演示截图 =800x600")
```

### 自动编号脚注

```markdown
黎曼猜想[^riemann]是最重要的未解决问题之一。

另一个著名猜想是孪生素数猜想[^twin]。

[^riemann]: 由伯恩哈德·黎曼于 1859 年提出。
[^twin]: 指出存在无穷多对孪生素数。
```

## 🔧 API 参考

### 许可证管理（仅 Node.js）

#### `configureLicense(config: LicenseConfig)`

为 Node.js 环境中的商业使用配置许可证。必须在使用渲染函数之前调用。

**参数：**
```typescript
interface LicenseConfig {
  apiKey: string  // 你的许可证密钥（格式：MMARKED-XXXX-XXXX-XXXX-XXXX）
}
```

**示例：**
```typescript
// 最简配置（推荐）
configureLicense({
  apiKey: 'MMARKED-XXXX-XXXX-XXXX-XXXX'
})
```

### 核心函数

#### `renderMarkdown(markdown: string, options?: { locale?: Locale })`

将 Markdown 渲染为 HTML，支持所有功能。

**许可证：** Node.js 商业使用需要有效许可证。浏览器免费使用。

**参数：**
- `markdown`：Markdown 源字符串
- `options.locale`：`'zh'`（默认）或 `'en'` —— 控制定理类块、证明/解答块、脚注标题的内置标签语言

**返回值：**
```typescript
{
  parsed: string,  // HTML 输出
  lexed: Token[],  // Marked.js 令牌
  time: number     // 渲染时间（毫秒）
}
```

**Locale 对照表：**

| 关键字 | `zh`（默认） | `en` |
|--------|-------------|------|
| `theorem` | 定理 | Theorem |
| `lemma` | 引理 | Lemma |
| `corollary` | 推论 | Corollary |
| `axiom` | 公理 | Axiom |
| `definition` | 定义 | Definition |
| `example` | 例 | Example |
| `proof` | 证明 | Proof |
| `solution` | 解答 | Solution |
| 脚注标题 | 脚注 | Footnotes |

**示例：**
```typescript
const { parsed, time } = renderMarkdown('# 你好 $x^2$')
console.log(`渲染耗时 ${time}ms`)

// 英文 locale
const { parsed: enHtml } = renderMarkdown(md, { locale: 'en' })
```

#### `renderMarkdownCompact(markdown: string)`

渲染 Markdown 但不包裹 `<p>` 标签，适合行内内容。

**许可证：** Node.js 商业使用需要有效许可证。浏览器免费使用。

**返回值：** 与 `renderMarkdown()` 相同的结构

**使用场景：** 渲染单行内容，不需要块级元素。

```typescript
const { parsed } = renderMarkdownCompact('**粗体** 和 $x^2$ 行内')
// 输出: <strong>粗体</strong> 和 <svg>...</svg> 行内
```

#### `tex2svg(html: string): string`

将 HTML 中的 LaTeX 表达式转换为 SVG。

**参数：**
- `html`: 包含 LaTeX 表达式的 HTML 字符串（`$...$` 表示行内，`$$...$$` 表示块）

**返回值：** LaTeX 转换为 SVG 图形后的 HTML

**示例：**
```typescript
const html = '<p>爱因斯坦：$E=mc^2$</p>'
const withSvg = tex2svg(html)
```

### ⚠️ 安全警告

**始终使用 [DOMPurify](https://github.com/cure53/DOMPurify) 清理 HTML 输出**，然后再插入到 DOM 中：

```typescript
import DOMPurify from 'dompurify'
import { renderMarkdown } from '@mathcrowd/mmarked'

// 安全渲染用户输入
const userMarkdown = getUserInput()
const { parsed } = renderMarkdown(userMarkdown)
const safeHtml = DOMPurify.sanitize(parsed)

document.getElementById('content').innerHTML = safeHtml
```

## 🔌 编辑器集成

通过官方集成增强编辑体验：

- **[VSCode 扩展](https://marketplace.visualstudio.com/items?itemName=MCLab.mmarked)** - 实时预览，支持主题
- **[Logseq 插件](https://github.com/mathedu4all/mmarked-logseq-extension)** - 无缝集成笔记应用

## 📖 文档与资源

- 🏠 **[产品主页](https://lab.mathcrowd.cn/products/mmarked)** - 官方产品页面
- 📘 **[完整文档](https://lab.mathcrowd.cn/docs/mmarked)** - 完整语法指南
- 🎮 **[在线演示](https://mathedu4all.github.io/mmarked/)** - 在浏览器中实时体验，内置快速参考

## 🏗️ 技术栈

- **[marked.js](https://marked.js.org/)** - 快速 Markdown 解析器
- **[MathJax](https://www.mathjax.org/)** - 精美数学渲染
- **[highlight.js](https://highlightjs.org/)** - 语法高亮

## 🏢 关于橘子数学

**橘子数学（Mathcrowd）** 致力于通过创新技术革新中国的数学教育。我们由经验丰富的开发者和数学教育工作者创立，正在构建工具和社区，让数学学习更易获取、更有吸引力。

- 🌐 **Mathcrowd Labs:** [lab.mathcrowd.cn](https://lab.mathcrowd.cn)
- 💬 **加入 Discord：** [discord.gg/6VMUVA5Yq2](https://discord.gg/6VMUVA5Yq2)

## 📄 许可证

采用 [CC BY-NC 4.0](./LICENSE.md) 许可 - 非商业用途免费。

商业许可请联系：**charles@mathcrowd.cn**

## 💬 支持

- 🐛 **错误报告：** [GitHub Issues](https://github.com/mathedu4all/mmarked/issues)

---

<div align="center">

由 [橘子数学](https://mathcrowd.cn) 团队用 ❤️ 打造

</div>
