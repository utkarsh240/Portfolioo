/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'assets.vercel.com' },
      { protocol: 'https', hostname: 'streamlit.io' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'qdrant.tech' },
      { protocol: 'https', hostname: 'bunny.net' },
      { protocol: 'https', hostname: 'arcjet.com' },
      { protocol: 'https', hostname: 'authjs.dev' },
    ],
  },
}

module.exports = nextConfig 