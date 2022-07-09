<template>
  <transition name="notice-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'noticeBox',
        center ? 'horizontal' : '',
        typeArr.includes(type) ? type : '',
      ]"
      :style="controlTop"
      v-show="isShowNotice"
      @mouseenter="clearTimerFn"
      @mouseleave="startTimerFn"
    >
      <span> {{ iconObj[type] }} {{ notice }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    cutCount: {
      type: Function,
    },
  },
  data() {
    return {
      isShowNotice: false, // v-show的标识布尔值
      notice: "", // 提示的消息文字
      timer: null, // 用来清除的定时器
      duration: 3000, // 默认3秒消失
      center: false, // 是否让水平文字居中，默认false
      type: "info", // 默认info类型
      typeArr: ["info", "success", "warning", "error"], // 总共4种类型
      iconObj: {
        info: "♥",
        success: "♠",
        warning: "♦",
        error: "♣",
      },
    };
  },
  computed: {
    controlTop() {
      return {
        top: `${20 + this.count * 48}px`,
      };
    },
  },
  mounted() {
    this.startTimerFn(); // 开启定时器，默认3秒后销毁组件
  },
  methods: {
    // 开始定时器计时，要销毁dom元素
    startTimerFn() {
      this.timer = setTimeout(() => {
        this.close(); // 达到计时时间，就隐藏这个notice
      }, this.duration);
    },
    // 鼠标移入，清除定时器，使dom永远存在；鼠标移出，再重新计时准备移除dom
    clearTimerFn() {
      clearTimeout(this.timer);
    },
    // 过渡动画消失时，会执行此钩子函数，销毁组件，同时移除dom
    handleAfterLeave() {
      this.cutCount();
      // 在移除一个dom之前，要先通知外界的计数count减去一个
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    // 关闭隐藏dom
    close() {
      this.isShowNotice = false;
      /**
       * 注意当v-show为false的时候，会触发过渡动画消失钩子handleAfterLeave函数执行
       * 相当于在close函数中，执行了 this.handleAfterLeave()
       * */
    },
  },
};
</script>

<style lang="less" scoped>
// 默认样式
.noticeBox {
  min-width: 320px;
  height: auto; // 高度由内容撑开
  padding: 16px; // 加上内边距
  border: 1px solid #e9e9e9;
  position: fixed; // 使用固定定位，使位置靠近顶部并居中
  top: 20px;
  left: 50%;
  transform: translateX(-50%); // 控制居中
  box-sizing: border-box;
  border-radius: 4px; // 加圆角好看一些
  background-color: #edf2fc;
  // 过渡效果
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  display: flex; // 开启弹性盒垂直居中
  align-items: center;
  margin-bottom: 24px;
}
// 文字居中样式
.horizontal {
  justify-content: center;
}
// 成功提示样式
.success {
  color: #67c23a;
  background-color: #f0f9eb;
}
// 警告提示样式
.warning {
  color: #e6a23c;
  background-color: #fdf6ec;
}
// 错误提示样式
.error {
  color: #f56c6c;
  background-color: #fef0f0;
}
// 过渡效果样式
.notice-fade-enter,
.notice-fade-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%);
}
</style>