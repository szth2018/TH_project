//导入数据库操作模块
const db = require('../DB/index')
//导入对用户密码加密的bcryptjs包
const bcrypt = require('bcryptjs')
//导入生成Token的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件(密钥)
const config = require('../config')

/* 这里定义和用户相关的路由处理函数,供/router/user.js模块调用 (注册新用户,用户登录)*/
exports.reguser = (req,res)=>{
    //获取客户端提交到服务器的用户信息数据
    const userinfo = req.body
    console.log(userinfo)
    //对表单数据的合法性进行校验
    /* if(!userinfo.username||!userinfo.password ){
        res.send({
            status:1,
            msg:'用户名或密码不能为空'
        })
    } */
    //定义sql语句,查询用户名是否被占用
    const sqlstr = 'select * from users_info where username = ?'
    db.query(sqlstr,userinfo.username,(err,results)=>{
        //执行sql语句失败
        if(err){
            /* return res.send({status: 1, msg: err.message}) */
            return res.cc(err)
        }
        //判断用户名是否被占用
        if(results.length > 0){
            /* return res.send({
                status:1,
                msg:'用户名已被使用,请更换其他的用户名'
            }) */
            return res.cc('用户名已被使用,请更换其他的用户名')
        }
        
        //TODO:用户名可以使用,调用bcrypt.hashSync()对密码进行加密
        /* console.log(userinfo) */
        userinfo.password =  bcrypt.hashSync(userinfo.password,10)
        /* console.log(userinfo) */
        const insertSqlStr = 'insert into users_info set ?'
    db.query(insertSqlStr,{username:userinfo.username,password:userinfo.password},(err,results)=>{
        //执行SQL语句失败
        /* if(err){
            return res.send({
                status:1,
                msg:err.message
            })
        } */
        if(err)return res.cc(err)
         //SQL语句执行成功,单影响行数是否为1
         /* if(results.affectedRows !== 1){
            return res.send({
                status:1,
                msg:'注册用户失败,请稍后再次尝试'
            })
        } */
        if(results.affectedRows !==1 )return res.cc('注册用户失败,请稍后再次尝试')
        //注册成功
        /* res.send({status:0,msg:'注册成功!'}) */
        res.cc('注册成功',0)
    })
    })
    
}

//登录的处理函数
exports.login = (req,res)=>{
    //接收表单的数据
    const userinfo = req.body
    //定义SQL语句
    const querysql = 'select * from users_info where username = ?'
    //执行SQL语句,根据用户名查询用户的信息
    db.query(querysql,userinfo.username,(err,results)=>{
        //执行SQL语句失败
        if(err)return res.cc(err)
        //执行SQL语句成功,但是获取到的数据条数不等于1
        if(results.length !==1)return res.cc('登录失败')
        /* TODO:判断密码是否正确,
        results[0].password是db.query查询存储在服务器存储密码的结果
        [0]为查询结果的第一项进行比对,compareResult是来接收比对的结果 */

        /* bcrypt.compareSync(用户提交的密码, 数据库中的密码),
            返回值是布尔值(true一致,false不一致)
        */
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult)return res.cc('用户名或密码错误')
        //TODO:登录成功,生成Token字符串
        /* 剔除不需要生成Token字符串的user属性,如:密码,用户头像等,
        Token会保存在客户端
        使用新的变量来接收剔除后的用户信息内容 */
        const users = {...results[0], password:'',user_pic:''}
        //对用户的信息进行加密,生成Token字符串
        const tokenStr = jwt.sign(users,config.jwtSecretKey,{expiresIn:'1h'})
        //调用res.send()将token响应给客户端
        return res.send({
            status:0,
            msg:'登录成功',
            token:  'Bearer ' + tokenStr,
        })
        console.log(tokenStr)
        res.cc(' ok')
    })
    
}


/* reguser = (req,res)=>{
    res.send('reguser Ok')
}

login = (req,res)=>{
    res.send('login Ok')
}

module.exports = {reguser, login} */