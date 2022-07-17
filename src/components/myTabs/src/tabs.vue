<script>
import tabNav from "./tabNav.vue"; // 引入tab导航页组件
export default {
  name: "myTabs",
  components: { tabNav }, // 注册之
  props: {
    // 父组件用v-model传参，子组件须用value接参，方可接到v-model="activeName"绑定的activeName的值
    value: null, // 接收到的值即为当前高亮的是哪一项
    // 传递一个函数，作为tab切换的钩子函数
    beforeLeave: {
      // 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换
      type: Function,
      default: () => {
        return true; // 默认为true，始终允许切换tab
      },
    },
  },
  data() {
    return {
      tabItemArr: [], // 用于传递给tabNav组件信息数据的数组
      activeName: this.value, // 高亮的是哪个tab标签页选项卡
    };
  },
  mounted() {
    /**
     * 计算收集tab页内容信息，将需要用到的信息存在tabItemArr数组中
     * 并传递给tabNav组件，tabNav组件根据tabItemArr信息去v-for渲染有哪些
     * */
    this.calcTabItemInstances();
  },
  methods: {
    calcTabItemInstances() {
      // 重点方法
      // 获取使用的地方的my-tab标签中间的内容
      if (this.$slots.default) {
        // 收集my-tab标签中间的插槽内容数组
        let slotTabItemArr = this.$slots.default; // console.log("slotTabItemArr", slotTabItemArr);
        // 然后把这些数据交给tab-nav动态渲染
        this.tabItemArr = slotTabItemArr.map((item) => {
          return item.componentInstance; // 只保留componentInstance组件实例即可，可以理解为组件的this
        });
        // consoloe.log('this.tabItemArr',this.tabItemArr)
      } else {
        this.tabItemArr = []; // 没传递就置为空，当然需要规范使用组件，规范传递相关参数
      }
    },
    handleTabClick(tabItem) {
      this.$emit("tabClick", tabItem); // 通知父元素点击的是谁，是哪个tab-nav
      let newTabName = tabItem.name; // 获取传出来的最新的name名字
      this.setCurrentName(newTabName); // 执行更新方法
    },
    // 考虑到可能有异步操作，所以加上async await（比如在切换tab标签页之前，做一个问询）
    async setCurrentName(newTabName) {
      let oldTabName = this.activeName; // 要更新了，所以当下的就变成旧的了
      let res = await this.beforeLeave(newTabName, oldTabName);
      if (res) {
        this.$emit("input", newTabName); // 更新父组件的v-model绑定的值
        this.activeName = newTabName; // 自身也更新一下
      }
    },
  },
  render(h) {
    // 准备参数，以便把参数传递给tab-nav组件
    const navData = {
      props: {
        tabItemArr: this.tabItemArr, // 内容区相关信息数组
        activeName: this.activeName, // 当前高亮的是哪一项
        onTabClick: this.handleTabClick, // 点击某一tab项的回调
      },
    };
    return (
      <div class="tab-Box">
        <tab-nav {...navData}></tab-nav>
        <div class="my-tab-content-item-box">{this.$slots.default}</div>
      </div>
    );
    /**
     * 注意：<div class="my-tab-content-item-box">{this.$slots.default}</div>写法，正常会把所有的都渲染出来
     * 所以我们在myTabContent组件中再加一个判断(v-show="isActiveToShowContent")，看看当前高亮的名字是否和组件的名字一致，
     * 一致才渲染.这样的话，同一时刻，根据myTabContent组件的name属性，只会对应渲染一个
     * */
  },
};
</script>