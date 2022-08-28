<template>
  <div class="myFoldWrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myFold",
  props: {
    // 是否开启手风琴模式（每次只能展开一个面板）
    accordion: {
      type: Boolean,
      default: false, // 默认不开启（可展开多个）
    },
    // 父组件v-model传参，子组件props中key为'value'接收，'input'事件更改
    value: {
      type: Array, // 手风琴模式的数组项只能有一个，反之可以有多个
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 展开的项可一个，可多个（使用层v-model数组传的有谁，就展开谁）
      openArr: this.value, // 收集谁需要展开
    };
  },
  mounted() {
    // 手动加一个校验
    if (this.accordion & (this.value.length > 1)) {
      console.error("手风琴模式下，绑定的数组最多一项");
    }
  },
  watch: {
    // 监听props中value的变化，及时更新
    value(value) {
      this.openArr = value;
    },
  },
  methods: {
    updateVModel(name, isOpen, vNode) {
      // 若为手风琴模式
      if (this.accordion) {
        // 当某一项打开的时候，才去关闭其他项
        isOpen ? this.closeOther(name) : null;
        this.openArr = [name]; // 手风琴模式只保留（展开）一个
      }
      // 若为可展开多项模式
      else {
        let i = this.openArr.indexOf(name);
        // 包含就删掉、不包含就追加
        i > -1 ? this.openArr.splice(i, 1) : this.openArr.push(name);
      }
      // 无论那种模式，都需要更改并通知外层使用组件
      this.$emit("input", this.openArr); // input事件控制v-model的数据更改
      this.$emit("change", name, isOpen, vNode); // change事件抛出去，供用户使用
    },
    closeOther(name) {
      this.$children.forEach((item) => {
        // 将除了自身以外的都置为false，故其他的就都折叠上了
        if (item.name != name) {
          item.isOpen = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.myFoldWrap {
  border: 1px solid #e9e9e9;
}
</style>