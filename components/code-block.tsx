'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const code = extractTextFromChildren(children)
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-wrapper">
      {title && (
        <div className="code-block-title">
          {title}
        </div>
      )}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <pre className={className}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  )
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren((children as any).props.children)
  }
  return ''
}
