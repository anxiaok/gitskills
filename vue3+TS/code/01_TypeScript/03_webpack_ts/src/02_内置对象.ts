let b:Boolean = new Boolean(1)
let n:Number = new Number(true);
let s:String = new String('aaa');
let d:Date = new Date();
let r:RegExp = /^1/
let e:Error = new Error('error message');

const div:HTMLElement = document.getElementById('test') || new HTMLElement();
const divs:NodeList = document.querySelectorAll('div');
document.addEventListener('click',(event:MouseEvent)=>{
    console.log(event.target)
});
const fragment:DocumentFragment = document.createDocumentFragment();


