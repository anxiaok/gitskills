const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_EVN = 'development'
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    /**
                     * css兼容性处理：postcss --> postcss-loader postcss-preset-env
                     * 帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
                     * "browserslist":{
                     * // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                        "development":[
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        // 生产环境：默认是生产环境
                        "production":[
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                        ]
                    }
                     */
                    // 第一种写法：loader的默认配置
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        })
    ],
    mode:'development',
    devServer:{
        contentBase:resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true
    }
}