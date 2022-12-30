import router from "@/router/index.js";

const state = {
    // 所有到访过的视图
    visitedViews: [],
    // 缓存的视图，根据组件的name属性匹配，默认有几个缓存几个
    cachedViews: [],
    isShowTags: true // 是否展示tags
};

const mutations = {
    ADD_VIEW(state, newRoute) {
        /**
         * 处理到访过的所有路由
         * */
        // 看看是否存在，存在的就不能重复添加了，不存在的需要丢进去
        let isExist1 = state.visitedViews.some((item) => {
            return newRoute.name == item.name
        })
        // 不存在的才丢进去，存在的说明重复了，忽略
        if (!isExist1) {
            state.visitedViews.push({
                path: newRoute.path,
                name: newRoute.name,
                title: newRoute.meta.title
            })
        }
        /**
         * 处理到访过的所有路由中需要缓存的路由
         * */
        let isExist2 = state.cachedViews.includes(newRoute.name)
        // 不存在的且，规则keepAlive值为true需要缓存的才丢进去
        if (!isExist2 & newRoute.meta.keepAlive) {
            state.cachedViews.push(newRoute.name)
        }
        /**
         * visitedViews数组要多存点信息，因为需要展示和跳转
         * cachedViews数组只需要存组件的name信息即可，主要是用于告知
         * keep-alive :include="cachedViews" 是否缓存
         * */
    },
    DELETE_VIEW(state, { name, isCurrent }) {
        /**
         * 1. visitedViews需要删除（能直观看到）
         * */
        let i = state.visitedViews.findIndex((item) => {
            return item.name == name
        })
        // 删的不是当前，就正常删除，是当前页面就需要判断一下
        if (isCurrent) {
            // 首页不可删，这里的i为0 指的是第一项
            if (i == 0) {
                router.push({ path: "/" })
            } else {
                // 不是第一项的就往前走一下
                router.push({
                    path: state.visitedViews[i - 1].path
                })
            }
        }
        state.visitedViews.splice(i, 1)
        /**
         * 2. cachedViews也需要删除（需借助工具看到）
         * */
        let isInner = state.cachedViews.includes(name)
        // 看看删除的这个是否在缓存视图中
        if (isInner) { // 是的话，就找到并删除
            let j = state.cachedViews.findIndex((item) => {
                return item == name
            })
            state.cachedViews.splice(j)
        }

    },
    DELETE_ALLVIEW(state) {
        state.visitedViews = []
        state.cachedViews = []
        router.replace({
            path: '/'
        })
    },
    DELETE_OTHERVIEW(state, { name }) {
        /**
         * 1. 关闭除visitedViews数组中除自己以外的数据
         * */
        let i = state.visitedViews.findIndex((item) => {
            return item.name == name
        })
        let keepObj = { ...state.visitedViews[i] } // 拷贝一份
        state.visitedViews = [keepObj] // 清空，并只保留这一份
        router.push({ path: keepObj.path }) // 并跳转到这一份路由中
        /**
         * 2. 若自己不在cachedViews缓存中，直接清空缓存
         *    若自己在缓存中，将缓存中除了自己以外的都清掉
         * */
        if (state.cachedViews.includes(name)) { // 包含只保留自己
            state.cachedViews = [name]
        } else {
            state.cachedViews = [] // 不包含直接清空
        }
    }
}

const actions = {
    add_view({ commit }, newRoute) {
        commit("ADD_VIEW", newRoute);
    },
    delete_view({ commit }, name) {
        commit("DELETE_VIEW", name);
    },
    delete_allview({ commit }) {
        commit("DELETE_ALLVIEW")
    },
    delete_otherview({ commit }, name) {
        commit("DELETE_OTHERVIEW", name)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};