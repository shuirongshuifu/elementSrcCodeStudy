<template>
  <div>
    <my-divider content-position="left">默认颜文字分隔</my-divider>
    <my-bread>
      <my-bread-item>外层</my-bread-item>
      <my-bread-item>中层</my-bread-item>
      <my-bread-item>内层</my-bread-item>
    </my-bread>
    <my-divider content-position="left">自定义分隔内容</my-divider>
    <my-bread customDivide=">">
      <my-bread-item>外层</my-bread-item>
      <my-bread-item>中层</my-bread-item>
      <my-bread-item>内层</my-bread-item>
    </my-bread>
    <my-divider content-position="left">使用饿了么UI的图标做分隔</my-divider>
    <my-bread elementIconClassDivide="el-icon-wind-power">
      <my-bread-item>外层</my-bread-item>
      <my-bread-item>中层</my-bread-item>
      <my-bread-item>内层</my-bread-item>
    </my-bread>
    <my-divider content-position="left">可跳转</my-divider>
    <my-bread elementIconClassDivide="el-icon-location-outline">
      <my-bread-item :to="{ path: '/myTag' }">myTag跳转</my-bread-item>
      <my-bread-item replace :to="{ path: '/myBadge' }">myBadge跳转（replace）</my-bread-item>
      <my-bread-item>当下</my-bread-item>
    </my-bread>
  </div>
</template>

<script>
export default {
  name:'myBreadName',
};
</script>