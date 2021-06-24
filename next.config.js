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
  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // use Preact in production
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}
