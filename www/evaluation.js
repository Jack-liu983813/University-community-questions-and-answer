/**
 * Created by Administrator on 2016/9/18.
 */

$('#btn').click(function(){
   var dat={
      evaluation : $("#text").val()
   };
    $.post('http://localhost:8000/api/evaluation',dat,function(res){
        console.log(res)
        window.location.href = 'firstPage.html'
    })
});