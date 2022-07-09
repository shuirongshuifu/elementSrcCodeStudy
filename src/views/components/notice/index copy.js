import Vue from 'vue';
import noticeComponent from './src/index.vue'
let NoticeConstructor = Vue.extend(noticeComponent); // 引入一个notice构造器，方便new之

let instance = null
let count = 0
let instanceArr = []

const Notice = function (options) {
    console.log('执行了吗');
    count = count + 1
    instance = new NoticeConstructor({
        data: options,
        propsData: {
            countId: count,
            cutCount: cutCount
        },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    let itemOffset = 20 // 实例的初始偏移量为20
    instanceArr.forEach((item) => {
        // 偏移量高度累加，再加上12是为了留有间隙
        itemOffset = item.$el.offsetHeight + itemOffset + 12
    })
    instance.controlTopOffset = itemOffset
    instanceArr.push(instance)
    instance.isShowNotice = true;
    return instance;
}

function cutCount(countId) {
    // 第一步，删除对应数组中的实例
    for (let j = 0; j < instanceArr.length; j++) {
        let itemDom = instanceArr[j].$el
        if (itemDom.countId == countId) {
            instanceArr.splice(j, 1)
        }
    }
    // 第二步，重新计算位置往上移动
    for (let i = 0; i < instanceArr.length - 1; i++) {
        let itemDom = instanceArr[i].$el
        itemDom.style['top'] = parseInt(itemDom.style['top']) - 54 + "px"
        // console.log('每一项', itemDom);
    }
}

Vue.prototype.$notice = Notice; // 挂载在vue原型上，方便this.$notice调用