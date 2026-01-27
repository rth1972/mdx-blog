// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // 1. Internal Safety Check
  if (request.headers.get('x-internal-fetch')) {
    return NextResponse.next()
  }

  const userAgent = request.headers.get('user-agent') || ''
  const { pathname, origin } = request.nextUrl

  // 2. Detect Terminal Users (curl, wget, httpie, etc.)
  const isTerminal = 
    userAgent.toLowerCase().includes('curl') || 
    userAgent.toLowerCase().includes('wget') ||
    userAgent.toLowerCase().includes('httpie') ||
    userAgent.toLowerCase().includes('fetch');

  if (isTerminal) {
    try {
      // 3. Handle Blog Routes Dynamically
      // Root path shows list of posts
      if (pathname === '/') {
        const response = await fetch(`${origin}/api/blog`, {
          headers: { 'x-internal-fetch': 'true' }
        });

        if (!response.ok) {
          throw new Error('Could not load blog list');
        }

        const content = await response.text();

        return new NextResponse(content, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Server': 'Robin-Terminal/1.0',
            'X-Terminal-Friendly': 'true'
          },
        });
      }

      // Handle /blog or /blog/slug
      if (pathname === '/blog' || pathname.startsWith('/blog/')) {
        // Extract slug from /blog/slug-name
        const slug = pathname === '/blog' ? '' : pathname.replace('/blog/', '');
        
        const apiUrl = slug 
          ? `${origin}/api/blog?slug=${encodeURIComponent(slug)}`
          : `${origin}/api/blog`;
        
        const response = await fetch(apiUrl, {
          headers: { 'x-internal-fetch': 'true' }
        });

        if (!response.ok) {
          throw new Error('Blog post not found');
        }

        const content = await response.text();

        return new NextResponse(content, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Server': 'Robin-Terminal/1.0',
            'X-Terminal-Friendly': 'true'
          },
        });
      }

      // Unknown path
      return new NextResponse(
        'Error 404: Path not found.\n\n' +
        'Available commands:\n' +
        '  curl blog.robintehofstee.com\n' +
        '  curl blog.robintehofstee.com/blog/[slug]\n\n' +
        'For the full experience, visit: https://blog.robintehofstee.com\n', 
        { 
          status: 404, 
          headers: { 'Content-Type': 'text/plain; charset=utf-8' } 
        }
      );

    } catch (err) {
      console.error('Terminal mode error:', err);
      return new NextResponse(
        '\n' +
        '╔══════════════════════════════════════╗\n' +
        '║    Robin\'s Blog - Terminal Mode     ║\n' +
        '╚══════════════════════════════════════╝\n\n' +
        'Something went wrong loading the blog.\n\n' +
        'Please try:\n' +
        '  • Refreshing: curl blog.robintehofstee.com\n' +
        '  • Web version: https://blog.robintehofstee.com\n\n' +
        'If the issue persists, contact: robin@robintehofstee.com\n', 
        { 
          status: 500,
          headers: { 
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Terminal-Error': 'true'
          } 
        }
      );
    }
  }

  // 4. Normal Browser Users: Continue to the standard Next.js UI
  return NextResponse.next();
}

// 5. Matcher: Run proxy on all routes
export const config = {
  matcher: [
    '/',
    '/blog',
    '/blog/:slug*'  // Match /blog and /blog/any-slug
  ],
}
