/**
 * 
 * webpack开发配置
 * 
 * */


const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    main: path.resolve(__dirname, './src/js/index.jsx'),
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: path.join(__dirname, './dist'),
    publicPath: ''
  },

  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './dist'),
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
  },

  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.css', '.scss', '.less', '.json', '*'],
    modules: [
      'node_modules',
      path.join(__dirname, './node_modules')
    ],
    alias: {
      styles: path.resolve(__dirname, './src/style'),
      app: path.resolve(__dirname, './src/js')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style/[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'development',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      hash: true,
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json')
    })
  ],

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            },
          },
          {
            loader: 'eslint-loader',
          }
        ],
        exclude: path.resolve(__dirname, './node_modules')
      },


      // 组件私有样式 module_css
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, './postcss.config.js')
                }
              }
            }
          ]
        }),
        include: path.resolve(__dirname, './src/js'),
      },

      // 公有样式
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, './postcss.config.js')
                }
              }
            }
          ]
        }),
        include: path.resolve(__dirname, './src/style')
      },

      // 依赖库样式
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }),
        exclude: path.resolve(__dirname, './src')
      },

      {
        test: /\.(otf|eot|ttf|woff|woff2).*$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },

      {
        test: /\.(img|jpg|png|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }],
        exclude: /node_modules/
      },
    ]
  }
}
