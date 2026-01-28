import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// ANSI color codes
const COLORS = {
  PRIMARY: '\x1b[1;36m',
  WARN: '\x1b[1;33m',
  TEXT: '\x1b[0m',
  SUBTLE: '\x1b[2;37m',
  SUCCESS: '\x1b[32m',
  RST: '\x1b[0m',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    // Read the contentlayer data
    const dataPath = join(process.cwd(), '.contentlayer/generated/Post/_index.json');
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

    if (!slug) {
      // No slug provided - show list of all posts
      return generatePostList(data);
    }

    // Find the specific post
    const post = data.find((p: any) => p.slug === slug);

    if (!post) {
      return new NextResponse(
        `Error 404: Blog post not found.\n\n` +
        `Try: curl blog.robintehofstee.com\n` +
        `     (to see all posts)\n`,
        { 
          status: 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      );
    }

    // Generate individual post view
    return generatePostView(post);

  } catch (error) {
    return new NextResponse(
      `Error: Could not load blog data.\n\n` +
      `Please make sure Contentlayer data is generated.\n`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    );
  }
}

function generatePostList(posts: any[]) {
  // Sort by date, newest first
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let output = '';
  
  // Header
  output += `${COLORS.PRIMARY}╔════════════════════════════════════════╗${COLORS.RST}\n`;
  output += `${COLORS.PRIMARY}║          Robin's Blog Posts            ║${COLORS.RST}\n`;
  output += `${COLORS.PRIMARY}╚════════════════════════════════════════╝${COLORS.RST}\n\n`;

  // Recent posts (show top 10)
  output += `${COLORS.WARN}Recent Posts:${COLORS.RST}\n\n`;

  sortedPosts.slice(0, 10).forEach((post: any) => {
    const date = new Date(post.date).toISOString().split('T')[0];
    output += `  ${COLORS.WARN}${date}${COLORS.RST} - ${COLORS.TEXT}${post.title}${COLORS.RST}\n`;
    output += `  ${COLORS.SUBTLE}curl blog.robintehofstee.com/blog/${post.slug}${COLORS.RST}\n\n`;
  });

  // Footer
  if (posts.length > 10) {
    output += `${COLORS.SUBTLE}...and ${posts.length - 10} more posts${COLORS.RST}\n`;
  }
  
  output += `\n${COLORS.SUBTLE}source: github.com/rth1972${COLORS.RST}\n`;
  output += `${COLORS.SUBTLE}© robin te hofstee - blog.robintehofstee.com${COLORS.RST}\n`;

  return new NextResponse(output, {
    headers: { 
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
}

function generatePostView(post: any) {
  let output = '';
  
  const date = new Date(post.date).toISOString().split('T')[0];
  
  // Header with box
  output += `${COLORS.PRIMARY}┌${'─'.repeat(60)}┐${COLORS.RST}\n`;
  output += `${COLORS.PRIMARY}│  ${post.title.padEnd(56)}  │${COLORS.RST}\n`;
  output += `${COLORS.PRIMARY}├${'─'.repeat(60)}┤${COLORS.RST}\n`;
  output += `${COLORS.PRIMARY}│  ${COLORS.WARN}${date}${COLORS.TEXT}${' '.repeat(60 - date.length - 2)}│${COLORS.RST}\n`;
  output += `${COLORS.PRIMARY}└${'─'.repeat(60)}┘${COLORS.RST}\n\n`;

  // Content
  if (post.description) {
    output += `${post.description}\n\n`;
  }

  // Body content (markdown stripped for terminal)
  if (post.body && post.body.raw) {
    // Simple markdown stripping for terminal
    const plainText = post.body.raw
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.+?)\*/g, '$1') // Remove italic
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
      .replace(/```[\s\S]*?```/g, '[code block]') // Replace code blocks
      .replace(/`(.+?)`/g, '$1') // Remove inline code markers
      .trim();
    
    output += `${plainText}\n\n`;
  }

  // Footer
  output += `${'─'.repeat(62)}\n\n`;
  
  if (post.tags && post.tags.length > 0) {
    output += `${COLORS.SUBTLE}Tags: ${post.tags.join(', ')}${COLORS.RST}\n\n`;
  }

  output += `${COLORS.SUBTLE}View on web: https://blog.robintehofstee.com/blog/${post.slug}${COLORS.RST}\n`;
  output += `${COLORS.SUBTLE}All posts:   curl blog.robintehofstee.com${COLORS.RST}\n\n`;
  
  output += `${COLORS.SUBTLE}source: github.com/rth1972${COLORS.RST}\n`;
  output += `${COLORS.SUBTLE}© robin te hofstee${COLORS.RST}\n`;

  return new NextResponse(output, {
    headers: { 
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
}
