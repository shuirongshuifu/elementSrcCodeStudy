function setStrongWater(str1, str2) {
    let id = 'waterMarkingId'

    // 创建画布，指定宽高
    let can = document.createElement('canvas')
    can.width = 240
    can.height = 120

    // 画画
    let cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180) // 水印旋转角度
    cans.font = '20px 楷体'
    cans.fillStyle = '#333'
    cans.textAlign = 'center'
    cans.textBaseline = 'Middle'
    cans.fillText(str1, can.width / 2, can.height) // 水印在画布的位置x，y轴
    cans.fillText(str2, can.width / 2, can.height + 22)

    // 将画当做大div的背景图，即可出现水印
    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.opacity = '0.16'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

// 一个简单的监听函数
function watch(obj, cb) {
    if (Object.prototype.toString.call(obj) != '[object Object]') {
        console.error('watch函数仅监听对象类型的数据变化,基本数据类型请再加一层')
        return
    }
    for (const key in obj) {
        let val = obj[key] // 要存一份原有的旧值
        Object.defineProperty(obj, key, {
            get() {
                return val
            },
            set(newVal) {
                cb(newVal, val) // 当修改时把新旧值再通过函数抛出即可
                val = newVal
            }
        })
    }
}

let ob = null
let depObj = {
    flag: false // 依赖标识
}

setStrongWater("此网页水印", "直接删除不掉");

ob = new MutationObserver((records) => {
    // 因为是记录数组，所以遍历每一项
    for (const record of records) {
        // 说明是删除dom操作
        if (record.removedNodes.length > 0) {
            for (const dom of record.removedNodes) {
                if (dom.tagName == "DIV") {
                    if (dom.id == "waterMarkingId") {
                        depObj.flag = !depObj.flag;
                        return;
                    }
                }
            }
        }
        // 说明是修改dom操作，如更改wmDom的透明度为0
        if (record.target.tagName == "DIV") {
            if (record.target.id == "waterMarkingId") {
                depObj.flag = !depObj.flag;
                return;
            }
        }
    }
});

ob.observe(document.querySelector("body"), {
    childList: true, // 监控所有子元素
    attributes: true, // 监控属性是否发生变化
    subtree: true, // 子树监控
});

watch(depObj, (newVal) => {
    setStrongWater("此网页水印", "直接删除不掉");
})


