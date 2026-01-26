import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Calendar, Clock, Tag, Search } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Robin te Hofstee',
  description: 'All articles about web development, React, NextJS, and technology by Robin te Hofstee.',
}

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])))

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          All Posts
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 hidden">
          {posts.length} articles about web development, React, NextJS, and technology
        </p>
      </div>

      {/* Tags Filter */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <Tag className="w-6 h-6 text-titans-red" />
          Browse by Topic
        </h2>
        <div className="flex flex-wrap gap-3">
          {allTags.map(tag => {
            const count = posts.filter(post => post.tags?.includes(tag)).length
            return (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:border-titans-red hover:text-titans-red transition-all"
              >
                {tag} <span className="text-slate-400">({count})</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                      +{post.tags.length - 3}
                    </span>
                  )}
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

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
            No posts found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Check back soon for new content!
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
          <div className="text-4xl font-bold text-titans-red mb-2">{posts.length}</div>
          <div className="text-slate-600 dark:text-slate-400">Total Articles</div>
        </div>
        
        <div className="hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
          <div className="text-4xl font-bold text-titans-red mb-2">{allTags.length}</div>
          <div className="text-slate-600 dark:text-slate-400">Topics Covered</div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
          <div className="text-4xl font-bold text-titans-red mb-2">∞</div>
          <div className="text-slate-600 dark:text-slate-400">More to Come</div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-br from-titans-red to-titans-accent rounded-2xl p-8 text-white text-center hidden">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6 opacity-90 max-w-2xl mx-auto">
          Subscribe to get notified when I publish new articles about web development, React, and technology.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-titans-red rounded-lg font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
