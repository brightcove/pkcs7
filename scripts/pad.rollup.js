import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  moduleName: 'pkcs7.pad',
  entry: 'src/pad.js',
  format: 'umd',
  dest: 'dist/pkcs7.pad.js',
  legacy: true,
  plugins: [
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['es2015', {
          loose: true,
          modules: false
        }]
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ]
};
