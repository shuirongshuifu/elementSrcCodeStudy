<template>
  <div>
    <h3>指令方式加载中...</h3>
    <br />
    <button @click="loadFn">点一下</button>
    <br />
    <br />
    <el-table v-load="loading" border :data="tableData" style="width: 80%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="home" label="家乡"></el-table-column>
      <el-table-column prop="like" label="爱好"></el-table-column>
    </el-table>
    <br />
    <div class="box" v-load="loading">111</div>
    <br />
    <div class="box" v-load="loading2">222</div>
    <br />
    <h3>函数调用加载中...</h3>
    <br />
    <button @click="loadFn2">再点一下</button>
  </div>
</template>

<script>
export default {
  name: "myLoadName",
  data() {
    return {
      // 自定义指令方式，默认绑定的值是布尔值
      loading: true,
      // 如果想要有更多的配置项，就传一个对象，注意要指定字段
      loading2: {
        value: true,
        icon: "el-icon-eleme", // 自定义加载图标名
        text: "客官稍等哦...", // 自定义加载文字
        color: "red", // 自定义加载文字颜色
        bgColor: "#baf", // 自定义加载背景色
      },
      tableData: [
        {
          name: "孙悟空",
          age: 500,
          home: "花果山水帘洞",
          like: "桃子",
        },
        {
          name: "猪八戒",
          age: 88,
          home: "高老庄",
          like: "肉包子",
        },
        {
          name: "沙和尚",
          age: 1000,
          home: "通天河",
          like: "游泳",
        },
      ],
    };
  },
  methods: {
    loadFn() {
      this.loading = !this.loading;
      this.loading2.value = !this.loading2.value;
    },
    loadFn2() {
      this.$showDialog({
        text: "浏览器在加载中哇...",
      });
      // 模拟发请求，过了1.5秒钟再将其关闭
      setTimeout(() => {
        this.$hideDialog();
      }, 2000);
    },
  },
};
</script>

<style lang='less' scoped>
.box {
  width: 160px;
  height: 80px;
  border: 2px solid #666;
  box-sizing: border-box;
}
</style>