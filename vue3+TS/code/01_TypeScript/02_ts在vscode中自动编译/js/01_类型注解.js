// 类型注解：是一种轻量级的为函数或者变量添加的约束
(function () {
    function showMsg(str) {
        return '床前明月光，' + str;
    }
    var msg = '疑是地上霜';
    console.log(showMsg(msg));
})();
