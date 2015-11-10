require('babel/polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.API_PORT,
  apiHost: process.env.API_HOST,
  app: {
    title: 'Application',
    description: 'Description',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Sitename',
      },
    },
  },
}, environment);
