
var dateStr;
$(document).ready(function () {

    $.post('../api/settingPage',function(dat){
        $('#touxiang').attr('src', dat[0]['headImage']);
        $.post('../api/gold',function(dat){
            $("#jinbi").html(dat[0]['gold']);

        })
    })

    function showTime(){
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        dateStr=year+"-"+month+"-"+day;
    }
    var interval=window.setInterval(showTime,100);

});
$('#qiandao').click(function(){
    var hqdDate;
    $.post('../api/hqdDate',function(dat){
        hqdDate = dat[0]['qdDate'];
        if(hqdDate == dateStr)
        {
            alert('今日已签到！')
        }
        else{
            var dat = {
            time:dateStr
        };
            $.post('../api/qdDate',dat,function(res){

                $.post('../api/qdgold',function(dat){
                    alert('签到成功！金币+5！');
                    window.location.reload();
                })
            })
        }
    })
})

