const express = require('express')
const app = express()
const joi = require('joi')
const port = 3000

//配置cors跨域
const cors = require('cors')
app.use(cors())
//配置解析表单数据的中间件,注意:这个中间件,
//只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended:false}))

//一定要再路由之前,封装res.cc函数
app.use((req,res,next)=>{
    //status默认值为1,表示失败的情况
    //err的值,可能是一个错误的对象,也可能是一个错误的描述字符串
    res.cc = (err,status=1)=>{
        res.send({
            status,
            //判断err是对象还是字符串
            /* 判断err是否是构造函数Error的实例,
            如果是的话就把err对象的message的属性对应的值交给前面的msg
            否则直接把err字符串交给msg */
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})

//一定要再路由之前配置解析Token的中间件
const {expressjwt:expressJWT} = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api/]}))

//使用 express.static() 中间件，将 uploads 目录中的图片托管为静态资源
app.use('/uploads',express.static('/uploads'))

// 在app.js中导入并使用 用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)

//在app.js导入并使用个人中心的路由模块
const userinfoRouter = require('./router/userinfo')
//注意: 以/my开头的接口,都是有权限的接口,需要进行Token身份认证
app.use('/my',userinfoRouter)

//导入并使用文章分类的路由分类
const artlistRouter = require('./router/artlist')
app.use('/my/article',artlistRouter)

//导入并使用文章的路由模块
const articleRouter = require ('./router/article')
app.use('/my/article',articleRouter)

//定义全局错误级别的中间件 
app.use((err,req,res,next)=>{
    //验证失败导致的错误
    //node不允许调用两次res.send如果在res.cc前面不加return相当于调用两次res.send
    //要在res.cc前面加上return
    if(err instanceof joi.ValidationError) return res.cc(err)
    //身份认证失败后的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    //未知的错误
    res.cc(err)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))