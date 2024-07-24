/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
          },
          {
            protocol: 'https',
            hostname: 'lastfm.freetls.fastly.net',
          },
        ],
      },

}

module.exports = nextConfig
