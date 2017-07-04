/**
 * Created by Mrs Li on 2016/10/2.
 */

var coun=new Array();
coun["中国"]=["北京","上海","广东省","浙江省","江苏省","河南省","安徽省","河北省"];
coun["英国"]=["伦敦","伯明翰","布里斯托","利兹","利物浦","曼彻斯特","爱丁堡"];
coun["美国"]=["纽约","洛杉矶","好莱坞","大熊湖","圣加夫列夫尔","托兰斯"];

function showCountry(){
    var countryName=document.getElementById("country").value;
    var province=document.getElementById("selProvince");
    province.options.length=0;
    //根据字符串键进行循环遍历方式
    for(var key in coun){
        if(key==countryName){
            for(var inkey in coun[key]){
                province.add(new Option(coun[key][inkey],coun[key][inkey]),null)
            }
        }
    }
}

var names=new Array();
names["北京"]=["东城区","西城区","海淀区","朝阳区","通州区","顺义区","房山区"],
names["上海"]=["黄浦区","虹口区","杨浦区","闸北区","浦东新区","长宁区","金山区"],
names["广东省"]=["珠海市","汕头市","佛山市","韶关市","湛江市","惠州市","梅州市","东莞市","中山市"],
names["浙江省"]=["杭州","宁波","温州","绍兴","湖州","嘉兴","金华","衢州","舟山"],
names["江苏省"]=["南京市","苏州市","无锡市","昆山市","常州","仪征","高邮","镇江","南通","徐州","泰州","盐城","淮安","连云港","宿迁"];
names["河南省"]=["郑州市","开封市","商丘市","洛阳","南阳市","漯河","许昌","三门峡","平顶山","周口","驻马店","新乡","鹤壁","焦作","濮阳","安阳","信阳","济源"];
names["安徽省"]=["合肥市","安庆市","六安市","亳州市","芜湖市","蚌埠市","马鞍山市","淮南市","铜陵市","黄山市","宣城市","池州市","滁州市","淮北市","阜阳市","宿州市"];
names["河北省"]=["石家庄市","唐山市","秦皇岛市","邯郸市","武安市","石家庄市","唐山市","秦皇岛市","邯郸市","武安市","石家庄市","唐山市","秦皇岛市","邯郸市","武安市"];

names["伦敦"]=["威斯敏斯特市1","旺兹沃思1","肯辛顿1","兰贝斯1","萨瑟克1","陶尔哈姆莱茨1","哈克尼1"],
names["伯明翰"]=["威斯敏斯特市2","旺兹沃思2","肯辛顿2","兰贝斯2","萨瑟克2","陶尔哈姆莱茨2","哈克尼2"],
names["布里斯托"]=["威斯敏斯特市3","旺兹沃思3","肯辛顿3","兰贝斯3","萨瑟克3","陶尔哈姆莱茨3","哈克尼3"],
names["利兹"]=["威斯敏斯特市4","旺兹沃思4","肯辛顿4","兰贝斯4","萨瑟克4","陶尔哈姆莱茨4","哈克尼4"],
names["利物浦"]=["威斯敏斯特市5","旺兹沃思5","肯辛顿5","兰贝斯5","萨瑟克5","陶尔哈姆莱茨5","哈克尼5"],
names["曼彻斯特"]=["威斯敏斯特市6","旺兹沃思6","肯辛顿6","兰贝斯6","萨瑟克6","陶尔哈姆莱茨6","哈克尼66"],
names["爱丁堡"]=["威斯敏斯特市7","旺兹沃思7","肯辛顿7","兰贝斯7","萨瑟克7","陶尔哈姆莱茨7","哈克尼7"],

names["纽约"]=["纽约郡","东河","国王郡","哈莱姆河","罗斯福岛","里士满郡","吴丹岛"],
names["洛杉矶"]=["纽约郡","东河","国王郡","哈莱姆河","罗斯福岛","里士满郡","吴丹岛"],
names["好莱坞"]=["纽约郡","东河","国王郡","哈莱姆河","罗斯福岛","里士满郡","吴丹岛"],
names["大熊湖"]=["纽约郡","东河","国王郡","哈莱姆河","罗斯福岛","里士满郡","吴丹岛"],
names["圣加夫列夫尔"]=["纽约郡","东河","国王郡","哈莱姆河","罗斯福岛","里士满郡","吴丹岛"],
names["托兰斯"]=["纽约郡","东河","国王郡","哈莱姆河","罗斯福岛","里士满郡","吴丹岛"]
function showCity(){
    var provinceName=document.getElementById("selProvince").value;
    var citys=document.getElementById("selCity");
    citys.options.length=0;
    //根据字符串键进行循环遍历方式
    for(var key in names){
        if(key==provinceName){
            for(var inkey in names[key]){
                citys.add(new Option(names[key][inkey],names[key][inkey]),null)
            }
        }
    }
}
//
//
function checkEmail(){
    var email=document.getElementById("email").value;
    var regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if(email.length==0){
        document.getElementById("email_prompt").innerHTML="邮箱不能为空";
        document.getElementById("email_prompt").style.color="red";
        return false;
    }
    if(!regEmail.test(email)){
        document.getElementById("email_prompt").innerHTML="电子邮件格式不正确，请输入带@和.的正确格式";
        document.getElementById("email_prompt").style.color="red";
        return false;
    }
    document.getElementById("email_prompt").innerHTML="";
    document.getElementById("email_prompt").style.border="0px solid black"
}
function checkName()
{
    var name=document.getElementById("userName").value;
    var regName=/^[A-Za-z][A-Za-z0-9]{1,20}$/;
    if(name.length<=0||name.length>20)
    {
        document.getElementById("user_prompt").innerHTML="用户名格式错误，请填写1-8位字符";
        document.getElementById("user_prompt").style.color="red";
        return false;
    }
    document.getElementById("user_prompt").innerHTML="";
    document.getElementById("user_prompt").style.border="0px solid black"
}

function checkPhoneNum(){
    var phoneNumber=document.getElementById("phoneNumber").value;
    var regPhoneNumber=/(^1\d{10}$)/;
    if(phoneNumber.length==0){
        document.getElementById("phoneNumber_prompt").innerHTML="手机号码不能为空";
        document.getElementById("phoneNumber_prompt").style.color="red";
        return false;
    }
    if(!regPhoneNumber.test(phoneNumber)){
        document.getElementById("phoneNumber_prompt").innerHTML="手机号码格式错误，请填写11位数字";
        document.getElementById("phoneNumber_prompt").style.color="red";
        return false;
    }
    document.getElementById("phoneNumber_prompt").innerHTML="";
    document.getElementById("phoneNumber_prompt").style.border="0px solid black";
}

