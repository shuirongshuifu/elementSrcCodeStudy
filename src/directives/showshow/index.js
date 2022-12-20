export default {
    // bind函数一般用来做初始化数据，也可以绑定事件什么的
    bind(el, binding, vnode) {
        // console.log(el, binding.value, vnode);
        // el参数是当前使用指令的元素，bind参数是指令绑定的数据，vnode是虚拟dom
        const flag = binding.value // 找到组件中绑定的标识
        if (flag == false) {
            el.style.display = 'none'
        } else {
            el.style.display = 'inline-block'
        }
    },
    // inserted函数是在元素插入dom节点调用
    inserted(el, binding, vnode) { },
    // update和componentUpdated都是更新使用，但是前者更加常用些，oldVnode参数只有在这两个钩子中才会有
    componentUpdated(el, binding, vnode, oldVnode) { },
    update(el, binding, vnode, oldVnode) {
        const flag = binding.value
        if (flag == false) {
            el.style.display = 'none'
        } else {
            el.style.display = 'inline-block'
        }
    },
    // unbind解绑时候使用，比如用来移除第一个bind函数中绑定的事件
    unbind(el, binding, vnode) { }

}