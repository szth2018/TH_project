const express = require('express')
const router = express.Router()
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//导入路由处理函数模块
const UserInfo_handler = require('../router_handler/userinfo')
//导入更新用户基本信息的验证规则模块 和 更新用户密码的验证规则模块
const {update_userinfo_schema,reset_user_password,update_avatar_schema} = require('../schema/user')

//获取用户基本信息的路由
router.get('/userinfo',UserInfo_handler.getUserInfo)

//更新用户基本信息的路由
router.post('/userinfo',expressJoi(update_userinfo_schema),UserInfo_handler.updateUserInfo)

//重置密码的路由
router.post('/resetpwd',expressJoi(reset_user_password),UserInfo_handler.resetpwd)

//更新用户头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema),UserInfo_handler.updateAvatar)
module.exports = router