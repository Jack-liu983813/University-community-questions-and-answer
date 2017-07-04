///**
// * Created by Administrator on 2016/10/13.
// */

//关注的人的个人资料
$(document).ready(function(){
    var date={
        userId:window.location.search.substr(8)
    };
    $.post('../api/user1Info',date,function(dat){
        $(".userName").html(dat[0]['userName']);
        $(".sex").html(dat[0]['sex']);
        $(".address").html(dat[0]['address']);
        $(".phone").html(dat[0]['phoneNumber']);
        $(".email").html(dat[0]['email']);
        $(".company").html(dat[0]['company']);
    })

});

//关注的人提问的问题在页面显示
$(document).ready(function(){
    var date={
        userId:window.location.search.substr(8)
    };
    $.post('../api/question1Info', date, function (str) {
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