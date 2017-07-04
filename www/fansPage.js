//数据库数据在页面显示
$(document).ready(function () {

    $.post('../api/fansPage',function(str){

        for(var key in str){
            var usr=str[key];
            var usrjo = $('#mingpian').clone(true, true);
            usrjo.find('#fansId').html('<span style="font-weight:bolder ">'+usr.userName+'</span>');
            usrjo.find('#chakan').html('<a href="info1.html?userId='+usr.userId+'">查看信息</a>');
            usrjo.find('#bgzId').html(usr.userId);
            $('tbody').append(usrjo);
        }
    })
});

