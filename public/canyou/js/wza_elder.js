$(document).ready(function (a) {
    if (sessionStorage.getItem("elder") && sessionStorage.getItem("elder") == "开启适老模式") {
        $("#wzaElder").text("关闭适老模式")
        $("body").addClass("elderClass")
    } else {
        $("#wzaElder").text("开启适老模式")
        $("body").removeClass("elderClass")
    }
    $("#wzaElder").click(function () {
        if ($(this).text() == "开启适老模式") {
            $(this).text("关闭适老模式")
            sessionStorage.setItem("elder", "开启适老模式");
            $("body").addClass("elderClass")
        } else {
            $(this).text("开启适老模式")
            sessionStorage.setItem("elder", "关闭适老模式");
            $("body").removeClass("elderClass")
        }
    });
});