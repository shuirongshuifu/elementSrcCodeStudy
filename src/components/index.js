import Vue from "vue";

// 引入各个封装的组件
import MyMessage from "./myMessage/index";
import myBadge from "./myBadge/index";
import myTabs from "./myTabs/index";
import myTabContent from "./myTabContent/index";
import myCard from "./myCard/index";
import myDivider from "./myDivider/index";
import myTag from "./myTag/index";
import myBread from "./myBread/index";
import myBreadItem from "./myBreadItem/index";
import myTimeline from "./myTimeline/index";
import myTimelineItem from "./myTimelineItem/index";
import myLink from "./myLink/index";
import myFold from "./myFold/index";
import myFoldItem from "./myFoldItem/index";
import mySwitch from "./mySwitch/index";
import myTooltip from "./myTooltip/index";
import myDrawer from "./myDrawer/index";
import myDialog from "./myDialog/index";
import myTrend from "./myTrend/index";
import myBack from "./myBack/index";
import myProgress1 from "./myProgress1/index";
import myRightMenu from "./myRightMenu/index";
import myTree from "./myTree/index";
import myButton from "./myButton/index";
import myButtonGroup from "./myButtonGroup/index";
import myText1 from "./myText1/index";
import myText2 from "./myText2/index";


// 将各个封装的组件使用一个数组保存，便于统一注册
const components = [
    MyMessage,
    myBadge,
    myTabs,
    myTabContent,
    myCard,
    myDivider,
    myTag,
    myBread,
    myBreadItem,
    myTimeline,
    myTimelineItem,
    myLink,
    myFold,
    myFoldItem,
    mySwitch,
    myTooltip,
    myDrawer,
    myDialog,
    myTrend,
    myBack,
    myProgress1,
    myRightMenu,
    myTree,
    myButton,
    myButtonGroup,
    myText1,
    myText2
]

// 使用定义注册函数
const installComponents = function (Vue) {
    // 遍历注册组件
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
    // 原型链注册
    Vue.prototype.$myMessage = MyMessage;
}

// 调用注册函数，去统一注册组件
installComponents(Vue)

// 分别暴露、便于引入使用
export {
    MyMessage,
    myBadge
} 