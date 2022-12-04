<template>
  <div>
    <br>
    <h3>第一步，引入标签my-back</h3>
    <h3>第二步，指定滚动条元素scrollBarDom的类名或id名</h3>
    <h3>第三步，可设置回到顶部showHeight多高出现，默认240高度出现</h3>
    <h3>第四步，可设置回到顶部的距离下方和右侧的位置bottom&right</h3>
    <br>
    <br>
    <h3 v-for="(item, index) in arr" :key="index">{{ item }}</h3>
    <my-back scrollBarDom=".rightBottomContent"
      ><i class="el-icon-top iii"></i
    ></my-back>
  </div>
</template>

<script>
export default {
  name: "myBackName",
  data() {
    return {
      arr: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ],
    };
  },
};
</script>

<style lang='less' scoped>
.iii {
  font-size: 20px;
  color: #fff;
  font-weight: 700;
}
</style>