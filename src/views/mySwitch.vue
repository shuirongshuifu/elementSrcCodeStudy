<template>
  <div>
    <my-divider lineType="dotted" content-position="left">普通使用</my-divider>
    <my-switch @change="change" v-model="flag1"></my-switch>
    <my-switch v-model="flag2"></my-switch>
    <my-divider lineType="dotted" content-position="left"
      >开启关闭文字</my-divider
    >
    <my-switch v-model="flag3" openText="开启啦开启啦" closeText="关闭了"></my-switch>
    <my-switch v-model="flag3" openText="ON" closeText="OFF"></my-switch>
    <my-switch v-model="flag3" openText="✔" closeText="✘"></my-switch>
    <my-divider lineType="dotted" content-position="left"
      >自定义开启关闭背景色</my-divider
    >
    <my-switch
      v-model="flag4"
      active-color="#19be6b"
      inactive-color="#ed4014"
    ></my-switch>
    <my-divider lineType="dotted" content-position="left">禁用</my-divider>
    <my-switch v-model="flag5" disabled></my-switch>
    <my-switch v-model="flag6" disabled></my-switch>
    <br />
    <my-divider lineType="dotted" content-position="left"
      >small切换框</my-divider
    >
    <my-switch
      v-model="flag7"
      active-color="#006CFF"
      inactive-color="#DD6DA6"
      openText="small"
      closeText="switch"
      size="small"
    ></my-switch>
    <my-divider lineType="dotted" content-position="left">big切换框</my-divider>
    <my-switch
      v-model="flag8"
      active-color="#2F2F2F"
      inactive-color="#ddd"
      openText="☾"
      closeText="☼"
      size="big"
    ></my-switch>
  </div>
</template>

<script>
export default {
  name:"mySwitchName",
  data() {
    return {
      flag1: true,
      flag2: false,
      flag3: true,
      flag4: true,
      flag5: false,
      flag6: true,
      flag7: true,
      flag8: true,
    };
  },
  methods: {
    change(val) {
      console.log("切换后的状态", val);
    },
  },
};
</script>