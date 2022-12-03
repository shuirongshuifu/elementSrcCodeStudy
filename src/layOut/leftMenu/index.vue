<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
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
    }),
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
</style>