// 引入vue
import Vue from 'vue'

// 引入loading组件
import dialog from './load';

// 通过Vue的extend方法继承这个引入的dialog组件，继承后会返回一个vue子类，需要使用实例化即可
const Dialog = Vue.extend(dialog);

//创建实例并且挂载到一个div上
const app = new Dialog().$mount(document.createElement('div'))

// 打开弹框函数
function showDialog(options) {
    //初始化调用传递过来的参数赋值更改组件内内部值
    for (let key in options) {
        app[key] = options[key];
    }
    // 让其显示
    app.showLoading = true
    // 并将其插入body中
    document.body.appendChild(app.$el);
}

// 关闭弹框函数
function hideDialog() {
    // 因为是v-if去控制，所以将标识showLoading置为false，就会自动把弹框dom删掉
    app.showLoading = false
}

// 将打开函数和关闭函数都挂载到Vue原型上，方便我们调用
Vue.prototype.$showDialog = showDialog;
Vue.prototype.$hideDialog = hideDialog;