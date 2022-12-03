<template>
  <div class="rightTop">
    <i
      @click="foldFn"
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      class="iii"
    ></i>
    <my-bread customDivide=">>">
      <my-bread-item :to="{ path: '/' }">首页</my-bread-item>
      <my-bread-item v-if="$route.path != '/'"
        >{{ $route.path.slice(1) }}&nbsp;{{
          $route.meta.keepAlive ? "缓存" : "不缓存"
        }}</my-bread-item
      >
    </my-bread>
    <h5 style="margin-left: 12px">饿了么源码学习（仿写）</h5>
    <el-select
      style="margin-left: 24px"
      v-model="componentsVal"
      @change="jumpComponents"
      filterable
      size="mini"
      placeholder="请选择组件"
    >
      <el-option
        v-for="item in routeArr"
        :key="item.value"
        :label="item.meta.title"
        :value="item.path"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import routeArr from "@/router/routeArr.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      componentsVal: "",
      routeArr,
    };
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
  },
};
</script>

<style lang='less' scoped>
.rightTop {
  width: 100%;
  height: 48px;
  background-color: #cde;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
  .iii {
    font-size: 36px;
    cursor: pointer;
    margin-right: 18px;
  }
}
</style>