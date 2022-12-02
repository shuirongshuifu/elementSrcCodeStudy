const routeArr = [
    {
        path: "/clickTableCanEdit",
        name: "双击编辑表格",
        component: resolve => require(['@/views/otherViews/clickTableCanEdit.vue'], resolve),
    },
    {
        path: "/myMessage",
        name: "消息提示",
        component: resolve => require(['@/views/myMessage.vue'], resolve),
    },
    {
        path: "/myBadge",
        name: '标记',
        component: resolve => require(['@/views/myBadge.vue'], resolve),
    },
    {
        path: "/myTabs",
        name: 'tab切换',
        component: resolve => require(['@/views/myTabs.vue'], resolve),
    },
    {
        path: "/myCard",
        name: '卡片',
        component: resolve => require(['@/views/myCard.vue'], resolve),
    },
    {
        path: "/myTooltip",
        name: '小气泡提示',
        component: resolve => require(['@/views/myTooltip.vue'], resolve),
    },
    {
        path: "/myDivider",
        name: '分割线',
        component: resolve => require(['@/views/myDivider.vue'], resolve),
    },
    {
        path: "/myTag",
        name: 'tag标签',
        component: resolve => require(['@/views/myTag.vue'], resolve),
    },
    {
        path: "/myBread",
        name: '面包屑',
        component: resolve => require(['@/views/myBread.vue'], resolve),
    },
    {
        path: "/myTimeline",
        name: '时间线',
        component: resolve => require(['@/views/myTimeline.vue'], resolve),
    },
    {
        path: "/myLink",
        name: '链接',
        component: resolve => require(['@/views/myLink.vue'], resolve),
    },
    {
        path: "/myFold",
        name: '折叠',
        component: resolve => require(['@/views/myFold.vue'], resolve),
    },
    {
        path: "/mySwitch",
        name: '切换按钮',
        component: resolve => require(['@/views/mySwitch.vue'], resolve),
    },
    {
        path: "/myDrawer",
        name: '抽屉',
        component: resolve => require(['@/views/myDrawer.vue'], resolve),
    },
    {
        path: "/myDialog",
        name: '弹框',
        component: resolve => require(['@/views/myDialog.vue'], resolve),
    },
]

export default routeArr