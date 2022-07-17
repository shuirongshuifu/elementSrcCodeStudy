<template>
  <div class="my-tab-content-item" v-show="isActiveToShowContent">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myTabContent",
  props: {
    label: String, // 标签名
    name: String, // 每个下方内容区都有自己的name名字
    disabled: {
      // 是否禁用这一项
      type: Boolean,
      default: false, // 默认不禁用
    },
  },
  computed: {
    // 控制根据高亮的tab显示对应标签页内容
    isActiveToShowContent() {
      let activeName = this.$parent.value; // 比如当前高亮的是 sunwukong
      let currentName = this.name; // this.name的值有很多个，有：sunwukong、zhubajie、shaheshang...
      // 谁等于，就显示谁
      return activeName === currentName;
    },
  },
};
</script>

<style>
.my-tab-content-item {
  padding: 12px;
}
</style>