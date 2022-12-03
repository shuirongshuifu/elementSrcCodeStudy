<template>
  <div class="box">
    <my-divider lineType="dashed" content-position="left"
      >五种链接样式</my-divider
    >
    <my-link>默认超链接</my-link>
    <my-link type="primary">primary超链接</my-link>
    <my-link type="success">success超链接</my-link>
    <my-link type="warning">warning超链接</my-link>
    <my-link type="danger">danger超链接</my-link>
    <my-divider lineType="dashed" content-position="left"
      >是否有下划线</my-divider
    >
    <my-link>默认有下划线</my-link>
    <my-link hideUnderline>也可隐藏下划线</my-link>
    <my-divider lineType="dashed" content-position="left"
      >禁用链接样式</my-divider
    >
    <my-link disabled>禁用|默认超链接</my-link>
    <my-link type="primary" disabled>禁用|primary超链接</my-link>
    <my-link type="success" disabled>禁用|success超链接</my-link>
    <my-link type="warning" disabled>禁用|warning超链接</my-link>
    <my-link type="danger" disabled>禁用|danger超链接</my-link>
    <my-divider lineType="dashed" content-position="left"
      >添加href和target原生属性</my-divider
    >
    <my-link type="primary" href="https://www.baidu.com/">默认self跳转</my-link>
    <my-link type="success" target="_blank" href="https://cn.bing.com/"
      >支持原生属性target等</my-link
    >
    <my-divider lineType="dashed" content-position="left"
      >通过icon属性或者直接在默认插槽中添加图标</my-divider
    >
    <my-link type="primary" icon="el-icon-share">默认图标在前方</my-link>
    <my-link type="success" icon="el-icon-share" back
      >back属性控制图标在后方</my-link
    >
    <my-link type="primary"
      ><i class="el-icon-goods"></i>默认插槽前方加图标</my-link
    >
    <my-link type="success"
      >默认插槽后方加图标 <i class="el-icon-goods"></i
    ></my-link>
    <my-divider lineType="dashed" content-position="left"
      >绑定事件使用</my-divider
    >
    <my-link @click="clickThis" type="danger" icon="el-icon-aim"
      >点击这个哦</my-link
    >
  </div>
</template>

<script>
export default {
  name:"myLinkName",
  methods: {
    clickThis() {
      console.log("注意：当myLink禁用或有href属性时，点击事件失效");
    },
  },
};
</script>