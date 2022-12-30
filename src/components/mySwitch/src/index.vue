<template>
  <div
    class="mySwitchWrap"
    :class="[disabled ? 'disabledSwitch' : '', size]"
    @click="changeStatus"
  >
    <!-- input标签 -->
    <input
      class="switchInput"
      type="checkbox"
      @change="changeStatus"
      ref="input"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      @keydown.enter="changeStatus"
    />
    <!-- 主要内容 -->
    <span
      :class="[
        'switchCentre',
        'circleDotLeft',
        isOpen ? 'changeCircleDotRight' : '',
      ]"
      :style="{
        background: computedBackground,
        borderColor: computedBackground,
      }"
    >
      <span
        class="text"
        :style="{
          justifyContent: isOpen ? 'flex-start' : 'flex-end',
          padding: isOpen ? '0 28px 0 8px' : '0 8px 0 28px',
        }"
        >{{ isOpen ? openText : closeText }}</span
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "mySwitch",
  props: {
    openText: String,
    closeText: String,
    // v-model搭配value接收数据，this.$emit("input", val)更新数据
    value: {
      type: Boolean,
      default: false, // 默认false
    },
    // 是否禁用，默认不禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // switch打开时为true
    activeValue: {
      type: Boolean,
      default: true,
    },
    // switch关闭时为false
    inactiveValue: {
      type: Boolean,
      default: false,
    },
    // 自定义switch打开时背景色
    activeColor: {
      type: String,
      default: "",
    },
    // 自定义switch关闭时背景色
    inactiveColor: {
      type: String,
      default: "",
    },
    // switch切换框的大小
    size: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 是否打开切换框取决于外层传递的v-model的值是否为true
    isOpen() {
      return this.value === this.activeValue;
    },
    computedBackground() {
      // 若传递了激活颜色和未激活颜色，就根据是否开启状态使用传递的颜色
      if ((this.activeColor.length > 0) & (this.inactiveColor.length > 0)) {
        return this.isOpen ? this.activeColor : this.inactiveColor;
      }
      // 没传递就根据开启使用默认的背景色
      else {
        return this.isOpen ? "#409EFF" : "#C0CCDA";
      }
    },
  },
  methods: {
    changeStatus() {
      // 禁用情况下，不做状态更改切换
      if (this.disabled) {
        return;
      }
      // 首先看是否开启，若开启，就传递不开启；若不开启，就传递开启（因为状态切换，取反）
      const val = this.isOpen ? this.inactiveValue : this.activeValue;
      this.$emit("input", val); // 更新外层v-model绑定的值
      this.$emit("change", val); // 抛出一个change事件以供用户使用
    },
  },
};
</script>

<style scoped lang="less">
.mySwitchWrap {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  margin: 2px;
  /* 将input标签隐藏起来，宽高都为0，透明度也为0，看不到 */
  .switchInput {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .switchCentre {
    display: inline-block;
    width: auto;
    height: 20px;
    color: #fff;
    background-color: #c4c4c4;
    border: 1px solid;
    outline: 0;
    border-radius: 10px;
    box-sizing: border-box;
    transition: all 0.3s; // 加上过渡效果
    position: relative;
    .text {
      min-width: 54px; // 设置最小宽度
      width: fit-content; // 使用fit-content属性，让宽度随着内容多少自适应
      height: 100%;
      font-size: 15px;
      display: flex;
      // justify-content: justifyContent; // 注意，这里也是通过:style控制文字靠左还是靠右
      align-items: center;
      transition: all 0.3s; // 加上过渡效果
    }
  }
  // 默认小圆点在左侧的（使用伪元素创建一个小圆点）
  .circleDotLeft::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -2px;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    border: 1px solid #e9e9e9;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3); // 原来小圆点有一点阴影
    background-color: #fff;
    transition: all 0.3s; // 加上过渡效果
  }
  // 当switch打开时，加上类名~通过更改定位left值控制圆点在右侧
  .changeCircleDotRight::after {
    left: 100%;
    margin-left: -24px;
  }
  // 悬浮加重小圆点阴影
  .circleDotLeft:hover::after {
    box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.5);
  }
}
// 除了cursor样式的not-allowed还要搭配js判断才禁用到位
.disabledSwitch {
  cursor: not-allowed;
  opacity: 0.48;
}
// 禁用情况下，保持小圆点原有阴影
.disabledSwitch .circleDotLeft:hover::after {
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
}
// 小型switch组件做一个缩放
.small {
  zoom: 0.8;
}
// 大型switch组件做一个缩放
.big {
  zoom: 1.6;
}
</style>