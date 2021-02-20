(()=>{
    class GenericNumber<T>{
        defaultValue:T
        add:(x:T,y:T)=>T
    }
    const g1:GenericNumber<number> = new GenericNumber<number>()
    g1.defaultValue = 100
    g1.add = function(x,y){
        return x+y
    }
})()