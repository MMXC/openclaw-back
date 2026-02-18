/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 支持绝对导入
  resolveAlias: {
    '@': __dirname,
    '@components': __dirname + '/../vibex-ui-components/components',
    '@pages': __dirname + '/pages',
  },
}

module.exports = nextConfig
