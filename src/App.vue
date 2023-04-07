<template>
  <div id="app">
    <div class="left">
      <left-menu></left-menu>
    </div>
    <div class="right">
      <right-top-bread></right-top-bread>
      <right-middle-tags></right-middle-tags>
      <div class="rightBottom">
        <div class="setting" @click="showDrawFn">
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
    <draw ref="drawRef" />
  </div>
</template>

<script>
import leftMenu from "./layOut/leftMenu";
import rightTopBread from "./layOut/rightTopBerad";
import rightMiddleTags from "./layOut/rightMiddleTags";
import draw from "./setting/index.vue";
import { mapState } from "vuex";
import { IsPhone } from "./utils/index";
import { setWaterMark } from "./utils/waterMark.js";
export default {
  name: "App",
  components: {
    leftMenu,
    rightTopBread,
    rightMiddleTags,
    draw,
  },
  data() {
    return {
      isShowDrawer: false,
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
    setWaterMark("有内鬼啊👻👻👻", "终止交易💲💲💲");
  },
  methods: {
    showDrawFn() {
      this.$refs.drawRef.isShowDrawerFlag = true;
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
    width: 280px !important;
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
