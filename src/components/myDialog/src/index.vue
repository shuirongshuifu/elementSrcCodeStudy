<template>
  <!-- 打开弹框的动画 -->
  <transition name="animation">
    <div
      class="dialogBox"
      :class="{ isShowMask: mask == true }"
      v-show="isShowDialog"
      @click="clickMaskCloseFn"
    >
      <div class="dialogBoxContent" @click.stop>
        <div class="headhead">
          <!-- 这样写可以做到若有传递过来的title就用传递过来的title
          若有传递过来的插槽，就以插槽的为准 -->
          <slot name="header">
            <span>{{ title }}</span>
          </slot>
          <i class="el-icon-close" @click="close" v-show="showCloseIcon"> </i>
        </div>
        <div class="bodybody">
          <!-- 内容区我们使用默认插槽 -->
          <slot></slot>
        </div>
        <div class="footfoot" v-if="isShowFoot">
          <!-- 底部也使用命名插槽 -->
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "myDialog",
  props: {
    // 控制是否展示或隐藏对话框
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    // 父组件传过来的标题值
    title: {
      type: String,
      default: "",
    },
    // 是否显示关闭小图标
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
    // 是否开启背景遮罩层
    mask: {
      type: Boolean,
      default: true,
    },
    // 是否点击遮罩层mask关闭弹出框
    clickMaskClose: {
      type: Boolean,
      default: false,
    },
    /* 
        是否展示弹框脚部
            展示：弹框内容区 = headhead + bodybody + footfoot
            不展示：弹框内容区 = headhead + bodybody
    */
    isShowFoot: {
      type: Boolean,
      default: true,
    },
    beforeClose: {
      type: Function,
      default: () => {
        return true; // 默认为true，始终允许切换tab
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 关闭弹出框
    async close() {
      const flag = await this.beforeClose(); // 存在异步关闭情况，可
      if (flag) {
        this.$emit("update:isShowDialog", false);
        this.$emit("hasClosed");
      }
    },
    // 点击遮罩层关闭弹框
    clickMaskCloseFn() {
      if (this.clickMaskClose == true) {
        this.close();
      } else {
        /* 这里要控制一下冒泡事件，注意第十行使用@click.stop
           不控制冒泡的话，点击内容区也会导致弹出框关闭*/
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dialogBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999999;
  .dialogBoxContent {
    width: 600px;
    height: 400px;
    border: 1px solid #e9e9e9;
    border-radius: 6px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    .headhead {
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #e9e9e9;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 16px;
        font-weight: bold;
      }
      i {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .bodybody {
      flex: 1;
      overflow-y: auto;
    }
    .footfoot {
      width: 100%;
      height: 48px;
      line-height: 48px;
      box-sizing: border-box;
      border-top: 1px solid #e9e9e9;
      padding: 0 20px;
    }
  }
}
.isShowMask {
  background-color: rgba(0, 0, 0, 0.3);
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
}
.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.3s;
}
</style>
