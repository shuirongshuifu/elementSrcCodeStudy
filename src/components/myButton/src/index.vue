<template>
  <button
    :style="styleCal"
    :class="[
      'myButton',
      disabled ? 'disabledBtn' : '',
      loading ? 'loadingBtn' : '',
      type,
    ]"
    :disabled="disabled || loading"
    @click="clickButton"
  >
    <i class="el-icon-loading iii" v-if="loading"></i>
    <!-- 使用传进来的图标，通过动态style控制图标和文字见的间隔，同一时刻下，
    只能有一个图标出现，所以有loading图标了，就不能有别的图标了 -->
    <i :class="icon" :style="styleGap" v-if="icon && !loading"></i>
    <!-- 普通插槽有东西才去渲染 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
// 类型校验
const typeArr = [
  "",
  "primary",
  "success",
  "warning",
  "error",
  "text",
  "dangerText",
];
const sizeArr = ["", "small", "middle", "big"]; // 大小检验
const sizeObj = {
  // 不同的大小指定不同的缩放程度
  small: 0.85,
  middle: 1,
  big: 1.2,
};
export default {
  name: "myButton",
  props: {
    disabled: Boolean,
    loading: Boolean, // loading时，不可继续点击（继续点击不生效）
    rightIcon: Boolean, // 通过弹性盒的方向控制图标的位置
    type: {
      type: String,
      validator(val) {
        return typeArr.includes(val);
      },
    },
    size: {
      type: String,
      validator(val) {
        return sizeArr.includes(val);
      },
    },
    icon: String,
  },
  computed: {
    styleCal() {
      // 控制缩放和指定默认圆角以及设置图标在文字左侧还是右侧
      let styleObj = {
        zoom: sizeObj[this.size],
        borderRadius: "5px",
        flexDirection: this.rightIcon ? "row-reverse" : "row",
      };
      // 当有图标，且没有文字的时候（或默认插槽没传），就让按钮变成圆形按钮
      if ((this.icon && !this.$slots.default) || !this.$slots.default[0].text) {
        styleObj["borderRadius"] = "50%";
        styleObj["padding"] = "12px";
      }
      return styleObj;
    },
    styleGap() {
      // 有图标，有文字，图标在左侧
      if (
        (this.icon && !this.$slots.default) ||
        (this.$slots.default[0].text && !this.rightIcon)
      ) {
        return {
          paddingRight: "1px",
        };
      }
      // 有图标，有文字，图标在右侧
      if (
        (this.icon && !this.$slots.default) ||
        (this.$slots.default[0].text && this.rightIcon)
      ) {
        return {
          paddingLeft: "1px",
        };
      }
    },
  },
  methods: {
    clickButton(e) {
      if (this.disabled) return;
      this.$emit("click", e); // 传出去，便于使用
    },
  },
};
</script>

<style lang='less' scoped>
/* 关于按钮的样式即写好几套样式，然后通过类型等各种参数去控制样式，最终实现对应效果 */

// 基础样式
.myButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.1);
  color: #222;
  border: none;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  font-size: 14px;
  .iii {
    margin-right: 4px;
  }
}
.myButton:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.myButton:active {
  background-color: rgba(0, 0, 0, 0.3);
}

// primary样式
.primary {
  background-color: #1867c0;
  color: #fff;
}
.primary:hover {
  background-color: #0854ac;
}
.primary:active {
  background-color: #033d7f;
}

// success样式
.success {
  background-color: #19be6b;
  color: #fff;
}
.success:hover {
  background-color: #0ea459;
}
.success:active {
  background-color: #008140;
}

// warning样式
.warning {
  background-color: #ffc163;
  color: #fff;
}
.warning:hover {
  background-color: #db952d;
}
.warning:active {
  background-color: #b97b1d;
}

// error样式
.error {
  background-color: #ff5252;
  color: #fff;
}
.error:hover {
  background-color: #fd3030;
}
.error:active {
  background-color: #d50000;
}

// text样式
.text {
  background-color: unset;
  color: #409eff;
  padding: 2px 4px;
}
.text:hover {
  background-color: unset;
  opacity: 0.9;
}
.text:active {
  background-color: unset;
  opacity: 1;
  color: #1a7ada;
}

// dangerText样式
.dangerText {
  background-color: unset;
  color: #ff5252;
  padding: 2px 4px;
}
.dangerText:hover {
  background-color: unset;
  opacity: 0.9;
}
.dangerText:active {
  background-color: unset;
  opacity: 1;
  color: #d50000;
}

// 加载按钮样式
.loadingBtn {
  opacity: 0.6;
  pointer-events: none; // 值为none就没有hover和active效果了
}

// disabled样式（注意样式的顺序）
.disabledBtn {
  background-color: rgba(0, 0, 0, 0.12);
  color: #bbb;
}
.disabledBtn:hover {
  opacity: 1;
  cursor: not-allowed;
  background-color: rgba(0, 0, 0, 0.12);
}
.disabledBtn:active {
  color: #bbb;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.12);
}

// 附上按钮组样式
.myButtonGroup > .myButton {
  border-radius: unset !important;
  border-right: 1px solid #fff;
}
.myButtonGroup > .myButton:first-of-type {
  border-top-left-radius: 5px !important;
  border-bottom-left-radius: 5px !important;
}
.myButtonGroup > .myButton:last-of-type {
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  border-right: none;
}
</style>