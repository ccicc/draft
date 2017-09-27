/**
 * 
 * 
 * postcss配置 
 * 
 * */

const path = require('path');
const autoprefixer = require('autoprefixer');

const BROWSERS = ['> 1% in CN', 'ie >= 11'];

module.exports = {
  preser: 'postcss-less',
  syntax: 'postcss-less',
  plugins: [
    autoprefixer(BROWSERS)
  ]
}
