<template functional>
  <!-- 注意函数值组件functional取props中的数据，使用props.xxx -->
  <span class="myTrendWrap">
    <!-- 当props.whole为false时，就不去设置color颜色了，为true时先不管，留给下方的:class设置 -->
    <span
      :style="{
        color: props.whole ? '' : 'unset',
      }"
      :class="[props.reverseColor ? 'reverseColor' : '', props.flag]"
      ><slot
    /></span>
    <span
      :class="[
        'triangle',
        props.reverseColor ? 'reverseColor' : '',
        props.flag,
      ]"
    ></span>
  </span>
</template>

<script>
export default {
  name: "myTrend",
  props: {
    // 上升up还是下降down，填写其他的值就没三角形了
    flag: {
      type: String,
      default: "",
    },
    reverseColor: {
      type: Boolean,
      default: false,
    },
    // 是否全部上色，即文字也对应上色吗，默认全部上色
    whole: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang='less' scoped>
.myTrendWrap {
  .triangle {
    font-size: 12px;
    margin-left: 6px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 6px solid;
    position: relative;
    border-color: transparent;
  }
  // 正常升降颜色
  .up {
    border-color: transparent transparent #ed4014 transparent;
    transform: translateY(-30%);
    color: #ed4014;
  }
  .down {
    border-color: #19be6b transparent transparent transparent;
    transform: translateY(30%);
    color: #19be6b;
  }
  // 反转升降颜色
  .up.reverseColor {
    border-color: transparent transparent #19be6b transparent;
    transform: translateY(-30%);
    color: #19be6b;
  }
  .down.reverseColor {
    border-color: #ed4014 transparent transparent transparent;
    transform: translateY(30%);
    color: #ed4014;
  }
}
</style>