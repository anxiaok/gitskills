const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extrace-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-weebpack-plugin');

process.env.NODE_ENV = 'development';
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
];
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
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
                            ]
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
            filename:'css/built.css'
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