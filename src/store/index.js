import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'

// require.context函数接受三个参数 1.读取的文件路径  2.是否遍历文件的子目录  3.匹配文件的正则
// 表示获取同级目录modules文件夹下的 所有 js文件（这样就不用一个个引入了）
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

// console.log('modules', modules)

const store = new Vuex.Store({
    modules, // 对象，key是文件名，value是相应内容
    getters
})

export default store
