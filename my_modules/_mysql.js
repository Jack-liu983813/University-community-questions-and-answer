/**
 * Created by yyl15 on 2016/9/6.
 */
/**
 *
 */
var _mysql ={};
var conn =_mysql.conn = $mysql.createConnection({
    host:"123.206.129.20",
    user:"root",
    password:"!!123abc",
    database:"shuju"
});
conn.connect();
module.exports = _mysql;

