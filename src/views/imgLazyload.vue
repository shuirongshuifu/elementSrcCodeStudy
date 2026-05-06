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
    <img class='imgLazy' v-lazyload="'https://ashuai.work/api/imgSrc/doupo.png'" />
    <img class='imgLazy' v-lazyload="'https://ashuai.work/api/imgSrc/douluo.png'" />
    <img class='imgLazy' v-lazyload="'https://ashuai.work/api/imgSrc/tunshi.png'" />
  </div>
</template>

<script>
export default {
  name: "imgLazyloadName",
  data() {
    return {
      list: [
        {
          src: "https://ashuai.work/api/imgSrc/html.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/css.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/js.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/nodejs.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/webpack.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/vue.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/react.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/angular.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/ie.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/chrome.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/firefox.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/safari.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/edge.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/http.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/uniapp.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/wx.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/leetcode.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/java.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/spring.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/mybatis.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/redis.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/mysql.png",
        },
        {
          src: "https://ashuai.work/api/imgSrc/oracle.png",
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