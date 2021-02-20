// 泛型接口：在定义接口时，为接口中的属性或方法定义泛型类型，在使用接口时，再指定具体的泛型类型
(()=>{
    interface IBaseCRUD<T>{
        data:Array<T>
        add:(t:T)=>T
        getUserId:(id:number)=>T
    }
    class User{
        id?:number
        name:string
        age:number
        constructor(name:string='小甜甜',age:number=19){
            this.name = name;
            this.age = age;
        }
    }
    class UserCRUD implements IBaseCRUD<User>{
        data:Array<User> = [];
        add(user:User):User{
            user.id = Date.now()+Math.random()
            this.data.push(user)
            return user
        }
        getUserId(id:number):User{
           return this.data.find(user => user.id === id) || new User()
        }
    }
    const userCRUD:UserCRUD = new UserCRUD();
    userCRUD.add(new User('Jack',20));
    userCRUD.add(new User('tom',25));
    const {id} = userCRUD.add(new User('lucy',20));
    const user = userCRUD.getUserId(id || 0);
    console.log(user);
})()