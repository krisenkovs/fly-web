const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const port = 8091;

module.exports = merge(common, {
  mode: 'development',
  entry: [join(__dirname, 'src', 'theme', 'index.tsx')],
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
    hot: true,
    server: 'http',
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
      title: 'Webpack App Theme',
      inject: true,
      template: join(__dirname, 'public', 'theme.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'public/fonts'),
          to: 'fonts',
        },
        {
          from: resolve(__dirname, 'public/favicon'),
          to: 'favicon',
        },
      ],
    }),
  ],
});
