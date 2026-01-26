import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {

  }
  // Remove swcMinify as it's default in Next.js 16
}

export default withContentlayer(nextConfig)
