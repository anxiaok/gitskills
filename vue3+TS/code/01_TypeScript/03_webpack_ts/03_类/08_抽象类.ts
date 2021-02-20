// 抽象类：包含抽象方法（抽象方法一般没有任何的具体内容的实现，也可以包含实例方法，抽象类是不能被实例化，为了让子类进行实例化及实现内部的抽象方法）
// 抽象类的目的或者是作用最终都是为了子类服务的
(()=>{
    // 定义一个类
    abstract class Animal{
        // 抽象方法
        // 报错的，抽象方法不能有具体的实现
        // abstract eat(){
        //     console.log('报错的');
        // }

        abstract eat():void
        // 实例方法
        sayHi(){
            console.log('实例方法');
        }
    }
    // 定义一个子类（派生类）Dog
    // 不能实例化抽象类的对象
    class Dog extends Animal{
        eat(){
            console.log('舔着吃，真好吃');
        }
    }
    const dog:Dog = new Dog();
    dog.eat();
    dog.sayHi();

})()