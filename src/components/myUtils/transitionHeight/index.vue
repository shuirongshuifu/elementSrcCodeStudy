<template>
  <div class="transitionWrap" ref="transitionWrap">
    <slot></slot>
  </div>
</template>
 
<script>
export default {
  props: {
    // 布尔值show标识关闭还是展开
    show: Boolean,
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    /**
     * dom加载完毕，然后根据标识show去手动更新高度
     * */
    this.$nextTick(() => {
      this.height = this.$refs.transitionWrap.offsetHeight;
      this.$refs.transitionWrap.style.height = this.show
        ? `${this.height}px`
        : 0;
    });
    // this.$nextTick().then(() => { ... }
  },
  watch: {
    // 再监听标识的变化，从而更改高度，即关闭还是展开
    show(newVal) {
      this.$refs.transitionWrap.style.height = newVal ? `${this.height}px` : 0;
    },
  },
};
</script>
 
<style scoped>
/* 关键css样式，高度线性匀速过渡 */
.transitionWrap {
  transition: height 0.2s linear;
  overflow: hidden;
}
</style>