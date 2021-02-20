(()=>{
    interface ILength{
        length:number
    }
    function getLength<T extends ILength>(x:T):number{
        return x.length
    }
    console.log(getLength<string>('W'));
    // console.log(getLength<number>(123));
})()