<template>
  <div>
    <h5>单个按钮</h5>
    <br />
    <button @click="clickLoad">加载切换</button>
    <div class="btnBox">
      <span class="btn" v-for="(item, index) of btnArr">
        <my-button
          style="margin-right: 16px"
          :key="index"
          :type="item.type"
          :size="item.size"
          :disabled="item.disabled"
          :loading="item.loading"
          :icon="item.icon"
          :rightIcon="item.rightIcon"
          @click="
            (e) => {
              clickBtn(item, e);
            }
          "
          >{{ item.name }}</my-button
        >
      </span>
    </div>
    <br />
    <h5>按钮组</h5>
    <br />
    <my-button-group>
      <my-button type="success" icon="el-icon-arrow-left">上一页</my-button>
      <my-button type="success" icon="el-icon-arrow-right" :rightIcon="true"
        >下一页</my-button
      >
    </my-button-group>
    <br />
    <br />
    <my-button-group>
      <my-button type="primary" icon="el-icon-user"></my-button>
      <my-button type="primary" icon="el-icon-view"></my-button>
      <my-button type="primary" icon="el-icon-star-off"></my-button>
      <my-button type="primary" icon="el-icon-chat-dot-square"></my-button>
      <my-button type="primary" icon="el-icon-share"></my-button>
    </my-button-group>
  </div>
</template>

<script>
export default {
  name: "myButtonName",
  data() {
    return {
      loadingF: false,
      btnArr: [
        {
          type: "",
          name: "默认按钮",
        },
        {
          type: "primary",
          name: "primary",
        },
        {
          type: "success",
          name: "success",
        },
        {
          type: "warning",
          name: "warning",
        },
        {
          type: "error",
          name: "error",
        },
        {
          type: "primary",
          name: "size=small",
          size: "small",
        },
        {
          type: "primary",
          name: "size=middle",
          size: "middle",
        },
        {
          type: "primary",
          name: "size=big",
          size: "big",
        },
        {
          type: "success", // 不管type什么类型，只要禁用全部置灰
          name: "disabled",
          disabled: true,
        },
        {
          type: "primary",
          name: "等待加载",
          loading: false,
        },
        {
          type: "success",
          name: "等待加载",
          loading: false,
        },
        {
          type: "success",
          name: "icon",
          icon: "el-icon-star-on",
        },
        {
          type: "success",
          name: "icon",
          icon: "el-icon-star-on",
          rightIcon: true,
        },
        {
          type: "success",
          name: "",
          icon: "el-icon-edit",
        },
        {
          type: "error",
          name: "",
          icon: "el-icon-delete",
        },
        {
          type: "text",
          name: "纯text按钮",
          // loading: true,
        },
        {
          type: "dangerText",
          name: "dangerText按钮",
          icon: "el-icon-delete-solid",
        },
        {
          type: "text",
          name: "text禁用",
          disabled: true,
        },
      ],
    };
  },
  methods: {
    clickLoad() {
      let lebel = this.btnArr[9].name;
      let newItem9 = {
        type: "primary",
        name: lebel == "等待加载" ? "加载中" : "等待加载",
        loading: lebel == "等待加载" ? true : false,
      };
      this.$set(this.btnArr, 9, newItem9);
      let newItem10 = {
        type: "success",
        name: lebel == "等待加载" ? "加载中" : "等待加载",
        loading: lebel == "等待加载" ? true : false,
      };
      this.$set(this.btnArr, 10, newItem10);
    },
    // 注意这种写法，可接收多个参数
    clickBtn(item, e) {
      console.log("clickBtn", item, e);
    },
  },
};
</script>

<style>
.btnBox {
  width: 100%;
  box-sizing: border-box;
  padding: 24px 0;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
}
.btn {
  margin-bottom: 24px;
}
</style>