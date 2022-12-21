<template>
  <div class="myButtonGroup">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "myButtonGroup",
};
</script>
<style>
.myButtonGroup {
  display: inline-flex !important;
  align-items: center;
}
</style>