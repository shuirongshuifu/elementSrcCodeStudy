<template>
    <div>
        <button @click="change1">图片</button> &nbsp;&nbsp;
        <button @click="change2">诗歌</button>
        <br>
        <br>

        <div v-myhtml="str"></div>
    </div>
</template>
  
<script>
export default {
    name: "myhtmlName",
    data() {
        return {
            str: '<p><b style=\"background-color: rgb(214, 239, 214);\">白日依山尽</b></p><p><i style=\"background-color: rgb(214, 239, 214);\">黄河入海流</i></p><p><u style=\"background-color: rgb(214, 239, 214);\">欲穷千里目</u></p><p><strike style=\"background-color: rgb(214, 239, 214);\">更上一层楼</strike></p>'
        };
    },
    methods: {
        change1() {
            this.str = `<p><img style=\"width: 190px;\" src=\"http://ashuai.work/static/img/avantar.png\"><br></p>`
        },
        change2() {
            this.str = `<p><b style=\"background-color: rgb(214, 239, 214);\">白日依山尽</b></p><p><i style=\"background-color: rgb(214, 239, 214);\">黄河入海流</i></p><p><u style=\"background-color: rgb(214, 239, 214);\">欲穷千里目</u></p><p><strike style=\"background-color: rgb(214, 239, 214);\">更上一层楼</strike></p>'`
        },
    },
};
</script>