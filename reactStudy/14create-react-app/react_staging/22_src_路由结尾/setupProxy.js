const Proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        Proxy('/api1',{
            target:'http://localhost:5000',
            changeOrigin:true,
            pathRewrite:{
                '^/api1':''
            }
        })
    )
}