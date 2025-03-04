const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                /**
                 * 语法检查：eslint-loader eslint
                 *  注意：只检查自己写的源代码，第三方的库不用检查
                 *  设置检查规则：
                 *  packground.json中eslintConfig中设置
                 * "eslintConfig":{
                        "extends":"airbnb-base"
                    }
                 *      airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
                 */
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    // 自动修复
                    fix:true
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}