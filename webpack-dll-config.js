/**
 * 
 * webpack-Dll 
 * 
 * 分离公共代码,加快构建速度
 * 
 * */ 

 
 const path = require('path');
 const webpack = require('webpack');

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
             'draft-js-drag-n-drop-plugin'
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
            path: './manifest.json',
            name: '[name]'
         }),

         new ExtractTextPlugin({
             filename: 'style/[name].css'
         })
     ]
 }
