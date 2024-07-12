/** @type {import('next').NextConfig} */
import CopyPlugin from "copy-webpack-plugin";

const nextConfig = {
  webpack: function (config, { dev, isServer }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    // copy files you're interested in
    if (!dev) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: "data", to: "data" }],
        })
      );
    }

    return config;
  },
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
    ],
  },
};

export default nextConfig;
