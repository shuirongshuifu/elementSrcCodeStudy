<template>
  <div>
    <!-- 普通使用时间正序排列 -->
    <button @click="reverse = !reverse">点击更改时间线排序</button>
    <my-timeline style="margin-top: 6px" :reverse="reverse">
      <my-timeline-item timestamp="2018-01-01"
        >2018年仿佛还在昨天一样</my-timeline-item
      >
      <my-timeline-item timestamp="2020-01-01"
        >2020就像刚刚过去一样</my-timeline-item
      >
      <my-timeline-item timestamp="2022-01-01"
        >2022年也已经走完一半了</my-timeline-item
      >
    </my-timeline>
    <br />
    <!-- 自定义时间线圆点颜色或使用饿了么小图标 -->
    <my-timeline>
      <my-timeline-item
        v-for="(item, index) in timeArr"
        :key="index"
        :timestamp="item.timestamp"
        :borderColor="item.borderColor"
        :elementIcon="item.elementIcon"
        :iconColor="item.iconColor"
        >{{ item.content }}</my-timeline-item
      >
    </my-timeline>
    <br />
    <!-- 控制时间戳位置与是否隐藏时间戳 -->
    <my-timeline>
      <my-timeline-item timestamp="2222-02-02"
        >默认时间戳在文字上方</my-timeline-item
      >
      <my-timeline-item timestamp="3333-03-03" timeLocation="down"
        >通过timeLocation属性将时间戳放在文字下方</my-timeline-item
      >
      <my-timeline-item timestamp="4444-04-04" hideTimestamp
        >若不想要时间戳可使用hideTimestamp属性将其隐藏</my-timeline-item
      >
    </my-timeline>
  </div>
</template>

<script>
export default {
  name:'myTimelineName',
  data() {
    return {
      reverse: false,
      timeArr: [
        {
          timestamp: "2022-04-01",
          content: "默认时间线小圆点样式",
        },
        {
          timestamp: "2022-05-01",
          content: "更改时间线小圆点颜色",
          borderColor: "red",
        },
        {
          timestamp: "2022-04-01",
          content: "使用饿了么的小图标做为时间线小圆点",
          elementIcon: "el-icon-view",
        },
        {
          timestamp: "2022-07-01",
          content: "给饿了么的icon上色",
          elementIcon: "el-icon-location",
          iconColor: "green",
        },
      ],
    };
  },
};
</script>