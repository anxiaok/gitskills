// 静态成员：在类中通过static修饰的属性或者方法，那么就是静态的属性或静态的方法，也称之为：静态成员
// 静态成员在使用的时候是通过类名.的这种语法来调用的
(()=>{
    class Person{
        // 静态属性
        // 类中默认有一个内置的name属性，此时会出现错误的提示信息
        static name1:string = '小甜甜'
        constructor(name1:string){
            // this是实例对象，name1是静态属性，不能通过实例对象直接调用静态属性来使用
            //this.name1 = name1;
        }
        static sayHi(){
            //console.log(this.name1);
        }
    }
    // const person:Person = new Person('小甜甜');
    //console.log(person.name1);
    // person.sayHi();
    Person.name1 = '佐助';
    Person.sayHi();
})()