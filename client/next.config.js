/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/safespartan',
  assetPrefix: '/safespartan/', 
};

export default nextConfig;

  
