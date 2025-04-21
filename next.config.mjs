/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      '/': { page: '/' },
    };
  },
}

export default nextConfig;
