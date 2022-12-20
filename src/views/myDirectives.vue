<template>
  <div>
    <div v-waves class="item">波纹自定义指令</div>
    <div v-waves="'pink'" class="item">波纹指令传入颜色</div>
    <div v-copy class="item">一键复制自定义指令</div>
    <el-input v-copy v-model="val"></el-input>
    <br />
    <br />
    <button @click="visible = !visible">点击隐藏显示</button>
    <button v-showshow="visible">v-showshow指令</button>
  </div>
</template>

<script>
export default {
  name: "myDirectivesName",
  data() {
    return {
      val: "加上v-copy指令,点击即可复制",
      visible: false,
    };
  },
};
</script>

<style>
.item {
  width: 180px;
  height: 60px;
  line-height: 60px;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #aaa;
  margin-bottom: 18px;
}
</style>