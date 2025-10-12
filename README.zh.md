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
```

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

### 核心函数

#### `renderMarkdown(markdown: string)`

将 Markdown 渲染为 HTML，支持所有功能。

**返回值：**
```typescript
{
  parsed: string,  // HTML 输出
  lexed: Token[],  // Marked.js 令牌
  time: number     // 渲染时间（毫秒）
}
```

**示例：**
```typescript
const { parsed, time } = renderMarkdown('# 你好 $x^2$')
console.log(`渲染耗时 ${time}ms`)
```

#### `renderMarkdownCompact(markdown: string)`

渲染 Markdown 但不包裹 `<p>` 标签，适合行内内容。

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

- 🏠 **[产品主页](https://lab.mathcrowd.cn/mmarked)** - 官方产品页面
- 📘 **[完整文档](https://lab.mathcrowd.cn/mmarked/docs)** - 完整语法指南
- 🎮 **[在线演示](https://mathedu4all.github.io/mmarked/)** - 在浏览器中实时体验，内置快速参考

## 🏗️ 技术栈

- **[marked.js](https://marked.js.org/)** - 快速 Markdown 解析器
- **[MathJax](https://www.mathjax.org/)** - 精美数学渲染
- **[highlight.js](https://highlightjs.org/)** - 语法高亮

## 🏢 关于橘子数学

**橘子数学（Mathcrowd）** 致力于通过创新技术革新中国的数学教育。我们由经验丰富的开发者和数学教育工作者创立，正在构建工具和社区，让数学学习更易获取、更有吸引力。

- 🌐 **MCLab 平台：** [lab.mathcrowd.cn](https://lab.mathcrowd.cn)
- 👥 **数学社区：** [mathcrowd.cn](https://www.mathcrowd.cn)
- 💬 **加入 Discord：** [discord.gg/6VMUVA5Yq2](https://discord.gg/6VMUVA5Yq2)

## 📄 许可证

采用 [CC BY-NC 4.0](./LICENSE.md) 许可 - 非商业用途免费。

商业许可请联系：**charles@mathcrowd.cn**

## 🤝 贡献

欢迎贡献！查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

## 💬 支持

- 🐛 **错误报告：** [GitHub Issues](https://github.com/mathedu4all/mmarked/issues)
- 💡 **功能建议：** [GitHub Discussions](https://github.com/mathedu4all/mmarked/discussions)
- 📧 **邮箱：** support@mathcrowd.cn

---

<div align="center">

由 [橘子数学](https://mathcrowd.cn) 团队用 ❤️ 打造

</div>
