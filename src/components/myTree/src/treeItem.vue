<template>
  <!-- 每一个树节点包含：图标部分、名字部分，因为考虑到递归，所以再拆分一个部分，即有树子节点部分childrenTreeNode -->
  <div class="treeNodeItem">
    <!-- 图标和名字部分，设置tabindex="-1"就可设置:focus的样式了 -->
    <div class="iconAndName" tabindex="-1" @click="clickTree">
      <!-- 有树子节点才去渲染图标 -->
      <i
        v-if="item.children"
        @click.stop="clickIconFold"
        :class="[
          'treeNodeItemIcon',
          iconName ? iconName : 'el-icon-caret-right',
          isFold ? 'iconLeft' : 'iconDown',
        ]"
      ></i>
      <span
        :class="['treeNodeItemName', item.children ? '' : 'noChildrenIcon']"
        >{{ item.name }}</span
      >
      <!-- 注意上方几个动态样式的使用，可以去掉看效果，更加直观 -->
    </div>
    <!-- 展开折叠通过display: none来控制，进一步延伸为通过变量isFold来控制 -->
    <div
      class="childrenTreeNode"
      :style="{
        display: isFold ? 'none' : 'block',
      }"
    >
      <!-- 存在子节点就遍历并递归调用自身这个组件 -->
      <template v-if="item.children">
        <tree-item
          v-for="(ite, ind) in item.children"
          :key="ind"
          :item="ite"
          :expandTree="expandTree"
          :iconName="iconName"
          :clickNameClose="clickNameClose"
          v-on="$listeners"
          v-bind="$attrs"
        ></tree-item>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "treeItem",
  props: {
    // 每一个节点的数据
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    expandTree: Boolean, // 默认把树折叠起来
    iconName: String, // 自定义图标名
    clickNameClose: Boolean, // 点击树节点名字，也可以折叠展开菜单（本来设置只能点击图标）
  },
  watch: {
    // 监听布尔值变量变化，统一折叠或者展开
    expandTree(newVal) {
      this.isFold = !newVal; // 是否要取反取决于大家定义的变量的布尔值
    },
  },
  data() {
    return {
      isFold: true, // 默认有子节点都折叠起来
    };
  },
  mounted() {
    this.isFold = !this.expandTree; // 是否要取反取决于大家定义的变量的布尔值
  },
  methods: {
    clickIconFold() {
      this.isFold = !this.isFold;
      this.$emit("fold", this.item, this.isFold ? "折叠咯" : "展开啦");
    },
    clickTree() {
      // 默认是点击小图标才能关闭，加上clickNameClose为true属性，设置点击树节点name也能关闭
      if (this.clickNameClose) {
        this.clickIconFold();
      }
      this.$emit("clickTree", this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.treeNodeItem {
  width: 100%;
  height: auto;
  // 通过css解决树结构缩进问题，且要搭配.my-tree-wrap > .treeNodeItem { padding: 0; } (子元素选择器，并非后代元素选择器)
  padding-left: 12px;
  .iconAndName {
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    .treeNodeItemIcon {
      margin-right: 4px;
    }
    // 点击图标旋转一下
    .iconDown {
      transform: rotate(90deg);
      transition: all 0.3s;
    }
    .iconLeft {
      transition: all 0.3s;
    }
    .treeNodeItemName {
      color: #666;
      word-break: keep-all; // 不换行
    }
    // 位置对齐一下
    .noChildrenIcon {
      margin-left: 20px;
    }
  }
  .iconAndName:hover {
    background-color: #f5f7fa;
  }
  // 搭配tabindex='-1'设置选中聚焦时的背景色
  .iconAndName:focus {
    background-color: #f5f7fa;
  }
}
</style>