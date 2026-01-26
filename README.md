# Robin te Hofstee - Personal Blog

A modern, personal blog built with Next.js 15, MDX, Contentlayer, and TypeScript.

## About

This is my personal blog where I share insights about web development, React, NextJS, and technology. I'm passionate about building cool stuff and sharing what I learn along the way.

## Features

- 📝 Write content in MDX (Markdown + JSX)
- 🎨 Styled with Tailwind CSS (Titans Community theme)
- 🔒 Type-safe content with Contentlayer
- ⚡ Fast builds with Next.js 15
- 🌙 Dark mode support
- 📱 Responsive design
- 💻 Syntax highlighting with rehype-pretty-code
- 🎯 SEO optimized

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Content:** MDX with Contentlayer2
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Fonts:** Geist Sans & Geist Mono
- **Syntax Highlighting:** rehype-pretty-code with Shiki

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
robin-personal-blog/
├── app/
│   ├── about/              # About page
│   ├── posts/[slug]/       # Dynamic post pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   └── mdx-content.tsx     # MDX rendering component
├── content/                # MDX blog posts
│   ├── my-journey-learning-react.mdx
│   ├── building-this-blog.mdx
│   └── typescript-tips.mdx
├── contentlayer.config.ts  # Contentlayer configuration
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Writing Posts

Create new MDX files in the `content/` directory with the following frontmatter:

```mdx
---
title: 'Your Post Title'
date: '2026-01-14'
description: 'A brief description of your post'
tags: ['tag1', 'tag2', 'tag3']
---

# Your content here

Write your post content using Markdown and JSX!
```

## Features in Detail

### Syntax Highlighting

All code blocks have beautiful syntax highlighting:

\`\`\`typescript
const greeting = (name: string): string => {
  return \`Hello, \${name}!\`
}
\`\`\`

### Tags

Posts support multiple tags for categorization:

```mdx
tags: ['React', 'NextJS', 'TypeScript']
```

### MDX Components

You can use React components directly in your markdown:

```mdx
<CustomComponent prop="value" />
```

## Building for Production

```bash
npm run build
npm start
```

## Contact

- **Email:** robintehofstee@gmail.com
- **Twitter:** [@Robin_teHofstee](https://x.com/Robin_teHofstee)
- **Portfolio:** [robintehofstee.com](https://robintehofstee.com)

## License

MIT © Robin te Hofstee

---

*"You become what you believe." - Oprah Winfrey*
