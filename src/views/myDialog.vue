<template>
  <div class="dialogWrap">
    <button @click="dialog1 = true">弹框一</button>
    <br />
    <br />
    <button @click="dialog2 = true">弹框二</button>
    <br />
    <br />
    <button @click="dialog3 = true">弹框三</button>
    <!-- 弹框一 -->
    <my-dialog
      :isShowDialog.sync="dialog1"
      @hasClosed="hasClosed"
      :mask="false"
    >
      <span slot="header">弹框一：头部命名插槽 slot="header"</span>
      <div class="dialogBox">
        <h1>两个插槽</h1>
        <h1>mask为false，关闭背景层</h1>
        <h1>两个插槽</h1>
        <h1>mask为false，关闭背景层</h1>
        <h1>两个插槽</h1>
        <h1>mask为false，关闭背景层</h1>
        <h1>两个插槽</h1>
        <h1>mask为false，关闭背景层</h1>
      </div>
      <span slot="footer">脚部命名插槽 slot="footer"</span>
    </my-dialog>
    <br />
    <!-- 弹框二 -->
    <my-dialog
      :isShowDialog.sync="dialog2"
      :isShowFoot="false"
      title="弹框二"
      :beforeClose="beforeClose"
      @hasClosed="hasClosed"
    >
      <div class="dialogBox">
        <h3>title:弹框标题</h3>
        <h3>isShowFoot:没有弹框脚部</h3>
      </div>
    </my-dialog>
    <br />
    <!-- 弹框三 -->
    <my-dialog
      :isShowDialog.sync="dialog3"
      title="弹框三"
      :beforeClose="beforeClose"
      @hasClosed="hasClosed"
      :clickMaskClose="true"
    >
      <div class="dialogBox">
        <h3>mask不要遮罩背景层</h3>
        <h3>clickMaskClose允许点击遮罩背景层去关闭</h3>
      </div>
    </my-dialog>
  </div>
</template>

<script>
export default {
  name:"myDialogName",
  data() {
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
    };
  },
  methods: {
    beforeClose() {
      // return false // return false始终可以关上
      // return true // return true始终可以关上
      // return
      var p = new Promise((resolve, reject) => {
        this.$confirm(`是否关闭弹框?`, "提示", {
          confirmButtonText: "关上",
          cancelButtonText: "不关",
          type: "warning",
        })
          .then(() => {
            resolve(true); // 告知异步promise结果为通过
          })
          .catch((err) => {
            reject(false); // 告知异步promise结果为不通过
          });
      }).catch((reason) => {
        // 注意此处须用Promise的catch方法捕获错误，否则控制台报错 Uncaught (in promise)
        console.log("reason", reason);
      });
      // 最后返回Promise的结果，即为是否关上
      return p;
    },
    hasClosed() {
      console.log("已经关闭了");
    },
  },
};
</script>

<style lang='less' scoped>
.dialogWrap {
  width: 100%;
  height: 100%;
  //   background-color: pink;
  .dialogBox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 8px;
  }
}
</style>