import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/docs',
  images: {
    unoptimized: true
  }
}

export default nextConfig
