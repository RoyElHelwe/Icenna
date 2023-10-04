module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/:path*`,
      },
    ];
  },
  transpilePackages: ['mui-file-input', 'mui-one-time-password-input'],
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
