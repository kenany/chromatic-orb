import buble from 'rollup-plugin-buble';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

export default {
  entry: 'index.js',
  plugins: [
    buble()
  ],
  external,
  targets: [
    {
      dest: pkg['main'],
      format: 'cjs'
    },
    {
      dest: pkg['jsnext:main'],
      format: 'es'
    }
  ]
};
