// 文件名不能变
const proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        proxy('/api1',{ // 遇见/api1前缀的请求，就会触发该代码请求
            target:'http://localhost:5000',
            changeOrigin:true, // 控制服务器收到的请求头中Host的值
            pathRewrite:{'^/api1':''} // 重写请求地址
        }),
        proxy('/api2',{
            target:'http://localhost:5001',
            changeOrigin:true,
            pathRewrite:{'^/api2':''}
        })
    )
}
/*
    方法1：在package.json中追加如下配置：
        'proxy':'http://localhost:5000'
        说明：
            1，优点：配置简单，前端请求资源时可以不加任何前缀
            2，缺点：不能配置多个代理
            3，工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000（优先匹配前端资源）
    方法2：
        1，第一步：创建代理配置文件
            在src下创建配置文件：src/setupProxy.js
        2,编写setupProxy.js配置具体代理规则如上所写

*/