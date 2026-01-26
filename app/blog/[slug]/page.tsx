import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { allPosts } from 'contentlayer/generated'
import { MDXContent } from '@/components/mdx-content'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ArtalkComments } from '@/components/artalk-comments'
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react'
import SocialShare from '@/components/SocialShare'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = allPosts.find((post) => post.slug === slug)
  
  if (!post) {
    return {}
  }

  const postUrl = `https://blog.robintehofstee.com/blog/${post.slug}`
  const ogImageUrl = `https://blog.robintehofstee.com/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent('Personal Blog')}`

  return {
    title: post.title,
    description: post.description || 'Read this article on Robin te Hofstee\'s blog',
    authors: [{ name: 'Robin te Hofstee' }],
    openGraph: {
      title: post.title,
      description: post.description || 'Read this article on Robin te Hofstee\'s blog',
      url: postUrl,
      siteName: 'Robin te Hofstee Blog',
      type: 'article',
      publishedTime: post.date,
      authors: ['Robin te Hofstee'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Robin_teHofstee',
      creator: '@Robin_teHofstee',
      title: post.title,
      description: post.description || 'Read this article on Robin te Hofstee\'s blog',
      images: [ogImageUrl],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
const { slug } = await params;
  
  // 1. Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 2. Find current post index
  const postIndex = sortedPosts.findIndex((post) => post.slug === slug);
  const post = sortedPosts[postIndex];
  const postUrl = `https://blog.robintehofstee.com/blog/${post.slug}`;
 
  if (!post) {
    notFound();
  }

  // 3. Define Previous and Next (relative to the sorted list)
  // Note: "Previous" is index + 1 (older), "Next" is index - 1 (newer)
  const prevPost = sortedPosts[postIndex + 1];
  const nextPost = sortedPosts[postIndex - 1];
 
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-titans-red mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <article>
          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight break-words">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time>
                  Published on {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-8">
            {post.tags.map((tag) => (
            <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-titans-red hover:text-white transition-colors cursor-pointer"
            >
              {tag}
              </Link>
              ))}
              </div>
          )}

            {post.description && (
              <p className="text-xl text-slate-600 dark:text-slate-400 italic border-l-4 border-titans-red pl-4">
                {post.description}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mdx-content mb-12">
            <MDXContent code={post.body.code} />
          </div>

          {/* Share Section */}
          <div className="border-t border-b border-slate-200 dark:border-slate-800 py-6 mb-12">
            <div className="flex items-center justify-between hidden">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Did you find this article helpful?
              </span>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-titans-red hover:text-white transition-colors hidden">
                <Share2 />
                Share</button>

              <SocialShare url={postUrl} title={post.title} />
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-12">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-titans-red flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-titans-red to-titans-accent flex items-center justify-center text-white text-3xl font-bold">
                  <Image src="/me-compressed1.png" width={250} height={250} alt="profile_pic" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                  Written by Robin te Hofstee
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Technology enthusiast with a deep love for programming. Currently learning React and NextJS 
                  to build modern web applications. Passionate about sharing insights from the ever-evolving 
                  world of technology.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://x.com/Robin_teHofstee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-titans-red hover:text-titans-accent font-medium"
                  >
                    @Robin_teHofstee
                  </a>
                  <a
                    href="https://robintehofstee.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-titans-red hover:text-titans-accent font-medium"
                  >
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <ArtalkComments 
            slug={post.slug}
            title={post.title}
          />

          {/* Related Posts / Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/"
              className="flex-1 px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-titans-red transition-colors text-center"
            >
              <span className="font-semibold text-slate-900 dark:text-white">← Back to all posts</span>
            </Link>
            <a
              href="mailto:robintehofstee@gmail.com"
              className="flex-1 px-6 py-4 bg-titans-red text-white rounded-lg hover:bg-titans-accent transition-colors text-center font-semibold shadow-lg hover:shadow-xl hidden"
            >
              Get in touch
            </a>
          </div>
        </article>
              
        {/* Next / Previous Post Navigation */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
  {prevPost ? (
    <Link
      href={`/blog/${prevPost.slug}`}
      className="group p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-titans-red transition-all shadow-sm"
    >
      <span className="text-sm text-slate-500 dark:text-slate-400 mb-2 block">← Previous Post</span>
      <span className="font-bold text-slate-900 dark:text-white group-hover:text-titans-red transition-colors line-clamp-1">
        {prevPost.title}
      </span>
    </Link>
  ) : (
    <div className="hidden sm:block" /> // Empty space if no prev post
  )}

  {nextPost ? (
    <Link
      href={`/blog/${nextPost.slug}`}
      className="group p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-titans-red transition-all shadow-sm text-right"
    >
      <span className="text-sm text-slate-500 dark:text-slate-400 mb-2 block">Next Post →</span>
      <span className="font-bold text-slate-900 dark:text-white group-hover:text-titans-red transition-colors line-clamp-1">
        {nextPost.title}
      </span>
    </Link>
  ) : (
    <div className="hidden sm:block" /> // Empty space if no next post
  )}
</div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Social Share Buttons */}
      <SocialShare 
        url={postUrl} 
        title={post.title}
        description={post.description}
      />
    </>
  )
}

