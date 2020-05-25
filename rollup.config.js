import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import filesize from 'rollup-plugin-filesize'
import size from 'rollup-plugin-sizes'
import visualize from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

let rollupConfig

const serveLocal = !!process.env.SERVE
const verboseBuild = !!process.env.VERBOSE_BUILD
const visualizeBundle = !!process.env.GRAPH_ANALYZE_BUNDLE
const minimize = !!process.env.MINIMIZE

const babelPluginOptions = { exclude: 'node_modules/**', babelHelpers: 'bundled' }
const servePluginOptions = { contentBase: ['dist', 'public'], host: '0.0.0.0', port: '8080' }
const livereloadPluginOptions = { watch: ['dist', 'public'] }
const terserPluginOptions = { include: [/^.+\.min\.js$/] }

const plugins = [resolve(), commonjs(), babel(babelPluginOptions)]

verboseBuild && plugins.push(size(), filesize())
serveLocal && plugins.push(serve(servePluginOptions), livereload(livereloadPluginOptions))
visualizeBundle && plugins.push(visualize({ open: true }))

const mainBundle = {
  input: 'src/my-portfolio-stock.js',
  output: {
    name: 'MyStockPortfolio',
    file: pkg.main,
    format: 'umd',
  },
  plugins,
}

const esmBundle = {
  input: 'src/my-portfolio-stock.js',
  output: {
    name: 'MyStockPortfolio',
    file: pkg.module,
    format: 'esm',
  },
  plugins,
}

const mainBundleMinified = {
  input: 'src/my-portfolio-stock.js',
  output: {
    name: 'MyStockPortfolio',
    file: 'dist/my-stock-portfolio.min.js',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [...plugins, terser(terserPluginOptions)],
}

rollupConfig = [mainBundle, esmBundle]

minimize && rollupConfig.push(mainBundleMinified)

export default rollupConfig
