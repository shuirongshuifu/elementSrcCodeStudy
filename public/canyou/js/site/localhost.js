var AriaSite = {};
AriaSite["selNav"] = [
  { "selector": ".rrbay_body > div#wrapper > div#header > div.wzaColor", "content": "主" },     
];
AriaSite["selInfoModel"] = [
  { "selector": ".rrbay_body > div#wrapper > div#header > a#logo > img ", "content": "头条" },
];
AriaSite["selService"] = [
  { "selector": ".rrbay_body > div#wrapper > div#footer", "content": "网站底部" },
];
AriaSite["selInteract"] = [
  { "selector": ".rrbay_body > div.main > div.head > div.head_content", "content": "搜索" },
];

AriaSite["selNewsList"] = [
  { "selector": ".rrbay_body > div#wrapper > div#main > div#sidebar> ul#nav", "content": "左侧列表" },
];
AriaSite["selNewsBody"] = [
  { "selector": ".rrbay_body > div#wrapper > div#main > div#content", "content": "详细内容" },
];

(function () {
    //智能解析方式改造网站
    $("img[src='css/logo.jpg']").attr("alt", "湖北太阳湾官方网站logo链接").attr("tabindex", "0");
    
})();

 