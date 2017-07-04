/**
 * Created by Administrator on 2016/10/9.
 */
//用户资料管理
$(document).ready(function () {

    $.post('../api/userData',function(str){

        for(var key in str){
            var usr=str[key];
            var usrjo = $('#tr').clone(true, true);
            usrjo.find('#userId').html(usr.userId);
            usrjo.find('#userName').html(usr.userName);
            usrjo.find('#identity').html(usr.identity);
            usrjo.find('#gold').html(usr.gold);
            usrjo.find('#manages').html('<input type="button" value="设为专家">');
            usrjo.find('#manage1').html('<input type="button" value="删除">');

            //console.log('======'+usrjo.tagName);
            $('#aa').append(usrjo);
        }
    })
});

//用户问题管理
$(document).ready(function () {

    $.post('../api/userQuestion1',function(str){

        for(var key in str){
            var usr=str[key];
            var usrjo = $('#tr1').clone(true, true);
            usrjo.find('#questionId').html(usr.questionId);
            usrjo.find('#userName1').html(usr.userName);
            usrjo.find('#questionContent').html(usr.questionContent);
            usrjo.find('#questionTitle').html(usr.questionTitle);
            usrjo.find('#manage2').html('<input type="button" value="删除">');

            //console.log('======'+usrjo.tagName);
            $('#bb').append(usrjo);
        }
    })
});

//回复信息管理
$(document).ready(function () {

    $.post('../api/response111',function(str){

        for(var key in str){
            var usr=str[key];
            var usrjo = $('#tr2').clone(true, true);
            usrjo.find('#resId').html(usr.resId);
            usrjo.find('#userName2').html(usr.userName);
            usrjo.find('#resContent').html(usr.resContent);
            usrjo.find('#manage3').html('<input type="button" value="删除">');

            //console.log('======'+usrjo.tagName);
            $('#cc').append(usrjo);
        }
    })
});

//点击按钮删除用户信息记录
    $('#manage1').click(function(){
        console.log($(this).parent().children()[0].innerHTML);
        var dat = {
            id:$(this).parent().children()[0].innerHTML
        }
        if(confirm("你将删除此条数据？")) {
        $.post('../api/deleteuserdata',dat,function(res){

            })
        }
    })
//点击按钮删除问题记录
$('#manage2').click(function(){
    console.log($(this).parent().children()[0].innerHTML);
    var dat = {
        id:$(this).parent().children()[0].innerHTML
    }
    if(confirm("你将删除此条数据？")) {
        $.post('../api/deleteuserquestion', dat, function (res) {

        })
    }
})
//点击按钮删除回复记录
$('#manage3').click(function(){
    console.log($(this).parent().children()[0].innerHTML);

        var dat = {
            id: $(this).parent().children()[0].innerHTML
        }
        if(confirm("你将删除此条数据？")) {
        $.post('../api/deleteresponse', dat, function (res) {

        })
    }
})
//点击按钮设为专家
$('#manages').click(function(){
    console.log($(this).parent().children()[0].innerHTML);
    var dat = {
        id:$(this).parent().children()[0].innerHTML
    }
    if(confirm("你确定将他设为专家吗？")) {
        $.post('../api/sheweizhuanjia',dat,function(res){

        })
    }
})