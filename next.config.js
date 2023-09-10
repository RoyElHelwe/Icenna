module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://icenna.com/api/:path*",
      },
    ];
  },
  transpilePackages: ['mui-file-input'],
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
