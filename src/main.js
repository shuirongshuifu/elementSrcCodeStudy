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

import VueLazyload from 'vue-lazyload'  // 引入vue-lazyload插件
const loadimage = require('./assets/imgLazyload/loading.gif')
const errorimage = require('./assets/imgLazyload/error.gif')
Vue.use(VueLazyload, {
    preLoad: 1.3,  // 加载区域，图片在当前满屏1 再加上往下走的30%的位置的都加载出来
    error: errorimage.default,  // 加载错误时显示图片
    loading: loadimage.default, // 加载中显示图片
    attempt: 3  // 下载图片错误时重连次数
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')