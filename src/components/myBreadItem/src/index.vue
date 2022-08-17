<template>
  <div class="breadItem">
    <!-- 面包屑文字部分（点击文字跳转） -->
    <span ref="link" :class="['breadItemWords', to ? 'isLink' : '']">
      <slot></slot>
    </span>
    <!-- 面包屑图标部分 -->
    <!-- 使用饿了么UI的图标做分隔 -->
    <i
      v-if="elementIconClassDivide"
      class="breadItemDivide"
      :class="elementIconClassDivide"
    ></i>
    <!-- 自定义分隔 二者只留一个即可 -->
    <span v-else class="breadItemDivide">{{ customDivide }}</span>
  </div>
</template>

<script>
export default {
  name: "myBreadItem",
  inject: ["fatherInstance"], // 要声明接受以后才能使用，注意名字要和父组件provide的保持一致
  props: {
    // 跳转的path
    to: {},
    // 默认不做replace跳转
    replace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      elementIconClassDivide: "", // 使用饿了么图标做分隔的类名
      customDivide: "", // 自定义分隔内容
    };
  },
  mounted() {
    /**
     * 先祖组件provide提供数据，后代组件inject注入接受数据（可以inject多个实例，故为数组）
     * 这里是以父子组件为例，子组件访问父组件的值（也可考虑使用this.$parent.xxx方式）
     *
     * 渲染分隔符
     * */
    // console.log(
    //   "父组件提供数据，子组件注入自身以后便可访问",
    //   this.fatherInstance
    // );
    // 访问并再存一份去使用，从而渲染分隔内容
    this.elementIconClassDivide = this.fatherInstance.elementIconClassDivide;
    this.customDivide = this.fatherInstance.customDivide;
    /**
     * 跳转功能
     * */
    // 获取组件实例
    const link = this.$refs.link;
    // 绑定监听点击，点击跳转
    link.addEventListener("click", (_) => {
      // 没有传递to就不做跳转
      if (!this.to) return;
      // 当replace为true的时候，才做replace跳转（默认还是push跳转）
      this.replace ? this.$router.replace(this.to) : this.$router.push(this.to);
    });
  },
};
</script>

<style lang="less" scoped>
.breadItem {
  display: inline-block;
  .breadItemWords {
    font-weight: 400;
  }
  .isLink {
    font-weight: 700;
  }
  .isLink:hover {
    color: #409eff;
    cursor: pointer;
  }
  .breadItemDivide {
    margin: 0 8px;
    color: #999;
  }
}
</style>