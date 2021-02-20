function sum(...args){
    return args.redus((p,c)=>p+c,0);
}
console.log(sum(1,2,3,4));