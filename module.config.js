const ExtractPlugin = require('extract-text-webpack-plugin');

const {ruleConfig} = require('./custom.config');
let rulesList = {
    scss: {
        test: /\.scss$/,
        use: ExtractPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
        })
    },
    css: {
        test: /\.css$/,
        use: ExtractPlugin.extract({
           fallback: "style-loader",
           use: [{
               loader: "css-loader",
               options: {
                   url: false
               }
           }]

       })
    }
}
let getRule = (arr) => {
    let rule = [];
    for(let i=0;i<arr.length; i++){
        if(rulesList[arr[i]]){
            rule.push(rulesList[arr[i]]);
        }
    }
    return rule;
}

let moduleObj = {
    rules:getRule(ruleConfig)
}

module.exports  = moduleObj;
