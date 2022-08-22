<template>
  <li class="timeLineItem">
    <!-- 垂直方向的线条 -->
    <div class="verticalLine"></div>
    <!-- 垂直方向的小圆点 -->
    <div
      class="dots"
      :style="{
        border: elementIcon
          ? 'none'
          : borderColor
          ? `2px solid ${borderColor}`
          : '2px solid #1890ff',
      }"
    >
      <!-- 上述三元表达式意思：
              当传了elementIcon时，说明要使用饿了么UI的图标，即不使用border了，故为none；
              当未传elementIcon时，再看是否传了borderColor了，若传了，就使用传递的borderColor作为
              border-color的值，否则就使用默认的#1890ff为边框色
      -->
      <i
        v-if="elementIcon"
        :style="{ color: iconColor }"
        :class="elementIcon"
      ></i>
    </div>
    <!-- 内容区，通过flex-direction控制时间和细节的上下位置 -->
    <div class="content" :class="{ isSetTimeDown: timeLocation == 'down' }">
      <!-- 内容区的时间 -->
      <div class="contentTime" v-if="!hideTimestamp">{{ timestamp }}</div>
      <!-- 内容区的具体细节 -->
      <div class="contentDetail">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "myTimelineItem",
  props: {
    // 时间戳具体值
    timestamp: String,
    // 是否隐藏时间戳，只展示文字内容
    hideTimestamp: {
      type: Boolean,
      default: false, // 默认显示时间戳
    },
    // 时间戳的位置，默认时间戳位置在上方
    timeLocation: String,
    // 指定时间线条连接的小圆点的边框色
    borderColor: String,
    // 使用饿了么UI的图标替换节点小圆点，如 el-icon-more
    elementIcon: String,
    // 设置饿了么UI图标的颜色
    iconColor: String,
  },
};
</script>

<style scoped lang="less">
.timeLineItem {
  position: relative; // 定位控制时间线和小圆点的位置细节
  padding-bottom: 12px;
  .verticalLine {
    width: 2px;
    height: 100%;
    background-color: #e9e9e9;
    // 定位控制
    position: absolute;
    top: 4px;
  }
  .dots {
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    // 通过定位将小圆点移动到左侧时间线上方
    position: absolute;
    left: -5px;
    top: 4px;
    i {
      position: absolute;
      left: -2px;
      top: -2px;
    }
  }
  .content {
    padding-left: 24px;
    display: flex;
    // 通过弹性盒方向控制contentTime和contentDetail的上下位置(默认时间在上方)
    flex-direction: column;
    .contentTime {
      margin-bottom: 6px;
      font-size: 13px;
      color: #666;
    }
    .contentDetail {
      margin-bottom: 6px;
      font-size: 14px;
      color: #333;
    }
  }
  // 是否让时间在下方，取决于是否timeLocation的值是否为down
  .isSetTimeDown {
    flex-direction: column-reverse;
  }
}
</style>
