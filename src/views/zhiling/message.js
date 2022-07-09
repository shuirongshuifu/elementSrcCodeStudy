import MessageComponent from './Message.vue';
import Vue from 'vue';
// 单例模式
let instance;
let getVueInstance = () => {
    instance = new Vue({
        render: h => h(MessageComponent)
    }).$mount();
    document.body.appendChild(instance.$el);

}
const Message = {
    success(options) {
        !instance && getVueInstance()
        instance.$children[0].add({
            ...options,
            type: 'success'
        })
    },
    warning(options) {
        !instance && getVueInstance()
        instance.$children[0].add({
            ...options,
            type: 'warning'
        })
    },
    error(options) {
        !instance && getVueInstance()
        instance.$children[0].add({
            ...options,
            type: 'error'
        })
    }
}

export {
    Message
}
export default {
    install(_Vue) {
        // alert('install')
        console.log('install')
        // 1 注册全局组件
        // 2 注册全局指令
        // 3 全局上添加方法或属性
        const $message = {}
        Object.keys(Message).forEach(key => {
            $message[key] = Message[key]
        })
        Vue.prototype.$message = $message
    }
}