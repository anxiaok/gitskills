// 类 类型：类的类型，类的类型可以通过接口来实现
(()=>{
    interface IFly{
        fly():void
    }
    class Person implements IFly{
        // 实现接口的方法
        fly(){
            console.log('我可以飞了');
        }
    }
    const person = new Person();
    person.fly();

    interface ISwim{
        swim():void
    }
    // 定义一个类，这个类的类型就是IFly,ISwim（当前这个类可以实现多个接口，一个类同时可以被多个接口进行约束）
    class Person2 implements IFly,ISwim{
        fly(){
            console.log('feil');
        }
        swim(){
            console.log('swim');
        }
    }
    const person2 = new Person2();
    person2.fly();
    person2.swim();
    // 接口可以继承其他的多个接口
    interface IMyFlyAndSwim extends IFly,ISwim{}
    class Person3 implements IMyFlyAndSwim{
        fly(){
            console.log('feil');
        }
        swim(){
            console.log('swim');
        }
    }
    // 总结：接口和接口之间叫继承（extends），类和接口之间叫实现（implements）
})()