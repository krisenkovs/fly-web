const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common.js');
const { join, resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: [join(__dirname, 'src', 'web', 'index.tsx')],
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Webpack App',
      inject: true,
      template: join(__dirname, 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/silent-check-sso.html',
        },
        {
          from: resolve(__dirname, 'public/fonts'),
          to: 'fonts',
        },
        {
          from: resolve(__dirname, 'public/images'),
          to: 'images',
        },
      ],
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: '[path][base].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      algorithm: 'brotliCompress',
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
  optimization: {
    nodeEnv: 'production',
    chunkIds: 'natural',
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 15,
      maxInitialRequests: 30,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace('@', '')}`;
            //return 'vendor'
          },
        },
      },
    },
  },
});
