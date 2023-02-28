<template>
  <!-- 虚拟列表容器，类似“窗口”，窗口的高度取决于一次展示几条数据
            比如窗口只能看到10条数据，一条40像素，10条400像素
            故，窗口的高度为400像素，注意要开定位和滚动条 -->
  <div
    class="virtualListWrap"
    ref="virtualListWrap"
    @scroll="handleScroll"
    :style="{ height: itemHeight * count + 'px' }"
  >
    <!-- 占位dom元素，其高度为所有的数据的总高度 -->
    <div
      class="placeholderDom"
      :style="{ height: allListData.length * itemHeight + 'px' }"
    ></div>
    <!-- 内容区，展示10条数据，注意其定位的top值是变化的 -->
    <div class="contentList" :style="{ top: topVal }">
      <!-- 每一条（项）数据 -->
      <div
        v-for="(item, index) in showListData"
        :key="index"
        class="itemClass"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 加载中部分 -->
    <div class="loadingBox" v-show="loading">
      <i class="el-icon-loading"></i>
      &nbsp;&nbsp;<span>loading...</span>
    </div>
  </div>
</template>
<script>
function throttle(fn, wait) {
  var pre = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = Date.now();
    }
  };
}
import axios from "axios";
export default {
  data() {
    return {
      allListData: [], // 所有的数据，比如这个数组存放了十万条数据
      itemHeight: 40, // 每一条（项）的高度，比如40像素
      count: 10, // 一屏展示几条数据
      start: 0, // 开始位置的索引
      end: 10, // 结束位置的索引
      topVal: 0, // 父元素滚动条滚动，更改子元素对应top定位的值，确保联动
      loading: false,
    };
  },
  computed: {
    // 从所有的数据allListData中截取需要展示的数据showListData
    showListData: function () {
      return this.allListData.slice(this.start, this.end);
    },
  },
  async created() {
    this.loading = true;
    const res = await axios.get("http://ashuai.work:10000/bigData");
    this.allListData = res.data.data;
    this.loading = false;
  },
  methods: {
    handleScroll() {
      throttle(this.s(), 500);
    },
    s() {
      /**
       * 获取在垂直方向上，滚动条滚动了多少像素距离Element.scrollTop
       *
       * 滚动的距离除以每一项的高度，即为滚动到了多少项，当然，要取个整数
       * 例：滚动4米，一步长0.8米，滚动到第几步，4/0.8 = 第5步（取整好计算）
       *
       * 又因为我们一次要展示10项，所以知道了起始位置项，再加上结束位置项，
       * 就能得出区间了【起始位置, 起始位置 + size项数】==【起始位置, 结束位置】
       * */
      const scrollTop = this.$refs.virtualListWrap.scrollTop;
      this.start = Math.floor(scrollTop / this.itemHeight);
      this.end = this.start + this.count;
      /**
       * 动态更改定位的top值，确保联动，动态展示相应内容
       * */
      this.topVal = this.$refs.virtualListWrap.scrollTop + "px";
    },
  },
};
</script>
<style scoped lang="less">
// 虚拟列表容器盒子
.virtualListWrap {
  box-sizing: border-box;
  width: 240px;
  border: solid 1px #000000;
  // 开启滚动条
  overflow-y: auto;
  // 开启相对定位
  position: relative;
  .contentList {
    width: 100%;
    height: auto;
    // 搭配使用绝对定位
    position: absolute;
    top: 0;
    left: 0;
    .itemClass {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    // 奇偶行改一个颜色
    .itemClass:nth-child(even) {
      background: #c7edcc;
    }
    .itemClass:nth-child(odd) {
      background: pink;
    }
  }
  .loadingBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.64);
    color: green;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
