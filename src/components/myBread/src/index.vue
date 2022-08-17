<template>
  <div class="breadWrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myBread",
  props: {
    // 使用饿了么UI的图标icon类名进行分隔
    elementIconClassDivide: {
      type: String,
      default: "",
    },
    // 自定义分隔内容，用户填写什么，就以什么为分隔
    customDivide: {
      type: String,
      default: "→_→", // 如这里，默认以颜文字为默认分隔。饿了么是斜杠默认分隔/
    },
  },
  /**
   * 父组件provide注入一个自身实例this给到子组件myBreadItem，方便子组件访问
   * 父组件的分隔内容变量defaultDivide或customDivide或elementIconClassDivide
   * 因为子组件需要去渲染出对应的分隔内容是啥
   *
   * 其实这里不使用provide注入的方式也是可以的。子组件myBreadItem访问父组件myBread
   * 也可以使用this.$parent.defaultDivide这样的形式去访问父组件的数据内容。不过
   * 这里只是做一个分隔内容的展示，不牵涉到响应式数据处理，所以使用provide更优雅
   * */
  provide() {
    return {
      fatherInstance: this, // 提供自身实例，方便子组件使用，子组件需inject声明注入接收使用
    };
  },
};
</script>

<style lang="less" scoped>
.breadWrap {
  font-size: 14px;
  // 第一个面包屑的文字加粗
  /deep/ .breadItem:first-child .breadItemWords {
    font-weight: 700;
  }
  // 最后一个面包屑的小图标隐藏
  /deep/ .breadItem:last-child .breadItemDivide {
    display: none;
  }
}
</style>