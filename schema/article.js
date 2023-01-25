//导入定义验证规则的模块
const Joi = require('joi')

// 定义 标题、分类Id、内容、发布状态,作者id, 的验证规则
const title = Joi.string().required()
const cate_id = Joi.number().integer().min(1).required()
const content = Joi.string().required().allow('')
const state = Joi.string().valid('已发布','草稿').required()
/* const Id = Joi.number().integer().min(1).required() */
const author_id = Joi.number().integer().min(1).required()


//定义获取文章的列表pagenum(页码值), pagesize(每页显示多少条数据)的验证规则
const pagenum = Joi.number().integer().min(1).required()
const pagesize = Joi.number().integer().min(10).required()

//定义根据id删除文章内容的验证规则
const id = Joi.number().integer().min(1).required()

exports.add_article_schema = {
    body:{
        title,
        cate_id,
        content,
        state,
    }
}

exports.get_articleList_schema = {
    bodys:{
        pagenum,
        pagesize
    }
}

exports.delete_articleById_schema = {
    params:{
        id,
    }
}

exports.edit_Article = {
    body:{
        Id:id,
        title,
        cate_id,
        content,
        state,
    }
}