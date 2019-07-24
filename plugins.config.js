const webpack = require('webpack');                             // 用于访问webpack内置插件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');


// 环境变量的配置
let NODE_ENV = process.env.NODE_ENV || 'development';
let PRODUCTION = NODE_ENV=='production' ? true : false;

const {htmlConfig} = require('./custom.config');
let getHtmlConfig = function(obj){
    return {
        title:obj.title,
        chunks:obj.chunks,
        template:obj.template,
        filename:obj.filename,
        favicon:'./src/favicon.ico',
        inject:true,
        hash:false,
        minify:PRODUCTION ? {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true
        } : false,
    }
}

/*
 * 插件配置
 * */
let plugins=[];

/*
* ProgressPlugin
* 提供了一种自定义编译期间如何报告进度的方法。
* */
plugins.push(new webpack.ProgressPlugin());

/*
 * ExtractPlugin
 * 将css从js文件提取出来，独立成文件
 * */
plugins.push(new ExtractPlugin('assets/css/[name].bundle.css'));

/*
 * PRODUCTION 通过启动环境变量获取，非生产环境不压缩
 * OptimizeCssAssetsPlugin
 * 引入cssnano后，可在此处配置css压缩规则
 * */
if(PRODUCTION){
    plugins.push(new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
            mergeLonghand: false,
            discardComments: { removeAll: true }
        },
        canPrint: true,
    }));
}

/*
 * copyWebpackPlugin
 * 将images图片文件拷贝到对应环境包下
 * */
plugins.push(new copyWebpackPlugin([
    {
        from:path.resolve(__dirname,'./src/assets/images'),
        to:'./assets/images'
    }
]));

/*
 * ProvidePlugin
 * 使用时将不再需要import和require进行引入，直接使用即可
 * */
plugins.push(new webpack.ProvidePlugin({
    $:"jquery"
}));

/*
 * ProvidePlugin
 * 为html文件中引入的外部资源，如js,css
 * 可以生成创建html入口文件
 * */
for(let i=0;i<htmlConfig.length; i++){
    plugins.push(new HtmlWebpackPlugin(getHtmlConfig(htmlConfig[i])));
}

module.exports  = plugins;