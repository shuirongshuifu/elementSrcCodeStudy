<template>
  <!-- 
    1. :appendToBody="true"是否把位置加到body外层标签上
        饿了么UI和antD是true，iview和vuetifyjs是false
    2. trigger属性触发方式，常用hover悬浮触发、clickToOpen鼠标点击触发
    3. :visibleArrow="true"默认显示三角形小箭头，但是可以修改
        也可以使用伪元素自定义其对应样式，这样更加自由灵活一些
    4. :options="{ ... } 其实就是popper.js的配置项，可看对应官方文档
    5. placement: placement 即为tooltip出现的位置，有12个位置，即：placementArr
    6. modifiers: { ... } 此修饰符配置对象主要是控制定位的相关参数
    7. offset即偏移量在原有位置上进行移动微调，这里暂时不设置了，直接使用
        给.popper加上外边距即可margin: 12px !important;
    8. computeStyle.gpuAcceleration = false 关闭css3的transform定位，因为要自定义
    9. preventOverflow.boundariesElement = 'window' 防止popper元素定位到边界外
        如：当左侧距离不够用的时候，即使设置placement='left'但是tooltip依旧会在右侧
    10. <div class="popper" /> 此标签是tooltip的容器，所以我们可以设置对应想要的样式
    11. rootClass="selfSetRootClass"搭配transition="fade"实现淡入淡出过渡效果
    12. slot="reference"命名插槽是触发tooltip打开/关闭的dom元素
    13. disabled是否关闭这个tooltip
  -->
  <popper
    :appendToBody="true"
    trigger="hover"
    :visibleArrow="true"
    :options="{
      placement: placement,
      modifiers: {
        offset: {
          offset: 0,
        },
        computeStyle: {
          gpuAcceleration: false,
        },
        preventOverflow: {
          boundariesElement: 'window',
        },
      },
    }"
    rootClass="selfSetRootClass"
    transition="fade"
    :disabled="disabled"
  >
    <!-- 内容过多的时候，建议使用content插槽，便于自定义样式 -->
    <div
      v-if="$slots.content"
      :class="{ isLightPopper: light }"
      ref="popperRef"
      class="popper"
    >
      <slot name="content"></slot>
    </div>
    <!-- 内容少的话，直接content属性 -->
    <div
      v-else
      :class="{ isLightPopper: light }"
      ref="popperRef"
      class="popper"
    >
      {{ content }}
    </div>
    <!-- 把外界传递的普通插槽当做具名插槽传递给子组件使用 -->
    <slot slot="reference"></slot>
  </popper>
</template>

<script>
// 基于vue-popperjs的二次封装
import popper from "vue-popperjs"; // vue-popperjs基于popper.js二次封装
import "vue-popperjs/dist/vue-popper.css";
// 总共12个位置
const placementArr = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
];
export default {
  name: "myTooltip",
  components: { popper }, // 注册并使用vue-popperjs插件组件
  props: {
    // 12个tooltip位置
    placement: {
      type: String,
      default: "top-start", // 默认
      validator(val) {
        return placementArr.includes(val); // 位置校验函数
      },
    },
    // 内容（同内容插槽，不过内容插槽的权重高一些）
    content: {
      type: String,
      default: "",
    },
    // 是否是亮色模式，默认是暗色模式
    light: {
      type: Boolean,
      default: false,
    },
    // 是否禁用即关掉tooltip
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less">
// 覆盖部分默认的样式（不用加/deep/ ）
.popper {
  box-sizing: border-box;
  padding: 6px 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #333;
  border: none;
}
// 设置一个tootip的外边距（也可以使用offset）
.popper[x-placement^="top"] {
  margin-bottom: 12px !important;
}
.popper[x-placement^="bottom"] {
  margin-top: 12px !important;
}
.popper[x-placement^="left"] {
  margin-right: 12px !important;
}
.popper[x-placement^="right"] {
  margin-left: 12px !important;
}
// 覆盖原有的默认三角形背景色样式
.popper[x-placement^="top"] .popper__arrow {
  border-color: #333 transparent transparent transparent;
}
.popper[x-placement^="bottom"] .popper__arrow {
  border-color: transparent transparent #333 transparent;
}
.popper[x-placement^="right"] .popper__arrow {
  border-color: transparent #333 transparent transparent;
}
.popper[x-placement^="left"] .popper__arrow {
  border-color: transparent transparent transparent #333;
}
// 加上过渡效果(搭配transition="fade")
.selfSetRootClass {
  transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
// 亮色模式样式
.isLightPopper {
  color: #333;
  background-color: #fff;
  filter: drop-shadow(0, 2px, 12px, 0, rgba(0, 0, 0, 0.24));
  box-shadow: 0, 2px, 12px, 0, rgba(0, 0, 0, 0.24);
}
.isLightPopper[x-placement^="top"] .popper__arrow {
  border-color: #fff transparent transparent transparent;
}
.isLightPopper[x-placement^="bottom"] .popper__arrow {
  border-color: transparent transparent #fff transparent;
}
.isLightPopper[x-placement^="right"] .popper__arrow {
  border-color: transparent #fff transparent transparent;
}
.isLightPopper[x-placement^="left"] .popper__arrow {
  border-color: transparent transparent transparent #fff;
}
</style>