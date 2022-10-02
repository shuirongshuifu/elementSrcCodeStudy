const routeArr = [
    {
        path: "/clickTableCanEdit",
        component: resolve => require(['@/views/otherViews/clickTableCanEdit.vue'], resolve),
    },
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
        path: "/myCard",
        component: resolve => require(['@/views/myCard.vue'], resolve),
    },
    {
        path: "/myTooltip",
        component: resolve => require(['@/views/myTooltip.vue'], resolve),
    },
    {
        path: "/myDivider",
        component: resolve => require(['@/views/myDivider.vue'], resolve),
    },
    {
        path: "/myTag",
        component: resolve => require(['@/views/myTag.vue'], resolve),
    },
    {
        path: "/myBread",
        component: resolve => require(['@/views/myBread.vue'], resolve),
    },
    {
        path: "/myTimeline",
        component: resolve => require(['@/views/myTimeline.vue'], resolve),
    },
    {
        path: "/myLink",
        component: resolve => require(['@/views/myLink.vue'], resolve),
    },
    {
        path: "/myFold",
        component: resolve => require(['@/views/myFold.vue'], resolve),
    },
    {
        path: "/mySwitch",
        component: resolve => require(['@/views/mySwitch.vue'], resolve),
    },
    {
        path: "/myDrawer",
        component: resolve => require(['@/views/myDrawer.vue'], resolve),
    },
]

export default routeArr