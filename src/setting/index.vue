<template>
  <my-drawer
    class="drawC"
    :isShowDrawer.sync="isShowDrawerFlag"
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
      <my-switch
        v-model="isShowMenuIcon"
        openText="ON"
        closeText="OFF"
      ></my-switch>
    </div>
    <div class="DrawItem">
      <span>3. show-tags</span>
      <span>
        <my-switch
          v-model="isShowTags"
          openText="ON"
          closeText="OFF"
        ></my-switch>
      </span>
    </div>
    <div class="DrawItem">
      <span>3. 水印</span>
      <span>
        <my-switch
          v-model="isShowWaterMark"
          openText="ON"
          closeText="OFF"
        ></my-switch>
      </span>
    </div>
  </my-drawer>
</template>

<script>
import { getThemeColor } from "@/utils";
import { setWaterMark, removeWatermark } from "@/utils/waterMark.js";
export default {
  watch: {
    isShowMenuIcon(val) {
      if (val) {
        this.$store.state.menu.isShowMenuIcon = true;
      } else {
        this.$store.state.menu.isShowMenuIcon = false;
      }
    },
    isShowTags(val) {
      if (val) {
        this.$store.state.tags.isShowTags = true;
      } else {
        this.$store.state.tags.isShowTags = false;
      }
    },
    isShowWaterMark(val) {
      if (val) {
        setWaterMark("有内鬼啊👻👻👻", "终止交易💲💲💲");
      } else {
        removeWatermark();
      }
    },
  },
  data() {
    return {
      isShowDrawerFlag: false,
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
      isShowMenuIcon: true,
      isShowTags: true,
      isShowWaterMark: true,
    };
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