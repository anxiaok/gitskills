// readonly：首先是一个关键字，对类中的属性成员进行修饰，修饰符后，该属性成员，就不能在外部被随意的修改了
// 构造函数的name参数，一旦使用readonly进行修饰后，那么
//  该name参数可以叫参数属性，Person中就有了一个name的属性成员，外部也是无法修改类中的name属性成员值得
// 用public修饰后，类中就有了一个公共的name属性成员了
// private                     私有的name属性成员
// protected                   受保护的name属性
(()=>{
    class Person{
        readonly name:string='大甜甜'
        constructor(name:string='大甜甜'){
            this.name = name
        }
        sayHi(){
            console.log(this.name);
        }
    }
    const person:Person = new Person('小甜甜');
    console.log(person.name);
    // 只读的不能修改
    // person.name = '大甜甜';
    console.log(person.name);
})()