<template>
  <transition name="fade-transform">
    <div
      v-show="visible"
      class="backWrap"
      :style="{
        bottom: bottom + 'px',
        right: right + 'px',
      }"
      @click="goToTop"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "myBack",
  props: {
    bottom: {
      type: Number,
      default: 72,
    },
    right: {
      type: Number,
      default: 72,
    },
    // 回到顶部出现的滚动高度位置
    showHeight: {
      type: Number,
      default: 240,
    },
    // 拥有滚动条的那个dom元素的id或者class，用于下方选中操作更改滚动条滚动距离
    scrollBarDom: String,
  },
  data() {
    return {
      visible: false,
      scrollDom: null,
    };
  },
  mounted() {
    if (document.querySelector(this.scrollBarDom)) {
      this.scrollDom = document.querySelector(this.scrollBarDom);
      // 不用给window绑定监听滚动事件，给对应滚动条元素绑定即可
      this.scrollDom.addEventListener("scroll", this.isShowGoToTop, true);
    }
  },
  beforeDestroy() {
    // 最后要解除监听滚动事件
    this.scrollDom.removeEventListener("scroll", this.isShowGoToTop, true);
  },
  methods: {
    isShowGoToTop() {
      // 获取滚动的元素，即有滚动条的那个元素
      if (this.scrollDom.scrollTop > 20) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    },
    goToTop() {
      // 获取滚动的元素，即有滚动条的那个元素
      let scrollDom = document.querySelector(this.scrollBarDom);
      // 获取垂直滚动的距离，看看滚动了多少了，然后不断地修改滚动距离直至为0
      let scrollDistance = scrollDom.scrollTop;

      /**
       * window.requestAnimationFrame兼容性已经可以了，正常都有的
       * */
      if (window.requestAnimationFrame) {
        let fun = () => {
          scrollDom.scrollTop = scrollDistance -= 36;
          if (scrollDistance > 0) {
            window.requestAnimationFrame(fun); // 只执行一次，想多次执行需要再调用
          } else {
            scrollDom.scrollTop = 0;
          }
        };
        window.requestAnimationFrame(fun);
        return;
      }

      /**
       * 没有requestAnimationFrame的话，就用定时器去更改滚动条距离，使之滚动
       * */
      let timer2 = setInterval(() => {
        scrollDom.scrollTop = scrollDistance -= 36;
        if (scrollDistance <= 0) {
          clearInterval(timer2);
          scrollDom.scrollTop = 0;
        }
      }, 17);
    },
  },
};
</script>

<style lang='less' scoped>
.backWrap {
  position: fixed;
  cursor: pointer;
  width: 42px;
  height: 42px;
  background: #9cc2e5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
}

// 过渡效果
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.36s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>