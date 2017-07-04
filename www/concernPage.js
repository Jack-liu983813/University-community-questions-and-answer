
var usr;
var userjo;
//数据库数据在页面显示
$(document).ready(function () {

    $.post('../api/concernPage',function(str){

        for(var key in str){
            usr=str[key];
            usrjo = $('#mingpian').clone(true, true);
            usrjo.find('#concernId').html('<span style="font-weight:bolder ">'+usr.userName+'</span>');
            usrjo.find('#chakan').html('<a href="info1.html?userId='+usr.userId+'" style="color: black">查看信息</a>');
            usrjo.find('#bgzId').html(usr.userId);
            //usrjo.find('#concernDate').html(usr.concernDate);
            //usrjo.find('#look').html('<a href="#"><a href="huifuList.html?questionId='+usr.questionId+'">查看</a></a>');
            usrjo.find('#cancel').html('<a href="" style="font-weight:bolder;color:black ">取消关注</a>');
            usrjo.find('#ask').attr('href','info.html?questionId='+usr.questionId);
            $('tbody').append(usrjo);
            //alert(usr.concernId);

        }

    })
});
//取消关注
$('#cancel').click(function(){
    var dat={
        concernId:$(this).prev().html()
    }
    if(confirm("确定取消关注吗？")) {
        $.post('../api/cancelFocus', dat, function (s) {
            window.location.reload()
        })
    }
})