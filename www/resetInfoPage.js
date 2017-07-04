$("#selfIntroduction").on("input propertychange", function() {
    var $this = $(this),
        _val = $this.val(),
        count = "";
    if (_val.length > 120) {
        $this.val(_val.substring(0, 120));
    }
    count = 120 - $this.val().length;
    $("#text-count").text(count);
});

//获取文本框的值,数据库数据在页面显示
$(document).ready(function () {
    $.post('../api/settingPage',function(dat){
        console.log("kopohb"+dat);
        // 动态设置单选按钮
        var checkSex=dat[0]['sex']
        if(checkSex=='女') $('input:radio:last').attr('checked', 'checked');
        else $('input:radio:first').attr('checked', 'checked');

        //在页面上显示相应的值
		$('#touxiang').attr('src', dat[0]['headImage']);
        $("#userName").val(dat[0]['userName']);
        $("#userPwd").val(dat[0]['userPwd']);
        $("#sex").val(dat[0]['sex'].checked);
        $("#country").val(dat[0]['country']);
        $("#provinces").html(dat[0]['selProvince']);
        $("#city").html(dat[0]['selCity']);
        //$("#address").val(dat[0]['address'].option.selected);
        $("#idNumber").val(dat[0]['idNumber']);
        $("#phoneNumber").val(dat[0]['phoneNumber']);
        $("#email").val(dat[0]['email']);
        $("#headImage").val(dat[0]['headImage']);
        $("#company").val(dat[0]['company']);
        $("#selfIntroduction").val(dat[0]['selfIntroduction']);

    })
})




//修改后的个人资料保存到数据库
$('#reset').click(function(){
    var result=confirm("是否保存修改？")
    if(result==true) {
        //传入接口的数据
        var dat = {
            userName: $('#userName').val(),
            sex: $('input[name="sex"]:checked').val(),
            //sex: $('#sex').val(),
            country: $('#country').val(),
            selProvince: $('#selProvince').val(),
            selCity: $('#selCity').val(),
            idNumber: $('#idNumber').val(),
            phoneNumber: $('#phoneNumber').val(),
            email: $('#email').val(),
            company: $('#company').val(),
            selfIntroduction: $('#selfIntroduction').val()

        };


        var userName=document.getElementById("userName").value;
        var idNumber=document.getElementById("idNumber").value;
        var phoneNumber=document.getElementById("phoneNumber").value;
        var email=document.getElementById("email").value;


        if(userName.length==0||userName.length>8){
            alert("请按照提示输入正确的用户名");
            return false;
        }
        else
        if(phoneNumber.length!=11||parseInt(phoneNumber)!=phoneNumber){
            alert("请按照提示输入正确的手机号");
            return false;
        }
        else
        if(email.length==0||email.indexOf('@')==-1||email.indexOf('.')==-1){
            alert("请按照提示输入正确的邮箱");
            return false;
        }


        //将数据传入接口
        $.post('../api/resetInfoPage', dat, function (dat) {
            if (dat == 1)
            {
                alert('修改成功');
                window.location.reload();
            }
            else
                alert('修改失败')
        })
    }
    else {
        return
    }
});

//上传头像
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
        $('#wenjian').html(f.url);
        $('#wenjian').attr('href', f.url);
        $('#touxiang').attr('src', f.url);
        var datt={
            imgurl: f.url
        }
        console.log(f.url)
        console.log('>>>>>>>>>datt',datt)
        $.post('../api/touxiang',datt,function(dat){
            console.log('>>>>>>>>dat',dat);
            if(dat.code == 1)
                alert('上传成功');

            else
                alert('上传失败')
        })
    });
});

console.log('>>>>FFF');






