module.exports = {
  images: {
    domains: ['imgix.cosmicjs.com'],
  },
  async rewrites() {
    return [
      {
        source: '/goat',
        destination: 'https://xirapolavida.goatcounter.com/count',
      },
      {
        source: '/count.js',
        destination: 'https://gc.zgo.at/count.js',
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
