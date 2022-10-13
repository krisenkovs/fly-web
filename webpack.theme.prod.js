const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');
const { join, resolve } = require('path');
const pkg = require('./package.json');

const outputFolderPath = resolve(__dirname, 'theme/login/resources');

module.exports = merge(common, {
  mode: 'production',
  entry: [join(__dirname, 'src', 'theme','index.tsx')],
  output: {
    path: outputFolderPath,
  },

  plugins: [new CleanWebpackPlugin()],
  optimization: {
    nodeEnv: 'production',
    chunkIds: 'natural',
    minimize: true,
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
      new CopyPlugin({
        patterns: [
          {
            from: 'resources/theme',
            to: resolve(__dirname, 'theme'),
          },
          {
            from: resolve(__dirname,'public/fonts'),
            to: resolve(__dirname, 'theme/login/resources/fonts'),
          },
          {
            from: resolve(__dirname,'public/favicon'),
            to: resolve(__dirname, 'theme/login/resources/favicon'),
          },
          {
            from: 'resources/theme/login/theme.properties',
            to: resolve(__dirname, 'theme/login/theme.properties'),
            transform(content) {
              return content.toString().replace(/{version}/g, pkg.version);
            },
          },
        ],
      }),
    ],
  },
});
