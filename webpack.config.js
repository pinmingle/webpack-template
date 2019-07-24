const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');
const {entryConfig, devServerConfig} = require('./custom.config');
const plugins = require('./plugins.config');
const moduleObj = require('./module.config');

// 环境变量
let NODE_ENV = process.env.NODE_ENV || 'development';
let PRODUCTION = NODE_ENV=='production' ? true : false;

let fileName = PRODUCTION ? 'dist' : 'build';

// entry 配置
let entry = {};
for(let key in entryConfig){
    entry[key] = path.resolve(__dirname, './src/assets/js/'+entryConfig[key]);
}

// devServer 配置
let devServer = {
    host:devServerConfig.host,
    compress:true,
    proxy: {
        '*': {
            target: devServerConfig.target,
            secure: false,
            changeOrigin:true
        }
    }
}

let config = {
    watch: true,
    devtool: 'eval-source-map',
    entry: entry,
    output: {
        path: path.resolve(__dirname, './'+fileName),
        filename: 'assets/js/[name].bundle.js'
    },
    mode: NODE_ENV,
    module:moduleObj,
    devServer:devServer,
    plugins: plugins
}

module.exports  = config;