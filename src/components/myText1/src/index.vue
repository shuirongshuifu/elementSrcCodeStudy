<template>
  <div
    class="scrollWrap"
    :style="{
      backgroundColor: bgColor,
      color,
    }"
    v-if="closeText"
  >
    <span class="bellContent" v-show="showBell">
      <i class="el-icon-bell"></i>
    </span>
    <div
      class="scrollContent"
      :style="{
        animationDuration: speed + 'ms',
        cursor: url ? 'pointer' : 'auto',
      }"
      @click="jump"
    >
      <slot></slot>
    </div>
    <span class="closeContent" v-show="showClose">
      <i class="el-icon-circle-close" @click="closeText = false"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "myText1",
  props: {
    // 动画的速度快慢（持续时间），单位毫秒
    speed: {
      type: Number | String,
      default: 6000,
    },
    // 默认展示小铃铛图标
    showBell: {
      type: Boolean,
      default: true,
    },
    // 默认不显示关闭小图标
    showClose: {
      type: Boolean,
      default: true,
    },
    // 给滚动文本加上跳转链接
    url: {
      type: String,
      default: "",
    },
    // 背景色
    bgColor: {
      type: String,
      default: "#fdf6ec",
    },
    // 文字颜色
    color: {
      type: String,
      default: "#f9ae3d",
    },
  },
  data() {
    return {
      closeText: true,
    };
  },
  mounted() {
    this.setKeyframes();
  },
  methods: {
    // 初始化设置动态keyframes动画
    setKeyframes() {
      this.$nextTick(() => {
        let scrollContentWidth = document.querySelector(".scrollContent");
        let width = scrollContentWidth.offsetWidth; // 获取内容区宽度
        let style = document.createElement("style"); // 创建样式标签
        style.setAttribute("type", "text/css"); // 指定类型属性
        document.head.appendChild(style); // 给head标签加入此样式标签
        let sheet = style.sheet; // 给样式标签内加入一条css规则
        sheet.insertRule(
          `
            @keyframes scrollText {
              from {
                left: 100%;
              }
              to {
                left: -${width}px;
              }
            }
          `
        );
      });
    },
    jump() {
      if (this.url) {
        this.$router.push({
          path: this.url,
        });
        // window.open("http://ashuai.work/welcome");
      }
    },
  },
};
</script>

<style lang='less' scoped>
.scrollWrap {
  width: 100%;
  height: 36px;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 2px;
  .bellContent {
    display: inline-block;
    width: 28px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: inherit; // 继承父元素的背景色，保持一致
    position: absolute;
    left: 0;
    z-index: 6;
  }
  .scrollContent {
    position: absolute;
    left: 100%;
    white-space: nowrap;
    display: inline-block;
    // 动画
    animation-iteration-count: infinite;
    animation-name: scrollText;
    animation-timing-function: linear;
  }
  .closeContent {
    display: inline-block;
    width: 28px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: inherit; // 继承父元素的背景色，保持一致
    position: absolute;
    right: 0;
    z-index: 6;
    i {
      cursor: pointer;
    }
  }
}
// 鼠标进入公告栏内，暂停文字滚动动画
.scrollWrap:hover .scrollContent {
  animation-play-state: paused;
}
</style>