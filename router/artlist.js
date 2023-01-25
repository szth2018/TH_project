//这是文章分类的路由模块
//路由模块
const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const  expressJoi = require('@escook/express-joi')
// 导入自定义文章分类的验证规则模块
const {add_cates_schema,delete_cateId_schema,getCates_ById,update_cates_schema,getTest} = require('../schema/artcates')

//导入文章分类的路由处理函数模块
const article_handler = require('../router_handler/artlist')

//获取文章分类列表的的路由
router.get('/artlist',article_handler.getArticleList)

//新增文章分类的路由
router.post('/addcates',expressJoi(add_cates_schema),article_handler.addArticleCates)

//根据id删除文章分类的路由
router.get('/deletecates/:id',expressJoi(delete_cateId_schema),article_handler.deleteCatesById)

//根据id获取文章分类的路由
router.get('/cates/:id',expressJoi(getCates_ById),article_handler.getCatesById)

//根据id更新文章分类的路由
router.post('/updatecates',expressJoi(update_cates_schema),article_handler.updateCatesById)


module.exports = router