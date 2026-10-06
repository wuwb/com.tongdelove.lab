import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // packages/ui 直接导出未编译的 tsx 源码，需要交给 Next 编译
  transpilePackages: ["@tongdelove/ui"],
};

export default nextConfig;
