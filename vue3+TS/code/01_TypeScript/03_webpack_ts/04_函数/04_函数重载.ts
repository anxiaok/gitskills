// 函数重载，函数名字相同，函数的参数与个数不同
(()=>{
    function add(x:string,y:string):string
    function add(x:number,y:number):number
    function add(x:string|number,y:string|number){
        if(typeof x === 'string' && typeof y === 'string'){
            return x + y
        }else if(typeof x === 'number' && typeof y === 'number'){
            return x + y
        }
    }
    add(10,20);
    add('1','2');
    //add('1',2);
})()