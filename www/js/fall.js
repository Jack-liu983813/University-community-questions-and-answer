/**
 * Created by Mrs Li on 2016/9/15.
 */

$(function(){
    var d="<div class='snow'>Html<div>"
    setInterval(function(){
        var f=$(document).width();
        var e=Math.random()*f-100;
        var o=0.3+Math.random();
        var fon=10+Math.random()*30;
        var l = e - 100 + 200 * Math.random();
        var k=2000 + 5000 * Math.random();
        $(d).clone().appendTo(".snowbg").css({
            left:e+"px",
            opacity:o,
            "font-size":fon,
        }).animate({
            top:"400px",
            left:l+"px",
            opacity:0.1,
        },k,"linear",function(){$(this).remove()})
    },800)
})
$(function(){
    var d="<div class='snow'>CSS<div>"
    setInterval(function(){
        var f=$(document).width();
        var e=Math.random()*f-100;
        var o=0.3+Math.random();
        var fon=10+Math.random()*30;
        var l = e - 100 + 200 * Math.random();
        var k=2000 + 5000 * Math.random();
        $(d).clone().appendTo(".snowbg").css({
            left:e+"px",
            opacity:o,
            "font-size":fon,
        }).animate({
            top:"400px",
            left:l+"px",
            opacity:0.1,
        },k,"linear",function(){$(this).remove()})
    },1000)
})
$(function(){
    var d="<div class='snow'>jquery<div>"
    setInterval(function(){
        var f=$(document).width();
        var e=Math.random()*f-100;
        var o=0.3+Math.random();
        var fon=10+Math.random()*30;
        var l = e - 100 + 200 * Math.random();
        var k=2000 + 5000 * Math.random();
        $(d).clone().appendTo(".snowbg").css({
            left:e+"px",
            opacity:o,
            "font-size":fon,
        }).animate({
            top:"400px",
            left:l+"px",
            opacity:0.1,
        },k,"linear",function(){$(this).remove()})
    },600)
})
$(function(){
    var d="<div class='snow'>mySQL<div>"
    setInterval(function(){
        var f=$(document).width();
        var e=Math.random()*f-100;
        var o=0.3+Math.random();
        var fon=10+Math.random()*30;
        var l = e - 100 + 200 * Math.random();
        var k=2000 + 5000 * Math.random();
        $(d).clone().appendTo(".snowbg").css({
            left:e+"px",
            opacity:o,
            "font-size":fon,
        }).animate({
            top:"400px",
            left:l+"px",
            opacity:0.1,
        },k,"linear",function(){$(this).remove()})
    },600)
})