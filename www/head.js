/**
 * Created by Administrator on 2016/10/11.
 */
//搜索
$('#search').click(function(){
    console.log(111)
    console.log($('#content').val())
    var dat = {
        content:$('#content').val()
    }
    $('#mpbox',parent.document).empty();
    $.post('../api/searching',dat, function (str) {
        for(var key in str) {
            var usr = str[key];
            var usrjo = $('#question',parent.document).clone(true, true);
            //usrjo.find('#questionId',parent.document).html(usr.questionId);
            usrjo.find('#touxiang').attr('src',usr.headImage);
            usrjo.find('#questionTitle',parent.document).html(usr.questionTitle);
            usrjo.find('#userName',parent.document).html(usr.userName);
            usrjo.find('#questionDate',parent.document).html(usr.questionDate);
            usrjo.find('#direction',parent.document).html(usr.directionName);
            usrjo.find('#jinbi',parent.document).html(usr.gold1);

            usrjo.find('a').attr('href','huifuList.html?questionId='+usr.questionId);
            console.log(usrjo);
            $('#mpbox',parent.document).append(usrjo);
        }
    })
})