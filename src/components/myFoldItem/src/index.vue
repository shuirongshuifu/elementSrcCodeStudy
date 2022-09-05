<template>
  <div class="foldItem">
    <!-- 头部部分，主要是点击时展开内容，以及做小箭头的旋转，和头部的标题呈现 -->
    <div class="foldItemHeader" @click="handleHeaderClick">
      <i
        v-if="!hiddenArrow"
        class="el-icon-arrow-right"
        :class="{ rotate90deg: isOpen }"
      ></i>
      {{ title }}
    </div>
    <!-- 内容体部分，主要是展开折叠时加上高度过渡效果，这里封装了一个额外的工具组件 -->
    <transition-height class="transitionHeight" :show="isOpen">
      <div class="foldItemBody">
        <slot></slot>
      </div>
    </transition-height>
  </div>
</template>

<script>
/**
 * 注意：my-fold-item组件标签中的内容不支持异步数据，解决方案如下：
 * https://juejin.cn/post/7137127479969316895#comment
 * */ 
import transitionHeight from "@/components/myUtils/transitionHeight/index.vue";
export default {
  name: "myFoldItem",
  components: {
    transitionHeight, // 高度过渡组件
  },
  props: {
    title: String, // 折叠面板的标题
    name: String, // 折叠面板的名字，即为唯一标识符（不可与其他重复！）
    // 是否隐藏小箭头，默认false，即展示小箭头
    hiddenArrow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // true为展开即open，false为折叠
      // 初始情况下取到父组件myFold组件的展开的数组，看看自身是否在其中
      isOpen: this.$parent.openArr.includes(this.name),
    };
  },
  methods: {
    // 点击展开或折叠
    handleHeaderClick() {
      this.isOpen = !this.isOpen; // 内容依托于变量isOpen直接更新即可
      this.$parent.updateVModel(this.name, this.isOpen, this); // 于此同时也要通知父组件去更新
    },
  },
};
</script>

<style lang="less" scoped>
.foldItem {
  width: 100%;
  height: auto; // 高度由内容区撑开
  .foldItemHeader {
    box-sizing: border-box;
    padding-left: 8px;
    min-height: 50px;
    display: flex;
    align-items: center;
    background-color: #fafafa;
    cursor: pointer;
    border-bottom: 1px solid #e9e9e9;
    // 展开折叠项时，小图标旋转效果
    i {
      transform: rotate(0deg);
      transition: all 0.24s;
      margin-right: 8px;
    }
    .rotate90deg {
      transform: rotate(90deg);
      transition: all 0.24s;
    }
  }
  .foldItemBody {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 12px 12px 12px 8px;
    border-bottom: 1px solid #e9e9e9;
  }
}
// 去除和父组件的边框重叠
.foldItem:last-child .foldItemHeader {
  border-bottom: none !important;
}
.foldItem:last-child .transitionHeight .foldItemBody {
  border-top: 1px solid #e9e9e9;
  border-bottom: none !important;
}
</style>