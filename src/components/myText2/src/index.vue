<template>
  <!-- 参数接收数组，没有插槽了 -->
  <div class="scrollWrap2">
    <div
      class="verticalScrollContent"
      :style="{
        animationDuration: speed + 'ms',
      }"
    >
      <li v-for="(item, index) in text" :key="index">
        {{ item }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "myText2",
  props: {
    // 动画速度
    speed: {
      type: Number | String,
      default: 20000,
    },
    // 动画文本内容
    text: {
      type: Array,
    },
  },
  mounted() {
    this.setKeyframes();
  },
  methods: {
    // 垂直方向更改top的值
    setKeyframes() {
      this.$nextTick(() => {
        let scrollContentHeight = document.querySelector(
          ".verticalScrollContent"
        );
        let height = scrollContentHeight.offsetHeight;
        let style = document.createElement("style");
        style.setAttribute("type", "text/css");
        document.head.appendChild(style);
        let sheet = style.sheet;
        sheet.insertRule(
          `
            @keyframes scrollText2 {
              from {
                top: 100%;
              }
              to {
                top: -${height}px; // 高度为自己的高度
              }
            }
          `
        );
      });
    },
  },
};
</script>

<style lang='less' scoped>
.scrollWrap2 {
  width: 100%;
  height: 36px;
  overflow: hidden;
  position: relative;
  .verticalScrollContent {
    width: 100%;
    position: absolute;
    top: 100%;
    white-space: nowrap;
    // 动画
    // animation-duration: 6000ms;
    animation-iteration-count: infinite;
    animation-name: scrollText2;
    animation-timing-function: linear;
    li {
      margin-bottom: 12px;
    }
  }
}
</style>