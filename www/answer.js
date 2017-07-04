/**
 * Created by Administrator on 2016/9/21.
 */
//回复
$(document).ready(function(e) {
    var dateStr;
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

    $('#submit').click(function(){

        var dat = {
            id:window.location.search.substr(12),
            response:$('#area').val(),
            time:dateStr
        };
        var answer=document.getElementById("area").value;
        if(0==answer.length){
            nameDiv.innerHTML="提示：回复不能为空！";
            alert("回复不能为空！");
            return false;
        }else{
        var t=confirm('你确定提交吗？');
	
        if(t){
            $.post('../api/response',dat,function(res){
           console.log(res);   
           		  
		     window.location.reload();
            })
			
        }
        }
    });

});


