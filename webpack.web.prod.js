const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common.js');
const { join, resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
          from: resolve(__dirname, 'public/locales'),
          to: 'locales',
        },
        {
          from: resolve(__dirname, 'public/favicon'),
          to: 'favicon',
        },
        {
          from: resolve(__dirname, 'public/images'),
          to: 'images',
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      exclude: [/.*/],
      disableDevLogs: true,
      mode: 'production',
      runtimeCaching: [
        {
          urlPattern: /\.(ttf|png|svg|js|css|json)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static',
            expiration: {
              maxEntries: 40,
            },
          },
        },
        {
          urlPattern: /api\/image/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        },
      ],
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
