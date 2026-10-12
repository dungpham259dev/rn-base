/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: [
    "@rnbase/api",
    "@rnbase/i18n",
    "@rnbase/store",
    "@rnbase/ui",
  ],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.dummyjson.com" }],
  },
  typescript: { ignoreBuildErrors: true },
};

export default config;
