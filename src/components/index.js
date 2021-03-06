import Vue from "vue";

// 引入各个封装的组件
import MyMessage from "./myMessage/index";
import myBadge from "./myBadge/index";
import myTabs from "./myTabs/index";
import myTabContent from "./myTabContent/index";
import myCard from "./myCard/index";
import myDivider from "./myDivider/index";

// 将各个封装的组件使用一个数组保存，便于统一注册
const components = [
    MyMessage,
    myBadge,
    myTabs,
    myTabContent,
    myCard,
    myDivider
]

// 使用定义注册函数
const installComponents = function (Vue) {
    // 遍历注册组件
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
    // 原型链注册
    Vue.prototype.$myMessage = MyMessage;
}

// 调用注册函数，去统一注册组件
installComponents(Vue)

// 分别暴露、便于引入使用
export {
    MyMessage,
    myBadge
} 