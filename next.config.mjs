/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.truyenvua.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "comicbucket23.s3.ap-southeast-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.hinhhinh.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/dd8jxjsqkw/*",
      },
    ],
    unoptimized: true,
  },
};
//Accept I.hinhhinh.com
export default nextConfig;
