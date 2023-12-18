import { debounce } from "lodash";
export default {
    inserted(el, binding, vnode) {
        // 获取滚动容器dom
        let scrollWrap = el.querySelector('.el-select-dropdown .el-scrollbar .el-select-dropdown__wrap')
        // 把监听的句柄防抖一下
        const handle = debounce((e) => {
            let scrollDistance = scrollWrap.scrollHeight - scrollWrap.scrollTop
            // 比如此处预留6个像素的位置用于触底
            if (scrollWrap.clientHeight + 6 > scrollDistance) {
                binding.value() // 触底通知一下，外界
            }
        }, 170)
        // 绑定监听滚动事件
        scrollWrap?.addEventListener('scroll', handle)
        // 把监听的句柄挂载到元素身上便于解绑时使用
        el._hanlde = handle
    },
    unbind(el) {
        // 获取滚动容器dom
        let scrollWrap = el.querySelector('.el-select-dropdown .el-scrollbar .el-select-dropdown__wrap')
        // 解绑
        scrollWrap?.removeEventListener('scroll', el._hanlde)
        // 清空
        delete el._hanlde;
    }
}
