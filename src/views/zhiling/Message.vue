<!-- Discription: 弹窗组件, author: ydj, Date: 2021-01-06 15:02:53 -->
<template>
  <div>
    <div v-for="item in sourceData" :key="item.id">
      <span :class="item.type">{{ item.message }}-->{{ item.id }}</span>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      sourceData: [],
    };
  },
  mounted() {
    this.id = 0;
  },
  methods: {
    add(options) {
      let option = { ...options, id: ++this.id };
      this.sourceData.push(option);
      // 定时删除
      option.timer = setTimeout(() => {
        this.remove(option);
      }, option.duration);
    },
    remove(option) {
      clearTimeout(option.timer);
      this.sourceData = this.sourceData.filter((item) => item.id !== option.id);
    },
  },
};
</script>
<style lang='less' scoped>
.success {
  color: green;
}
.warning {
  color: yellowgreen;
}
.error {
  color: red;
}
</style>