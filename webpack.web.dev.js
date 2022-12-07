const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const { join, resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const proxy = require('./proxy.json');
const port = 8000;

module.exports = merge(common, {
  mode: 'development',
  entry: [join(__dirname, 'src', 'web', 'index.tsx')],
  devtool: 'inline-source-map',
  optimization: {
    nodeEnv: 'development',
    chunkIds: 'named',
    minimize: false,
  },
  devServer: {
    port,
    open: true,
    compress: true,
    server: 'https',
    proxy: proxy,
    client: {
      logging: 'none',
      overlay: false,
    },
    static: {
      directory: path.resolve(__dirname, 'dist'),
      serveIndex: true,
      watch: true,
    },
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  plugins: [
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
          urlPattern: /\.(ttf|png|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static',
            expiration: {
              maxEntries: 20,
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
});
