/**
 * 使用：
 *      给el-dialog加上v-dragElDialog即可
 *      若是自定义封装的弹框，也是同理，更改一下选择器的class即可
 * */ 
export default {
    bind(el, binding, vnode) {
        // 当鼠标在弹框头部时，更改鼠标样式
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        dialogHeaderEl.style.cssText += ';cursor:move;'

        // 拖拽的dom元素是弹框
        const dragDom = el.querySelector('.el-dialog')
        dragDom.style.cssText += ';top:0px;'

        // 定义一个获取原有属性的函数
        const getStyle = (function () {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr] // ie的dom元素.currentStyle
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr] // 火狐谷歌的window.getComputedStyle(dom元素, null)
            }
        })()

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            const dragDomWidth = dragDom.offsetWidth
            const dragDomHeight = dragDom.offsetHeight

            const screenWidth = document.body.clientWidth
            const screenHeight = document.body.clientHeight

            const minDragDomLeft = dragDom.offsetLeft
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

            const minDragDomTop = dragDom.offsetTop
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

            // 获取到的值带px 正则匹配替换
            let styL = getStyle(dragDom, 'left')
            let styT = getStyle(dragDom, 'top')

            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
            } else {
                styL = +styL.replace(/\px/g, '')
                styT = +styT.replace(/\px/g, '')
            }

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                let left = e.clientX - disX
                let top = e.clientY - disY

                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -minDragDomLeft
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft
                }

                if (-(top) > minDragDomTop) {
                    top = -minDragDomTop
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

                // emit onDrag event
                vnode.child.$emit('dragDialog') // important write methods
            }

            // 松开鼠标便重置
            document.onmouseup = function (e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}