<template>
  <div class="bigDataBox">
    <my-tabs v-model="activeName">
      <my-tab-content label="定时器和请求动画帧" name="aaa">
        <div v-if="activeName == 'aaa'">
          <el-button
            style="margin-bottom: 12px"
            size="small"
            type="primary"
            :loading="loading"
            @click="plan"
            >点击请求加载</el-button
          >
          <el-table
            height="300"
            :data="arr"
            border
            style="width: 80%"
            :header-cell-style="{
              height: '24px',
              lineHeight: '24px',
              color: '#606266',
              background: '#F5F5F5',
              fontWeight: 'bold',
            }"
          >
            <el-table-column type="index" label="序"></el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名字"></el-table-column>
            <el-table-column prop="value" label="对应值"></el-table-column>
          </el-table>
        </div>
      </my-tab-content>
      <my-tab-content label="触底加载" name="bbb">
        <bottom-load v-if="activeName == 'bbb'" />
      </my-tab-content>
      <my-tab-content label="虚拟列表" name="ccc">
        <virtual-list v-if="activeName == 'ccc'" />
      </my-tab-content>
      <my-tab-content label="虚拟表格（vxe-table）" name="ddd">
        <virtual-table v-if="activeName == 'ddd'" />
      </my-tab-content>
    </my-tabs>
  </div>
</template>

<script>
function averageFn(arr) {
  let i = 0; // 从第0个开始
  let result = []; // 定义结果，结果是二维数组
  while (i < arr.length) {
    // 从原始数组的第一项开始遍历
    result.push(arr.slice(i, i + 10)); // 一次截取10个用于分堆
    i = i + 10;
  }
  return result;
}
import axios from "axios";
import bottomLoad from "../otherComponents/bottomLoad";
import virtualList from "../otherComponents/virtualList";
import virtualTable from "../otherComponents/virtualTable";
export default {
  name: "bigDataName",
  components: {
    bottomLoad,
    virtualList,
    virtualTable,
  },
  data() {
    return {
      activeName: "aaa",
      arr: [],
      loading: false,
    };
  },
  methods: {
    /**
     * 直接拿到所有的数据，直接渲染肯定是不行的
     * */

    /**
     * 定时器
     * */
    // async plan() {
    //   this.loading = true;
    //   const res = await axios.get("http://ashuai.work:10000/bigData");
    //   this.loading = false;
    //   let twoDArr = averageFn(res.data.data);
    //   for (let i = 0; i < twoDArr.length; i++) {
    //     // 相当于在很短的时间内创建许多个定时任务去处理
    //     setTimeout(() => {
    //       this.arr = [...this.arr, ...twoDArr[i]];
    //     }, 17 * i);
    //   }
    // },

    /**
     * 请求动画帧
     * */
    async plan() {
      this.loading = true;
      const res = await axios.get("http://ashuai.work:10000/bigData");
      this.loading = false;
      // 1. 将大数据量分堆
      let twoDArr = averageFn(res.data.data);
      // 2. 定义一个函数，专门用来做赋值渲染（使用二维数组中的每一项）
      const use2DArrItem = (page) => {
        // 4. 从第一项，取到最后一项
        if (page > twoDArr.length - 1) {
          console.log("每一项都获取完了");
          return;
        }
        // 5. 使用请求动画帧的方式
        requestAnimationFrame(() => {
          // 6. 取出一项，就拼接一项（concat也行）
          this.arr = [...this.arr, ...twoDArr[page]];
          // 7. 这一项搞定，继续下一项
          page = page + 1;
          // 8. 直至完毕（递归调用，注意结束条件）
          use2DArrItem(page);
        });
      };
      // 3. 从二维数组中的第一项，第一堆开始获取并渲染（数组的第一项即索引为0）
      use2DArrItem(0);
    },
  },
};
</script>

<style lang="less" scoped>
.bigDataBox {
  box-sizing: border-box;
  padding-right: 240px;
}
</style>
