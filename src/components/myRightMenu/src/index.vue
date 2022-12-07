<template>
  <ul class="table-right-menu">
    <!-- 循环菜单项，事件带参数抛出 -->
    <li
      v-for="item in rightclickInfo.menulists"
      :key="item.btnName"
      class="table-right-menu-item"
      @click.stop="fnHandler(item)"
    >
      <div class="table-right-menu-item-btn">
        <!-- 图标和按钮名 -->
        <i :class="item.icoName" class="iii" />
        <span>{{ item.btnName }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "myRightMenu",
  props: {
    // 接收右键点击的信息
    rightclickInfo: {
      type: Object,
      default: () => {
        return {
          position: {
            // 右键点击的位置
            x: null,
            y: null,
          },
          menulists: [
            {
              fnName: "", // 点击菜单项的事件名
              params: {}, // 点击的参数
              icoName: "", // 图标名
              btnName: "", // 按钮名
            },
          ],
        };
      },
    },
    // 重要参数，用于标识是哪个右键菜单dom元素
    classIndex: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    // 监听右键点击时点击位置的变化，只要变化了，就弹出右键菜单供用户点击操作
    "rightclickInfo.position"(val) {
      let x = val.x; // 获取x轴坐标
      let y = val.y; // 获取y轴坐标
      let innerWidth = window.innerWidth; // 获取页面可是区域宽度，即页面的宽度
      let innerHeight = window.innerHeight; // 获取可视区域高度，即页面的高度
      /**
       * 注意，这里要使用getElementsByClassName去选中对应dom，因为右键菜单组件可能被多处使用
       * classIndex标识就是去找到对应的那个右键菜单组件的，需要加的
       * */ 
      let menu =
        document.getElementsByClassName("table-right-menu")[this.classIndex]; 
      menu.style.display = "block";
      let menuHeight = this.rightclickInfo.menulists.length * 30; // 菜单容器高
      let menuWidth = 180; // 菜单容器宽
      // 菜单的位置计算
      menu.style.top =
        (y + menuHeight > innerHeight ? innerHeight - menuHeight : y) + "px";
      menu.style.left =
        (x + menuWidth > innerWidth ? innerWidth - menuWidth : x) + "px";
      // 因为菜单还要关闭，就绑定一个鼠标点击事件，通过e.button判断点击的是否是左键，左键关闭菜单
      document.addEventListener("mouseup", this.hide, false);
    },
  },
  methods: {
    hide(e) {
      if (e.button === 0) {
        // 0是左键、1是滚轮按钮或中间按钮（若有）、2鼠标右键
        let menu =
          document.getElementsByClassName("table-right-menu")[this.classIndex]; // 同样的精确查找
        menu.style.display = "none"; // 菜单关闭
        document.removeEventListener("mouseup", this.hide); // 及时解绑监听事件
      }
    },
    fnHandler(item) {
      this.$emit(item.fnName, item.params);
      // 事件再传出去，即为：
      // this.$emit('事件名',事件参数)
    },
  },
};
</script>

<style lang='less' scoped>
.table-right-menu {
  color: #333;
  background: #fff;
  border-radius: 4px;
  list-style-type: none;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  padding: 4px 0;
  // 固定定位，抬高层级，初始隐藏，右击时置为display:block显示
  position: fixed;
  z-index: 3000;
  display: none;
  .table-right-menu-item {
    box-sizing: border-box;
    padding: 6px 12px;
    border-radius: 4px;
    transition: all 0.36s;
    cursor: pointer;
    .table-right-menu-item-btn {
      .iii {
        margin-right: 4px;
      }
    }
  }
  .table-right-menu-item:hover {
    background-color: #ebf5ff;
    color: #6bacf2;
  }
}
</style>