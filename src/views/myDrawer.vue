<template>
  <div>
    <h4>isShowDrawer.sync属性控制是否显示抽屉</h4>
    <h4>title属性控制抽屉的头部标题</h4>
    <h4>direction属性控制抽屉的4个方向</h4>
    <h4>beforeClose函数属性关闭抽屉前的操作动作</h4>
    <h4>showCloseIcon属性控制是否显示抽屉的关闭小按钮</h4>
    <h4>isShowHeader属性控制是否显示抽屉的头部内容</h4>
    <h4>mask属性控制是否显示抽屉的背景遮罩层</h4>
    <h4>slot="title"具名插槽控制头部的标题内容</h4>
    <h4>clickMaskClose属性控制是否能够点击背景遮罩层关闭抽屉</h4>
    <br />
    <my-drawer
      :isShowDrawer.sync="isShowDrawer1"
      title="上方弹出direction='top'"
      direction="top"
      :beforeClose="handleClose"
      :showCloseIcon="false"
    ></my-drawer>
    <my-drawer
      :isShowDrawer.sync="isShowDrawer2"
      title="下方弹出"
      direction="bottom"
      :isShowHeader="false"
    >
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
      <h1>:isShowHeader="false"去掉抽屉的头部内容</h1>
    </my-drawer>
    <my-drawer
      :isShowDrawer.sync="isShowDrawer3"
      direction="left"
      :mask="false"
    >
      <span slot="title">左侧命名插槽弹出哦^_^</span>
      <span>没有背景遮罩层</span>
    </my-drawer>
    <my-drawer
      :isShowDrawer.sync="isShowDrawer4"
      direction="right"
      :clickMaskClose="false"
    >
      <span slot="title">右侧命名插槽弹出哦^_^</span>
      <span>设置点击背景遮罩层不关闭，只能点击小箭头，或自定义按钮关闭</span>
      <br />
      <br />
      <br />
      <br />
      <el-button
        @click="isShowDrawer4 = false"
        type="success"
        size="small"
        plain
        >自定义关闭</el-button
      >
    </my-drawer>
    <el-button @click="topOpen" type="success" plain>上方弹出</el-button>
    <el-button @click="bottomOpen" type="success" plain>下方弹出</el-button>
    <el-button @click="leftOpen" type="success" plain>左侧弹出</el-button>
    <el-button @click="rightOpen" type="success" plain>右侧弹出</el-button>
  </div>
</template>

<script>
export default {
  name:"myDrawerName",
  data() {
    return {
      isShowDrawer1: false,
      isShowDrawer2: false,
      isShowDrawer3: false,
      isShowDrawer4: false,
    };
  },
  methods: {
    topOpen() {
      this.isShowDrawer1 = true;
    },
    bottomOpen() {
      this.isShowDrawer2 = true;
    },
    leftOpen() {
      this.isShowDrawer3 = true;
    },
    rightOpen() {
      this.isShowDrawer4 = true;
    },
    handleClose(close) {
      console.log(666);
      this.$confirm("确认关闭close()函数关闭")
        .then((_) => {
          close();
        })
        .catch((_) => {});
    },
  },
};
</script>