// eslint-disable-next-line
console.log(1);
// import '@babel/polyfill' 适用于第二种
const a = 1;
const promise = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('定时器执行完了');
        resolve();
    },1000);
});
console.log(promise);

