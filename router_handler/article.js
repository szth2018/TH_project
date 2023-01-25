// 导入处理路径的 path 核心模块
const path = require('path')
const db = require('../DB')


//添加发布文章的处理函数模块
exports.addArticle = (req,res)=>{
    if(!req.file|| req.file.fieldname  !== 'cover_img') return res.cc('文章封面是必选的')
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img:path.join('/uploads',req.file.filename),
        //文章发布时间
        pub_date: new Date(),
        //文章作者的id
        author_id: req.auth.id,
    }
    const addArticleSql = 'insert into ev_article set?'
    // 执行 SQL 语句
    db.query(addArticleSql,articleInfo,(err,results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if(results.affectedRows !== 1) return res.cc('发布文章失败')

        //发布文章成功
        res.cc('发布文章成功',0)
    })
}

//获取文章列表数据
exports.getArticleList = (req,res)=>{
    const getListSql = 'select * from ev_article where is_delete = 0 order by id asc'
    db.query(getListSql,(err,results)=>{
        if(err)return res.cc(err)
        res.send({
            status:0,
            msg:'获取文章列表成功',
            data:results,
        })
    })
}

//根据 Id 删除文章数据
exports.deleteArticle = (req,res)=>{
    const deleteSql = 'update ev_article set is_delete = 1 where id = ? '
    db.query(deleteSql,req.params.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.affectedRows !==1) res.cc('删除失败')
        res.cc('删除成功',0)
    })
}

//根据 Id 获取文章详情
exports.getArticle = (req,res)=>{
    const getArticleSql = 'select * from ev_article where id = ?'
    db.query(getArticleSql,req.params.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length !== 1) return res.cc('获取文章失败')
        res.send({
            status:0,
            msg:'获取文章内容成功',
            data:results
        })
    })
}

//根据 Id 更新文章信息
exports.editArticle = (req,res)=>{
    const editSql = 'update ev_article set ? where Id = ?'
    /* const editArticle = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        Id,
        //文章标题
        title,
        //分类id
        cate_id,
        //修改内容
        content,
        // 文章封面在服务器端的存放路径
        cover_img:path.join('/uploads',req.file.fieldname),
        //状态
        state,
        //文章作者的id
        author_id: req.auth.id,
        
    } */
    /* const reuploadPic = {cover_img:path.join('/uploads',req.file.fieldname)} */
    db.query(editSql,/* editArticle, */[req.body,req.body.Id],(err,results)=>{
        if(err)return res.cc(err)
        if(results.affectedRows !== 1) res.cc('更新文章内容失败')
        res.cc('更新文章内容成功',0)
    })
}