<template>
    <div>
        <h4>讨论一下吧:---{{newsid}}</h4>
        <hr>
        <textarea placeholder="随便说点什么吧!(最多150个字哦!)" maxlength="150" v-model="msg"></textarea>
        <mt-button class="mint0button mint-button--primary" size="large" @click="postmsg">发表评论</mt-button>
         <mt-button class="mint0button mint-button--danger" size="large"  plain @click="loadmore">显示更多</mt-button>
        <!-- 评论列表区域 -->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in cmtlist" :key="i">
                <div class="cmt-item-title">第{{i+1}}楼&nbsp;用户:{{item.user_name}}&nbsp;发表时间:{{item.add_time|dateFormat}}</div>
                <div class="cmt-item-body">{{item.content}}</div>
            </div>
            
        </div>
    </div>
</template>

<script>
//按需从Mint-ui中,导出需要弹框的组件
import {Toast} from 'mint-ui'

export default{
    data() {
        return {
            page:1, //默认展示第一页的评论
            cmtlist:[],//评论数组
            msg:''//即将发表的评论内容
        };
    },
    created(){
        this.getCommentByPage()
    },
    methods: {
        async getCommentByPage(){
            //根据页数来获取评论的数据
           const {data} = await this.$http.get('/api/getcomments/' + this.newsid + "?pageindex=" + this.page)
            if(data.status===0) return (this.cmtlist =this.cmtlist.concat( data.message))
        },
        loadmore(){
            //点击按钮,加载更多评论
            //当触发这个加载更多方法的时候,应该让page页面+1之后,再调用getCommentByPage()方法
            this.page++;
            this.getCommentByPage()
        },
        async postmsg(){
            //点击发表评论
            //如果用户没有填写评论内容,则阻止其发表评论
            if(this.msg.trim().length<=0) return Toast('请填写内容!')
            //发表评论的逻辑
            const {data} = await this.$http.post('/api/postcomment/'+ this.newsid ,{content:this.msg.trim()})
            if(data.status ===0){
                //评论提交成功就刷新评论列表
                //1.再次调用getCommentByPage()
                /* this.cmtlist=[]
                this.getCommentByPage() 这样写的缺点是会吧发表的前几次发表的清空*/
            
                //为了避免调用getCommentByPage()时,会吧之前的评论情况的问题
                //在客户端的时候,应当手动拼接出一个评论对象,并把这个对象unshift到cmtlist中
                this.cmtlist.unshift({
                    user_name:'匿名用户',
                    add_time:new Date(),
                    content:this.msg.trim()
                })
                this.cmtlist=[]
            }
            this.msg=''
        }
    },
    props:['newsid']//接收父组件传递过来的新闻id
}
</script>

<style lang="scss">
textarea{
    font-size: 13px;
    margin: 0;
}
.cmt-list{
    margin-top: 4px;
    .cmt-item{
        line-height: 30px;
        .cmt-item-title{
            font-size: 14px;
            background-color: #ddd;
            .cmt-item-body{
                font-size: 13px;
                text-indent: 2em;
         }
     }
    }
}
</style>