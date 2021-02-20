// 接口是对象的状态和行为的抽象
// 接口：是一种类型，是一种规范，是一个能力，是一种约束
(()=>{
    interface IPerson{
        readonly id:number
        name:string
        age:number
        sex?:string
    }
    const person:IPerson ={
        id:1,
        name:'小甜甜',
        age:18,
        sex:'女'
    }
    console.log(person);
})()