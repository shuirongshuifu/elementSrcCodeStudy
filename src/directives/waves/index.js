// 引入拆分的样式，便于自定义指令中使用
import './index.css'
export default {
    bind(el, binding) {
        // 挂一个函数方便绑定和卸载
        el.waveFn = (e) => {
            const target = el; // 波纹作用的目标元素
            const targetBgColor = binding.value; // 波纹颜色（不传递就使用默认值）
            // 有dom元素才去做操作
            if (target) {
                target.style.position = "relative"; // 开启绝对定位，点击时的参照物（注释掉看效果明显）
                target.style.overflow = "hidden"; // 隐藏涟漪圆圈（注释掉看效果明显）
                const rect = target.getBoundingClientRect(); // 获取dom元素的位置和宽高：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
                let ripple = target.querySelector(".wavesRipple"); // 获取涟漪dom元素，一开始是没有的
                if (!ripple) {
                    // 既然没有，那咱就创建一个涟漪dom元素
                    ripple = document.createElement("span"); // 创建一个span标签作为涟漪dom元素
                    ripple.className = "wavesRipple"; // 原生js修改类名主要有三种方式：className、setAttribute()、和classList
                    ripple.style.height = Math.max(rect.width, rect.height) + "px"; // 宽高中谁的值大，就以谁为涟漪圆的直径
                    ripple.style.width = Math.max(rect.width, rect.height) + "px"; // Math.max()多个数据中取最大值
                    target.appendChild(ripple); // 将这个涟漪元素作为子元素追加到目标dom上
                } else {
                    ripple.className = "wavesRipple"; // 有的话也别忘了重新指定
                }
                // 计算涟漪dom的top距离值
                ripple.style.top =
                    (e.pageY -
                        rect.top -
                        ripple.offsetHeight / 2 -
                        document.documentElement.scrollTop || // 兼容写法 document.documentElement.scrollTop和document.body.scrollTop只有一个会生效
                        document.body.scrollTop) + "px";
                // 计算涟漪dom的left距离值
                ripple.style.left =
                    (e.pageX -
                        rect.left -
                        ripple.offsetWidth / 2 -
                        document.documentElement.scrollLeft ||
                        document.body.scrollLeft) + "px";
                ripple.style.backgroundColor = targetBgColor; // 设置背景色，不传color的话，就使用默认背景色
                ripple.className = "wavesRipple live";
            }
        }
        el.addEventListener("click", el.waveFn,
            false // 冒泡false，捕获true
        );
    },
    // unbind解绑时候使用，比如用来移除bind函数中绑定的监听事件
    unbind(el, binding, vnode) {
        el.removeEventListener('click', el.waveFn)
    }
}