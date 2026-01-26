import { NextRequest, NextResponse } from 'next/server'

const ARTALK_SERVER = 'http://192.168.1.27:8080'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || ''
  
  try {
    const response = await fetch(`${ARTALK_SERVER}${path}?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from Artalk' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || ''
  const body = await request.json()
  
  try {
    const response = await fetch(`${ARTALK_SERVER}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post to Artalk' }, { status: 500 })
  }
}
