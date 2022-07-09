import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routeArr from "./routeArr";

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: "/",
            redirect: "/myMessage",
        },
        ...routeArr
    ]
})
export default router