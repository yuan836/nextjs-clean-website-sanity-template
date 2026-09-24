import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    // Object form (not `new URL()`): a URL object carries `search: ''`, which rejects Sanity's ?w=&h= params.
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**'}],
  },
}

export default nextConfig
