import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Calendar, Clock, ArrowLeft, Tag as TagIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])))
  return tags.map(tag => ({
    tag: tag.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  
  // Find the original case tag
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])))
  const originalTag = allTags.find(t => t.toLowerCase() === decodedTag)
  
  return {
    title: `${originalTag || decodedTag} Articles | Robin te Hofstee`,
    description: `Browse all articles tagged with ${originalTag || decodedTag}`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  
  // Find the original case tag
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])))
  const originalTag = allTags.find(t => t.toLowerCase() === decodedTag)
  
  if (!originalTag) {
    notFound()
  }
  
  // Filter posts by tag
  const filteredPosts = allPosts
    .filter(post => post.tags?.some(t => t.toLowerCase() === decodedTag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  if (filteredPosts.length === 0) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/tags"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-titans-red mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All tags
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-titans-red/10 rounded-xl flex items-center justify-center">
            <TagIcon className="w-8 h-8 text-titans-red" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
              {originalTag}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mt-2">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post._id}
            href={post.url}
            className="group block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-titans-red hover:shadow-lg transition-all duration-300 h-full flex flex-col"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <time>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white group-hover:text-titans-red transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              {post.description && (
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {post.description}
                </p>
              )}
            </div>
            
            <div>
              {post.tags && post.tags.length > 1 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {post.tags.filter(t => t !== originalTag).slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center text-titans-red font-medium text-sm group-hover:gap-2 transition-all">
                Read article
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Back to all posts */}
      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-titans-red transition-colors font-semibold"
        >
          ← View all posts
        </Link>
      </div>
    </div>
  )
}
