<template>
  <div>
    <my-text1 :speed="16000" :showBell="true" url="/myMessage"
      >🎤🎤🎤生活不易，打工仔共同努力。点赞关注、一键三连不迷路 ^_^
      ，诸位看官朋友们，别忘给赏赐一个star或者fork🍭🍭🍭</my-text1
    >
    <br />
    <my-text1 :speed="16000" :showBell="true" bgColor="#FEF0F0" color="#F56C6C"
      >🎤🎤🎤生活不易，打工仔共同努力。点赞关注、一键三连不迷路 ^_^
      ，诸位看官朋友们，别忘给赏赐一个star或者fork🍭🍭🍭</my-text1
    >
    <br />
    <br />
    <br />
    <br />
    <br />
    <my-text1
      :speed="16000"
      :showBell="true"
      bgColor="#409eff"
      color="#fff"
      :showClose="false"
      >🎤🎤🎤生活不易，打工仔共同努力。点赞关注、一键三连不迷路 ^_^
      ，诸位看官朋友们，别忘给赏赐一个star或者fork🍭🍭🍭</my-text1
    >
    <br />
    <br />
    <br />
    <div class="t222">
      <my-text2 :speed="12000" :text="textArr"></my-text2>
    </div>
  </div>
</template>

<script>
export default {
  name: "myTextName",
  data() {
    return {
      textArr: [
        "孙悟空",
        "猪八戒",
        "沙和尚",
        "唐僧",
        "白龙马",
        "白骨精",
        "玉兔精",
        "嫦娥",
        "太上老君",
        "二郎神",
        "哪吒",
        "菩提祖师",
        "东海龙王",
        "西海龙王",
        "南海龙王",
        "北海龙王",
        "乌鸡国国王",
        "乌鸡国王后",
        "乌鸡国太子",
        "红孩儿",
      ],
    };
  },
};
</script>

<style>
.t222 {
  width: 360px;
  /* height: 240px; */
  border: 1px solid #666;
}
</style>