/*http路由分发
接口模式server/:app/:api
*/
var _rotr = {};
//http请求的路由控制
_rotr = new $router();
//访问的请求
_rotr.get('api', '/api/:apiname', apihandler);
_rotr.post('api', '/api/:apiname', apihandler);
var _mysql=require('./_mysql');
var _ctnu = require('./ctnu');
/*所有api处理函数都收集到这里
必须是返回promise
各个api处理函数用promise衔接,return传递ctx
*/
_rotr.apis = {};

/*处理Api请求
默认tenk的api直接使用
每个app的独立api格式appname_apiname
*/
var userId1;
function * apihandler(next) {
    var ctx = this;

     var apinm = ctx.params.apiname;

    if(apinm!="login"){
         var cookie1 = ctx.cookies.get('name');
        cookie2 = "select * from userdata where cookie = '"+cookie1+"'";
        var cook = yield _ctnu([_mysql.conn,'query'],cookie2);
        console.log('00000000');
        console.log(cook);
        // console.log(cook[0].cookie;
        if(cook.length != 0){
           userId1 = cook[0].userId;

        }else{
            return;
        }
    }
    console.log('API RECV:', apinm);
    
   
   

    //userId1=yield _fns.getUidByCtx(ctx);


   




    //匹配到路由函数,路由函数异常自动返回错误,创建xdat用来传递共享数据
    var apifn = _rotr.apis[apinm];
    ctx.xdat = {
        apiName: apinm
    };

    if (apifn && apifn.constructor == Function) {
        yield apifn.call(ctx, next).then(function() {

            //所有接口都支持JSONP,限定xx.x.xmgc360.com域名
            var jsonpCallback = ctx.query.callback || ctx.request.body.callback;
            if (jsonpCallback && ctx.body) {
                if (_cfg.regx.crossDomains.test(ctx.hostname)) {
                    ctx.body = ctx.query.callback + '(' + JSON.stringify(ctx.body) + ')';
                }
            }

        }, function(err) {
            ctx.body = __newMsg(__errCode.APIERR, [err.message, 'API proc failed:' + apinm + '.']);
            __errhdlr(err);
        });
    } else {
        ctx.body = __newMsg(__errCode.NOTFOUND, ['服务端找不到接口程序', 'API miss:' + apinm + '.']);
    }

    yield next;
}

//七牛
_rotr.apis.getqiniuToken = function() {
    var ctx = this;

    var co = $co(function * () {

        var qiniu = require("qiniu");
        qiniu.conf.ACCESS_KEY = 'GFlTcVChV6Aa4Nn15jbTck3GIGEqo3DMaMKU4jeD'; 
        qiniu.conf.SECRET_KEY = 'z2vqxr1zKlWIGE6YfNdQOmes_DNIhzuvu7cfXNQP';
//要上传的空间
        var bucket = '9838136760';  //。。。
        var key = ctx.request.body.fpath;

//构建上传策略函数
        function uptoken(bucket, key) {
            var putPolicy = new qiniu.rs.PutPolicy(bucket);
            return putPolicy.token();
        }
//生成上传 Token
        var token = uptoken(bucket, key);
        console.log(key)
        console.log(token)

        ctx.body = {key:key,data:{uptoken:token}};
        return ctx;
    });

    return co;
};

