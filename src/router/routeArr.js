const routeArr = [
    {
        path: "/myButton",
        name: 'myButtonName',
        component: resolve => require(['@/views/myButton.vue'], resolve),
        meta: {
            title: '按钮',
            keepAlive: false,
        }
    },
    {
        path: "/myMessage",
        name: "myMessageName",
        component: resolve => require(['@/views/myMessage.vue'], resolve),
        meta: {
            title: "消息提示",
            keepAlive: true,
        }
    },
    {
        path: "/myBadge",
        name: 'myBadgeName',
        component: resolve => require(['@/views/myBadge.vue'], resolve),
        meta: {
            title: "标记",
            keepAlive: false,
        }
    },
    {
        path: "/myTabs",
        name: 'myTabsName',
        component: resolve => require(['@/views/myTabs.vue'], resolve),
        meta: {
            title: 'tab切换',
            keepAlive: false,
        }
    },
    {
        path: "/myCard",
        name: 'myCardName',
        component: resolve => require(['@/views/myCard.vue'], resolve),
        meta: {
            title: '卡片',
            keepAlive: false,
        }
    },
    {
        path: "/myTooltip",
        name: 'myTooltipName',
        component: resolve => require(['@/views/myTooltip.vue'], resolve),
        meta: {
            title: '小气泡提示',
            keepAlive: false,
        }
    },
    {
        path: "/myDivider",
        name: 'myDividerName',
        component: resolve => require(['@/views/myDivider.vue'], resolve),
        meta: {
            title: '分割线',
            keepAlive: false,
        }
    },
    {
        path: "/myTag",
        name: 'myTagName',
        component: resolve => require(['@/views/myTag.vue'], resolve),
        meta: {
            title: 'tag标签',
            keepAlive: false,
        }
    },
    {
        path: "/myBread",
        name: 'myBreadName',
        component: resolve => require(['@/views/myBread.vue'], resolve),
        meta: {
            title: '面包屑',
            keepAlive: false,
        }
    },
    {
        path: "/myTimeline",
        name: 'myTimelineName',
        component: resolve => require(['@/views/myTimeline.vue'], resolve),
        meta: {
            title: '时间线',
            keepAlive: false,
        }
    },
    {
        path: "/myLink",
        name: 'myLinkName',
        component: resolve => require(['@/views/myLink.vue'], resolve),
        meta: {
            title: '链接',
            keepAlive: false,
        }
    },
    {
        path: "/myFold",
        name: 'myFoldName',
        component: resolve => require(['@/views/myFold.vue'], resolve),
        meta: {
            title: '手风琴',
            keepAlive: false,
        }
    },
    {
        path: "/mySwitch",
        name: 'mySwitchName',
        component: resolve => require(['@/views/mySwitch.vue'], resolve),
        meta: {
            title: '切换按钮',
            keepAlive: false,
        }
    },
    {
        path: "/myDrawer",
        name: 'myDrawerName',
        component: resolve => require(['@/views/myDrawer.vue'], resolve),
        meta: {
            title: '抽屉',
            keepAlive: false,
        }
    },
    {
        path: "/myDialog",
        name: 'myDialogName',
        component: resolve => require(['@/views/myDialog.vue'], resolve),
        meta: {
            title: '弹框',
            keepAlive: false,
        }
    },
    {
        path: "/myTrend",
        name: 'myTrendName',
        component: resolve => require(['@/views/myTrend.vue'], resolve),
        meta: {
            title: '趋势标识',
            keepAlive: false,
        }
    },
    {
        path: "/myBack",
        name: 'myBackName',
        component: resolve => require(['@/views/myBack.vue'], resolve),
        meta: {
            title: '回到顶部',
            keepAlive: false,
        }
    },
    {
        path: "/myProgress1",
        name: 'myProgress1Name',
        component: resolve => require(['@/views/myProgress1.vue'], resolve),
        meta: {
            title: '横线进度条',
            keepAlive: false,
        }
    },
    {
        path: "/myRightMenu",
        name: 'myRightMenuName',
        component: resolve => require(['@/views/myRightMenu.vue'], resolve),
        meta: {
            title: '右键菜单',
            keepAlive: false,
        }
    },
    {
        path: "/myTree",
        name: 'myTreeName',
        component: resolve => require(['@/views/myTree.vue'], resolve),
        meta: {
            title: '树组件',
            keepAlive: false,
        }
    },
    {
        path: "/myDirectives",
        name: 'myDirectivesName',
        component: resolve => require(['@/views/myDirectives.vue'], resolve),
        meta: {
            title: '自定义指令',
            keepAlive: false,
        }
    },
    {
        path: "/clickTableCanEdit",
        name: "clickTableCanEditName",
        component: resolve => require(['@/views/otherViews/clickTableCanEdit.vue'], resolve),
        meta: {
            title: "双击编辑表格",
            keepAlive: true,
        }
    },
    {
        path: "/myLoad",
        name: 'myLoadName',
        component: resolve => require(['@/views/myLoad.vue'], resolve),
        meta: {
            title: '加载中',
            keepAlive: false,
        }
    },
    {
        path: "/myDrag",
        name: 'dragName',
        component: resolve => require(['@/views/myDrag.vue'], resolve),
        meta: {
            title: '拖拽',
            keepAlive: false,
        }
    },
    {
        path: "/myText",
        name: 'myTextName',
        component: resolve => require(['@/views/myText.vue'], resolve),
        meta: {
            title: '文本滚动',
            keepAlive: false,
        }
    },
    {
        path: "/myWork",
        name: 'myWorkName',
        component: resolve => require(['@/views/myWork.vue'], resolve),
        meta: {
            title: '前端多线程',
            keepAlive: false,
        }
    },
    {
        path: "/imgLazyload",
        name: 'imgLazyloadName',
        component: resolve => require(['@/views/imgLazyload.vue'], resolve),
        meta: {
            title: '图片懒加载',
            keepAlive: false,
        }
    },
    {
        path: "/bigData",
        name: 'bigDataName',
        component: resolve => require(['@/views/bigData.vue'], resolve),
        meta: {
            title: '十万条数据',
            keepAlive: false,
        }
    },
    {
        path: "/codeLight",
        name: 'codeLightName',
        component: resolve => require(['@/views/codeLight.vue'], resolve),
        meta: {
            title: '代码高亮',
            keepAlive: false,
        }
    },
    {
        path: "/WebSocket",
        name: 'WebSocketName',
        component: resolve => require(['@/views/WebSocket.vue'], resolve),
        meta: {
            title: 'WebSocket',
            keepAlive: false,
        }
    },
    {
        path: "/dnsPrefetch",
        name: 'dnsPrefetchName',
        component: resolve => require(['@/views/dnsPrefetch.vue'], resolve),
        meta: {
            title: 'DNS预解析',
            keepAlive: false,
        }
    },
]

export default routeArr