export default {
    // bind函数初始化
    bind(el, binding, vnode) { },
    // inserted函数是在元素插入dom节点调用
    inserted(el, binding, vnode) {  // el参数是当前使用指令的元素，bind参数是指令绑定的数据，vnode是虚拟dom
        // 将copyFn函数挂在el身上方便使用
        el.copyFn = () => {
            // console.log('点击的是哪个DOM', el);
            //创建选中范围
            var range = document.createRange();

            // 选择点击的这个dom
            range.selectNode(el);

            //移除剪切板中内容，不添加这个语句的话，在ie和Edge中复制不到
            window.getSelection().removeAllRanges();

            //将el中的文字内容复制到剪切板
            window.getSelection().addRange(range);

            // 开启复制粘贴功能
            let flag = document.execCommand('copy');

            // 需注意兼容性问题
            flag ? alert('复制成功，可以粘贴啦') : alert('当前浏览器不支持一键复制功能，请手动复制粘贴')
        }
        el.addEventListener('click', el.copyFn)
    },
    // update和componentUpdated都是更新使用，但是前者更加常用些
    // oldVnode参数只有在这两个钩子中才会有，更新以后才会有更新前和更新后的DOM
    componentUpdated(el, binding, vnode, oldVnode) {
        // console.log('componentUpdated');
    },
    update(el, binding, vnode, oldVnode) {
        // console.log('update');
    },
    // unbind解绑时候使用，比如用来移除第一个bind函数中绑定的事件
    unbind(el, binding, vnode) {
        el.removeEventListener('click', el.copyFn)
    }
}