/**
 * 关于loader，一个loader就是一个nodejs的模块，就是一个函数
 *      这个函数中的参数就是代码源文件的字符串代码资源
 *      比如一个markdown文件的loader解析器
 * 
 * loader大致分为同步loader和异步loader，
 * 
 *      从下到上，从右到左
 *      loader中的source是字符串，本质还是对代码字符串资源进行操作
 *      
 * */ 

// https://juejin.cn/post/6976052326947618853

const reg = /(console.log\()(.*)(\))/g;
module.exports = function (source) {
    // console.log( typeof source );
    // 匹配console.log，并做一个替换
    source = source.replace(reg, "")
    return source;
}