//文章的路由模块
const express = require ('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入文章的验证模块  
const {add_article_schema,get_articleList_schema,delete_articleById_schema,edit_Article } = require('../schema/article')

//导入解析formdata格式表单数据的包
const multer = require('multer')

//导入处理路径的核心模块
const path = require('path')

//创建multer的实例对象,通过dest属性指定文件的存放路径
const upload = multer({dest:path.join(__dirname,'../uploads')})

//导入需要处理函数模块
const article_handler = require('../router_handler/article')

//发布文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),article_handler.addArticle)

//获取文章的列表数据
router.get('/articleList',expressJoi(get_articleList_schema),article_handler.getArticleList)

//根据id删除文章数据
router.get('/delete/:id',expressJoi(delete_articleById_schema),article_handler.deleteArticle)

//根据id获取文章详情
router.get('/:id',article_handler.getArticle)

//根据 Id 更新文章信息
router.post('/edit',upload.single('cover_img'),expressJoi(edit_Article),article_handler.editArticle) 

module.exports = router