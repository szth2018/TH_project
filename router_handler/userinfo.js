//获取用户的基本信息,导入数据库操作模块
const db = require('../DB/index')
//导入处理对比密码的模块
const bcrypt = require('bcryptjs')


//抽离获取用户信息处理函数
exports.getUserInfo = (req,res)=>{
    //根据用户的id,查询用户的基本信息
    //注意:为了防止用户的密码泄露,要排除password字段
    const sqlstr = 'select id, username, nickname, email, user_pic from users_info where id = ?'
    //调用db.query()来执行sql语句
    db.query(sqlstr,req.auth.id,(err,results)=>{
        //执行sql语句失败
        if(err) return res.cc(err)
        //执行sql语句成功,但是查询的结果可能为空
        if(results.length !==1) return res.cc('获取用户信息失败!')
        
        
        //获取用户信息成功
        res.send({
            status:0,
            msg:'获取用户信息成功',
            data: results[0]
        })
    })
}

//抽离更新用户基本信息处理函数
exports.updateUserInfo = (req,res)=>{
    const updateStr = 'update users_info set ? where id = ?'
    db.query(updateStr,[req.body,req.body.id],(err,results)=>{
        //执行sql语句失败
        if(err) return res.cc(err)
        //执行sql语句成功了,但是影响行数不等于1
        if(results.affectedRows!==1)return res.cc('更新用户基本信息失败')
        //成功
        res.cc('更新用户信息成功',0)
    })
}

//抽离重置密码的处理函数
exports.resetpwd = (req,res)=>{
    //根据id查询用户的信息是否存在
    const sqlstr = 'select * from users_info where id = ?'
    //执行根据id查询用户的信息SQL语句
    //当身份认证成功后,服务器会自动把客户端上填写的信息挂载到auth下
    db.query(sqlstr,req.auth.id,(err,results)=>{ 
        //执行sql语句失败
        if(err) return res.cc(err)
        //判断结果是否存在
        if(results.length !== 1)return res.cc('用户不存在')

        //TODO：判断用户输入的旧密码是否正确
        //判断用户输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult)return res.cc('旧密码错误')

        //TODO：更新数据库的密码
        //定义更新密码的SQL语句
        const resetSqlStr = 'update users_info set password = ? where id = ?'
        //对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        //调用db.query()执行sql语句
        //当身份认证成功后,服务器会自动把客户端上填写的信息挂载到auth下
        db.query(resetSqlStr,[newPwd,req.auth.id],(err,results)=>{
            //执行sql语句失败
            if(err) return res.cc(err)
            //判断影响行数
            if(results.affectedRows !== 1) return res.cc('重置失败')
            res.cc('重置成功')
        })
    })
}

//抽离更新用户头像的处理函数
exports.updateAvatar = (req,res)=>{
    //1.定义更新头像的sql语句
    const sqlAvatar = 'update users_info set user_pic = ? where id = ?'
    //2.调用db.query()来执行sql语句
    db.query(sqlAvatar,[req.body.avatar,req.auth.id],(err,results)=>{
        //执行sql语句失败
        if(err) return res.cc(err)
        //执行sql语句成功,但是影响行数不等于1
        if(results.affectedRows !==1) return res.cc('更新失败')
        //更新用户头像成功
        res.cc('更新成功',0)
    })
}