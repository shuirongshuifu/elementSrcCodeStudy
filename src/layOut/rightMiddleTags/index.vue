<template>
  <div class="rightMiddleTags">
    <!-- 首页 -->
    <my-tag
      class="selfClass"
      sizeType="medium"
      type="info"
      @click="handleClick({ path: '/' })"
      :type="$route.path === '/' ? 'success' : 'info'"
      >首页</my-tag
    >
    <!-- 非首页 -->
    <my-tag
      class="selfClass"
      style="margin-right: 12px; cursor: pointer"
      v-for="(item, index) in visitedViews"
      :key="item.name"
      sizeType="medium"
      @click="handleClick(item)"
      @close="handleClose(item)"
      closable
      :type="item.name == $route.name ? 'success' : 'info'"
      >{{ item.title }}</my-tag
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      visitedViews: (state) => state.tags.visitedViews,
    }),
  },
  watch: {
    // 1. 监听路由，当路由变化了以后，去追加tags（tags不能重复）
    $route(newRoute, oldRoute) {
      this.addTags(newRoute, oldRoute);
    },
  },
  methods: {
    addTags(newRoute, oldRoute) {
      // 路由表中的name都要写的
      if (newRoute.name) {
        this.$store.dispatch("tags/add_view", newRoute);
      }
      // console.log("路由变化", newRoute, oldRoute);
    },
    handleClick(item) {
      this.$router.push({
        path: item.path,
      });
      // console.log(111, item);
    },
    handleClose(item) {
      let isCurrent = item.name == this.$route.name; // 特别的情况注意，点击的是否是自己
      this.$store.dispatch("tags/delete_view", { name: item.name, isCurrent });
      // console.log("删除", isCurrent);
    },
  },
};
</script>

<style lang='less' scoped>
.rightMiddleTags {
  width: 100%;
  height: 48px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
  .selfClass {
    margin-right: 12px;
    cursor: pointer;
  }
  .selfClass:hover {
    color: #67c23a;
  }
}
</style>