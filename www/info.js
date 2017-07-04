/**
 * Created by Administrator on 2016/10/13.
 */
//个人资料
$(document).ready(function(){
    var date={
        id:window.location.search.substr(12)
    };
    $.post('../api/userInfo',date,function(dat){
    $(".userName").html(dat[0]['userName']);
    $(".sex").html(dat[0]['sex']);
    $(".address").html(dat[0]['address']);
    $(".phone").html(dat[0]['phoneNumber']);
    $(".email").html(dat[0]['email']);
    $(".company").html(dat[0]['selCity']);
})
});

//数据库数据(提问的问题)在页面显示
$(document).ready(function(){
    var date={
        id:window.location.search.substr(12)
    };
    $.post('../api/questionInfo', date, function (str) {
        //alert(JSON.stringify(dat));
        //在页面上显示相应的值
        for (var key in str) {
            var usr = str[key];
            var usrjo = $('#tr2').clone(true, true);
            usrjo.find('#questionTitle').html(usr.questionTitle);
            usrjo.find('#directionName').html(usr.directionName);
            usrjo.find('#questionDate').html(usr.questionDate);
            $("#bb").append(usrjo)
        }

    })
});
