module.exports = {
  future: {
    webpack5: true
  },
  images: {
    domains: ['imgix.cosmicjs.com']
  },
  async rewrites() {
    return [
      {
        source: '/goat',
        destination: 'https://xirapolavida.goatcounter.com/count'
      },
      {
        source: '/count.js',
        destination: 'https://gc.zgo.at/count.js'
      },
      {
        source: '/fonts',
        destination:
          'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      }
    ]
  }
}
