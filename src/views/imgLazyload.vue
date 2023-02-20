<template>
  <div>
    <h3>上边的是使用vue-lazyload插件</h3>
    <h3>下边的是使用自定义指令</h3>
    <br />
    <div class="imgWrap">
      <div class="imgBox" v-for="img in list">
        <img v-lazy="img.src" />
      </div>
    </div>
    <h3>分隔线</h3>
    <h3>分隔线</h3>
    <h3>分隔线</h3>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <h1>白日依山尽</h1>
    <h1>黄河入海流</h1>
    <h1>欲穷千里目</h1>
    <h1>更上一层楼</h1>
    <img class='imgLazy' v-lazyload="'http://ashuai.work:10000/imgSrc/doupo.png'" />
    <img class='imgLazy' v-lazyload="'http://ashuai.work:10000/imgSrc/douluo.png'" />
    <img class='imgLazy' v-lazyload="'http://ashuai.work:10000/imgSrc/tunshi.png'" />
  </div>
</template>

<script>
export default {
  name: "imgLazyloadName",
  data() {
    return {
      list: [
        {
          src: "http://ashuai.work:10000/imgSrc/html.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/css.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/js.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/nodejs.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/webpack.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/vue.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/react.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/angular.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/ie.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/chrome.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/firefox.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/safari.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/edge.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/http.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/uniapp.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/wx.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/leetcode.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/java.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/spring.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/mybatis.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/redis.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/mysql.png",
        },
        {
          src: "http://ashuai.work:10000/imgSrc/oracle.png",
        },
        {
          src: "占位",
        },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
.imgWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  .imgBox {
    box-sizing: border-box;
    margin-bottom: 24px;
    padding: 8px;
    border: 2px solid pink;
    img {
      width: 280px;
      transition: all 1.8s;
    }
    // 加上一个透明度过渡动画
    img[lazy="loaded"] {
      animation: fade 1.8s;
    }
  }
  // 障眼法...
  .imgBox:last-child {
    height: 0;
    opacity: 0;
    visibility: hidden;
    border: none;
    box-sizing: border-box;
    img {
      height: 0;
      width: 280px;
    }
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.imgLazy {
  width: 240px;
  margin-bottom: 12px;
}
</style>