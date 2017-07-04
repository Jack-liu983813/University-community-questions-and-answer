
//数据库数据在页面显示
$(document).ready(function () {

    $.post('../api/responsePage',function(str){

        for(var key in str){
            var usr=str[key];
            var usrjo = $('#mingpian').clone(true, true);
            usrjo.find('#questionTitle').html(usr.questionTitle);
            usrjo.find('#directionName').html(usr.directionName);
            usrjo.find('#resContent').html(usr.resContent);
            usrjo.find('#userName').html(usr.userName);
            usrjo.find('#resDate').html(usr.resDate);
            $('#huifu').append(usrjo);
        }
    })
});

