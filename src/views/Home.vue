<template>
  <div class="homeWrap">
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
        cursor: 'pointer',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        opacity: 0.72,
      }"
    >
      <div class="front">
        <div>
          {{ item.name }}
        </div>
        <div>{{ emoji[index] }}</div>
      </div>
      <div slot="back" @click="jump(item.path)">
        <div class="backStyle">
          <div>点下呗...</div>
          <div>{{ yanWords[index] }}</div>
        </div>
      </div>
    </my-card>
  </div>
</template>

<script>
import routeArr from "../router/routeArr";
export default {
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
        "🤗",
        "😺",
        "😸",
        "😘",
        "🥰",
        "😍",
        "😛",
        "🤗",
        "😴",
        "🤠",
        "😎",
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
        "(๑￫ܫ￩)",
        "•﹏•",
        "（┬＿┬）",
        "θ︵θ",
        "₍ᐢ..ᐢ₎♡",
        "(๑•̌.•๑)",
        "(ᕑᗢᓫ∗)˒",
        "₍ᐢ.ˬ.⑅ᐢ₎",
      ],
    };
  },
  methods: {
    jump(path) {
      console.log(111);
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
  // justify-content: space-around;
  .cardClass {
    width: 136px;
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
}
</style>