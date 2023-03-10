
// let loadimage = "http://ashuai.work:10000/imgGifSrc/loading.gif" // 服务器加载中图片
// let errorimage = "http://ashuai.work:10000/imgGifSrc/error.gif" // 服务器加载中图片

let loadimage = require('../../assets/imgLazyload/loading.gif')  // 本地加载中图片
let errorimage = require('../../assets/imgLazyload/error.gif')  // 本地加载失败图片

export default {
    inserted(el, binding, vnode) { 
        // 1. 先让图片显示加载中...
        el.src = loadimage.default 
        // 2. 实例化一个：观察检测者
        const observer = new IntersectionObserver((entries) => {
            // 4. 在观察监测者的对应执行函数中获取到isIntersecting属性（是否交叉）
            let isIntersecting = entries[0].isIntersecting 
            // 5. 如果交叉了，就让其去加载对应src的真正的地址
            if (isIntersecting) { 
                el.src = binding.value
                // 6. 加载成功就不用管它
                el.onload = (res) => {
                    console.log('加载成功', res)
                }; 
                // 7. 加载失败了就去做一个错误图片的占位
                el.onerror = (err) => {
                    console.log('加载失败', err);
                    el.src = errorimage.default
                }
                // 8. 无论加载成功或失败，都停止观察任务了
                observer.unobserve(el)
            }
        })
        // 3. 让这个观察检测者去观察对应img标签图片
        observer.observe(el)
    },
}