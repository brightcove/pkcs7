import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  moduleName: 'pkcs7.unpad',
  entry: 'src/unpad.js',
  format: 'umd',
  dest: 'dist/pkcs7.unpad.js',
  legacy: true,
  plugins: [
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        'es3',
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
