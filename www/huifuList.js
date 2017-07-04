/**
 * Created by Administrator on 2016/9/27.
 */
 
var jinbi;
var queId;
$(document).ready(function (){
	//显示当前问题
var date={
    id:window.location.search.substr(12)
}
    $.post('../api/question1',date,function(dat){
        //alert(JSON.stringify(dat));
        //在页面上显示相应的值
        //console.log(window.location.search.split('=')[1])
        $("#questionTitle").html(dat[0]['questionTitle']);
        $('#touxiang').attr('src', dat[0]['headImage']);
        $("#directionName").html(dat[0]['directionName']);
        $("#userName").html(dat[0]['userName']);
        $("#questionDate").html(dat[0]['questionDate']);
        $("#questionContent").html(dat[0]['questionContent']);
        $("#gold1").html(dat[0]['gold1']);
        $("#fujian").attr('href', dat[0]['furl']);
		 queId=dat[0]['userId'];
		 jinbi=dat[0]['gold1'];

		//alert(queId)

        //console.log($("#questionId").html(dat[window.location.search.substr(12)-1]['questionId']))
        //console.log( $("#questionTitle").html(dat[window.location.search.substr(12)-1]['questionTitle']))
    })
    //获取服务器用户id
    var usrId;
    $.post('http://m.xmgc360.com/start/api/getMyInfo',undefined,function(res){
        if (res.code==1){
            usrId = res.data.id;
           //alert(usrId)
        }
        else{
            
        }
    });
    //显示最佳图片消失最佳按钮
        var dd={
            questionId:window.location.search.substr(12)
        };
       $.post('../api/getzuijia',dd,function(str){
          // var id=str.data[0].resId;
           var id;
           if (str.data[0] ==null){
               id=0;
           }
           //console.log(str.data[0].resId);
          // alert(str.data[0].resId)
           var dat={
               id:window.location.search.substr(12)
           };
           $.post('../api/answerlist',dat,function(str){

               for(var key in str){
                   var usr=str[key];
                   var usrjo = $('#answer').clone(true, true);
                   usrjo.find('#resId').html(usr.resId);
				   usrjo.find('#txt').attr('src',usr.headImage);
                   usrjo.find('#resContent').html(usr.resContent);
                   usrjo.find('#resName').html(usr.userName);
                   usrjo.find('#resDate').html(usr.resDate);
                   usrjo.find('#zan1').html(usr.zan);
                   usrjo.find('#cai1').html(usr.cai);
                   var bestRes = usr.bestResponse;
                   if( bestRes == 1)
                   {
                       usrjo.find('#zuijia').show();
                       usrjo.find('#best').hide();
                   }
                   else
                   if( bestRes == 0 && id==0 && queId==usrId ){
                       usrjo.find('#zuijia').hide();
                       usrjo.find('#best').show();
                   }
                   else{
                       usrjo.find('#zuijia').hide();
                       usrjo.find('#best').hide();
                   }
                   $('#mpbox').append(usrjo);
               }

      })

       });



        //点击赞加1
        $('.z').click(function(){
            //console.log($(this));

            console.log("jjj");

            //console.log($(this).parent().children()[0]);
            var dat = {
                id:$(this).parent().children()[0].innerHTML
            };
            var objnum = $(this);
            //var a=$(this).(id)
            $.post('../api/question111',dat,function(res){
                var num = objnum.find('sup').html();
                if(res.length==0)
                    num ++;
                objnum.find('sup').html(num);
            })
        });
        //点击踩加1
        $('.c').click(function(){
            console.log($(this).parent().children()[0].innerHTML);
            var dat = {
                id:$(this).parent().children()[0].innerHTML
            };
            var objnum = $(this);
            $.post('../api/caicai',dat,function(res){
                var num = objnum.find('sup').html();
                if(res.length==0)
                    num ++;
                objnum.find('sup').html(num);
                console.log(res);
            })
        });

    })


//设为 最佳
$("#best").click(function(){
    var dat={
        id:$(this).parents().children()[0].innerHTML
    } 
	$.post('../api/zuijia',dat,function(str){
    });
	
    $.post('../api/zjId',dat,function(str){
		var zuijiaid=str;
   	 //alert(queId)
	 console.log(queId)
	   var subjb={
		sjb:jinbi,
		sid:queId
	    } 
	
	 $.post('../api/subjinbi',subjb,function(str){
      console.log(str);
	
		var jb={
		jb:jinbi,
		id:zuijiaid
	    }
	   $.post('../api/addjinbi',jb,function(str){
        console.log(str);
	    });
	});
   });
});
//alert(window.location.search.substr(12))

