import Vue from "vue";
/**
 * 引入各个封装的组件
 * */
import MyMessage from "./myMessage/index";

Vue.prototype.$myMessage = MyMessage; // 挂载在vue原型上，方便this.$myMessage调用
export default MyMessage // 暴露出去，需要用的地方直接引入既可