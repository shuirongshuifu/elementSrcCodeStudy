<script>
export default {
  name: "myTimeline",
  // 外层组件只接受一个参数即是否反转，内层组件的参数多一些
  props: {
    reverse: {
      // 是否反转，即控制时间排序方式
      type: Boolean,
      default: false, // 默认从上往下
    },
  },
  // 使用render函数渲染数据
  render() {
    const reverse = this.reverse;
    const classes = {
      "my-timeline": true,
      "is-reverse": reverse,
    };
    let slots = this.$slots.default || []; // 获取默认插槽数组
    if (reverse) {
      slots = slots.reverse(); // 默认插槽数组，也是数组，所以也是可以使用reverse方法做反转的
    }
    // 加上动态class  并传递默认插槽
    return <ul class={classes}>{slots}</ul>;
    // 整体时间线结构就是ul搭配li，一个li代表一项时间线
  },
};
</script>

<style lang="less">
.my-timeline,
.my-timeline .timeLineItem {
  list-style: none;
}
// 把最后一条竖向时间线隐藏
.my-timeline .timeLineItem:last-child .verticalLine {
  display: none;
}
</style>
