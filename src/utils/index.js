import Vue from "vue";

// 判断是手机还是电脑
export function IsPhone() {
    //获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
    var info = navigator.userAgent;
    //通过正则表达式的test方法判断是否包含“Mobile”字符串
    var isPhone = /mobile/i.test(info);
    //如果包含“Mobile”（是手机设备）则返回true
    return isPhone;
}

// 原型注册便于访问
Vue.prototype.IsPhone = IsPhone