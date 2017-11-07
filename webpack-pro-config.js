/**
 * 
 * webpack生产配置
 * 
 * */ 


 const path = require('path');
 const webpack = require('webpack');
 const AssetsPlugin = require('assets-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');
 const bundleConfig = require('./dist/config/bundleConfig.json');

 module.exports = {
  devtool: 'source-map',

  entry: {
    main: path.resolve(__dirname, './src/js/index.jsx'),
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: path.join(__dirname, './dist'),
    publicPath: ''
  },

  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.css', '.less', '.scss', '.json', '*'],
    alias: {
      styles: path.resolve(__dirname, './src/style'),
      app: path.resolve(__dirname, './src/js')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    }),
    new ExtractTextPlugin({
      filename: 'style/[name].vundle.css'
    }),
    new HtmlWebpackPlugin({
      title: 'production',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      hash: true,
      inject: 'body',
      vendorJsName: bundleConfig.vendor.js,
      vendorCssName: bundleConfig.vendor.css,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/config/vendor-manifest.json')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          },
          {
            loader: 'eslint-loader'
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]_[hash:base64:5]',
                minimize: true
              }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: path.resolve(__dirname, './postcss.config.js') }
              }
            }
          ]
        }),
        include: path.resolve(__dirname, './src/js')
      },

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
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: path.resolve(__dirname, './postcss.config.js') }
              }
            }
          ]
        }),
        exclude: path.resolve(__dirname, './src/js')
      },

      {
        test: /\.(otf|eot|ttf|woff|woff2).*$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 }
          }
        ]
      },

      {
        test: /\.(img|jsp|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}
