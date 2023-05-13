/**  水印添加方法  */

const setWatermark = (str1, str2) => {
    let id = 'waterMarkingIdSimple'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    // 创建画布，指定宽高
    let can = document.createElement('canvas')
    can.width = 280
    can.height = 150

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
    div.style.opacity = '0.1'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

// 添加水印方法
export const setWaterMark = (str1, str2) => {
    let id = setWatermark(str1, str2)
    if (document.getElementById(id) === null) {
        id = setWatermark(str1, str2)
    }
}

// 移除水印方法
export const removeWatermark = () => {
    let id = 'waterMarkingIdSimple'
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }
}