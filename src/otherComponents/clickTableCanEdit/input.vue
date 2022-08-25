<template>
  <div class="cell">
    <el-input
      ref="elInputRef"
      size="mini"
      v-model.trim="cellValue"
      @blur="blurFn"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    cellValue: {
      type: String | Number,
      default: "",
    },
    saveRowData: Function, // 外部，传递进来一个函数，当这个el-input失去焦点的时候，通过此函数通知外部
    cellDom: Node, // 单元格dom
    row: Object, // 单元格所在行数据
    property: String, // 单元格的key
    // 校验操作的两个参数
    validateFn: Function, // 校验函数
    validateMessage: String, // 当出现校验错误的提示消息
  },
  mounted() {
    // 用户双击后，让其处于获取焦点的状态
    this.$refs.elInputRef.focus();
  },
  methods: {
    blurFn() {
      // 失去焦点，再抛出去，通知外部
      this.saveRowData({
        cellValue: this.cellValue,
        cellDom: this.cellDom,
        row: this.row,
        property: this.property,
        // 加上校验函数，传递校验函数就使用校验函数校验一下，没传递校验函数就默认为true通过校验
        isPassValidate: this.validateFn(this.cellValue),
        validateMessage: this.validateMessage,
      });
    },
  },
};
</script>

<style>
.cell {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;
}
</style>