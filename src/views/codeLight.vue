<template>
  <div class="wrap">
    <button @click="changeData">换一批数据</button>
    <button @click="initData">初始数据</button>
    <div v-highlight v-if="!isRender">
      <pre>
        <code>{{vvv}}</code>
      </pre>
    </div>
  </div>
</template>

<script>
// 好用的json数据：http://jsonplaceholder.typicode.com/
const jsonData = `{"code":0,"msg":"成功","data":[{"id":87,"name":"白龙马","age":1,"home":"东海龙宫","remark":"敖烈","is_delete_status":1},{"id":86,"name":"唐僧","age":99,"home":"东土大唐","remark":"金蝉子","is_delete_status":1},{"id":84,"name":"猪八戒","age":88,"home":"高老庄","remark":"天蓬元帅","is_delete_status":1},{"id":83,"name":"孙悟空","age":500,"home":"花果山","remark":"齐天大圣","is_delete_status":1}]}`;
export default {
  name: "codeLightName",
  data() {
    return {
      vvv: JSON.parse(jsonData),
      isRender: false,
    };
  },
  methods: {
    changeData() {
      this.$showDialog({
        text: "数据切换中🐶🐶🐶...",
      });
      this.isRender = true;
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          this.$hideDialog();
          this.isRender = false;
          this.vvv = json;
        });
    },
    initData() {
      this.isRender = true;
      setTimeout(() => {
        this.vvv = JSON.parse(jsonData);
        this.isRender = false;
      }, 240);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
}
</style>
