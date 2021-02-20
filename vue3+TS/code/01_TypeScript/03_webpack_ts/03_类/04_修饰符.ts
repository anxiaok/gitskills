// 修饰符（类中的成员的修饰符）：主要是描述类中的成员（属性，构造函数，方法）的可访问性
// 类中的成员都有自己的默认的修饰符，public
/**
 * public 修饰符 ---公共的，类中成员默认的修饰符，代表的是公共的，任何位置都可以访问类中的成员
 * private --- 私有的 类中的成员如果使用private来修饰，外部无法访问
 * protected ---受保护的 修饰了属性成员 及其子类可以访问
 */
(()=>{
    class Person{
        // private name:string
        name:string
        constructor(name:string){
            this.name = name;
        }
        eat(){
            console.log('好吃');
        }
    }
    const per = new Person('大蛇丸');
    per.eat()

    class Student extends Person{
        constructor(name:string){
            super(name);
        }
        play(){
            console.log(this.name);
        }
    }
})()