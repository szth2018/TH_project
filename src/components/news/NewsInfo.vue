<template>
    <div class="newsinfo-container">
        <!-- 新闻详情--{{id}} --><!-- {{this.$route.params.id}} -->
            <h3 class="title">{{newsinfo.title}}</h3>
            <p class="info">
                <span>发表时间:{{newsinfo.add_time|dateFormat}}</span>
                <span>浏览次数:{{newsinfo.click}}</span>
            </p>
            <hr>
            <!-- 新闻内容 -->
            <div class="content" v-html="newsinfo.content"></div>
            <!-- 评论子组件的位置 -->
            <!-- 父组件向子组件传值,通过属性绑定的形式 -->
            <comment :newsid="id"></comment>
    </div>
</template>

<script>
//导入comment.vue子组件
import comment from '../sub-components/comment.vue';


    export default{
        data() {
            return {
                newsinfo:{}
            };
        },
        methods:{
           async getNewsInfo(){
                //通过id获取新闻的内容
                const {data} = await this.$http.get('/api/getnew/' + this.id)
                if(data.status===0) return this.newsinfo = data.message[0]
            }
        },
        created() {
            this.getNewsInfo()
        },
        props:["id"],
        components:{
            //为当前的NewsInfo.vue组件注册私有的子组件
            comment
        }
    }
</script>

<style lang="scss" scoped>
.newsinfo-container{
    padding: 3px;
    .title{
        font-size: 15px;
        color: red;
        text-align: center;
        margin: 15px 0;
    }
    .info{
        color:#26a2ff;
        display: flex;
        justify-content: space-between;
    }
}
</style>