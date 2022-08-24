<template>
  <!-- 
       hideUnderline ? '' : disabled ? '' : 'underline',
       先看hideUnderline是否为true，为true则要隐藏下划线，即不加underline类名
       再看disabled是否为true，为true则禁用，禁用也要隐藏下划线，即也不加underline类名
       若既不隐藏下划线又不禁用链接，则加上underline类名用于显示下划线
   -->
  <a
    :href="disabled ? null : href"
    :class="[
      'myLink',
      hideUnderline ? '' : disabled ? '' : 'underline',
      type,
      disabled ? 'toDisabled' : '',
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- 
       这里加上v-bind="$attrs"是为了传递更多的属性，做一个参数兜底的功能效果。因为a标签还有其他很多属性，如：
       target、download、type等。props中未声明的参数，会被$attr兜底交给a标签使用。故加了v-bind="$attrs"以后，
       在外层my-link标签上，我们便可正常使用除props中声明的属性了，如使用target原生属性：<my-link target="_blank" href="xxx"/>
    -->
    <!-- 内容区 -->
    <span class="aContent" :class="{ spaceC: icon, back: back }">
      <i :class="icon" v-if="icon"></i>
      <span><slot></slot></span>
    </span>
  </a>
</template>

<script>
export default {
  name: "myLink",
  props: {
    href: String, // a标签的href属性，用于跳转
    disabled: Boolean, // 是否禁用超链接
    type: String, // 标签颜色的类型
    // 是否隐藏下划线
    hideUnderline: {
      type: Boolean,
      default: false, // 默认不隐藏下划线，默认展示下划线
    },
    icon: String, // 使用饿了么UI的小图标
    back: Boolean, // 设置图标在内容后方
  },
  methods: {
    handleClick(event) {
      // 禁用状态下不允许传递事件
      if (this.disabled) {
        return;
      }
      // 有链接了也不允许传递事件
      if (this.href) {
        return;
      }
      // 没有禁用没有链接，便可正常传递事件
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="less" scoped>
// 默认样式
.myLink {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666; // 默认颜色，当然也可以使用type类型的配色
  text-decoration: none; // 去除a标签默认的下划线（不使用自带的下划线效果）
  position: relative; // 定位搭配伪元素实现悬浮下划线效果
  margin: 4px;
  .aContent {
    display: flex;
    align-items: center;
  }
  // 当传的有图标的时候，把第一个元素加上一个右边距，产生间距
  .spaceC > :first-child {
    margin-right: 4px;
  }
  // 控制弹性盒方向，控制图标在后方位置（默认前方位置）
  .back {
    flex-direction: row-reverse;
  }
  // 注意这里要覆盖上方spaceC的样式
  .back > :first-child {
    margin: 0 0 0 4px;
  }
}
// 通过变量控制是否有这个underline类名，从而控制是否有下划线
.underline:hover::after {
  // 这样的话，元素在哪，下划线就在哪里
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  bottom: -2px;
  // 注意，这里不设置颜色，就会跟随参考定位的元素的颜色了
  border-bottom: 1px solid;
}
// 下方的配色是抄iview的
.primary {
  color: #2d8cf0;
}
.success {
  color: #19be6b;
}
.warning {
  color: #f90;
}
.danger {
  color: #ed4014;
}
// 通过透明度模拟禁用的颜色样式效果，要不然要写两份颜色会稍微麻烦一些
.toDisabled {
  opacity: 0.36;
  cursor: not-allowed;
}
</style>