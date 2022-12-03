<template>
  <div id="app">
    <el-table
      @cell-dblclick="dblclick"
      :cell-class-name="cellClassName"
      height="480"
      :data="tableData"
      border
    >
      <el-table-column align="center" type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="age" label="年龄" width="180">
      </el-table-column>
      <el-table-column align="center" prop="home" label="家乡">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 * 本文代码文章链接地址：https://juejin.cn/post/7108542695387168799
 * */

// 校验函数，比如姓名列单元格最多只能输入6个字符
function nameMaxLength6(str) {
  return str.length <= 6;
}
// 校验函数，比如年龄列单元格值最大为1000岁
function ageMaxValue1000(str) {
  return Number(str) <= 1000;
}
// 家乡列单元格不做校验处理，始终为true（如果别的列也不需要校验，也直接使用这个函数即可）
function noValidate(params) {
  return true;
}

// 引入继承组件对象，可取其身上的inputC构造函数、或spanC构造函数生成组件dom
import extendComponents from "../../otherComponents/clickTableCanEdit/data";
export default {
  name: "clickTableCanEditName",
  data() {
    return {
      tableData: [
        {
          name: "孙悟空",
          age: 500,
          home: "花果山水帘洞",
        },
        {
          name: "猪八戒",
          age: 88,
          home: "高老庄",
        },
        {
          name: "沙和尚",
          age: 1000,
          home: "通天河",
        },
      ],
      // 存一份旧的值，校验未通过时还是使用旧值
      oldCellValue: null,
      // 新加的校验规则，配置传参匹配方式
      columnAddValidate: {
        name: {
          validateFn: nameMaxLength6,
          validateMessage: "名字最大不能超过6个字符",
        },
        age: {
          validateFn: ageMaxValue1000,
          validateMessage: "注意！年龄是数字类型，且最大不能超过1000岁",
        },
        home: {
          validateFn: noValidate, // validateFn参数必填哦
        },
      },
    };
  },
  methods: {
    cellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex; // 自定义指定一个索引，下方能够用到
    },
    dblclick(row, column, cell, event) {
      console.log("column", column);
      // 1. 序号列单元格不允许编辑，别的列单元格可以编辑
      if (column.label == "序号") {
        this.$message({
          type: "warning",
          message: "序号列不允许编辑",
        });
        return;
      }
      // 2. 存一份旧的单元格的值（校验未通过时，还使用旧值）
      this.oldCellValue = row[column.property];
      // 3. 然后把单元格的值，作为参数传递给实例化的input组件
      let cellValue = row[column.property];
      // 4. 实例化组件以后，带着参数，再挂载到对应位置
      new extendComponents.inputC({
        propsData: {
          // 使用propsData对象传递参数，子组件在props中可以接收到
          cellValue: cellValue, // 传递单元格的值
          saveRowData: this.saveRowData, // 传递回调函数用于保存行数据，组件中可以触发之
          cellDom: cell, // 传递这个dom元素
          row: row, // 传递双击的行的数据
          property: column.property, // 传递双击的是哪个字段
          /**
           * 新加的动态校验函数
           *      只需要指定校验的函数，以及校验未通过时候的文字提示（对象匹配方式）
           * */
          validateFn: this.columnAddValidate[column.property].validateFn,
          validateMessage:
            this.columnAddValidate[column.property].validateMessage,
        },
      }).$mount(cell.children[0]); // 5. $mount方法，用于将某个dom挂载到某个dom上
    },
    // 失去焦点操作如下：1.看用户编辑的值是否通过校验，没通过校验使用原值；2.通过校验就使用用户编辑的值
    saveRowData(params) {
      // 1. 若未通过校验，还使用原来的旧值，并做一个提示
      if (!params.isPassValidate) {
        this.$message({
          type: "warning",
          message: params.validateMessage,
        });
        params.row[params.property] = this.oldCellValue; // 使用旧值
        params.cellValue = this.oldCellValue; // 使用旧值
        this.recoverCell(params); // 使用旧值恢复单元格
      }
      // 2. 通过校验的话，就正常操作，使用新值
      else {
        // 这里模拟一下发请求，更新tableData表格表体数据（实际在这里也是要发请求的）
        setTimeout(() => {
          this.$set(this.tableData, params.row.index, params.row); // 给那个数组的第几项修改为什么值
          console.log("发请求更新数据啦");
        }, 300);
        params.row[params.property] = params.cellValue; // 使用新值
        params.cellValue = params.cellValue; // 使用新值
        this.recoverCell(params); // 使用新值恢复单元格
      }
    },
    // 恢复单元格（使用新值恢复or使用原有旧值恢复）
    recoverCell(params) {
      new extendComponents.spanC({
        propsData: {
          cellValue: params.cellValue,
        },
      }).$mount(params.cellDom.children[0]);
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100vh;
}
</style>