// 多态：父类型的引用指向了子类型的对象，不同类型的对象针对相同的放啊，产生了不同的行为
(()=>{
    class Animal{
        name:string
        constructor(name:string){
            this.name = name
        }
        run(distance:number=0){
            console.log(this.name+'_'+distance);
        }
    }
    class Dog extends Animal{
        constructor(name:string){
            super(name)
        }
        run(distance:number=5){
            console.log(this.name+'_'+distance);
        }
    }
    class Pig extends Animal{
        constructor(name:string){
            super(name);
        }
        run(distance:number=10){
            console.log(this.name+'_'+distance);
        }
    }
    const ani:Animal = new Animal('动物');
    ani.run();
    const dog:Dog = new Dog('大黄');
    dog.run();
    const pig:Pig = new Pig('猪八戒');
    pig.run();
    // 父类和子类的关系：父子关系，此时，父类类型创建了子类的对象
    const dog1:Animal = new Dog('小黄');
    dog1.run();
    const pig1:Animal = new Pig('小猪');
    pig1.run();

    function showRun(ani:Animal){
        ani.run();
    }
    showRun(dog1);
    showRun(pig1);
})()