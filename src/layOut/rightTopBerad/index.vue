<template>
  <div class="rightTop">
    <i
      @click="foldFn"
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      class="iii"
    ></i>
    <my-bread style="margin-left: 6px" v-if="!IsPhone" customDivide=">>">
      <my-bread-item :to="{ path: '/' }">首页</my-bread-item>
      <my-bread-item v-if="$route.path != '/'"
        >{{ $route.path.slice(1) }}&nbsp;{{
          $route.meta.keepAlive ? "缓存" : "不缓存"
        }}</my-bread-item
      >
    </my-bread>
    <el-select
      class="elSelect"
      :style="{
        width: IsPhone ? '120px' : 'auto',
      }"
      v-model="componentsVal"
      @change="jumpComponents"
      filterable
      size="mini"
      placeholder="饿了么源码学习（仿写）"
    >
      <el-option
        v-for="item in routeArr"
        :key="item.value"
        :label="item.meta.title"
        :value="item.path"
      >
      </el-option>
    </el-select>
    <my-switch
      v-model="isNight"
      active-color="#2F2F2F"
      inactive-color="#ddd"
      openText="☾"
      closeText="☼"
      size="small"
    ></my-switch>
    <i
      :class="[
        'el-icon-full-screen',
        'iii2',
        isFullScreen ? 'full' : 'notFull',
      ]"
      @click="fullScreenHandle"
    ></i>
  </div>
</template>

<script>
import routeArr from "@/router/routeArr.js";
import { mapState } from "vuex";
import { getThemeColor } from "@/utils";
export default {
  data() {
    return {
      componentsVal: "",
      routeArr,
      IsPhone: this.IsPhone(),
      isNight: sessionStorage.getItem("isNight") == "true" ? true : false,
      isFullScreen: false, // 是否是全屏状态
    };
  },
  watch: {
    isNight(newVal) {
      if (newVal) {
        document.documentElement.style.setProperty("--theme_bgColor", "#000");
        sessionStorage.setItem("theme_bgColor", "#000");
        sessionStorage.setItem("isNight", "true");
      } else {
        document.documentElement.style.setProperty("--theme_bgColor", "#fff");
        sessionStorage.setItem("theme_bgColor", "#fff");
        sessionStorage.setItem("isNight", "false");
      }
      this.$store.state.menu.theme_bgColor = getThemeColor();
    },
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.menu.isCollapse, // menu子内容下的isCollapse属性
    }),
  },
  methods: {
    foldFn() {
      // dispatch修改数据，mapState获取使用数据
      this.$store.dispatch("menu/fold_menu");
    },
    jumpComponents(path) {
      this.$router.push({
        path,
      });
      this.componentsVal = "";
    },
    // 全屏切换
    fullScreenHandle() {
      this.isFullScreen = !this.isFullScreen;
      if (this.isFullScreen) {
        this.enterFullScreen(); // 进入全屏
      } else {
        this.exitFullscreen(); // 退出全屏
      }
    },
    // 进入全屏
    enterFullScreen() {
      // 获取父组件的dom元素
      const parentNode = this.$parent.$el;
      // 进入全屏
      if (parentNode.requestFullscreen) {
        parentNode.requestFullscreen();
      } else if (parentNode.webkitRequestFullScreen) {
        parentNode.webkitRequestFullScreen();
      } else if (parentNode.mozRequestFullScreen) {
        parentNode.mozRequestFullScreen();
      } else if (parentNode.msRequestFullscreen) {
        // IE11
        parentNode.msRequestFullscreen();
      }
    },
    // 退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
  },
};
</script>

<style lang='less' scoped>
.rightTop {
  width: 100%;
  height: 48px;
  background-color: var(--theme_bgColor);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
  position: relative;
  z-index: 1000;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .iii {
    font-size: 24px;
    cursor: pointer;
  }
  .elSelect {
    margin: 0 12px;
  }
  .iii2 {
    color: #666;
    cursor: pointer;
    margin-left: 12px;
    transition: all 0.3s;
    font-size: 20px;
  }
  .full:hover {
    transform: scale(0.85);
  }
  .notFull:hover {
    transform: scale(1.2);
  }
}
</style>