//登录最新
_rotr.apis.login = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            username:ctx.request.body.username,
            password:ctx.request.body.password
        };
        query1 = "select userName from userdata where userName = '"+redat.username+"'";
        query2 = "select userPwd from userdata where userName = '"+redat.username+"'";
        var a = yield _ctnu([_mysql.conn,'query'],query1);
        var b = yield _ctnu([_mysql.conn,'query'],query2);


        //console.log(ctx.cookies.get('name'));

        //console.log(redat.username);
        if(a[0].userName = redat.username){
           if(b[0].userPwd != redat.password){
               //报错
               console.log('密码错误');
           }else{
               //跳转到首页
               console.log('跳转');
               var nameCoo = Math.random().toString(36).substr(2);
               ctx.cookies.set('name',nameCoo);
// ,{expires:10000}

               console.log('123123');
               console.log(nameCoo)
               cookie = "update userdata set cookie = '"+nameCoo+"' where userName = '"+redat.username+"'";
               var c = yield _ctnu([_mysql.conn,'query'],cookie);
               ctx.body ={
                   x:a[0].userName,
                   y:b[0].userPwd,
                   z:c
               };

           }
        }else{
           //报错
           console.log('用户名不存在');
        }


        //ctx.body ={
        //    x:a[0].userName,
        //    y:b[0].userPwd
        //};
        return ctx;
    });
    return co;
};
//登录
_rotr.apis.reg = function() {
    var ctx = this;
    var co = $co(function* () {
        var uid = ctx.query.dat2 || ctx.request.body.dat2;
        console.log(uid);
        var regResult;
        var sqlstr="insert into userdata set  userId='"+ uid.id +"', userName='"+ uid.phone +"'";
        console.log(sqlstr)
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);
        ctx.body = res;
        return ctx;
    });
    return co;
};
//登录
_rotr.apis.login1 = function() {
    var ctx = this;
    var co = $co(function * () {
        var res = yield _fns.getUidByLogin(ctx);
        //返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};
//注册最新
_rotr.apis.register = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            username:ctx.request.body.username,
            password:ctx.request.body.password
        };
        query1 = "insert into userdata(userName,userPwd) values ('"+redat.username+"','"+redat.password+"')"
        var a = yield _ctnu([_mysql.conn,'query'],query1);
        ctx.body = __newMsg(1,'ok',redat);
        return ctx;
    });
    return co;
};
//注册2
_rotr.apis.register2 = function() {
    var ctx = this;
    var co = $co(function * () {
        var res = yield _fns.getUidByregister2(ctx);
        //返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};

//测试接口
_rotr.apis.testEjs = function(){
    var res={};
    var ctx = this;
    var co = $co(function* () {

        var ejs = require('ejs'),
            str =$fs.readFileSync(__dirname + '/../web/test.ejs', 'utf8');

        var ret = ejs.render(str, {
            names: ['foo', 'bar', 'baz']
        });
        ctx.body = ret;
        return ctx;
    });
    return co;
};
//我的设置
_rotr.apis.settingPage = function() {
    var ctx = this;
    var co = $co(function* () {
        var sqlstr="select * from userdata where userId='"+userId1+"'";
		console.log(userId1)
        console.log(sqlstr)
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        console.log(rows)
        ctx.body = rows;
        return ctx;
    });
    return co
};

//修改个人资料
_rotr.apis.resetInfoPage = function() {
    var res={};
    var ctx = this;
    var co = $co(function* () {
        var userName = ctx.query.userName|| ctx.request.body.userName
        var sex = ctx.query.sex || ctx.request.body.sex;
        var country = ctx.query.country || ctx.request.body.country;
        var selProvince = ctx.query.selProvince || ctx.request.body.selProvince;
        var selCity = ctx.query.selCity || ctx.request.body.selCity;
        var idNumber = ctx.query.idNumber || ctx.request.body.idNumber;
        var phoneNumber = ctx.query.phoneNumber || ctx.request.body.phoneNumber;
        var email = ctx.query.email || ctx.request.body.email;
        var company = ctx.query.company || ctx.request.body.company;
        var selfIntroduction = ctx.query.selfIntroduction || ctx.request.body.selfIntroduction;
        var regResult;

        //var sqlstr="insert into userdata set  userId='"+ ctx.request.body.uId +"',sex=";
        var sqlstr="update userdata set userName='"+userName+"',sex='"+sex+"',country='"+country+"',selProvince='"+selProvince+"',selCity='"+selCity+"',"+
            "idNumber='"+idNumber+"',phoneNumber='"+phoneNumber+"',email='"+email+"',company='"+company+"',selfIntroduction='"+selfIntroduction+"' where userId='"+userId1+"'";

        console.log(sqlstr);
        //var res={};
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult)
        ctx.body = res;
        return ctx;l
    });
    return co;
};
//评论结果
_rotr.apis.evaluation=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            evaluation: ctx.request.body.evaluation
        };
        query1 = "insert into userevaluation(evalutionContent,userId) values ('" + ctx.request.body.evaluation + "','"+userId1+"')";
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
        console.log(query1);
        console.log(redat);
        ctx.body = __newMsg(1, 'ok', redat);
        return ctx;
    });
    return co;
};

