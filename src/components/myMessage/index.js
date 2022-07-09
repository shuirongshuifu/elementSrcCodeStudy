import Vue from 'vue';
import messageComponent from './src/index.vue'
let MessageConstructor = Vue.extend(messageComponent); // 引入一个message构造器，方便new之

let instance = null
let count = 0

const MyMessage = function (options) {
    if (options.duration & typeof options.duration !== 'number') { // 对于数字类型的校验
        console.error('Error! duration Must be a numeric type ')
        return
    }
    count = count + 1
    instance = new MessageConstructor({
        data: options,
        propsData: {
            count: count,
            cutCount: cutCount
        },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.isShowMyMessage = true;
    return instance;
}

function cutCount() {
    count = count - 1
    let messageBoxDomList = document.querySelectorAll('.messageBox')
    for (let i = 0; i < messageBoxDomList.length; i++) {
        let dom = messageBoxDomList[i]
        dom.style['top'] = parseInt(dom.style['top']) - 60 + 'px'
    }
}

export default MyMessage