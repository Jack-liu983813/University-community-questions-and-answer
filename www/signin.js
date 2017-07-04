/**
 * Created by Administrator on 2017/4/20.
 */
$('#signup').click(function(){
    var dat={
        username:$('#user2').val(),
        password:$('#pass2').val()
    };
    $.post('../api/register',dat,function(res){

    })
})

$('#signin').click(function(){
    var dat={
        username:$('#user1').val(),
        password:$('#pass1').val()
    };
    $.post('../api/login',dat,function(res){
        console.log(res);
        console.log(dat.username);


        if(res.x = dat.username){
            if(res.y != dat.password){
                //报错
                alert('密码错误');
            }else{
                //跳转到首页
                window.location.href='index.html';
            }
        }else{
            //报错
            alert('用户名不存在');
        }
    })
})