<template>
  <div class="wrap">
    <my-badge :value="11" type="primary">
      <h5>primary类型</h5>
    </my-badge>
    <br />
    <br />
    <my-badge :value="22" type="success">
      <h5>success类型</h5>
    </my-badge>
    <br />
    <br />
    <my-badge value="0" type="warning">
      <h5>warning类型</h5>
    </my-badge>
    <br />
    <br />
    <my-badge :value="44" type="info">
      <h5>info类型</h5>
    </my-badge>
    <br />
    <br />
    <my-badge :value="55" type="danger">
      <h5>danger类型</h5>
    </my-badge>
    <br />
    <br />
    <my-badge :value="188" :max="99">
      <h5>指定max最大值99</h5>
    </my-badge>
    <br />
    <br />
    <my-badge is-dot>
      <h5>小圆点</h5>
    </my-badge>
    <br />
    <br />
    <my-badge value="热点追踪">
      <h5>《震惊！一程序猿光天化日竟然...网友必看！》</h5>
    </my-badge>
    <br />
    <br />
    <my-badge :isShow="isShow" value="^@^">
      <h5>隐藏</h5>
    </my-badge>
    <br /><button @click="isShow = !isShow">隐藏显示切换</button>
  </div>
</template>

<script>
export default {
  name:'myBadgeName',
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  padding: 24px;
}
</style>