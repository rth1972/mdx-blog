'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface MDXContentProps {
  code: string
}

function Pre({ children, ...props }: any) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const code = children?.props?.children || ''
    const textContent = typeof code === 'string' ? code : extractText(code)
    navigator.clipboard.writeText(textContent.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 backdrop-blur-sm"
        aria-label="Copy code"
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  )
}

function extractText(node: any): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node?.props?.children) return extractText(node.props.children)
  return ''
}

const components = {
  pre: Pre,
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
