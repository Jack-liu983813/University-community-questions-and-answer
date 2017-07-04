/**
 * Created by Mrs Li on 2016/9/21.
 */
//数据库数据在页面显示
$(document).ready(function () {

    $.post('../api/expertsPage',function(str){

        for(var key in str){
            var usr=str[key];
            var usrjo = $('#mingpian').clone(true, true);
            usrjo.find('#userName').html(usr.userName);
            usrjo.find('#userId').html(usr.userId);
            usrjo.find('#levelName').html(usr.levelName);
            console.log(usrjo);
            //usrjo.find('#questionDate').html(usr.questionDate);
            //usrjo.find('#direction').html(usr.directionName);
            //console.log('======'+usrjo.tagName);
            $('tbody').append(usrjo);
        }
    })
});

