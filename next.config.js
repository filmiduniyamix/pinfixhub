/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true // Required for static export on GitHub Pages
  },
  // IMPORTANT: If deploying to a repo page (username.github.io/repo-name), 
  // uncomment the next line and replace 'repo-name' with your repository name.
  // basePath: '/repo-name',
}
module.exports = nextConfig
