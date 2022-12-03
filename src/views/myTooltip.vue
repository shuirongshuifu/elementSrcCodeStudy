<template>
  <div class="showTooltip">
    <h3>暗色模式</h3>
    <br />
    <div class="darkMode">
      <div class="topBox">
        <my-tooltip placement="top-start" content="top-start">
          <span class="topReferenceDom">上方左侧上方左侧</span>
        </my-tooltip>
        <my-tooltip placement="top" content="top">
          <span class="topReferenceDom">上方中间</span>
        </my-tooltip>
        <my-tooltip placement="top-end" content="top-end">
          <span class="topReferenceDom">上方右侧上方右侧</span>
        </my-tooltip>
      </div>
      <div class="leftAndRightBox">
        <div class="leftBox">
          <my-tooltip placement="left-start" content="left-start">
            <div class="leftReferenceDom">左侧上方</div>
          </my-tooltip>
          <my-tooltip placement="left" content="left">
            <div class="leftReferenceDom">左侧中间</div>
          </my-tooltip>
          <my-tooltip placement="left-end" content="left-end">
            <div class="leftReferenceDom">左侧下方</div>
          </my-tooltip>
        </div>
        <div class="rightBox">
          <my-tooltip placement="right-start" content="right-start">
            <div class="rightReferenceDom">右侧上方</div>
          </my-tooltip>
          <my-tooltip placement="right" content="right">
            <div class="rightReferenceDom">右侧中间</div>
          </my-tooltip>
          <my-tooltip placement="right-end" content="right-end">
            <div class="rightReferenceDom">右侧下方</div>
          </my-tooltip>
        </div>
      </div>
      <div class="bottomBox">
        <my-tooltip placement="bottom-start" content="bottom-start">
          <span class="bottomReferenceDom">下方左侧下方左侧</span>
        </my-tooltip>
        <my-tooltip placement="bottom" content="bottom">
          <span class="bottomReferenceDom">下方中间</span>
        </my-tooltip>
        <my-tooltip placement="bottom-end" content="bottom-end">
          <span class="bottomReferenceDom">下方右侧下方右侧</span>
        </my-tooltip>
      </div>
    </div>
    <br />
    <h3>亮色模式</h3>
    <br />
    <div class="lightMode">
      <div class="topBox">
        <my-tooltip light placement="top-start" content="top-start">
          <span class="topReferenceDom">上方左侧上方左侧</span>
        </my-tooltip>
        <my-tooltip light placement="top" content="top">
          <span class="topReferenceDom">上方中间</span>
        </my-tooltip>
        <my-tooltip light placement="top-end" content="top-end">
          <span class="topReferenceDom">上方右侧上方右侧</span>
        </my-tooltip>
      </div>
      <div class="leftAndRightBox">
        <div class="leftBox">
          <my-tooltip light placement="left-start" content="left-start">
            <div class="leftReferenceDom">左侧上方</div>
          </my-tooltip>
          <my-tooltip light placement="left" content="left">
            <div class="leftReferenceDom">左侧中间</div>
          </my-tooltip>
          <my-tooltip light placement="left-end" content="left-end">
            <div class="leftReferenceDom">左侧下方</div>
          </my-tooltip>
        </div>
        <div class="rightBox">
          <my-tooltip light placement="right-start" content="right-start">
            <div class="rightReferenceDom">右侧上方</div>
          </my-tooltip>
          <my-tooltip light placement="right" content="right">
            <div class="rightReferenceDom">右侧中间</div>
          </my-tooltip>
          <my-tooltip light placement="right-end" content="right-end">
            <div class="rightReferenceDom">右侧下方</div>
          </my-tooltip>
        </div>
      </div>
      <div class="bottomBox">
        <my-tooltip light placement="bottom-start" content="bottom-start">
          <span class="bottomReferenceDom">下方左侧下方左侧</span>
        </my-tooltip>
        <my-tooltip light placement="bottom" content="bottom">
          <span class="bottomReferenceDom">下方中间</span>
        </my-tooltip>
        <my-tooltip light placement="bottom-end" content="bottom-end">
          <span class="bottomReferenceDom">下方右侧下方右侧</span>
        </my-tooltip>
      </div>
    </div>
    <br />
    <h3>可禁用</h3>
    <br />
    <my-tooltip :disabled="disabled" placement="top" content="disabled属性禁用">
      <span class="item">悬浮出现</span>
    </my-tooltip>
    &nbsp;&nbsp;&nbsp;
    <button @click="disabled = !disabled">点击启用或禁用</button>
    <br />
    <br />
    <h3>当tooltip内容多的时候，使用content插槽</h3>
    <br />
    <my-tooltip placement="top">
      <span slot="content">
        <div class="selfContent">
          内容过多时，使用插槽更便于控制样式，比如换行
        </div>
      </span>
      <span class="item">悬浮出现</span>
    </my-tooltip>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "myTootipName",
  data() {
    return {
      disabled: false,
    };
  },
};
</script>

<style lang='less' scoped>
.showTooltip {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 60px;
  padding-top: 0;
  padding-bottom: 120px;
  .topBox {
    .topReferenceDom {
      border: 1px solid #999;
      box-sizing: border-box;
      padding: 4px 8px;
      border-radius: 4px;
      width: 60px;
      text-align: center;
      margin-right: 6px;
    }
  }
  .leftAndRightBox {
    width: 100%;
    display: flex;
    padding-right: 120px;
    .leftBox {
      margin-right: 250px;
    }
    .leftReferenceDom,
    .rightReferenceDom {
      width: 72px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border: 1px solid #999;
      box-sizing: border-box;
      margin: 12px 0;
    }
  }
  .bottomBox {
    .bottomReferenceDom {
      border: 1px solid #999;
      box-sizing: border-box;
      padding: 4px 8px;
      border-radius: 4px;
      width: 60px;
      text-align: center;
      margin-right: 6px;
    }
  }
  .item {
    border: 1px solid #333;
    padding: 4px;
  }
}
.selfContent {
  width: 120px;
  color: #baf;
  font-weight: 700;
}
</style>