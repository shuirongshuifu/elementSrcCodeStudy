// 引入拆分的样式，便于自定义指令中使用
import './index.css'
export default {
    // 初始化绑定dom钩子函数
    bind(el, binding) {
        const target = el;
        // 传参类型判断变量控制
        let flag;
        let isObj;
        if (typeof binding.value == 'boolean') {
            flag = binding.value
            isObj = false
        }
        if (typeof binding.value == 'object') {
            flag = binding.value.value
            isObj = true
        }
        // 有dom元素才去做操作
        if (target) {
            // 父元素相对定位
            target.style.position = "relative";
            // 子元素遮罩层部分
            let loadChild = document.createElement("div");
            loadChild.className = "loadClass";

            // 创建文档碎片性能稍微优化一点点
            let fragment = document.createDocumentFragment()
            // 孙子元素1加载图标部分
            let iSun = document.createElement("i");
            iSun.className = isObj ? binding.value.icon : "el-icon-loading";
            // 孙子元素2文字提示部分
            let spanSun = document.createElement("span");
            spanSun.innerHTML = isObj ? binding.value.text : '加载中...'
            // 使用文档碎片将iSun和spanSun装起来
            fragment.appendChild(iSun);
            fragment.appendChild(spanSun);
            // 将文档碎片丢入子元素遮罩层内
            loadChild.appendChild(fragment);
            // 样式判断设置
            if (isObj) {
                loadChild.style.color = binding.value.color
                loadChild.style.backgroundColor = binding.value.bgColor
            }
            // 若为false，就隐藏
            if (!flag) {
                loadChild.classList.add('load-hide')
                loadChild.style.display = 'none'
            }

            // 父元素添加子元素遮罩层使用
            target.appendChild(loadChild);
        }
    },
    // dom组件更新操作控制显示和隐藏
    componentUpdated(el, binding, vnode, oldVnode) {
        let flag = typeof binding.value == 'boolean' ? binding.value : binding.value.value
        let loadChild = el.querySelector('.loadClass')
        if (flag) {
            loadChild.style.display = 'flex'
            setTimeout(() => {
                loadChild.classList.remove('load-hide')
            }, 0);
        } else {
            loadChild.classList.add('load-hide')
            setTimeout(() => {
                loadChild.style.display = 'none'
            }, 360);

        }
    },
}