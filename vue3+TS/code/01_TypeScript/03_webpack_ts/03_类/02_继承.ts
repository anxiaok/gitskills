/**
 * 继承：类与类之间的关系
 * 继承后类与类之间的叫法：
 * A类继承了B这个类，那么此时A类叫子类，B类叫基类
 * 子类 ---> 派生类
 * 基类 ---> 超类（父类）
 * 一旦发生了继承的关系，就出现了父子类的关系（叫法）
 */
(()=>{
    class Person{
        name:string
        age:number
        gender:string
        constructor(name:string='小明',age:number=18,gender:string='男'){
            this.name = name
            this.age = age
            this.gender = gender
        }
        sayHi(str:string){
            console.log(this.name);
        }
    }
    class Student extends Person{
        constructor(name:string,age:number,gender:string){
            super(name,age,gender);
        }
        sayHi(){
            super.sayHi('hh')
        }
    }
    const person = new Person('大名',19,'女');
    person.sayHi('ff');
    const stu = new Student('大名ming',191,'女1');
    stu.sayHi()
    // 总结；类与类之间如果要有继承关系，需要使用extends关键字
    // 子类中可以调用父类中的构造函数，使用的是super关键字(包括调用父类中的实例方法，也可以使用super)
    // 子类中可以重写父类的方法
})()