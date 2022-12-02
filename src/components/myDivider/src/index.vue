<template functional>
  <!-- functional关键字加上后，即代表为函数式组件，就没有生命周期、this实例等了，故渲染更快，性能更高 -->
  <!-- v-bind和v-on这里不加也行。毕竟函数式组件个人愚见简洁建议一些，attrs存放传递来的数据，listeners传递任何事件监听器 -->
  <!-- data.staticClass需要加上，否则外层给组件加的class属性在审查元素的时候不会出现的，相当于没加   -->
  <div
    v-bind="data.attrs"
    v-on="listeners"
    :class="[data.staticClass, `${props.direction}`, `${props.lineType}`]"
  >
    <!-- 当分割线为水平的时候，且插槽有内容的时候，才渲染对应数据 -->
    <!-- slots()方法返回插槽数据对象，default为默认插槽；相当于this.$slots.default。本系列文章中仿写一个el-tabs 也提到了此知识点  -->
    <div
      v-if="props.direction === 'horizontal' && slots().default"
      :class="['text', `${props.contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "myDivider",
  props: {
    // 分割线的方向，默认水平horizontal（垂直vertical可选）
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].includes(val);
      },
    },
    // 文本内容位置，默认居中（仅当分割线为水平方向时，才渲染对应内容）
    contentPosition: {
      type: String,
      default: "center",
      validator(val) {
        return ["left", "center", "right"].includes(val);
      },
    },
    // 分割线线条类型，默认实线，可选虚线，圆点线
    lineType: {
      type: String,
      default: "solid",
      validator(val) {
        return ["solid", "dashed", "dotted"].includes(val);
      },
    },
  },
};
</script>
<style lang="less" scoped>
// 水平样式
.horizontal {
  width: 100%;
  border-bottom: 1px solid #333; // 默认solid分割线样式
  display: block;
  margin: 16px 0;
  position: relative;
  // 缩放0.95倍可以解决一像素问题（一像素看着比实际粗）横线Y缩放
  transform: scaleY(0.95);
}
// dashed分割线
.dashed {
  border-bottom: 1px dashed #333;
}
// dotted分割线
.dotted {
  border-bottom: 1px dotted #333;
}
// 垂直样式
.vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  background-color: #333;
  vertical-align: middle;
  position: relative;
  top: -1px; // 微调一下位置
  // 缩放0.95倍可以解决一像素问题（一像素看着比实际粗）竖线X缩放
  transform: scaleX(0.95);
}
// 文本样式
.text {
  position: absolute;
  padding: 0 12px;
  color: #777; // 这里的颜色也可以自定义哦，作为参数传递
  font-size: 14px;
  transform: translateY(-50%); // y轴移动自身的一半，使其垂直方向居中
  background-color: #fff; // 通过背景色和padding去盖住水平分割线条
}
// 文本靠左
.text.left {
  left: 36px;
}
// 文本靠右
.text.right {
  right: 36px;
}
// 文本居中
.text.center {
  left: 50%;
  // 居中的话，别忘了要回正。即XY轴方向都平移自身的一半
  transform: translateX(-50%) translateY(-50%);
}
</style>
