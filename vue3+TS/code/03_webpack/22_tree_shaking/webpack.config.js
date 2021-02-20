const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extrace-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-weebpack-plugin');
/**
 * tree shaking:去除无用代码
 *  前提；1，必须使用es6模块化，2，开启production
 *  作用：减少代码体积
 *  在package.json中配置
 *      sideEffects:false所以代码都可以tree shaking
 *      问题：可能会把css / @babel/polyfill干掉
 *      sideEffects:["*.css"]
 */
process.env.NODE_ENV = 'production';
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
];
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.[contenthash:10].js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                    // 在package.json中eslintConfig --> airbnb
                    test:/\.js$/,
                    exclude:/node_modules/,
                    // 优先执行
                    enforce:'pre',
                    loader:'eslint-loader',
                    options:{
                        fix:true
                    }
                },
            {
                
                // 以下loader只会匹配一个
                // 注意：不能有两个配置处理同一类型文件
                oneOf:[
                    {
                        test:/\.css$/,
                        use:[...commonCssLoader]
                    },
                    {
                        test:/\.less$/,
                        use:[...commonCssLoader,'less-loader']
                    },
                    /**
                     * 正常来讲，一个文件只能被一个loader处理
                     * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                     *  先执行eslint 再执行babel
                     */
                    
                    {
                        test:/\.js$/,
                        exclude:/node_modules/,
                        loader:'babel-loader',
                        options:{
                            presets:[
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns:'usage',
                                        corejs:{
                                            version:3
                                        },
                                        targets:{
                                            chrome:'60',
                                            firefox:'50'
                                        }
                                    }
                                ]
                            ],
                            // 开启babel缓存
                            // 第二次构建，会读取之前的缓存
                            cacheDirectory:true
                        }
                    },
                    {
                        test:/\.(jpg|png|gif)$/,
                        loader:'url-loader',
                        options:{
                            limit:8 * 1024,
                            name:'[hash:10].[ext]',
                            outputPath:'imgs',
                            esModule:false
                        }
                    },
                    {
                        test:/\.html$/,
                        loader:'html-withimg-loader'
                    },
                    {
                        exclude:/\.(js|css|less|html|jpg|png|gif)$/,
                        loader:'file-loader',
                        options:{
                            outputPath:'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/built.[contenthash:10].css'
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode:'production'
}