//回复
_rotr.apis.response=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id: ctx.request.body.id,
            response: ctx.request.body.response,
            time:ctx.request.body.time
        };

        query1 = "insert into response(resContent,resDate,userId,questionId) values ('" + ctx.request.body.response + "','"+ctx.request.body.time+"','"+userId1+"','"+ctx.request.body.id+"')";
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
        console.log(query1);
        //console.log(redat);
        ctx.body = __newMsg(1, 'ok', redat);
        return ctx;
    });
    return co;
};
//问题
_rotr.apis.question=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            question: ctx.request.body.question,
            gold1:ctx.request.body.gold1,
            direction:ctx.request.body.direction,
            time:ctx.request.body.time,
            miaoshu:ctx.request.body.miaoshu,
            furl:ctx.request.body.file

        };
        //console.log(ctx.request.body.direction)

        query1 = "insert into userquestion(questionTitle,userId,gold1,directionId,questionDate,questionContent,furl) values ('" + ctx.request.body.question + "','"+userId1+"','" + ctx.request.body.gold1 + "','" + ctx.request.body.direction + "','" + ctx.request.body.time+ "','" + ctx.request.body.miaoshu+ "','" + ctx.request.body.file+ "')" ;
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
        console.log(query1);
        ctx.body = __newMsg(1, 'ok', redat);
        return ctx;
    });
    return co;
};
//问题存放于回复页头部
_rotr.apis.question1=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id: ctx.request.body.id
        };
        var query1="select userdata.userId ,headImage,gold1,questionTitle,directionName,questionId,userName,questionDate,questionContent,furl from userquestion,direction,userdata where userquestion.directionId=direction.directionId and userquestion.userId=userdata.userId and questionId="+redat.id;
        //var query1="select questionTitle,questionId,questionDate from userquestion";
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);

       // console.log(aaa)
        ctx.body =aaa;
        return ctx;
    });
    return co;
};

//评论放于首页
_rotr.apis.evalution1=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        //var query1="select resContent from userquestion where questionId=(select questionId from userquestion where userId='"+ userId1+"')";
        var query1="select evalutionContent from userevaluation where questionId=(select max(questionId) as a  from userevaluation)";
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);

        ctx.body =aaa;
        return ctx;
    });
    return co;
};
//关注列表接口

