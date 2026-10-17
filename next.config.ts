import type { NextConfig } from "next";

// Prototipe memakai data hidup (cookie peran, penyimpanan memori), jadi seluruh rute dirender dinamis.
const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
