import Link from 'next/link'
import Image from 'next/image'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import QuoteDisplay from '@/components/QuoteDisplay'

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  const totalPosts = posts.length

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center hidden">
      <div className="mb-8">
         <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-titans-red">
            <div className="w-full h-full bg-gradient-to-br from-titans-red to-titans-accent flex items-center justify-center text-white text-5xl font-bold">
              <Image src="/me-compressed1.png" alt="profile_pic" width={640} height={640} />
            </div>
          </div>
          <h1 className="flex flex-col text-center items-center gap-x-3 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white text-center">
    <span className="opacity-90">Hi, I'm <span className="text-titans-red font-black tracking-tighter italic drop-shadow-sm sm:not-italic sm:tracking-normal">
      Robin
    </span></span>
  </h1>
         <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 hidden">
            I build cool websites like this one.
          </p>

        </div> 
        <div className="hidden flex items-center justify-center gap-8 text-center mb-8">
          <div>
            <div className="text-3xl font-bold text-titans-red">{totalPosts}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Posts</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative mb-16 text-white bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bg1.jpg" 
            alt="Local Scenery" 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-900/60 to-transparent" />
        </div>
        <p className="relative text-lg text-slate-100 dark:text-slate-300 mb-6 leading-relaxed z-50">
          My passion is buildin cool stuff. I'm a technology enthusiast with a deep love for programming. 
          I've recently discovered a passion for tech blogging and writing. I'm enthusiastic about sharing 
          insights and knowledge from the ever-evolving world of technology. Currently I'm learning{' '}
          <code className="px-2 py-1 text-slate-200 bg-slate-200 dark:bg-slate-700 rounded text-sm">React</code> and{' '}
          <code className="px-2 py-1 text-slate-200 bg-slate-200 dark:bg-slate-700 rounded text-sm">NextJS</code> to build 
          modern web applications.
        </p>
        <blockquote className="relative z-50 border-l-4 border-titans-red pl-4 italic text-slate-100 dark:text-slate-400">
          <QuoteDisplay />         
        </blockquote>
      </section>

      {/* Popular Tags */}
      <section className="mb-16">
        {/* 1. Added items-start to align children to the top */}
<div className="relative flex justify-between items-start">
  <div>
    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
      Popular Tags
    </h2>
    <p className="text-slate-600 dark:text-slate-400 mb-6">
      Popular tags feature the most widely favored topics.
    </p>
  </div>
  
  {/* 2. Added mt-2 or similar if you want to pixel-perfect align it with the h2 text baseline */}
  <Link 
    href="/tags" 
    className="text-titans-red hover:text-titans-accent font-medium flex items-center gap-2 group mt-2"
  >
    All Tags
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </Link>
</div>      
        <div className="flex flex-wrap gap-3">
          {Array.from(new Set(posts.flatMap(post => post.tags || []))).slice(0, 10).map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:border-titans-red hover:text-titans-red transition-all cursor-pointer"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Posts</h2>
          <Link 
            href="/blog" 
            className="text-titans-red hover:text-titans-accent font-medium flex items-center gap-2 group"
          >
            All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-6">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post._id}
              href={post.url}
              className="group block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-titans-red hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-titans-red transition-colors">
                    {post.title}
                  </h3>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {post.description && (
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {post.description}
                    </p>
                  )}

                  <div className="flex items-center text-titans-red font-medium text-sm group-hover:gap-2 transition-all">
                    Read more
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="hidden mt-16 bg-gradient-to-br from-titans-red to-titans-accent rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Subscribe to the newsletter</h2>
        <p className="mb-6 opacity-90">
          Get notified when I publish new articles about web development, React, and technology.
        </p>
        <form className="flex gap-3 max-w-md">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-titans-red rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Sign up
          </button>
        </form>
      </section>
    </div>
  )
}
