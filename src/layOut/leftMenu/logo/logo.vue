<template>
  <div class="logoWrap">
    <img :src="logoSrc" class="logoC" />
    <logo-words v-if="!collapse"></logo-words>
  </div>
</template>

<script>
import logoWords from "./logoWords.vue";
export default {
  components: {
    logoWords,
  },
  props: {
    collapse: Boolean,
  },
  data() {
    return {
      logoSrc: "http://ashuai.work/static/img/avantar.png",
    };
  },
};
</script>

<style lang='less'>
.logoWrap {
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  box-sizing: border-box;
  padding: 0 4px;
  .logoC {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }
}
</style>