<template>
  <div id="app">
    <div class="left">
      <left-menu></left-menu>
    </div>
    <div class="right">
      <right-top-bread></right-top-bread>
      <right-middle-tags></right-middle-tags>
      <div class="rightBottom">
        <div class="setting" @click="isShowDrawer = !isShowDrawer">
          <i class="el-icon-setting"></i>
        </div>
        <div class="rightBottomContent">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
    <my-drawer
      class="drawC"
      :isShowDrawer.sync="isShowDrawer"
      title="设置"
      direction="right"
      :showCloseIcon="true"
    >
      <div class="DrawItem">
        <span>1. 更多主题更改：</span>
        <el-color-picker
          @change="changeTheme"
          v-model="color"
          show-alpha
          :predefine="predefineColors"
        >
        </el-color-picker>
      </div>
      <div class="DrawItem">
        <span>2. menu-icon</span>
        <span>切换...</span>
      </div>
      <div class="DrawItem">
        <span>3. show-tags</span>
        <span>切换...</span>
      </div>
    </my-drawer>
  </div>
</template>

<script>
import leftMenu from "./layOut/leftMenu";
import rightTopBread from "./layOut/rightTopBerad";
import rightMiddleTags from "./layOut/rightMiddleTags";
import { mapState } from "vuex";
import { IsPhone } from "./utils/index";
import { getThemeColor } from "@/utils";

export default {
  name: "App",
  components: {
    leftMenu,
    rightTopBread,
    rightMiddleTags,
  },
  data() {
    return {
      isShowDrawer: false,
      color: "",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    };
  },
  computed: {
    // 辅助函数搭配计算属性，响应式数据
    ...mapState({
      cachedViews: (state) => state.tags.cachedViews, // tag子内容下的cachedViews属性
    }),
  },
  mounted() {
    if (IsPhone()) {
      this.$store.dispatch("menu/fold_menu");
    }
  },
  methods: {
    changeTheme(val) {
      document.documentElement.style.setProperty("--theme_bgColor", val); // 设置变量值
      sessionStorage.setItem("theme_bgColor", val); // 缓存存一份
      this.$store.state.menu.theme_bgColor = getThemeColor(); // vuex更新一下
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  position: relative;
  background-color: var(--theme_bgColor);
  .left {
    width: auto;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    // box-shadow: rgb(0, 0, 0, 15%) 1.95px 1.95px 2.6px;
    // position: relative;
    // z-index: 999999;
  }
  .left::-webkit-scrollbar {
    width: 0 !important;
  }
  .right {
    flex: 1;
    height: 100%;
    overflow-x: auto; // 加

    .rightBottom {
      width: 100%;
      height: calc(100% - 96px);
      box-sizing: border-box;
      background-color: var(--theme_bgColor);
      position: relative;
      // background-color: #f7f7f7;
      .setting {
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        border-radius: 12px;
        background-color: #75b9ff;
        // filter: invert(50%);
        position: absolute;
        top: 120px;
        right: 20px;
        font-size: 28px;
        color: var(--theme_bgColor);
        cursor: pointer;
        z-index: 19;
      }
      .rightBottomContent {
        width: 100%;
        height: 100%;
        background-color: var(--theme_bgColor);
        // background-color: #fff;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 12px;
      }
    }
  }
}

/* fade-transform过渡动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.36s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/deep/ .drawC {
  .drawerContent {
    width: 240px !important;
  }
  .DrawItem {
    box-sizing: border-box;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    justify-content: space-between;
    margin-bottom: 18px;
    font-size: 13px;
    font-weight: 600;
  }
}
</style>
