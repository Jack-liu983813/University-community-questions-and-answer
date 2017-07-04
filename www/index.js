
$('#button2').click(function(){
    var dat = {
        phone:$('.username').val(),
        pw:$('.password').val()
    };
    $.post('../api/login1',dat,function(res){
        if(res.code==1){
            var dat2={dat2:res.data}
            console.log(dat2.dat2)
            $.post('../api/reg ',dat2,function(res){

            });
            window.location.href='login.html'
        }
        else{
            alert(res.text)
        }
    })
});
