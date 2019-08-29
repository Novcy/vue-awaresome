import vuePlugin from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify-es'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: 'ElSelectSearch',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    vuePlugin({
      css: true,
      compileTemplate: true
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
}

if (argv.format === 'iife') {
  config.plugins.push(uglify())
}

export default config
