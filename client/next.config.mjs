/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "image.ahmetselimboz.com.tr",
          },
          {
            hostname: "lh3.googleusercontent.com",
          },
          {
            hostname: "pixsector.com",
          },
        ],
      },
};

export default nextConfig;
