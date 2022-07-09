import Vue from 'vue';
import noticeComponent from './src/index.vue'
let NoticeConstructor = Vue.extend(noticeComponent); // 引入一个notice构造器，方便new之

let instance = null
let count = 0

const Notice = function (options) {
    count = count + 1
    instance = new NoticeConstructor({
        data: options,
        propsData: {
            count: count,
            cutCount: cutCount
        },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.isShowNotice = true;
    return instance;
}

function cutCount() {
    count = count - 1
    let noticeBoxDomList = document.querySelectorAll('.noticeBox')
    for (let i = 0; i < noticeBoxDomList.length; i++) {
        let dom = noticeBoxDomList[i]
        dom.style['top'] = parseInt(dom.style['top']) - 60 + 'px'
    }
}

Vue.prototype.$notice = Notice; // 挂载在vue原型上，方便this.$notice调用