////粉丝列表接口
//_rotr.apis.fansPage = function() {
//    var ctx = this;
//    var co = $co(function* () {
//        var str="select * from concern where userId='"+22+"'";
//        console.log(str);
//
//        //var str="select concernId from concern where userId='"+222+"'";
//
//        //var sqlstr="select userId,sex,address from userdata where userId=(select guanzhu from userdata where guanzhu=(select fans FROM userdata where userId='"+userId1+"'))";
//
//        var rows=yield _ctnu([_mysql.conn,'query'],str);
//        //var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
//        if(!rows)throw Error("失败");
//        console.log(rows);
//        ctx.body = rows;
//        return ctx;
//    });
//    return co
//};
//专家列表接口
_rotr.apis.expertsPage = function() {
    var ctx = this;
    var co = $co(function* () {
        var str="SELECT userdata.userName,userdata.userId,level.levelName "+
            "FROM level,userdata "+
            "WHERE userdata.levelId=level.levelId;"
        console.log(str);

        //var str="select concernId from concern where userId='"+222+"'";

        //var sqlstr="select userId,sex,address from userdata where userId=(select guanzhu from userdata where guanzhu=(select fans FROM userdata where userId='"+userId1+"'))";

        var rows=yield _ctnu([_mysql.conn,'query'],str);
        //var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//问题列表接口
_rotr.apis.questionlist = function() {
    var ctx = this;
    var co = $co(function* () {

        //var str="select userdata.headImage,questionId,questionContent,userName,questionDate,directionName from userquestion left join direction on userquestion.directionId=direction.directionId group by questionId";
        var str="select userquestion.userId,headImage,questionId,questionTitle,userName,questionDate,directionName,gold1,identity from userquestion,direction,userdata where userquestion.directionId=direction.directionId and userquestion.userId=userdata.userId order by questionId desc limit "+ctx.request.body.a*8+",8 ";
        console.log(str);
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        //console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//回复列表接口
_rotr.apis.answerlist = function() {
    var ctx = this;
    var co = $co(function* () {
        var redat = {
            id: ctx.request.body.id
        };

        var str="select headImage,resId,resContent,userName,resDate,zan,cai,bestResponse from response,userdata where response.userId=userdata.userId and questionId="+redat.id+" order by zan-cai desc";

        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//金币
_rotr.apis.gold=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

         var sqlstr = "select gold from userdata where userId='"+userId1+"'";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//获取最佳答案
_rotr.apis.getzuijia=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        query1 = "select resId from response where bestResponse=1 and questionId="+ctx.request.body.questionId ;
        console.log(query1)
        var rows = yield _ctnu([_mysql.conn, 'query'], query1);
        ctx.body = __newMsg(1, 'ok',rows);
        console.log(rows)
        return ctx;
    });
    return co;
};
//最佳答案id
_rotr.apis.zjId=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        query1 = "select userId from response where resId="+ctx.request.body.id;
		console.log(query1)
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
		var bbb = aaa[0].userId;
		console.log(bbb)
        ctx.body = bbb;
        return ctx;
    });
    return co;
};
//点击设为最佳答案
_rotr.apis.zuijia=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id:ctx.request.body.id,
            id2:ctx.request.body.id2
        };
        query1 = "update response set bestResponse = 1 where resId="+ctx.request.body.id;
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
		console.log(aaa)
        ctx.body = aaa
        return ctx;
    });
    return co;
};
//设为最佳金币加成
_rotr.apis.addjinbi=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id:ctx.request.body.id,
            jb:ctx.request.body.jb
        };
		console.log(redat)
        query1 = "update userdata set gold=gold+"+ctx.request.body.jb+" where userId="+ctx.request.body.id;
		console.log(query1)
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
        ctx.body = aaa
        return ctx;
    });
    return co;
};
//设为最佳 金币减掉
_rotr.apis.subjinbi=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            sid:ctx.request.body.sid,
            sjb:ctx.request.body.sjb
        };
		console.log(redat)
        query1 = "update userdata set gold=gold-"+ctx.request.body.sjb+" where userId="+ctx.request.body.sid;
		console.log(query1)
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
        ctx.body = aaa
        return ctx;
    });
    return co;
};

