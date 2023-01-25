//导入定义验证规则的包
const Joi = require('joi')


//定义文章分类名称name和分类别名alias的验证规则
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()

//定义按照删除文章分类Id的验证规则
const id = Joi.number().integer().min(1).required()

//定义文章分类名称和分类别名的验证规则
exports.add_cates_schema = {
    body:{
        name,
        alias,
    }
}

//定义按照删除文章分类Id的验证规则
exports.delete_cateId_schema = {
    //这里是params而不是body原因是因为请求的url是根据id来的
    //因此要传递params参数
    params:{
        id,
    }
}

//定义根据id获取文章分类的验证规则
exports.getCates_ById = {
    params:{
        id,
    }
}

//定义根据id, name, alias更新文章分类的验证规则
exports.update_cates_schema = {
    body:{
        Id:id,
        name,
        alias
    }
}

