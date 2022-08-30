const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prod = require('./webpack.web.prod.js');

module.exports = merge(prod, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()],
});
