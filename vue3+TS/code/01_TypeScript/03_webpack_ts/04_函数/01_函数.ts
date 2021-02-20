// 函数：封装了一些重复使用的代码，在需要的时候直接调用即可
(()=>{
    function add(x:number,y:number):number{
        return x+y;
    }
    // add3变量名
    // (x:number,y:number) => number
    // function(x:number,y:number):number{return x+y;} 就相当于符合上面额这个函数类型的值
    const add3:(x:number,y:number) => number = function(x:number,y:number):number{
        return x+y;
    }
})()