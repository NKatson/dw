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
  host: process.env.HOST,
  apiHost: process.env.API_HOST,
  apiPort: process.env.API_PORT,
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
