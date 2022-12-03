<script>
const typeArr = ["primary", "success", "info", "warning", "danger"]; // 标签类型数组
const sizeType = ["big", "medium", "small"]; // 标签大小数组
export default {
  name: "myTag",
  props: {
    closable: Boolean, // 是否展示可关闭的小叉号图标
    color: String, // 标签文字的颜色
    bgColor: String, // 标签背景色
    borderColor: String, // 标签边框颜色
    // 五种标签类型
    type: {
      type: String,
      validator(val) {
        return typeArr.includes(val); // 校验类型
      },
    },
    // 三种标签大小
    sizeType: {
      type: String,
      validator(val) {
        return sizeType.includes(val); // 校验大小
      },
    },
  },
  methods: {
    handleClose(event) {
      /* 阻止冒泡防止与下方的handleClick方法冲突，要不然点击close关闭小图标，也会
         触发下方click事件的执行。即：内层事件阻止冒泡与外层事件隔离开来 */
      event.stopPropagation();
      this.$emit("close", event);
    },
    handleClick(event) {
      this.$emit("click", event);
    },
  },
  // render函数jsx语法更加灵活
  render(h) {
    // 1. 准备样式类 class绑定classArr数组常用样式，style绑定props变量自定义样式
    const classArr = ["my-tag", this.type, this.sizeType];
    // 2. 准备一个dom，并绑定相关class、style、event
    const tagEl = (
      <span
        class={classArr}
        style={{
          backgroundColor: this.bgColor,
          color: this.color,
          borderColor: this.borderColor,
        }}
        on-click={this.handleClick}
      >
        {/* 默认插槽渲染内容即my-tag标签中的文字 */}
        {this.$slots.default}
        {/* 三元表达式条件控制是否渲染关闭小图标 */}
        {this.closable ? (
          <span class="close-tag" on-click={this.handleClose}>
            x
          </span>
        ) : null}
      </span>
    );
    // 3. 返回render渲染之
    return <transition name="el-fade-in">{tagEl}</transition>;
    // 使用饿了么UI自带的渐变过渡动画
  },
};
</script>
<style scoped>
/* 默认标签样式 */
.my-tag {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 8px;
  color: #252525;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  height: auto;
  line-height: 20px;
  /* margin: 0 8px 8px 0; */
}
/* 标签关闭小叉号样式 */
.close-tag {
  position: relative;
  margin-left: 5px;
  cursor: pointer;
  display: inline-block;
  transform: translateY(-6%);
}
/* 5种类型标签样式 */
.primary {
  color: #409eff;
  border: 1px solid #d9ecff;
  background-color: #ecf5ff;
}
.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
/* 默认小型标签样式，可选值为中等标签、大型标签。当然这里没有small，因为small就是默认的 */
.big {
  padding: 4px 10px;
}
.medium {
  padding: 2px 10px;
}
</style>