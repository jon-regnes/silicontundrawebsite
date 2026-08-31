/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure the ebook PDF is bundled with the download route (matters if the
  // build ever uses standalone output; harmless otherwise).
  outputFileTracingIncludes: {
    "/api/ebook/download": ["./content/ebook/*.pdf"],
  },
};

module.exports = nextConfig;
