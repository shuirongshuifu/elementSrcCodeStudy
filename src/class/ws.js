/**
 * class类编程，便于复用，当然也可以使用构造函数进行变成
 * 可以参见这篇文章：https://zhuanlan.zhihu.com/p/158956514
 * */
class myWebSocket {
    constructor(url) {
        // this.url = url || 'ws://localhost:10000/mySocketUrl' // 指定默认ws的地址
        this.url = url || 'ws://101.35.147.114:10000/mySocketUrl' // 指定默认ws的地址
        this.socket = null // 实例化的ws对象
        this.messageArr = [] // 接收服务端推送的消息数组
    }
    createFn() {
        if (!WebSocket) { // 打印：WebSocket ƒ WebSocket() { [native code] }
            console.error('当前浏览器不支持WebSocket')
            return
        }
        if (this.socket) {
            if (this.socket.readyState == 1) {
                console.warn('WebSocket已连接 不可重复连接')
                return
            }
        }

        try {
            this.socket = new WebSocket(this.url) // 生成WebSocket实例化对象

            // 连接开启
            this.socket.onopen = function (e) {
                console.log('连接成功')
            }
            // 连接错误
            this.socket.onerror = (e) => {
                console.error('连接错误', e)
                this.close()
            }
            // 消息通知
            this.socket.onmessage = (wsObj) => {
                console.log('--->', wsObj.data);
                this.messageArr.push(wsObj.data)
            }
        } catch (error) {
            console.error('出错了', error)
            this.socket = null
            this.closeFn()
        }

    }
    sendFn(msg) {
        if (!this.socket) {
            console.warn('WebSocket未连接 无法发消息')
            return
        }
        msg = msg || 'biubiubiu ^_^'
        this.socket.send(msg)
    }
    closeFn() {
        if (!this.socket) {
            console.warn('WebSocket未连接 不需要关闭')
            return
        }
        this.socket.close()
        this.socket = null
        this.messageArr = []
    }
}

export default myWebSocket