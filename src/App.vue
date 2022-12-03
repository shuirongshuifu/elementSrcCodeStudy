<template>
  <div id="app">
    <div class="left">
      <left-menu></left-menu>
    </div>
    <div class="right">
      <right-top-bread></right-top-bread>
      <right-middle-tags></right-middle-tags>
      <div class="rightBottom">
        <div class="rightBottomContent">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
1. 拆分组件
2. 加入vuex
3. tag标签(参照163信箱交互去写)
*/
import leftMenu from "./layOut/leftMenu";
import rightTopBread from "./layOut/rightTopBerad";
import rightMiddleTags from "./layOut/rightMiddleTags";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    leftMenu,
    rightTopBread,
    rightMiddleTags,
  },
  computed: {
    // 辅助函数搭配计算属性，响应式数据
    ...mapState({
      cachedViews: (state) => state.tags.cachedViews, // tag子内容下的cachedViews属性
    }),
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
  .left {
    width: auto;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
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
      padding: 12px;
      background-color: #f7f7f7;

      .rightBottomContent {
        width: 100%;
        height: 100%;
        background-color: #fff;
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
</style>
