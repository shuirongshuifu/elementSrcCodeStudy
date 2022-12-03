<template>
  <div class="apiLogWrap">
    <my-divider style="color:red" lineType="dashed" content-position="left">正常显示：flag值为up上升红色，值为down下降绿色，默认文字也有颜色</my-divider>
    <span>中概股变化：<my-trend flag="up">10%</my-trend></span>
    <br>
    <span>中概股变化：<my-trend flag="down">8%</my-trend></span>
    <my-divider lineType="dashed" content-position="left">若要去掉文字颜色，只保留三角形颜色，使用whole属性</my-divider>
    <span>中概股变化：<my-trend flag="up" :whole='false'>10%</my-trend></span>
    <br>
    <span>中概股变化：<my-trend flag="down" :whole='false'>8%</my-trend></span>
    <my-divider lineType="dashed" content-position="left">正常情况下上升为红色，下降为绿色，不过美国股票恰好颜色反过来，使用reverseColor属性做颜色反转</my-divider>
    <span>美股变化：<my-trend flag="up" :reverseColor="true">10%</my-trend></span>
    <br>
    <span>美股变化：<my-trend flag="down" :reverseColor="true">8%</my-trend></span>
    <my-divider lineType="dashed" content-position="left">当然也可以搭配:whole='false'设置反转后的文字没颜色</my-divider>
    <span>美股变化：<my-trend flag="up" :reverseColor="true" :whole='false'>10%</my-trend></span>
    <br>
    <span>美股变化：<my-trend flag="down" :reverseColor="true" :whole='false'>8%</my-trend></span>
  </div>
</template>