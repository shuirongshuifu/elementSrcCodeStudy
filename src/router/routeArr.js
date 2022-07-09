const routeArr = [
    {
        path: "/myMessage",
        component: resolve => require(['@/views/myMessage.vue'], resolve),
    },
    {
        path: "/myBadge",
        component: resolve => require(['@/views/myBadge.vue'], resolve),
    },
    {
        path: "/myTabs",
        component: resolve => require(['@/views/myTabs.vue'], resolve),
    },
    {
        path: "/myTooltip",
        component: resolve => require(['@/views/myTooltip.vue'], resolve),
    },
]

export default routeArr