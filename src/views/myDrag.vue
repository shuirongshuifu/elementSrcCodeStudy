<template>
  <div class="myWrap">
    <h2>拖拽插件sortablejs</h2>
    <br />
    <h5>普通拖拽</h5>
    <br>
    <!-- 一般来说，拖动的结构就是：外边一个拖动容器，里面是一个又一个的拖动项 -->
    <div id="wrapBox">
      <div data-id="1工商银行">工商银行</div>
      <div data-id="2建设银行">建设银行</div>
      <div data-id="3中国银行">中国银行</div>
      <div data-id="4农业银行">农业银行</div>
      <div data-id="5交通银行">交通银行</div>
    </div>
    <br />
    <h5>表格拖拽</h5>
    <br />
    <el-table
      :data="tableBody"
      border
      row-key="id"
      :header-cell-style="{
        height: '48px',
        background: '#FAFAFA',
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '14px',
      }"
    >
      <!-- 勾选框列 -->
      <el-table-column type="selection" width="48" fixed></el-table-column>
      <!-- 序号列 -->
      <el-table-column label="序号" type="index" width="50" fixed>
      </el-table-column>
      <!-- 表头列 -->
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="item.index"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
    </el-table>
    <br />
    <h3>表头数据</h3>
    <pre>{{ tableHeader }}</pre>
    <br />
    <h3>表体数据</h3>
    <pre>{{ tableBody }}</pre>
    <br />
  </div>
</template>
<script>
// 引入sortablejs插件，拖拽主要靠的是这个插件
import Sortable from "sortablejs";
export default {
  name: "dragName",
  data() {
    return {
      // 表头数据
      tableHeader: [
        {
          label: "id",
          prop: "id",
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "年龄",
          prop: "age",
        },
        {
          label: "家乡",
          prop: "home",
        },
        {
          label: "爱好",
          prop: "hobby",
        },
      ],
      // 表体数据
      tableBody: [
        {
          id: "1",
          name: "孙悟空",
          age: 500,
          home: "花果山",
          hobby: "吃桃子",
        },
        {
          id: "2",
          name: "猪八戒",
          age: 88,
          home: "高老庄",
          hobby: "吃包子",
        },
        {
          id: "3",
          name: "沙和尚",
          age: 1000,
          home: "通天河",
          hobby: "游泳",
        },
        {
          id: "4",
          name: "唐僧",
          age: 99999,
          home: "东土大唐",
          hobby: "念经",
        },
      ],
    };
  },
  mounted() {
    // 列的拖拽初始化
    this.columnDropInit();
    // 行的拖拽初始化
    this.rowDropInit();
    //
    this.priorityPay();
  },
  methods: {
    //列拖拽
    columnDropInit() {
      // 第一步，获取列容器
      const wrapperColumn = document.querySelector(
        ".el-table__header-wrapper tr"
      );
      // 第二步，给列容器指定对应拖拽规则
      this.sortable = Sortable.create(wrapperColumn, {
        animation: 500,
        delay: 0,
        onEnd: (event) => {
          console.log(
            "拖拽完成以后发现表头数据并没有改变，所以需要我们手动更新表头数据",
            this.tableHeader
          );
          console.log(
            "根据旧索引和新索引去更新，其实就是交换位置",
            event.oldIndex,
            event.newIndex
          );

          // 接下来做索引的交换
          let tempHableHeader = [...this.tableHeader]; // 先存一份临时变量表头数据
          let temp; // 临时变量用于交换
          temp = tempHableHeader[event.oldIndex - 2]; // 注意这里-2是因为，我在表格的前面加了两列（勾选框列，和序号列）
          tempHableHeader[event.oldIndex - 2] =
            tempHableHeader[event.newIndex - 2]; // 如果没有这两列，序号就是正常对应的，就不用减2
          tempHableHeader[event.newIndex - 2] = temp;

          // 重要的事情说三遍！！！
          // 这里一定要先把表头数据清空，然后再下一轮中去赋值，否则会渲染错误
          // 这里一定要先把表头数据清空，然后再下一轮中去赋值，否则会渲染错误
          // 这里一定要先把表头数据清空，然后再下一轮中去赋值，否则会渲染错误
          this.tableHeader = []; // 大家可以注掉试试哦
          this.$nextTick(() => {
            this.tableHeader = tempHableHeader;
          });
        },
      });
    },
    // 行拖拽
    // 个人认为行拖拽不用加，因为加了以后，就不能双击选行单元格的文字了，当然还是要听产品大佬安排
    rowDropInit() {
      // 第一步，获取行容器
      const wrapperRow = document.querySelector(
        ".el-table__body-wrapper tbody"
      );
      const that = this; // 存一份指向
      // 第二步，给行容器指定对应拖拽规则
      Sortable.create(wrapperRow, {
        onEnd({ newIndex, oldIndex }) {
          // 这里是区分上面的列拖拽的另外一种写法

          // 首先删除原来的那一项，并且保存一份原来的那一项，因为splice返回的是一个数组，数组中的第一项就是删掉的那一项
          const currRow = that.tableBody.splice(oldIndex, 1)[0];
          // 然后把这一项加入到新位置上
          that.tableBody.splice(newIndex, 0, currRow);
        },
      });
    },
    priorityPay() {
      //第一步，获取拖动容器
      var wrap = document.getElementById("wrapBox");
      //第二步，设置拖动项的拖动规则
      var rules = {
        animation: 500, // 拖动时的元素的位置变化的动画时长，
        //拖动结束后的回调函数
        onEnd: function (event) {
          console.log("参数是拖动事件对象", event);
          //获取拖动后容器中的每一项的位置排序
          var arr = sortable.toArray();
          console.log("位置排序", arr);
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
.myWrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  padding-bottom: 24px;
  /deep/ .el-table {
    .el-table__header-wrapper {
      tr {
        th {
          // 设置拖动样式，好看一些
          cursor: move;
        }
      }
    }
  }
}

h5 {
  color: #666;
}

#wrapBox {
  width: 360px;
  /* 拖动容器的高度，由拖动项的高度撑开 */
  height: auto;
}

#wrapBox div {
  padding: 8px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  /* 添加鼠标悬浮样式为移动的样式，要不然不好看 */
  cursor: move;
  font-size: 13px;
}

/* 设置鼠标按下时候的样式，加了好看些 */
#wrapBox div:active {
  background-color: #eee;
}
</style>