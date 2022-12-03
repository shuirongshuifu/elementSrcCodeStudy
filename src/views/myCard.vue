<template>
  <div class="box">
    <my-card class="cardClass" shadow="hover">悬浮出阴影</my-card>
    <my-card class="cardClass" shadow="always">始终出阴影</my-card>
    <my-card class="cardClass" shadow="none">没有阴影</my-card>
    <my-card class="cardClass" shadow="hover" isHoverUp>悬浮出阴影上移</my-card>
    <my-card class="cardClass" shadow="always" isHoverUp>始终出阴影上移</my-card>
    <my-card class="cardClass" shadow="none" isHoverUp>没有阴影上移</my-card>
    <my-card class="cardClass" shadow="hover" zoomCard>悬浮出阴影放大</my-card>
    <my-card class="cardClass" shadow="always" zoomCard>始终出阴影放大</my-card>
    <my-card class="cardClass" shadow="none" zoomCard>没有阴影放大</my-card>
    <my-card class="cardClass" :cardStyle="{ padding: 0 }" shadow="hover"
      >使用cardStyle去控制样式，比如这里清除内边距</my-card
    >
    <my-card
      class="cardClass cardClass2"
      :cardStyle="{ background: 'pink' }"
      :backCardStyle="{ background: '#baf' }"
      >悬浮卡片翻转(正面)
      <!-- 当有命名插槽back的时候，自动开启翻转模式 -->
      <div slot="back">背面的内容</div>
    </my-card>
  </div>
</template>

<script>
export default {
  name:'myCardName',
};
</script>

<style lang='less' scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 24px;
  .cardClass {
    width: 240px;
    margin-right: 24px;
    margin-bottom: 24px;
  }
  .cardClass2 {
    height: 180px;
  }
}
</style>