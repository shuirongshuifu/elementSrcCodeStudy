<template>
  <div
    :class="[
      'card-box',
      this.$slots.back ? 'card-reverse' : '',
      zoomCard ? 'card-box-zoom' : '',
    ]"
  >
    <div class="card-content">
      <!-- 当有back命名插槽时，加上frontReverse类名并移除front-side类名，才有反转效果 -->
      <div
        :style="cardStyle"
        :class="[
          this.$slots.back ? 'frontReverse' : 'front-side',
          shadow,
          isHoverUp ? 'isHoverUp' : '',
        ]"
      >
        <!-- 正常情况下普通插槽显示内容即可 -->
        <slot></slot>
      </div>
      <div :style="backCardStyle" class="backReverse" v-if="this.$slots.back">
        <!-- 有命名插槽就显示命名插槽内容，并做类名移除和新增，开启翻转效果 -->
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script>
const shadowArr = ["hover", "always", "none"]; // shadow="none"不传递也行的
export default {
  name: "myCard",
  props: {
    cardStyle: {}, // 控制卡片（正面的样式）
    backCardStyle: {}, // 控制背面卡片的样式
    shadow: {
      // 阴影出现时机：鼠标悬浮出现、一直出现、或不出现
      type: String,
      validator(val) {
        // 校验
        if (shadowArr.includes(val)) return true;
        return false;
      },
    },
    isHoverUp: Boolean, // 是否悬浮往上平移一点
    zoomCard: Boolean, // 是否放大卡片（hover时）
  },
  mounted() {
    // console.log("this.$slots", this.$slots);
  },
};
</script>

<style lang="less" scoped>
.card-box {
  // background-color: #fff; /* 注意卡片盒子不能加背景色，会挡住旋转样式效果 */
  color: #333;
  perspective: 1000;
  transform-style: preserve-3d;
  transition: all 0.4s;
}
// 加card-box-zoom类名，就整体放大1.08倍
.card-box-zoom:hover {
  transform: scale(1.08);
}
// 中转的用于定位的容器盒子
.card-content {
  position: relative;
  width: 100%;
  height: 100%;
  transition: 0.75s;
  transform-style: preserve-3d;
}
/* 使用front-side类名控制普通状态时的样式 */
.front-side {
  box-sizing: border-box;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  transition: 0.3s;
}
// 有hover类名时，在hover时，就加阴影
.hover:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
// 有isHoverUp类名时，就在hover时往上移动一点
.isHoverUp:hover {
  transform: translateY(-3px);
}
// 有always类名时，就加阴影
.always {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/* 使用frontReverse和backReverse类名专门控制卡片反转状态时的样式 */
.frontReverse, // 利用定位使前后面重叠
.backReverse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  box-sizing: border-box;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.frontReverse {
  z-index: 2; // 前面层级抬高
}
.backReverse {
  transform: rotateY(-180deg); // 后面旋转不可见
}
.card-reverse:hover .card-content {
  // hover时候，旋转容器，就会出现，不可见到可见的过程了，翻转动画就有了
  transform: rotateY(180deg);
}
</style>