<template>
  <div class="wsBox">
    <el-button
      size="mini"
      class="wsOpen"
      type="success"
      icon="el-icon-check"
      @click="openopen"
      >开启WebSocket</el-button
    >
    <el-button
      size="mini"
      class="clientSend"
      type="primary"
      icon="el-icon-s-promotion"
      @click="sendsend"
      >客户端发送消息</el-button
    >
    <el-button
      size="mini"
      class="closeWs"
      type="danger"
      icon="el-icon-close"
      @click="closeclose"
      >关闭WebSocket</el-button
    >
    <el-button
      size="mini"
      class="serverMsgs"
      type="info"
      icon="el-icon-chat-dot-round"
      @click="showMsgs"
      >服务端推送的消息数组</el-button
    >
    <br />
    <br />
    <h3 v-for="(item, index) in msgs" :key="index">{{ item }}</h3>
  </div>
</template>

<script>
import myWebSocket from "@/class/ws";
export default {
  name: "wsRouteName",
  data() {
    return {
      myWs: null,
      timer: null,
    };
  },
  created() {
    this.myWs = new myWebSocket();
  },
  computed: {
    msgs() {
      return this.myWs.messageArr.slice(-5);
    },
  },
  methods: {
    openopen() {
      this.myWs.createFn();
    },
    closeclose() {
      this.myWs.closeFn();
    },
    sendsend() {
      this.myWs.sendFn("客户端主动发一堆消息");
    },
    showMsgs() {
      console.log("myWs.messageArr", this.myWs.messageArr);
      // console.log("myWs.messageArr", this.myWs.messageArr);
    },
  },
  beforeDestroy() {
    this.myWs.closeFn();
  },
};
</script>

<style lang='less' scoped>
.wsBox {
  width: 100%;
  height: 100%;
  .el-button {
    margin-bottom: 12px;
  }
}
</style>