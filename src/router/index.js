import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routeArr from "./routeArr";

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: "/",
            component: resolve => require(['@/views/Home.vue'], resolve),
        },
        ...routeArr
    ]
})
export default router