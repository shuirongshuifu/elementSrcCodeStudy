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
    <my-link
      v-if="showFn()"
      class="jumpC"
      @click="githubFn"
      type="success"
      icon="el-icon-aim"
      >GitHub仓库</my-link
    >
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
      IsPhone: this.IsPhone(),
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
    githubFn() {
      window.open("https://github.com/shuirongshuifu");
    },
    showFn() {
      if (this.IsPhone & !this.isCollapse) {
        return false;
      }
      return true;
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
  position: relative;
  .iii {
    font-size: 36px;
    cursor: pointer;
  }
  .elSelect {
    margin: 0 12px;
  }
  .jumpC {
    position: absolute;
    top: 10px;
    right: 24px;
    color: #1d7dfa;
    font-weight: 700;
  }
}
</style>