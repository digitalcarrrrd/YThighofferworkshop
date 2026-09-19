import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/join-group",
        destination: "https://chat.whatsapp.com/F2zfUCa3hxlHraRz77wj0j?s=cl&p=i&mlu=4&ilr=4",
        permanent: false,
      },
      {
        source: "/group",
        destination: "https://chat.whatsapp.com/F2zfUCa3hxlHraRz77wj0j?s=cl&p=i&mlu=4&ilr=4",
        permanent: false,
      },
      {
        source: "/community",
        destination: "https://chat.whatsapp.com/F2zfUCa3hxlHraRz77wj0j?s=cl&p=i&mlu=4&ilr=4",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
