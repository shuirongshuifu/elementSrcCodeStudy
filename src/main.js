import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false // 关闭提示

import "./common/css/reset.css"; //引入重置样式表

import ElementUI from 'element-ui'; //引入饿了么包
import 'element-ui/lib/theme-chalk/index.css'; //引入饿了么样式
Vue.use(ElementUI); // 使用饿了么插件包

import router from './router/index' // 引入路由便于使用

import store from "./store"; // vuex

import './components/index'; // 引入各个组件用于使用
import './otherComponents/load/index.js'

import install from './directives' // 引入并使用自定义指令
Vue.use(install)

import VueWorker from 'vue-worker' // Web worker插件
Vue.use(VueWorker)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')