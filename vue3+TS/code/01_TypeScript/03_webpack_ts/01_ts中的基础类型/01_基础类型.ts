(()=>{
    // 布尔类型 --->boolean
    let isDone:boolean = true;
    console.log(isDone);

    // 数字类型 --->number
    let a1:number = 10;
    let a2:number = 0b1010;//二进制
    let a3:number = 0o12 // 八进制
    let a4:number = 0xa//十六进制
    console.log(a1);
    console.log(a2);
    console.log(a3);
    console.log(a4);
    
    // 字符串类型 --->string
    let str1:string = '床前明月光';
    let str2:string = '床前明月光1';
    let str3:string = '床前明月光2';
    let str4:string = '床前明月光3';
    console.log(str1,str2,str3,str4);

    // 字符串和数字之间能够一起拼接
    let str5:string = '我有这么多的钱'
    let num:number = 5;
    console.log(str5+num);
    // 总结：ts中变量一开始是什么类型，那么后期赋值的时候，只能用这个类型的数据，是不允许使用掐类型的数据赋值给当前的这个变量

    // undefined和null 都可以作为其他类型的子类型，把undefined和null赋值给其他类型的变量，如：number
    let und:undefined = undefined;
    let nll:null =null;

    // 数组类型
    let arr1:number[] = [10,20,30];
    let arr2:Array<number> = [10,20,30];
    console.log(arr1,arr2);

    // 元组类型
    let arr3:[string,number,boolean] = ['小甜甜',100,true];
    // 元组类型在使用的时候，数据的类型的位置和数据的个数，应该和定义元组数据类型位置一致
    console.log(arr3[0].split(''));
    console.log(arr3[1].toFixed(2));

    // 枚举类型
    enum Color{
        red = 1,
        green,
        blue
    }
    let color:Color = Color.red;
    console.log(color);
    console.log(Color[3]);
    enum Gender{
        女,
        男
    }
    console.log(Gender.男);

    // any类型
    let str:any = 10;
    str = 'aaa';
    let arr:any[] = [100,'100'];

    // void类型
    function showMsg():void{
        console.log('只要富婆把握住，连夜帮井大别墅');
    }

    // object类型
    function showObj(obj:object):object{
        return {
            name:'卡卡西',
            age:28
        };
    }

    // 联合类型
    function getString(str:number|string):string{
        return str.toString();
    }
    // 类型断言 告诉编译器，我知道自己是什么类型，也知道自己是在干什么
    // <类型>变量名  值 as 类型
    function getString1(str:number|string):number{
        if((<string>str).length){
            return (str as string).length
        }else{
            return str.toString().length
        }
    }
    
})()