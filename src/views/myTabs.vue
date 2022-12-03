<template>
  <div>
    <my-tabs v-model="activeName" @tabClick="tabClick">
      <my-tab-content label="孙悟空" name="sunwukong"
        >孙悟空内容</my-tab-content
      >
      <my-tab-content label="猪八戒" name="zhubajie">猪八戒内容</my-tab-content>
      <my-tab-content label="沙和尚" name="shaheshang"
        >沙和尚内容</my-tab-content
      >
      <my-tab-content label="唐僧" name="tangseng">唐僧内容</my-tab-content>
      <my-tab-content label="白龙马" name="bailongma"
        >白龙马内容</my-tab-content
      >
    </my-tabs>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <hr />
    <my-tabs v-model="activeName2" :before-leave="beforeLeave">
      <my-tab-content label="武松" name="wusong">武松内容</my-tab-content>
      <my-tab-content label="宋江" name="songjiang">松江内容</my-tab-content>
      <my-tab-content label="林冲" name="linchong">林冲内容</my-tab-content>
      <my-tab-content disabled label="吴用" name="wuyong"
        >吴用内容</my-tab-content
      >
    </my-tabs>
  </div>
</template>

<script>
export default {
  name:"myTabsName",
  data() {
    return {
      activeName: "sunwukong",
      activeName2: "wusong",
    };
  },
  methods: {
    tabClick(tabItem) {
      console.log("外层点击", tabItem);
    },
    beforeLeave(newTabName, oldTabName) {
      console.log("外层", newTabName, oldTabName);
      /**
       * 方式一：
       *    return true; // 表示允许切换tab
       *    return false; // 表示不允许切换tab
       * */
      /**
       * 方式二：
       *    使用Promise处理异步相关切换tab操作，比如问询操作
       * */
      var p = new Promise((resolve, reject) => {
        this.$confirm(`确认由${oldTabName}切换到${newTabName}`, "tab change", {
          confirmButtonText: "确认切换",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            resolve(true); // 允许放行通过切换tab
          })
          .catch((err) => {
            reject(false); // 不允许切换tab
          });
      }).catch((reason) => {
        // 注意此处须用Promise的catch方法捕获错误，否则控制台报错 Uncaught (in promise)
        console.log("reason", reason);
      });
      // 最后返回Promise的结果
      return p;
    },
  },
};
</script>

<style lang="less" scoped>
</style>