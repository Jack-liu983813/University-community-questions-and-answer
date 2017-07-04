//底部导航分页
var nn;
$(document).ready(function () {
    $.post('../api/fenye',function(str){
        nn = Math.ceil(str[0]['count(*)']/8);
        for(var key=nn;key>=1;key--){
            var usrjo = $('#num').clone(true, true);
            usrjo.find('a').html(key);
            $('#box').after(usrjo);
        }
    })
});

//问题列表分页显示
var dat = {
    a:0
}
$.post('../api/questionlist',dat,function(str){
    {$('#previous').addClass('disabled')}
    $('#mpbox').empty()
    for (var key in str) {
        var usr = str[key];
        var datt = {uId:usr.userId};
        var str3;
        //$.post('../api/yiguanzhu',datt,function(str2){
        //  alert(str2)
        //})
        if (usr.identity != '专家') {
            $('#focus').hide();
        }
        //else if(usr.identity == '专家'&& str3 == 1){
        //
        //}
        else{
            $('#focus').show();
        }
        var usrjo = $('#question').clone(true, true);
        usrjo.find('#touxiang').attr('src', usr.headImage);
        usrjo.find('#questionId').html(usr.questionId);
        usrjo.find('#questionTitle').html(usr.questionTitle);
        usrjo.find('#userName').html(usr.userName);
        usrjo.find('#questionDate').html(usr.questionDate);
        usrjo.find('#direction').html(usr.directionName);
        usrjo.find('#jinbi').html(usr.gold1);
        usrjo.find('#ask').attr('href', 'info.html?questionId=' + usr.questionId);
        usrjo.find('#huifu').attr('href', 'huifuList.html?questionId=' + usr.questionId);
        $('#mpbox').append(usrjo);
    }
})
//点击12345
var mm;
$('#num').click(function(){
    console.log($(this).children()[0].innerHTML-1)
    mm=$(this).children()[0].innerHTML-1;
    var dat={
        a:$(this).children()[0].innerHTML-1
    }
    if(mm==nn-1){$('#next').addClass('disabled')}
    else{$('#next').removeClass('disabled')}
    if(mm==0){$('#previous').addClass('disabled')}
    else{$('#previous').removeClass('disabled')}
    $('#num').attr('style',"background-color: blue")
    console.log(dat)
    $.post('../api/questionlist',dat,function(str){
        $('#mpbox').empty()
        for(var key in str){
            var usr=str[key];
            //var userId = usr.userId;
            //var datt = {uId:userId};
            //var str3;
            //$.post('../api/yiguanzhu',datt,function(str2){
            //    str3 = str2
            //})
            if (usr.identity != '专家') {
                $('#focus').hide();
            }
            //else if(usr.identity == '专家'&& str3 == 1){
            //
            //}
            else{
                $('#focus').show();
            }
            var usrjo = $('#question').clone(true, true);
            usrjo.find('#touxiang').attr('src',usr.headImage);
            usrjo.find('#questionId').html(usr.questionId);
            usrjo.find('#questionTitle').html(usr.questionTitle);
            usrjo.find('#userName').html(usr.userName);
            usrjo.find('#questionDate').html(usr.questionDate);
            usrjo.find('#direction').html(usr.directionName);
            usrjo.find('#jinbi').html(usr.gold1);
            usrjo.find('a').attr('href','huifuList.html?questionId='+usr.questionId);
            $('#mpbox').append(usrjo);


        }
    })
})
//点击左右按钮
//var numm = $('#num').children()[0].innerHTML;

$('#next').click(function(){
    mm++;
    var dat={
        a:mm,
    }
    if(mm==nn-1){$('#next').addClass('disabled')}
    else if(mm<nn-1){
        $.post('../api/questionlist',dat,function(str){
            console.log('.....')
            $('#mpbox').empty()
            for(var key in str){
                var usr=str[key];
                var usrjo = $('#question').clone(true, true);
                usrjo.find('#touxiang').attr('src',usr.headImage);
                usrjo.find('#questionId').html(usr.questionId);
                usrjo.find('#questionTitle').html(usr.questionTitle);
                usrjo.find('#userName').html(usr.userName);
                usrjo.find('#questionDate').html(usr.questionDate);
                usrjo.find('#direction').html(usr.directionName);
                usrjo.find('#jinbi').html(usr.gold1);

                usrjo.find('a').attr('href','huifuList.html?questionId='+usr.questionId);
                //console.log('======'+usrjo.tagName);
                $('#mpbox').append(usrjo);
            }
        })
    }
})


$('#previous').click(function(){
    mm--;
    var dat={
        a:mm,
    }
    if(mm==0){$('#previous').addClass('disabled')}
    else if(mm>0){
        $.post('../api/questionlist',dat,function(str){
            $('#mpbox').empty()
            for(var key in str){
                var usr=str[key];
                var usrjo = $('#question').clone(true, true);
                usrjo.find('#touxiang').attr('src',usr.headImage);
                usrjo.find('#questionId').html(usr.questionId);
                usrjo.find('#questionTitle').html(usr.questionTitle);
                usrjo.find('#userName').html(usr.userName);
                usrjo.find('#questionDate').html(usr.questionDate);
                usrjo.find('#direction').html(usr.directionName);
                usrjo.find('#jinbi').html(usr.gold1);

                usrjo.find('a').attr('href','huifuList.html?questionId='+usr.questionId);
                //console.log('======'+usrjo.tagName);
                $('#mpbox').append(usrjo);
            }
        })
    }
})


//关注
$('#focus').click(function () {
    var dat = {
        questionId: $(this).parent().children()[0].innerHTML
    }

    $.post('../api/focus', dat, function (s) {
        if (s == 1) {
            alert('您已关注过！！！')
        }
        else {
            confirm("关注成功！！！");

        }


    })
})