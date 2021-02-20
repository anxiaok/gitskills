// 类：可以累计额为模板，通过模板可以实例化对象
// 面向对象的编程思想
(()=>{
    class Person{
        name:string
        age:number
        gender:string
        constructor(name:string='小甜甜',age:number=18,gender:string='女'){
            this.name  = name
            this.age = age
            this.gender = gender
        }
        sayHi(str:string){
            console.log('大家好我三岁了',str);
        }
    }
    const person = new Person();
    person.sayHi('你叫什么名字啊');
})()