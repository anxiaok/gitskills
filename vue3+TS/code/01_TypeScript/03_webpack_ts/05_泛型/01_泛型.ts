// 泛型：在一定函数，接口，类的时候不能预先确认要使用的数据的类型，而是在使用函数，接口，类的时候才能确定数据的类型
(()=>{
    // 需求：定义一个函数，传入两个参数，第一个参数是数据，第二个是数量，函数的作用：根据数量产生对应个数的数据，存放在一个数组中
    function getArr<T>(value:T,count:number):T[]{
        const arr:Array<T> = [];
        for(let i=0;i<count;i++){
            arr.push(value);
        }
        return arr;
    }
    const arr1 = getArr<number>(100.123,3);
    console.log(arr1);
    const arr2 = getArr<string>('abc',3);
    console.log(arr2);
})()