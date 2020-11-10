// 1，快速排序
function quickSort(arr){
    var baseNum = arr[0],leftArr=[],rightArr=[],len=arr.length;
    for(var i=1;i<len;i++){
        var curArr = arr[i];
        if(curArr < baseNum){
            leftArr.push(curArr);
        }else{
            rightArr.push(curArr);
        }
    }
    if(leftArr.length >=2){
        leftArr = quickSort(leftArr)
    }
    if(rightArr.length >=2){
        rightArr = quickSort(rightArr)
    }
    return leftArr.concat(baseNum,rightArr);
}
let arr = [23,1,324,80,2,4,1];
console.log(quickSort(arr));

/**
 * 2，根据前序和中序实现树
 * 前序遍历序列：跟左右：1，2，4，7，3，5，6，8
 * 中序遍历序列：左根右：4，7，2，1，5，3，8，6
 * 思路：
 *      1，找到根节点（前序序列的第一个元素一定是根节点）
 *      2，根据找到的根节点和中序序列，找到树的左子树和右子树
 *      3，对左子树和右子树进行1，2步的递归操作
 * 
 * 根节点：1
 *  左子树：
 *  前序序列：跟左右：247 
 *  中序序列：左根右：472
 *      
 *      节点：2
 *      左子树
 *          前序序列：跟左右：47
 *          中序序列：左根右：47
 *          节点：4
 *              没有左子树
 *              右子树
 *                  前序序列：跟左右：7
 *                  中序序列：左根右：7
 *      没有右子树
 *      
 *  
 *  右子树：
 *  前序序列：跟左右：3，5，6，8
 *  中序序列：左根右：5，3，8，6
 * 
 *      节点：3
 *          左子树
 *              前序序列：
 *              中序序列：5
 *              
 *          右子树
 *              前序序列：68
 *              中序序列：86
 *              
 *              节点：6
 * 
 */
function rootTree(val){
    this.val = val;
    this.left = null;
    this.right = null;
}
function treeRender(preface,middlePreface){
    var rootNode = preface[0];
    if(rootNode){
        /*1，找到根节点（前序序列的第一个元素一定是根节点）
        * 2，根据找到的根节点和中序序列，找到树的左子树和右子树
        * 3，对左子树和右子树进行1，2步的递归操作
        * */
       var index = middlePreface.indexOf(rootNode);
       var leftTree = treeRender(preface.slice(1,index+1),middlePreface.slice(0,index));
       var rightTree = treeRender(preface.slice(index+1),middlePreface.slice(index+1));
       var rootNode = new rootTree(rootNode);
       rootNode.left = leftTree;
       rootNode.right = rightTree;
       return rootNode;
    }
}
var preface = [1,2,4,7,3,5,6,8],middlePreface = [4,7,2,1,5,3,8,6];
var tree = treeRender(preface,middlePreface);
// 3,两个栈实现队列
var stack1=[];// 入队
var stack2=[];// 出队
function push(node){
    stack1.push(node);
}
function pop(){
    // 把栈1的元素挪到栈2中
    while(stack1.length){
        stack2.push(stack1.pop());
    }
    var popVal = stack2.pop();
    while(stack2.length){
        stack1.push(stack2.pop());
    }
    return popVal;
}
push(1);
push(2);
push(3);
push(4);
push(5);
console.log(pop())
push(6);
console.log(pop());
console.log(pop());
console.log(pop());
console.log(pop());
console.log(pop());

/*
 3, 跳台阶  一个青蛙一次可以跳上一个台阶，也可以跳上两个台阶
 f(n) = f(n-1)+f(n-2)
*/
function jumpFloor(n){
    if(n === 1) return 1;
    else if(n === 2) return 2;
    else return jumpFloor(n-1)+jumpFloor(n-2);
}
console.log(jumpFloor(10));

// 记忆化递归

let cache=[0,1,2];
function jumpFloor1(n){
    if(cache[n] !== undefined) return cache[n];
    return cache[n] = jumpFloor1(n-1)+jumpFloor1(n-2);
}
console.log(cache,jumpFloor1(10));