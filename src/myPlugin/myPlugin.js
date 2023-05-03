/**
 * 官方文档：https://webpack.docschina.org/contribute/writing-a-plugin/
 * 
 * webpack的插件固定格式和注意事项
 *      1. 是一个类class（构造函数），使用的时候new一下就行了
 *      2. 这个类中有一个固定的函数名字叫做apply
 *      3. apply函数中的参数compiler是webpack引擎中的compiler对象
 *      4. 这个对象身上有很多的api（参见compiler打印结果）可以进行供我们调用，从而影响打包结果
 *      5. 即：通过插件去控制打包的结果
 * */
class myPlugin {
    constructor(options) { // constructor构造函数接收new myPlugin(params)时传递的参数params
        console.log("我是new这个类时所传递的参数-->", options);
    }
    apply(compiler) {
        // console.log('^_^', compiler) // 上面有非常多api，可供使用（参见compiler打印结果）
        compiler.hooks.emit.tapAsync('lss',(compliation,cb)=>{
            console.log('compliation',compliation.assets);
            const content=`
                - 生活不易
                - 打工仔加油努力
                - 奥利给
                - 😄😄😄 
            `
            compliation.assets['AOLIGEI.md'] = {
                size() { 
                    return content.length 
                },
                source: function () {
                    return content
                }
            }
            cb()
        })
    }
}

module.exports = myPlugin