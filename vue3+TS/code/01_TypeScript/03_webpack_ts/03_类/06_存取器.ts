/**
 * 存取器：让我们可以有效的控制对象中的成员的访问，通过getter和setter来进行操作
 * 
 */
(()=>{
    class Person{
        firstName:string
        lastName:string
        constructor(firstName:string,lastName:string){
            this.firstName = firstName
            this.lastName = lastName
        }
        // 读取器 --- 负责读取数据的
        get fullName(){
            return this.firstName+'_'+this.lastName
        }
        // 设置器 --- 负责设置数据的
        set fullName(val){
            let names = val.split('_');
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
    const person:Person = new Person('东方','不败');
    person.fullName = '诸葛——孔明';
})()