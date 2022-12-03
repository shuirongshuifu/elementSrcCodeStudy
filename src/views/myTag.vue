<template>
  <div>
    <my-divider lineType="dotted" content-position="left"
      >默认标签样式</my-divider
    >
    <my-tag>默认标签</my-tag>
    <my-tag closable>默认标签可关闭</my-tag>

    <my-divider lineType="dotted" content-position="left"
      >类型标签样式</my-divider
    >
    <my-tag type="primary">类型标签primary</my-tag>
    <my-tag type="primary" closable>类型标签primary可关闭</my-tag>
    <my-tag type="success">类型标签success</my-tag>
    <my-tag type="success" closable>类型标签success可关闭</my-tag>
    <my-tag type="info">类型标签info</my-tag>
    <my-tag type="info" closable>类型标签info可关闭</my-tag>
    <my-tag type="warning">类型标签warning</my-tag>
    <my-tag type="warning" closable>类型标签warning可关闭</my-tag>
    <my-tag type="danger">类型标签danger</my-tag>
    <my-tag type="danger" closable>类型标签danger可关闭</my-tag>

    <my-divider lineType="dotted" content-position="left"
      >自定义标签样式</my-divider
    >
    <my-tag color="blue">标签文字颜色自定义</my-tag>
    <my-tag bgColor="pink">标签背景颜色自定义</my-tag>
    <my-tag borderColor="red">标签边框颜色自定义</my-tag>
    
    <my-divider lineType="dotted" content-position="left"
      >中等标签及大型标签</my-divider
    >
    <my-tag type="primary" sizeType="big" closable>大型标签</my-tag>
    <my-tag type="success" sizeType="medium" closable>中型标签</my-tag>
    <my-tag style="cursor: pointer" type="info" sizeType="small"
      >默认(小型)标签，sizeType="small"写不写都行的</my-tag
    >

    <my-divider lineType="dotted" content-position="left"
      >动态编辑标签</my-divider
    >
    <my-tag
      v-for="(item, index) in arr"
      closable
      @close="handleClose(item)"
      @click="handleClick(item)"
      type="success"
      :key="item"
      >{{ item }}</my-tag
    >
    <el-input
      v-model.trim="val"
      @blur="blurFn"
      size="mini"
      style="width: 120px"
    ></el-input>
  </div>
</template>

<script>
export default {
  name:"myTagName",
  data() {
    return {
      arr: ["标签一", "标签二", "标签三"],
      val: "",
    };
  },
  methods: {
    blurFn() {
      if (this.val === "") return;
      this.arr.push(this.val);
      this.val = "";
    },
    handleClose(tag) {
      // 找到点击的是哪个
      let i = this.arr.findIndex((item) => {
        return tag === item;
      });
      // 删除之
      this.arr.splice(i, 1);
    },
    handleClick(tag) {
      console.log("点击标签啦", tag);
    },
  },
};
</script>