<template>
  <div class="threadWrap">
    <h1>开启一个线程运算用$worker.run方法</h1>
    <br />
    <el-button
      @click="openOneThread"
      type="success"
      plain
      size="small"
      style="margin-bottom: 16px"
      >计算斐波那契数列值和用时，以及渲染页面两个任务</el-button
    >
    <div>
      斐波那契值为：<span class="bold">{{ fibRes }}</span>
      <i v-show="btnLoading" class="el-icon-loading"></i>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 执行用时：
      <i v-show="btnLoading" class="el-icon-loading"></i>
      <span class="bold">{{ fibTime }}</span>
      毫秒
    </div>
    <br />
    <div class="UI">
      <span>不阻塞后续的代码执行：</span>
      <h2 ref="renderH2"></h2>
    </div>
    <br />
    <br />
    <h1>开启多个线程使用$worker.create、postAll方法</h1>
    <br />
    <el-button
      @click="noParamsFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      :loading="loadingOne"
      >不传参都执行一次</el-button
    >
    <el-button
      @click="byMessageNameStrFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      :loading="loadingTwo"
      >根据message的名字指定谁执行(字符串形式)</el-button
    >
    <el-button
      @click="byMessageNameObjParamsFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      :loading="loadingThree"
      >根据message的名字指定谁执行(对象形式可传参)</el-button
    >
    <div class="info">F12请打开控制台查看--></div>
    <br />
    <h1>不使用多线程，使用Promise.all太耗时啦！</h1>
    <br />
    <el-button
      @click="usePromiseFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      >Promise执行多个任务</el-button
    >
    <div class="info">F12请打开控制台查看--></div>
  </div>
</template>

