<template>
  <div
    v-show="isShowTags"
    data-simplebar
    data-simplebar-auto-hide="true"
    class="rightMiddleTags"
    id="rightMiddleTags"
  >
    <simplebar>
      <div class="tagsBox">
        <!-- 首页 -->
        <my-tag
          class="selfClass"
          sizeType="medium"
          type="info"
          @click="handleClick({ path: '/' })"
          :type="$route.path === '/' ? 'success' : 'info'"
          >首页</my-tag
        >
        <!-- 非首页 -->
        <my-tag
          @contextmenu.native.prevent="
            (e) => {
              onContextmenu(e, item);
            }
          "
          class="selfClass"
          style="margin-right: 12px; cursor: pointer"
          v-for="(item, index) in visitedViews"
          :key="item.name"
          sizeType="medium"
          @click="handleClick(item)"
          @close="handleClose(item)"
          closable
          :type="item.name == $route.name ? 'success' : 'info'"
          >{{ item.title }}</my-tag
        >
      </div>
      <!-- 右键菜单 -->
      <my-right-menu
        :class-index="0"
        :rightclickInfo="rightclickInfo"
        @closeCurrent="closeCurrent"
        @closeOther="closeOther"
        @closeAll="closeAll"
      ></my-right-menu>
    </simplebar>
  </div>
</template>

<script>
// 引入sortablejs插件，拖拽主要靠的是这个插件
import Sortable from "sortablejs";
import { mapState } from "vuex";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
export default {
  components: {
    simplebar,
  },
  data() {
    return {
      rightclickInfo: {}, // 关闭当前，关闭其他，全部关闭
    };
  },
  computed: {
    ...mapState({
      visitedViews: (state) => state.tags.visitedViews,
      isShowTags: (state) => state.tags.isShowTags,
    }),
  },
  watch: {
    // 1. 监听路由，当路由变化了以后，去追加tags（tags不能重复）
    $route(newRoute, oldRoute) {
      this.addTags(newRoute, oldRoute);
    },
  },
  mounted() {
    // this.columnDropInit();
  },
  methods: {
    // 普通dom右键
    onContextmenu(e, item) {
      // console.log("e", e, item);
      this.rightclickInfo = {
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        menulists: [
          {
            fnName: "closeCurrent",
            params: item,
            icoName: "el-icon-error",
            btnName: "关闭当前",
          },
          {
            fnName: "closeOther",
            params: item,
            icoName: "el-icon-circle-close",
            btnName: "关闭其他",
          },
          {
            fnName: "closeAll",
            params: item,
            icoName: "el-icon-close",
            btnName: "全部关闭",
          },
        ],
      };
    },
    // 关闭当前
    closeCurrent(params) {
      this.handleClose(params);
    },
    // 关闭其他
    closeOther(params) {
      this.$store.dispatch("tags/delete_otherview", { name: params.name });
    },
    // 全部关闭（只保留一个首页）
    closeAll(params) {
      this.$store.dispatch("tags/delete_allview");
    },
    addTags(newRoute, oldRoute) {
      // 路由表中的name都要写的
      if (newRoute.name) {
        this.$store.dispatch("tags/add_view", newRoute);
      }
      // console.log("路由变化", newRoute, oldRoute);
    },
    handleClick(item) {
      this.$router.push({
        path: item.path,
      });
    },
    handleClose(item) {
      let isCurrent = item.name == this.$route.name; // 特别的情况注意，点击的是否是自己
      this.$store.dispatch("tags/delete_view", { name: item.name, isCurrent });
    },
    columnDropInit() {
      // return
      //第一步，获取拖动容器
      var wrap = document.getElementById("rightMiddleTags");
      //第二步，设置拖动项的拖动规则
      var rules = {
        animation: 500, // 拖动时的元素的位置变化的动画时长，
        //拖动结束后的回调函数
        onEnd: function (event) {
          // console.log("参数是拖动事件对象", event);
          //获取拖动后容器中的每一项的位置排序
          var arr = sortable.toArray();
          // console.log("位置排序", arr);
        },
      };
      //第三步，初始化 --> 给拖动容器添加拖动规则
      var sortable = Sortable.create(wrap, rules);
      /**
       * 插件自带的方法：
       *      1. sortable.toArray() 获取序列化后的每个item元素的id属性的数组
       *      2. Sortable.create(wrap, rules) 给拖动容器添加拖动规则
       * */
    },
  },
};
</script>

<style lang='less' scoped>
.rightMiddleTags {
  width: 100%;
  background-color: var(--theme_bgColor);
  box-sizing: border-box;
  padding: 0 12px;
  overflow-x: auto;
  position: relative;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .tagsBox {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    .selfClass {
      margin-right: 12px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .selfClass:hover {
      color: #67c23a;
    }
    .selfClass:active {
      color: #67c23a;
    }
  }
  /deep/ .simplebar-scrollbar::before {
    background-color: #cde !important;
  }
}
</style>