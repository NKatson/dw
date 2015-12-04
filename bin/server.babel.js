require('babel-core/register')({
  stage: 0,
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
