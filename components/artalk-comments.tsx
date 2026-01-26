'use client'

import { useEffect } from 'react'
import 'artalk/dist/Artalk.css'

interface ArtalkCommentsProps {
  slug: string
  title: string
}

export function ArtalkComments({ slug, title }: ArtalkCommentsProps) {
  const Artalk = require('artalk').default

  useEffect(() => {
    Artalk.init({
      el: '#Comments',
      server: 'http://192.168.1.27:8080',
      pageKey: `${title}`,
      pageTitle: `/${slug}`,
      site: 'blog',
    })
  })

  return (
    <div className="mt-16">
      <h2 id="comments-header" className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center">
        Comments
      </h2>
      <div id="Comments" className="artalk-container" />
    </div>
  )
}