//赞
_rotr.apis.zan=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "select zan from response where resId=6";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//踩
_rotr.apis.cai=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "select cai from expertsres where expertsId=7";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//点击赞加1
_rotr.apis.question111=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        console.log(1111)
        var query1 = "insert into zancai(userId,resId) values ("+userId1+","+ctx.request.body.id+")";
        console.log(1112)

        var sqlstr = "update response set zan=zan+1 where resId ="+ctx.request.body.id;
        console.log(ctx.request.body.id)

        var sss= "select userId,resId from zancai where userId="+ userId1+" and resId='"+ctx.request.body.id+"'";
        console.log(sss)

        var rowsss = yield _ctnu([_mysql.conn, 'query'], sss);
        console.log(1115)

        //console.log("rowsss")
        //console.log(rowsss)
        //console.log(rowsss.length)
        if(rowsss.length==0){
            console.log(1116)

            var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
            console.log(1117)

            var rowss = yield _ctnu([_mysql.conn, 'query'], query1);
            console.log(1118)

        }

        ctx.body = rowsss;
        return ctx;
    });
    return co;
};
//点击踩加1
_rotr.apis.caicai=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var sss= "select userId,resId from zancai where userId='"+ userId1+"' and resId='"+ctx.request.body.id+"'";
        var row = yield _ctnu([_mysql.conn, 'query'], sss);

        if(row.length==0)
        {
            var query1 = "insert into zancai(userId,resId) values ('"+userId1+"','"+ctx.request.body.id+"')";
            var sqlstr = "update  response set cai=cai+1 where resId ="+ctx.request.body.id;
            var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
            var rowss = yield _ctnu([_mysql.conn, 'query'], query1);
        }

        console.log(rows);
        ctx.body = row;
        return ctx;
    });
    return co;
};
//我的问题列表接口
_rotr.apis.myquestion = function() {
    var ctx = this;
    var co = $co(function* () {
        //var str="select questionId,questionContent,userName,questionDate,directionName from userquestion left join direction on userquestion.directionId=direction.directionId group by questionId";
        var str="select  questionTitle,questionDate,gold1,response.resContent,(select userName from userdata where userdata.userId=response.userId) 回答者 from userquestion,response where userquestion.questionId=response.questionId and userquestion.userId='"+userId1+"'";        //console.log(str);
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//我的回复列表接口
_rotr.apis.responsePage = function() {
    var ctx = this;
    var co = $co(function* () {
        //var str="select questionId,questionContent,userName,questionDate,directionName from userquestion left join direction on userquestion.directionId=direction.directionId group by questionId";
        var str="select questionTitle,resContent,directionName,resDate,(select userName userName from userdata where userdata.userId=userquestion.userId) userName from userquestion,direction,response,userdata where userquestion.questionId=response.questionId and userquestion.directionId=direction.directionId  and userdata.userId=response.userId and response.userId='"+userId1+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//我的关注列表接口
_rotr.apis.concernPage = function() {
    var ctx = this;
    var co = $co(function* () {
        var str="SELECT userdata.userId,userName FROM userdata WHERE userId in (select distinct concernId from concern,userdata,fans where concern.userId='"+userId1+"')";

        //var str="select concernId from concern where userId='"+222+"'";

        //var sqlstr="select userId,sex,address from userdata where userId=(select guanzhu from userdata where guanzhu=(select fans FROM userdata where userId='"+userId1+"'))";

        var rows=yield _ctnu([_mysql.conn,'query'],str);
        //var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//我的粉丝列表接口
_rotr.apis.fansPage = function() {
    var ctx = this;
    var co = $co(function* () {
        var str="SELECT userName,userId FROM userdata WHERE userId in (select distinct fansId from concern,userdata,fans where fans.userId='"+userId1+"')";
        console.log(str);

        //var str="select concernId from concern where userId='"+222+"'";

        //var sqlstr="select userId,sex,address from userdata where userId=(select guanzhu from userdata where guanzhu=(select fans FROM userdata where userId='"+userId1+"'))";

        var rows=yield _ctnu([_mysql.conn,'query'],str);
        //var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//我的专家列表
_rotr.apis.expertsPage = function() {
    var ctx = this;
    var co = $co(function* () {
        var str="SELECT userdata.userName,userdata.userId,level.levelName "+
            "FROM level,userdata "+
            "WHERE userdata.levelId=level.levelId;"
        console.log(str);

        //var str="select concernId from concern where userId='"+222+"'";

        //var sqlstr="select userId,sex,address from userdata where userId=(select guanzhu from userdata where guanzhu=(select fans FROM userdata where userId='"+userId1+"'))";

        var rows=yield _ctnu([_mysql.conn,'query'],str);
        //var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//头像存入数据库
_rotr.apis.touxiang = function() {
    var ctx = this;
	var res={};
    var co = $co(function * () {
        var redat = {
            imgurl:ctx.request.body.imgurl
        };
       query1 = "update userdata set headImage = '" + ctx.request.body.imgurl+ "' where userId="+userId1;
        var aaa = yield _ctnu([_mysql.conn, 'query'], query1);
       ctx.body = __newMsg(1, 'ok', redat);
       return ctx;
    });
    return co;
};


//后台用户信息管理
_rotr.apis.userData = function() {
    var ctx = this;
    var co = $co(function* () {
        var str="select userId,userName,identity,gold from userdata";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        //console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//设为专家
_rotr.apis.sheweizhuanjia=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "update userdata set identity='专家' where userId="+ctx.request.body.id;
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//后台用户问题管理
_rotr.apis.userQuestion1 = function() {
    var ctx = this;
    var co = $co(function* () {
        var str1="select questionId,userName,questionContent,questionTitle from userdata,userquestion where userquestion.userId=userdata.userId group by questionId";
        var rows=yield _ctnu([_mysql.conn,'query'],str1);
        if(!rows)throw Error("失败");

        //console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//后台回复信息管理
_rotr.apis.response111 = function() {
    var ctx = this;
    var co = $co(function* () {
        var str2="select resId,userName,resContent from userdata,response where response.userId=userdata.userId group by resId";        //console.log(str);
        var rows=yield _ctnu([_mysql.conn,'query'],str2);
        if(!rows)throw Error("失败");

        //console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};

//管理userdata表删除该行信息
_rotr.apis.deleteuserdata=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "delete from userdata where userId="+ctx.request.body.id;
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//管理question表删除该行信息
_rotr.apis.deleteuserquestion=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "delete from userquestion where questionId="+ctx.request.body.id;
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//管理response表删除该行信息
_rotr.apis.deleteresponse=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "delete from response where resId="+ctx.request.body.id;
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//搜索
_rotr.apis.searching=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var str="select headImage,questionId,questionTitle,userName,questionDate,directionName,gold1 from userquestion,direction,userdata where userquestion.directionId=direction.directionId and userquestion.userId=userdata.userId and ( userName like '%"+ctx.request.body.content+"%' or directionName like '%"+ctx.request.body.content+"%') order by questionId desc"
        var rows = yield _ctnu([_mysql.conn, 'query'], str);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};

//分页导航
_rotr.apis.fenye=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var number="select count(*) from userquestion"
        var rows = yield _ctnu([_mysql.conn, 'query'], number);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};


//聊天顶部头像
_rotr.apis.liaotiantouxiang=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "select headImage,userName from userdata where userId="+userId1;
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//聊天内容头像
_rotr.apis.tx=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "select headImage from userdata where userId="+userId1;
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//点击关注 添加信息！！！！
_rotr.apis.focus = function () {
    var ctx = this;
    var co = $co(function* () {
        var redat = {
            id: ctx.request.body.questionId,
        };
        var sqlstr4 = "select userId from userquestion where questionId = '" + ctx.request.body.questionId + "'";
        var rows4 = yield _ctnu([_mysql.conn, 'query'], sqlstr4);
        var res4 = rows4[0].userId;
        var sqlstr3 = "select count(*) as num from concern where userId='" + userId1 + "' and concernId='" + res4 + "'";
        var rows3 = yield _ctnu([_mysql.conn, 'query'], sqlstr3);
        var result = rows3[0].num;
        if (result >= 1) {
            ctx.body = 1;
            return ctx;
        }
        else {
            var sqlstr1 = "insert into concern (userId,concernId) values (" + userId1 + "," + res4 + ")";
            console.log(sqlstr1)
            var rows1 = yield _ctnu([_mysql.conn, 'query'], sqlstr1);
            var sqlstr2 = "insert into fans (userId,fansId) values ('" + res4 + "','" + userId1 + "')";
            var rows2 = yield _ctnu([_mysql.conn, 'query'], sqlstr2);
            if (!rows1)throw Error("失败");
            ctx.body = rows1;
            return ctx;
        }
        return ctx
    });
    return co
};


//取消关注接口
_rotr.apis.cancelFocus = function() {

    var ctx = this;
    var co = $co(function* () {
        var concernId1;
        var d={
            concernId1:ctx.request.body.concernId
        }
        var sqlstr1="delete from concern where userId='"+userId1+"' and concernId='"+ctx.request.body.concernId+"'";
        rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);
        var sqlstr2="delete from fans where userId='"+ctx.request.body.concernId+"' and fansId='"+userId1+"'";
        rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);

        if(!rows1)throw Error("失败");
        ctx.body = rows1;
        return ctx;

    });
    return co
};


//签到金币
_rotr.apis.qdgold=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var sqlstr ="update userdata set gold=gold+5 where userId='"+userId1+"'";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//获取签到日期
_rotr.apis.hqdDate=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {

        var sqlstr = "select qdDate from userdata where userId='"+userId1+"'";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//插入签到日期
_rotr.apis.qdDate=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var sqlstr ="update userdata set qdDate='"+ctx.request.body.time+"' where userId='"+userId1+"'";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(sqlstr);
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//点击查看资料
_rotr.apis.questionInfo = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id: ctx.request.body.id
        };

        console.log("redat:" ,redat.id);
        var str="select questionId,questionTitle,questionDate,directionName "+
            "from userquestion u,direction d,userdata u2 "+
            "where u.directionId=d.directionId "+
            "and u.userId = (SELECT userId FROM userquestion where questionId="+redat.id+") "+
            "AND u.userId=u2.userId";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("ʧ��");

        console.log("���ݿ��ѯ����",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//用户信息
_rotr.apis.userInfo = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id: ctx.request.body.id
        };
        console.log("redat:" ,redat.id);
        var str="SELECT userName,sex,address,phoneNumber,email,company  FROM userdata u "+
            "WHERE u.userId in (SELECT userId FROM userquestion where questionId="+redat.id+");";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};

//获取关注的人的信息
_rotr.apis.concernInfo = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id: ctx.request.body.id
        };
        console.log("redat:" ,redat.id);
        var str="SELECT userId,userName,sex,address,phoneNumber,email,company FROM userdata WHERE userId in (SELECT u.userId FROM userdata u WHERE userId in (select distinct concernId from concern c,userdata,fans where c.userId='"+userId1+"'));";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};



//关注的人提问的的问题
_rotr.apis.question1Info = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        console.log( ctx.request.body.userId);
        var redat = {
            userId: ctx.request.body.userId
        };
        console.log('qsfrgty')
        console.log("redat:" ,redat.userId);
        var str="SELECT questionTitle,directionName,questionDate FROM userquestion u,direction d WHERE userId='"+redat.userId+"' AND u.directionId=d.directionId";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};

//关注的人的资料，粉丝的资料
_rotr.apis.user1Info = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            userId: ctx.request.body.userId
        };
        console.log(ctx.request.body.userId);
        console.log("redat:" ,redat.userId);
        var str="SELECT userId,userName,sex,selCity,phoneNumber,email,company FROM userdata WHERE userdata.userId='"+redat.userId+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");
        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};



//获取关注的人的问题信息,粉丝的问题信息
_rotr.apis.concernQuestion = function() {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var redat = {
            id: ctx.request.body.id
        };
        console.log("redat:" ,redat.id);
        var str="SELECT userquestion.questionId FROM userdata,userquestion WHERE userdata.userId in(SELECT u.userId FROM userdata u WHERE userId in (select distinct concernId from concern c,userdata,fans where c.userId='"+userId1+"')) and userdata.userId=userquestion.userId;";
        var rows=yield _ctnu([_mysql.conn,'query'],str);
        if(!rows)throw Error("失败");

        console.log("数据库查询数据",rows);
        ctx.body = rows;
        return ctx;
    });
    return co
};
//显示已关注
_rotr.apis.yiguanzhu=function () {
    var res={};
    var ctx = this;
    var co = $co(function * () {
        var sqlstr ="SELECT count(*) as num  FROM concern where userId='"+userId1+"'and concernId='"+ctx.request.body.uId+"'";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        var result =rows[0].num;
        if(result >= 1){
            ctx.body = 1;
        }else{
            ctx.body = 0;
        }
        return ctx;
    });
    return co;
};








module.exports = _rotr;
