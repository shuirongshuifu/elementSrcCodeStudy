<template>
  <div>
    <h5>表格内右键</h5>
    <br />
    <!-- 右键菜单搭配el-table使用 -->
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      @row-contextmenu="rightclick"
    >
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="home" label="家乡"> </el-table-column>
      <el-table-column prop="hobby" label="爱好"> </el-table-column>
    </el-table>
    <br />
    <br />
    <br />
    <!-- 右键菜单搭配普通的dom元素使用，普通的dom元素需要阻止默认右键事件，即.prevent -->
    <div class="normalDom" @contextmenu.prevent="onContextmenu">区域内右键</div>
    <!-- 右键菜单 -->
    <my-right-menu
      :class-index="1"
      :rightclickInfo="rightclickInfo"
      @copy="copy"
      @look="look"
      @edit="edit"
      @delete="deleteFn"
      @refresh="refresh"
    ></my-right-menu>
  </div>
</template>

<script>
export default {
  name: "myRightMenuName",
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "孙悟空",
          age: 500,
          home: "花果山水帘洞",
          hobby: "桃子",
        },
        {
          id: "2",
          name: "猪八戒",
          age: 88,
          home: "高老庄",
          hobby: "肉包子",
        },
        {
          id: "3",
          name: "沙和尚",
          age: 500,
          home: "通天河",
          hobby: "游泳",
        },
        {
          id: "4",
          name: "唐僧",
          age: 1000,
          home: "东土大唐",
          hobby: "吃斋念经",
        },
      ],
      rightclickInfo: {},
    };
  },
  methods: {
    // 饿了么UI封装好的右键菜单事件，可直接使用
    rightclick(row, column, event) {
      this.rightclickInfo = {
        position: {
          x: event.clientX,
          y: event.clientY,
        },
        menulists: [
          {
            fnName: "copy",
            params: { row, column, event },
            icoName: "el-icon-document-copy",
            btnName: "复制数据",
            // divided: true,
            // disabled: true,
            // children: [],
          },
          {
            fnName: "look",
            params: { row, column, event },
            icoName: "el-icon-view",
            btnName: "查看行数据",
          },
          {
            fnName: "edit",
            params: { row, column, event },
            icoName: "el-icon-edit",
            btnName: "编辑行数据",
          },
          {
            fnName: "delete",
            params: { row, column, event },
            icoName: "el-icon-delete",
            btnName: "删除行数据",
          },
          {
            fnName: "refresh",
            params: { row, column, event },
            icoName: "el-icon-refresh",
            btnName: "刷新页面",
          },
        ],
      };
      event.preventDefault(); // 阻止默认的鼠标右击事件
    },
    copy(params) {
      console.log(
        "copy",
        params.row ? params.row[params.column.property] : params
      );
    },
    look(params) {
      console.log("look", params.row ? JSON.stringify(params.row) : params);
    },
    edit(params) {
      console.log("edit", params);
    },
    deleteFn(params) {
      console.log("deleteFn", params.row ? params.row.id : params);
    },
    refresh(params) {
      console.log("refresh 刷新页面啦");
    },
    // 普通dom右键
    onContextmenu(e) {
      this.rightclickInfo = {
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        menulists: [
          {
            fnName: "copy",
            params: "代码修仙",
            icoName: "el-icon-star-on",
            btnName: "代码修仙",
          },
          {
            fnName: "look",
            params: "路漫漫",
            icoName: "el-icon-star-off",
            btnName: "路漫漫",
          },
        ],
      };
    },
  },
};
</script>

<style>
.normalDom {
  width: 240px;
  height: 240px;
  line-height: 240px;
  text-align: center;
  border: 6px dotted pink;
  font-family: "楷体", Courier, monospace;
  font-weight: 600;
}
</style>
