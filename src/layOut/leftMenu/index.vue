<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :background-color="theme_bgColor"
      router
      :collapse="isCollapse"
      text-color="auto"
      active-text-color="auto"
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item
        v-for="(item, index) in routeArr"
        :key="item.name"
        :index="item.path"
      >
        <i class="el-icon-eleme"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import routeArr from "@/router/routeArr.js";
import { mapState } from "vuex";
import { getThemeColor } from "@/utils";
export default {
  data() {
    return {
      routeArr,
    };
  },
  computed: {
    // 辅助函数搭配计算属性，响应式数据
    ...mapState({
      isCollapse: (state) => state.menu.isCollapse, // menu子内容下的isCollapse属性
      theme_bgColor: (state) => state.menu.theme_bgColor, // menu子内容下的主题颜色
    }),
  },
  mounted() {
    /**
     * 获取css变量函数的值的方法：getComputedStyle搭配getPropertyValue使用
     * */
    this.$store.state.menu.theme_bgColor = getThemeColor();
    /**
     * 修改css变量函数的值的方法
     * */
    // document.documentElement.style.setProperty("--theme_bgColor", "green");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu:not(.el-menu--collapse) {
  width: 180px;
}
.el-menu-item.is-active {
  background-color: #ccddee !important;
}
.el-menu-item:hover {
  background-color: #ccddee !important;
}
</style>