<script>
export default {
  name: "myWorkName",
  data() {
    return {
      worker: null,
      btnLoading: false,
      fibNum: 44,
      fibRes: null,
      fibTime: null,
      /****/
      loadingOne: false,
      loadingTwo: false,
      loadingThree: false,
      worker2: null,
    };
  },
  methods: {
    /**
     * 需求：点击数据计算进行两个操作
     *      第一个UI操作，计算斐波那契数fib(44)的值，且统计计算所用的时长，并写入到页面上
     *      第二个UI操作，每隔0.1秒，更新页面上h2标签的内容值
     *      要求两个操作不阻塞，不能出现后一个UI操作要等待前一个UI操作的情况
     *      因为斐波那契是递归执行，是一个比较耗时的操作fib(44)约需要近8秒的计算时间
     * */
    openOneThread() {
      /* 第一个UI操作 */
      this.btnLoading = true;
      this.worker = this.$worker // this.$worker.run(func, [args]?) 一次性的，自动销毁
        .run(
          (n) => {
            // 注意这里的函数是内部另一个线程空间的，不能从外部引入过来（内存空间隔离）
            function fib(n) {
              if ((n == 1) | (n == 2)) {
                return 1;
              } else {
                return fib(n - 1) + fib(n - 2);
              }
            }
            let start = Date.now(); // console.time()和console.timeEnd()直接拿不到值，就换种方式
            let res = fib(n);
            let end = Date.now(); // window.performance.now()也不能用，因为没window对象
            return [res, end - start]; // 返回数组，第一项是fib(44)的值，第二项是fib(44)递归计算用时
          },
          [this.fibNum] // 参数，从这里传递进去，数组形式
        )
        .then((res) => {
          console.log("then", res); // 另一个线程执行完以后就能拿到结果了
          this.fibRes = res[0];
          this.fibTime = res[1];
          this.btnLoading = false;
        })
        .catch((err) => {
          console.log("err", err);
          this.btnLoading = false;
        });
      /* 第二个UI操作 */
      let h2Dom = this.$refs.renderH2;
      let n = 0;
      let timer = setInterval(() => {
        if (n >= 60) {
          clearInterval(timer);
        } else {
          n++;
          h2Dom.innerHTML = n;
        }
      }, 100);
      // 使用web worker插件vue-work的确可以做到不阻塞
    },
    /**
     * 使用多个线程
     * */
    // 调用方式一 不传参
    noParamsFn() {
      this.loadingOne = true;
      console.time("多个线程计算用时1");
      this.worker2
        .postAll()
        .then((res) => {
          console.timeEnd("多个线程计算用时1");
          console.log("res", res); // 结果是一个数组 [267914296, 433494437, 701408733]
          this.loadingOne = false;
        })
        .catch((err) => {
          console.timeEnd("多个线程计算用时1");
          console.log("err", err);
          this.loadingOne = false;
        });
    },
    // 调用方式二 根据message的名字去指定谁（可多个）去执行 字符串形式
    byMessageNameStrFn() {
      this.loadingTwo = true;
      console.time("多个线程计算用时2");
      this.worker2
        .postAll(["fn1", "fn3"]) // 这里指定"fn1", "fn3"去执行
        .then((res) => {
          console.timeEnd("多个线程计算用时2");
          console.log("res", res); // 结果是一个数组 [267914296, 701408733]
          this.loadingTwo = false;
        })
        .catch((err) => {
          console.timeEnd("多个线程计算用时2");
          console.log("err", err);
          this.loadingTwo = false;
        });
    },
    // 调用方式三 根据message的名字去指定谁（可多个）去执行 对象形式
    byMessageNameObjParamsFn() {
      this.loadingThree = true;
      console.time("多个线程计算用时3");
      this.worker2
        .postAll([{ message: "fn1", args: ["代码修仙路漫漫", "加油干"] }]) // 这里指定"fn1" 去执行
        .then((res) => {
          console.timeEnd("多个线程计算用时3");
          console.log("res", res); // 结果是一个数组 []
          this.loadingThree = false;
        })
        .catch((err) => {
          console.timeEnd("多个线程计算用时3");
          console.log("err", err);
          this.loadingThree = false;
        });
    },
    /**
     * 使用Promise
     *      注意对比使用Promise.all和使用this.worker2.postAll方法所用的时间差异！
     * */
    async usePromiseFn() {
      function asyncOne() {
        let async1 = new Promise(async (resolve, reject) => {
          function fib(n) {
            if ((n === 1) | (n === 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 1);
            }
          }
          resolve(fib(30));
        });
        return async1;
      }

      function asyncTwo() {
        let async2 = new Promise(async (resolve, reject) => {
          function fib(n) {
            if ((n === 1) | (n === 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 1);
            }
          }
          resolve(fib(30));
        });
        return async2;
      }

      function asyncThree() {
        let async3 = new Promise(async (resolve, reject) => {
          function fib(n) {
            if ((n === 1) | (n === 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 1);
            }
          }
          resolve(fib(30));
        });
        return async3;
      }

      console.time("使用Promise搭配aysnc和await");

      // let paramsArr = [asyncOne()]; // 计算一个大概在3秒左右（计算一次刷新一次页面，精确一些）
      let paramsArr = [asyncOne(), asyncTwo(), asyncThree()]; // 计算三个耗时任务大概在9秒左右

      let res = await Promise.all(paramsArr);
      console.timeEnd("使用Promise搭配aysnc和await");
      console.log("结果", res);
    },
  },
  created() {
    // 1. 定义线程所用的消息函数数组
    const actions = [
      {
        message: "fn1", // message消息与func函数执行为映射关系
        func: (params1, params2) => {
          console.log("params参数-->", params1, params2);
          function fib(n) {
            if ((n == 1) | (n == 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 2);
            }
          }
          return fib(30);
        },
      },
      {
        message: "fn2",
        func: () => {
          function fib(n) {
            if ((n == 1) | (n == 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 2);
            }
          }
          return fib(30);
        },
      },
      {
        message: "fn3",
        func: () => {
          function fib(n) {
            if ((n == 1) | (n == 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 2);
            }
          }
          // throw "一个报错挂了,其他的也跟着挂了,走.catch"; // 抛出错误(的确很像Promise.all())
          return fib(30);
        },
      },
    ];
    // 2. 根据消息函数数组去create创建一个worker，并存到data变量中去，以便于后续随时使用
    this.worker2 = this.$worker.create(actions);
  },
  // 别忘了在组件销毁前清除掉哦
  beforeDestroy() {
    this.worker = null;
  },
};
</script>

<style lang='less' scoped>
.bold {
  font-weight: 700;
  font-size: 24px;
}
.info {
  color: #999;
  font-size: 13px;
}
.UI {
  display: flex;
  align-items: center;
}
</style>