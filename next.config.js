module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://icenna.com/api/:path*",
      },
    ];
  },
  reactStrictMode: true,
};
