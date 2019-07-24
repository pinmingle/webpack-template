
let devServerConfig = {
    host:'192.168.60.161',
    target:'https://ceshi-wxckservice.comeyes.com'
}
let entryConfig = {
    'common': 'common.js',
    'index': 'index.js',
    'detail': 'detail.js',
}
let htmlConfig = [{
    title:"首页",                                 //页面标题
    chunks:['common','index'],                   //页面引用那些模块js
    template:'./src/index.html',                 //模版名称
    filename:'index.html',                       //页面名称
},{
    title:"内页",                                 //页面标题
    chunks:['common','detail'],                  //页面引用那些模块js
    template:'./src/detail.html',                //模版名称
    filename:'detail.html',                      //页面名称
}]

let ruleConfig = ['scss','css'];

module.exports  = {entryConfig,htmlConfig,devServerConfig,ruleConfig};