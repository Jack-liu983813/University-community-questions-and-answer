$(document).ready(function(e) {
    var dateStr;
	var kyjinbi;
    function showTime(){
        var date=new Date();
        var s=date.getSeconds();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        dateStr=year+"-"+month+"-"+day+" "+hour+"时"+minute+"分"+s+"秒";
    }

    var interval=window.setInterval(showTime,100);
	//金币
    $.post('../api/gold',undefined, function (res) {
        console.log(res);
        $("#kyjinbi").html(res[0].gold);
		kyjinbi=res[0].gold;
    });
    //上传文件
    var fileurl;
    $('#shangchuan').click(function () {
        _fns.uploadFile2($('#shangchuan'), function (f) {
            console.log('>>>>before:', f);
        }, function (f) {
            console.log('>>>>progressAAAA:', f);
            $('#wancheng').css('width', f.percent + '%');
            $('#wancheng').html(f.percent + '%');
            console.log('>>>>>AAAA');
        }, function (f) {
            console.log('>>>>successXXXX:', f);
            //$('#wenjian').html(f.url);
            //$('#wenjian').attr('href', f.url);
            //$('#touxiang').attr('src', f.url);
                fileurl=f.url
            console.log(f.url)
            // console.log('>>>>>>>>>datt',datt)
        });
    });


    $('#submit').click(function(){
        var dat = {
            question:$('#area').val(),
            direction:$("#menu").find("option:selected").val(),
            gold1:$('#jinbi').val(),
            miaoshu:$('#miaoshu').val(),
            time:dateStr,
            file:fileurl
        };
        var question=document.getElementById("area").value;
        var jinbi=document.getElementById("jinbi").value;
        if(0==question.length){
            alert("问题不能为空！");
            return false;
        }else
        if(parseInt(jinbi)!=jinbi){
            alert("请给整金币数，0金币可提问哦！");
            return false;
        }else 
		if(jinbi<0||jinbi>kyjinbi){
			  alert("金币不足，0金币可提问哦！");
            return false;
		}
        var t=confirm('你确定提交吗？');
        if(t){
            $.post('../api/question',dat,function(res){
                console.log(res);
                window.location.href = 'topicPage.html'
            })
        }
    });
});




