<template>
  <div>
    <!-- 手风琴模式 -->
    <my-fold v-model="openArr" accordion @change="changeFn">
      <my-fold-item title="第一项" name="one">我是第一项的内容</my-fold-item>
      <my-fold-item title="第二项" name="two">
        <p>我是第二项的内容</p>
        <p>我是第二项的内容</p>
      </my-fold-item>
      <my-fold-item title="第三项" name="three">
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
      </my-fold-item>
      <my-fold-item title="第四项" name="four">
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
      </my-fold-item>
    </my-fold>
    <br />
    <!-- 可展开多个模式 -->
    <my-fold v-model="openArr2" @change="changeFn">
      <my-fold-item title="第一项" name="one">我是第一项的内容</my-fold-item>
      <my-fold-item title="第二项" name="two">
        <p>我是第二项的内容</p>
        <p>我是第二项的内容</p>
      </my-fold-item>
      <my-fold-item title="第三项" name="three">
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
      </my-fold-item>
      <my-fold-item title="第四项" name="four">
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
      </my-fold-item>
    </my-fold>
  </div>
</template>

<script>
export default {
  name:"myFoldName",
  data() {
    return {
      // 手风琴模式的数组项要么没有项，要么只能有一个项
      openArr: [],
      // 可展开多个的数组，可以有多个项
      openArr2: ["one", "two"],
    };
  },
  methods: {
    changeFn(name, isOpen, vNode) {
      console.log(name, isOpen, vNode);
    },
  },
};
</script>