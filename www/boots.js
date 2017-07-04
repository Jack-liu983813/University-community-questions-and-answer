///**
// * Created by Administrator on 2016/10/20.
// */
//$(function () {
//    var bgg = localStorage.getItem("bgg");
//    if (bgg == null) {
//        $("body").css({ "background-image": "url(images/1212.jpg)","background-repeat":"no-repeat", "background-size": "cover" });
//    }
//    else {
//        $("body").css({ "background-image": "url(" + bgg + ")","background-repeat":"no-repeat", "background-size": "cover" });
//    }
//
//    $("#b-change a").click(function () {
//        $(".s-icons").toggle(500);
//    });
//
//    $(".dpic img").click(function () {
//        var src = $(this).attr("src");
//        $("body").css({ "background-image": "url(" + src + ")","background-repeat":"no-repeat","background-size":"cover" ,"opacity":"50%"});
//        localStorage.setItem("bgg", src);
//    });
//
//});