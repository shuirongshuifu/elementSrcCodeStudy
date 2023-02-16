<template>
  <div class="homeWrap">
    <github-link class="githubLinkC"></github-link>
    <my-card
      v-for="(item, index) in routeArr"
      :key="index"
      class="cardClass cardClass2"
      :cardStyle="{
        background: '#CCDDEE',
        color: '#333',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      }"
      :backCardStyle="{
        background: '#409EFF',
        color: '#000',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        opacity: 0.72,
      }"
    >
      <div class="front">
        <div>
          {{ item.path.slice(1) }}
        </div>
        <div>{{ emoji[index] }}</div>
      </div>
      <div slot="back">
        <div class="backStyle" @click="jump(item.path)">
          <div>点下呗...</div>
          <div>{{ yanWords[index] }}</div>
        </div>
      </div>
    </my-card>
  </div>
</template>

<script>
import routeArr from "../router/routeArr";
import githubLink from "@/otherComponents/githubLink/index.vue";
export default {
  name: "HomeName",
  components: {
    githubLink,
  },
  data() {
    return {
      routeArr,
      // 这个网站找到：https://emojixd.com/group/smileys-emotion
      emoji: [
        "😝",
        "😉",
        "😄",
        "😆",
        "🤣",
        "😂",
        "🙂",
        "😭",
        "😺",
        "😸",
        "😘",
        "🥰",
        "😍",
        "😛",
        "🤗",
        "😴",
        "🤠",
        "😬",
        "😴",
        "🤕",
        "🥳",
        "🤓",
        "😎",
        "😮",
        "🥱",
        "😓",
        "🦁",
        "🐯",
        "🐺",
        "🐶",
        "🦊",
        "🦝",
        "🐱",
        "🐴",
        "🦄",
        "🐗",
        "🐼",
        "🐘",
      ],
      yanWords: [
        "(ง •̀_•́)ง",
        "π__π",
        "(•ิ_•ิ)",
        "(•‾̑⌣‾̑•)✧˖°",
        "(•‾̑⌣‾̑•)✧˖°",
        "（●>∀<●）",
        "⊙.⊙",
        "(๑•̀_•́๑)",
        "（⊙＿⊙；）",
        "╭(′▽`)",
        "(๑￫ܫ￩)",
        "•﹏•",
        "（┬＿┬）",
        "θ︵θ",
        "₍ᐢ..ᐢ₎♡",
        "(๑•̌.•๑)",
        "(ᕑᗢᓫ∗)˒",
        "₍ᐢ.ˬ.⑅ᐢ₎",
        "(｡•̀ᴗ-)✧",
        "੭ ᐕ)੭*⁾⁾",
        "(♡˙︶˙♡)",
        "(｡•ˇ‸ˇ•｡)  ",
        "( ´◔ ‸◔`)  ",
        "(•͈˽•͈)  ",
        "ʕ·ᴥ· ʔ  ",
        "༼༎ຶᴗ༎ຶ༽  ",
        "w(ﾟДﾟ)w",
        "ヽ(✿ﾟ▽ﾟ)ノ",
        "(๑•̀ㅂ•́)و✧",
        "╰(*°▽°*)╯",
        "♪(^∇^*)",
        "(u‿ฺu✿ฺ)",
        "(°ー°〃)",
        "（´v｀）",
        "(。・・)ノ",
        "(ﾉ*･ω･)ﾉ",
        "o(〃'▽'〃)o",
      ],
    };
  },
  methods: {
    jump(path) {
      this.$router.push({
        path,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.homeWrap {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .githubLinkC {
    position: absolute;
    top: -8px;
    right: -9px;
    z-index: 9;
  }
  .cardClass {
    width: 160px;
    margin-right: 24px;
    margin-bottom: 24px;
  }
  .cardClass2 {
    height: 120px;
  }
  .front {
    text-align: center;
  }
  .front,
  .backStyle {
    font-family: "楷体", "楷体_GB2312";
    font-weight: bold;
  }
  .backStyle {
    cursor: pointer;
  }
}
</style>