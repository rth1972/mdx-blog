import { NextResponse } from 'next/server';
import { allPosts } from 'contentlayer/generated';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  const results = allPosts
    .filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.description?.toLowerCase().includes(query)
    )
    .map(post => ({
      id: post._raw.flattenedPath,
      heading: post.title,
      snippet: post.description,
      type: 'post'
    }))
    .slice(0, 10);

  return NextResponse.json(results);
}
