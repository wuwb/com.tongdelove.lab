/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 240,
  transpilePackages: ['rc-picker', 'rc-util'],
}

export default nextConfig
