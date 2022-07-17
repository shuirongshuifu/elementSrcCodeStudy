<template>
  <div class="my-tab-nav-item-box">
    <div
      :class="[
        'my-tab-nav-item',
        tabItem.name === activeName ? 'highLight' : '',
        tabItem.disabled ? 'isForbiddenItem' : '',
      ]"
      v-for="(tabItem, index) in tabItemArr"
      :key="index"
      @click="changeActiveName(tabItem)"
    >
      {{ tabItem.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: "myTabNav",
  props: {
    // 源自于内容区的数组数据，非常重要
    tabItemArr: {
      type: Array,
      default: [],
    },
    // 当前激活的名字
    activeName: {
      type: String,
      default: "",
    },
    // 接收点击选项卡函数，在点击tab选项卡的时候，通过此函数传递出去
    onTabClick: {
      type: Function,
    },
  },
  methods: {
    changeActiveName(tabItem) {
      // 自己点自己就不让执行了
      if (tabItem.name === this.activeName) {
        return;
      }
      // 如果包含禁用项disabled属性（即处于禁用状态），也不让执行（搭配.isForbiddenItem类名）
      if (tabItem.disabled) {
        return;
      }
      this.onTabClick(tabItem);
    },
  },
};
</script>
<style lang="less" scoped>
.my-tab-nav-item-box {
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  .my-tab-nav-item {
    // 转换成行内盒子，每一项都水平排列
    display: inline-block;
    // 垂直居中
    height: 40px;
    line-height: 40px;
    // 字体样式位置设置一下
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    margin: 0 12px;
    cursor: pointer;
  }
  // 非禁用时鼠标悬浮样式，注意这里not的使用
  .my-tab-nav-item:not(.isForbiddenItem):hover {
    color: #409eff;
  }
  // 高亮项样式
  .highLight {
    color: #409eff;
    border-bottom: 1px solid #409eff;
  }
  // 禁用项样式
  .isForbiddenItem {
    cursor: not-allowed;
    color: #aaa;
  }
}
</style>
