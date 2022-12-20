// 引入各个自定义指令
import waves from "./waves";
import copy from "./copy";
import showshow from "./showshow";

// 自定义指令对象，用于遍历注册
const directives = {
    waves,
    copy,
    showshow
}

// 批量注册指令并暴露到main.js中去便于注册
export default {
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            Vue.directive(key, directives[key])
        })
    }
}