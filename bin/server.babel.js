//  enable runtime transpilation to use ES6/7 in node

// var fs = require('fs');
//
// var babelrc = fs.readFileSync('/bin/babel.config.json');
// var config;
//
// try {
//   config = JSON.parse(babelrc);
// } catch (err) {
//   console.error('==>     ERROR: Error parsing your .babelrc.');
//   console.error(err);
// }

require('babel-core/register')({
  stage: 0,
  optional: 'runtime',
  loose: 'all',
  env: {
    development: {
      plugins: [
        'react-transform',
      ],
      extra: {
        'react-transform': {
          transforms: [{
            transform: 'react-transform-catch-errors',
            imports: [
              'react',
              'redbox-react',
            ],
          }],
        },
      },
    },
  },
}
);
