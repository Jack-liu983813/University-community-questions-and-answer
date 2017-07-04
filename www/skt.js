var socket = io('123.206.129.20:8000');

console.log('>>>', socket);

$('#chatbtn').click(function () {
    console.log('>>>>>>');
    $.post('../api/tx',function(dat){
        socket.emit('chat', {
            tx: dat[0]['headImage'],
            text: $('#text').val(),
            ts: new Date(),
        })
        $("#text").val("");
    })
})




socket.on('chat', function (msg) {
    console.log('some msg come in:', msg)
    $('#msgs').append($('<div>'+
        '<img id="tx" src="'+msg.data.tx+'" style="width: 45px;height:45px;border-radius:40%;float: left;margin-left: 25px">'+
        '<div style="margin-left: 105px;position:relative;width:200px;min-height:35px;background:#F8C301;border-radius:5px; /* 圆角 */margin:30px auto 0;">'+msg.data.text+'' +
        '<div style="position:absolute;top:5px;left:-16px; /* 圆角的位置需要细心调试哦 */width:0;height:0;font-size:0;border:solid 8px;border-color:386487 #F8C301 386487 386487;">'+
        '</div>'+'</div>'+
        '<div style="margin-left: 105px;font-size: 10px;color: white">时间：'+ msg.data.ts+'</div>'+
        '</div>'));
});



//顶部聊天头像
var a;
$.post('../api/liaotiantouxiang',function(dat){
    a=$('#touxiang').attr('src', dat[0]['headImage']);
    $("#userName").html(dat[0]['userName']);

})
