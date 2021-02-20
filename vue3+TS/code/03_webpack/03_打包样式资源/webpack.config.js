/**
 * webpack的配置文件：
 *  作用：指示webpack干哪些活，
 *  所有构建工具都是基于nodejs平台运行的，~模块化默认采用commonjs
 */
// resolve用来拼接绝对路径的方法
const {resolve} = require('path');
module.exports = {
    // webpack配置
    entry:'./src/index.js',// 入口起点
    output:{
        filename:'built.js',
        // __dirname nodejs的变量，代表当前文件的目录绝对路径
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[
            // 详细loader配置
            // 不同文件必须配置不同loader处理
            {
                // 匹配哪些文件
                test:/\.css$/,
                // 使用哪些loader进行处理
                use:[
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonJS模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                // 匹配哪些文件
                test:/\.less$/,
                // 使用哪些loader进行处理
                use:[
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonJS模块加载js中，里面内容是样式字符串
                    // 需要less和less-loader
                    'css-loader',
                    'less-loader',
                ]
            }
        ]
    },
    // plugins的配置
    plugins:[
        // 详细plugins的配置
    ],
    mode:'development',
    // mode:'production'
};