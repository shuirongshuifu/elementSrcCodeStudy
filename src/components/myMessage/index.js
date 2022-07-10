import Vue from 'vue';
import messageComponent from './src/index.vue' // 引入组件，方便继承
let MessageConstructor = Vue.extend(messageComponent); // 引入一个message构造器，方便new之

let instance = null // 定义组件实例
let count = 0 // 定义统计次数，便于知道创建多少个实例

const MyMessage = function (options) {
    if (options.duration & typeof options.duration !== 'number') { // 对于duration数字类型的校验
        console.error('Error! duration Must be a numeric type ') // 用户乱传递非数字类型参数，就抛错不执行后续代码
        return
    }
    count = count + 1 // MyMessage函数调用一次，统计次数加一个
    instance = new MessageConstructor({ // 实例化一个组件实例
        data: options, // data传参数，组件的data接收（即传递配置项）
        propsData: { // propsData传参，
            count: count, // 将统计的次数传递给子组件
            cutCount: cutCount // 传递一个函数，当MyMessage消失的时候，通知外界
        },
    });
    instance.$mount(); // 实例组件挂载
    document.body.appendChild(instance.$el); // 把这个组件实例的dom元素，追加到document文档中
    instance.isShowMyMessage = true; // 将组件的isShowMyMessage属性值置为true，即让实例出现，即消息出现
    return instance; // MyMessage函数执行一次，就会返回一个加工好的实例对象
}

function cutCount() { // 当message消失一个
    count = count - 1 // 就把外界统计的数量减少一个
    let messageBoxDomList = document.querySelectorAll('.messageBox') // 然后选中所有的messageDOM元素
    for (let i = 0; i < messageBoxDomList.length; i++) { // 遍历一下这个DOM伪数组
        let dom = messageBoxDomList[i] // 所有的都往上移动60像素
        dom.style['top'] = parseInt(dom.style['top']) - 60 + 'px'
    }
}

export default MyMessage // 暴露出去