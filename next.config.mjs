let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Permitir SVG remotos (usar con precaución) y configurar patrones de hosts remotos
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.simpleicons.org', pathname: '/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
      { protocol: 'https', hostname: 'kubernetes.io', pathname: '/**' },
      { protocol: 'https', hostname: 'nodejs.org', pathname: '/**' },
      { protocol: 'https', hostname: 'go.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'www.docker.com', pathname: '/**' },
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com', pathname: '/**' },
      { protocol: 'https', hostname: 'tmnjhjfayezmqkzjtqgn.supabase.co', pathname: '/**' },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig