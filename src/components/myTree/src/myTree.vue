<template>
  <div class="my-tree-wrap">
    <!-- 有数据渲染没数据提示暂无数据 -->
    <div v-if="treeData.length > 0">
      <!-- 初次循环，组件内再次递归循环，即可实现递归树效果 -->
      <tree-item
        v-for="(item, index) in treeData"
        :key="index"
        :item="item"
        :expandTree="expandTree"
        :iconName="iconName"
        :clickNameClose="clickNameClose"
        v-on="$listeners"
        v-bind="$attrs"
      >
        <!-- 关于$listeners和$attrs的详细用法,可以看笔者的这篇文章:https://juejin.cn/post/6982727094937583647 -->
      </tree-item>
    </div>
    <span class="noData" v-else>😭暂无数据😭</span>
  </div>
</template>

<script>
import treeItem from "./treeItem.vue";
export default {
  name: "myTree",
  components: { treeItem },
  props: {
    // 树组件需要的数据数组
    treeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    expandTree: Boolean, // 是否统一展开或关闭
    iconName: String, // 树组件的小图标
    clickNameClose: Boolean, // 点击树节点名字也能关闭树节点菜单
  },
};
</script>

<style lang="less" scoped>
.my-tree-wrap {
  width: 100%;
  .noData {
    color: #666;
    font-size: 14px;
  }
}
// 通过css解决树结构缩进问题，且要搭配.my-tree-wrap > .treeNodeItem { padding: 0; } (子元素选择器，并非后代元素选择器)
.my-tree-wrap > .treeNodeItem {
  padding: 0; // 优化树节点缩进效果，可注释掉看效果
}
</style>