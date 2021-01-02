const Proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        Proxy('/apiUses',{
            target:'http://localhost:5002',
            changeOrigin:true,
            pathRewrite:{'^/apiUses':''}
        })
    )
}