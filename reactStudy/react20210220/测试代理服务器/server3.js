const express = require('express');
const usersData = require('./users.json');
const app = express();
// 全局的中间件
app.use((request,response,next)=>{
    console.log('有人请求服务器3了');
    next();
})

app.get('/users',(request,response)=>{
    const users = usersData;
    console.log(request);
    response.send(users);
})
app.listen(5002,err =>{
    if(!err) console.log('服务器3启动成功了，请求汽车信息地址为：http://localhost:5002/users')
})
