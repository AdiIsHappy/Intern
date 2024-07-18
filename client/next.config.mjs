/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gitlab.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
