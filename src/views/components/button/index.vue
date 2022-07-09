<template>
  <button
    :disabled="disabled"
    :class="[
      kkk,
      {
        disabledButton: disabled,
      },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "small",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.kkk {
  font-weight: 700;
}
button {
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  padding: 6px 8px;
  border-radius: 4px;
  margin-right: 6px;
  color: #666;
}
button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.disabledButton {
  cursor: not-allowed;
  color: #999;
}
.disabledButton:hover {
  color: #999;
  border-color: #dcdfe6;
  background-color: #fff;
  font-weight: normal;
}
</style>