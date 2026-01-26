import { ImageResponse } from 'next/og'
import Image from 'next/image'
export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Robin te Hofstee'
    const subtitle = searchParams.get('subtitle') || 'Personal Blog'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          {/* Red accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #e93139 0%, #ef4444 100%)',
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
            }}
          >
            {/* Avatar/Logo */}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                background: 'linear-gradient(135deg, #e93139 0%, #ef4444 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                border: '4px solid #1e293b',
              }}
            >
              <Image src="/me-compressed1.png" width={640} height={640} alt="profile_pic" className="h-64 w-64" />
              <span
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  color: 'white',
                  display:'none'
                }}
              >
                R
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
                textAlign: 'center',
                maxWidth: '1000px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '36px',
                color: '#94a3b8',
                marginBottom: '40px',
                textAlign: 'center',
              }}
            >
              {subtitle}
            </div>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {['React', 'NextJS', 'TypeScript', 'Web Dev'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: '12px 24px',
                    background: '#1e293b',
                    color: '#94a3b8',
                    borderRadius: '8px',
                    fontSize: '24px',
                    border: '1px solid #334155',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: '#64748b',
              fontSize: '24px',
            }}
          >
            <span>blog.robintehofstee.com</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
