import { withNextPlugin } from '@netlify/plugin-nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Tu peux ajuster en fonction de tes besoins
  },
  trailingSlash: true, // Ajoute un slash à la fin des URL
  target: 'serverless', // Pour rendre le projet compatible avec Netlify
}

export default withNextPlugin(nextConfig)
