/**
 * Created by Mrs Li on 2016/9/21.
 */

//获取文本框的值

//数据库数据在页面显示
$(document).ready(function () {

    $.post('../api/myquestion',function(str){

        for(var key in str){
            var usr=str[key];
            var usrjo = $('#mingpian').clone(true, true);
            usrjo.find('#questionTitle').html(usr.questionTitle);
            usrjo.find('#questionDate').html(usr.questionDate);
            usrjo.find('#gold1').html(usr.gold1);
            usrjo.find('#resContent').html(usr.resContent);
            usrjo.find('#回答者').html(usr.回答者);
            $('#huifu').append(usrjo);
        }
    })
});

