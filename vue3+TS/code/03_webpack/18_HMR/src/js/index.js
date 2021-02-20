import '../css/iconfont.css'
import '../css/index.less'
import print from './print'
function add(x,y){
    return x+y
}
print();
console.log(add(1,2));
if(module.hot){
    // 一旦module.hot为true,说明开启了HMR功能。 --> 让HMR功能代码生效
    module.hot.accept('./print.js',function(){
        // 方法会监听 print.js 文件的变化，一旦变化，其他模块不会重新打包构建
        print();
    })
}