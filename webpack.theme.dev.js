const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    server: 'https',
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
  ],
});
