import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { Tag as TagIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tags | Robin te Hofstee',
  description: 'Browse articles by topic',
}

export default function TagsPage() {
  // Get all unique tags with post counts
  const tagCounts = allPosts.reduce((acc, post) => {
    post.tags?.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          Browse by Tag
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 hidden">
          Explore {tags.length} topics across {allPosts.length} articles
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:border-titans-red hover:text-titans-red transition-all"
              >
                {tag} <span className="text-slate-400">({count})</span>
              </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-titans-red transition-colors font-semibold"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  )
}
