/**
 * 
 * webpack-Dll 
 * 
 * 分离公共代码,加快构建速度
 * 
 * */


const path = require('path');
const webpack = require('webpack');

const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    vendor: [
      'antd',
      'react',
      'react-dom',
      'react-color',
      'draft-js',
      'draft-js-plugins-editor',
      'draft-js-focus-plugin',
      'draft-js-image-plugin',
      'draft-js-resizeable-plugin',
      'draft-js-static-toolbar-plugin',
      'draft-js-drag-n-drop-plugin',
      './src/style/Draft.css'
    ]
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].bundle.js',
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, './dist/config/[name]-manifest.json'),
      name: '[name]'
    }),

    new ExtractTextPlugin({
      filename: 'style/[name].bundle.css'
    }),

    new AssetsPlugin({
      filename: 'bundleConfig.json',
      path: path.resolve(__dirname, './dist/config/')
    })
  ],

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { 
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true }
            }
          ]
        }),
        include: path.resolve(__dirname, './src/style')
      }
    ]
  }
}
