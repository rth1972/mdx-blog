"use client";

import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon
} from 'next-share';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  // Create a tweet text with title
  const tweetText = description 
    ? `${title}\n\n${description}` 
    : title;

  return (
    <div className="fixed right-1 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl">
      <span className="relative text-xs mb-2 mt-1 font-semibold text-slate-700 dark:text-slate-300">Share</span>
      
      <TwitterShareButton 
        url={url} 
        title={tweetText}
        hashtags={['webdev', 'programming', 'blog']}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton 
        url={url} 
        quote={title}
        hashtag="#webdev"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
}
