// 可选参数

// 默认参数

(()=>{
    const getFullName = function(firstName:string='东方',lastName?:string):string{
        if(lastName){
            return firstName+'_'+lastName
        }else{
            return firstName
        }
    }
})()