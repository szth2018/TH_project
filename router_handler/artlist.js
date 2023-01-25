//路由处理函数模块

//导入数据库操作模块
const db = require('../DB/index')

//这是获取文章分类列表的处理函数模块
exports.getArticleList = (req,res)=>{

    const articleSql = 'select * from article_list where is_delete = 0 order by id asc'
    db.query(articleSql,(err,results)=>{
        //执行sql语句失败
        if(err)return res.cc(err)
        //执行sql语句成功
        res.send({
            status: 0 ,
            msg:'获取文章分类成功',
            data: results
        })

    })
}

//这是新增文章分类列表的处理函数模块
exports.addArticleCates = (req,res)=>{
    //1.定义查重的SQL语句
    const queryCatesSql = 'select * from article_list where name = ? or alias = ?'
    //2.执行查重的SQL语句
    db.query(queryCatesSql,[req.body.name,req.body.alias],(err,results)=>{
        //3.判断是否执行SQL语句
        if(err) return res.cc(err)

        //4.1 判断数据的length
        if(results.length === 2 ) return res.cc('分类名称与别名被占用,请更换后重试')
        //4.2 length等于1的三种情况
        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
        return res.cc('分类名称与别名被占用,请更换后重试2')
        // 只有名称给占用
        if(results.length === 1 && results[0].name === req.body.name)
        return res.cc('分类名称被占用,请更换后重试')
        // 只有别名给占用
        if(results.length === 1 && results[0].alias === req.body.alias)
        return res.cc('分类别名被占用,请更换后重试')

        //TODO：分类名称和分类别名都可用,执行添加的动作
        //定义插入文章分类的sql语句
        const insertcatetSql = 'insert into article_list set ? '
        //执行插入文章分类的sql语句
        db.query(insertcatetSql,req.body,(err,results)=>{
            //执行sql语句失败
            if(err) return res.cc(err)
            //新增分类失败
            if(results.affectedRows !== 1)return res.cc('新增分类失败')
            //新增分类成功
            res.cc('新增成功',0)
        })

    })
   
}

//这是删除文章分类列表的处理函数模块
exports.deleteCatesById = (req,res)=>{
    //定义标记删除的sql语句
    const deleteSql = 'update article_list set is_delete  = 1 where id = ?'
    db.query(deleteSql,req.params.id,(err,results)=>{
        //执行sql语句失败
        if(err)return res.cc(err)
        //执行sql语句成功,但影响行数不等于1
        if(results.affectedRows!==1)return res.cc('删除失败')
        //删除文章分类成功
        res.cc('删除分类成功',0)

    })
}

//这是根据id获取文章分类的处理函数模块
exports.getCatesById = (req,res)=>{
    const getCatesSql = 'select * from article_list where id = ?'
    db.query(getCatesSql,req.params.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length !== 1) return res.cc('获取文章列表失败')
        //把数据响应给客户端
        res.send({
            status:0,
            msg:'获取文章列表成功',
            data:results[0],
        })
    })
}

//这是根据id更新文章分类的处理函数模块
exports.updateCatesById = (req,res)=>{
    /* Id<>?意思是要比较从用户输入的id的数据看是否存在其他记录,
    进行比对数据,看是name和alias否被占用,
    只要查到结果就要提示客户端进行更换 */
    //定义查重的sql语句
    const updateCatesSql = 'select * from article_list where Id<>? and (name = ? or alias = ?)'
    //调用db.query()执行查重的sql语句
    db.query(updateCatesSql,[req.body.Id,req.body.name,req.body.alias],(err,results)=>{
        if(err)return res.cc(err)
        
        //判断名称和别名被占用的4种情况
        if(results.length === 2)return res.cc('分类名称与别名被占用,请更换后重试！')
        
        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
        return res.cc('分类名称与别名被占用,请更换后重试！')
        
        if(results.length === 1 && results[0].name === req.body.name)
        return res.cc('分类名称被占用,请更换后重试！')
        
        if(results.length === 1 && results[0].alias === req.body.alias)
        return res.cc('分类别名被占用,请更换后重试！')

        //TODO:名称和别名都可用,执行更新的操作
        //定义更新分类的sql语句
        const sqlstr = 'update article_list set ? where Id = ?'
        //调用db.query()执行更新分类的sql语句
        db.query(sqlstr,[req.body,req.body.Id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新失败')
            res.cc('更新文章分类成功',0)
        })
    })
}


