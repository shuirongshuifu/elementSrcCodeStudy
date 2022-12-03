<template>
  <div class="wrap">
    <h3>实线solid靠左</h3>
    <my-divider class="staticClass_must_hava" content-position="left"
      >早上好</my-divider
    >
    <h3>实线solid居中</h3>
    <my-divider content-position="center">中午好</my-divider>
    <h3>实线solid靠右</h3>
    <my-divider content-position="right">下午好</my-divider>
    <h3>虚线dashed靠左</h3>
    <my-divider lineType="dashed" content-position="left">早上好</my-divider>
    <h3>虚线dashed居中</h3>
    <my-divider lineType="dashed" content-position="center">中午好</my-divider>
    <h3>虚线dashed靠右</h3>
    <my-divider lineType="dashed" content-position="right">下午好</my-divider>
    <h3>圆点dotted靠左</h3>
    <my-divider lineType="dotted" content-position="left">早上好</my-divider>
    <h3>圆点dotted居中</h3>
    <my-divider lineType="dotted" content-position="center">中午好</my-divider>
    <h3>圆点dotted靠右</h3>
    <my-divider lineType="dotted" content-position="right">下午好</my-divider>
    <h3>竖向分割线</h3>
    <span>早上好</span>
    <my-divider direction="vertical"></my-divider>
    <span>中午好</span>
    <my-divider direction="vertical"></my-divider>
    <span>下午好</span>
  </div>
</template>

<script>
export default {
  name:"myDividerName",
};
</script>

<style>
.staticClass_must_hava {
  border-bottom: 1px solid red !important;
}
</style>