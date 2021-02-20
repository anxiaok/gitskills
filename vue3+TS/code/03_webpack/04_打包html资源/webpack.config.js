/**
 * loader:1,下载 2.使用（配置loader）
 * plugins:1,下载 2,引入 3，使用
 */
const {resolve} =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[]
    },
    plugins:[
        // 功能：默认会创建一个空的HTML，自动引入打包输出所有资源（js/css）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}