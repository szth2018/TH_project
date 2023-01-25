<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>惠购欢迎您！</p>
                    <p>
                        <span>请</span>
                        <!-- 只是页面跳转,不涉及其他业务(不需要发请求,收集数据等(声明式导航)) -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <a href="###">我的购物车</a>
                    <a href="###">我的收藏</a>
                    <a href="###">平台会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注平台</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
                    <!-- 编程式导航,因为涉及数据收集,发起请求等业务 -->
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: '',
    data(){
        return{
            keyword:''
        }
    },
    methods:{
        //搜索按钮的回调函数,需要向search路由进行跳转
       goSearch(){
        //路由传递参数:
        //第一种:字符串形式
         /* this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase()) */
        /*路由中 { path: '/search/:keyword', component: Search, meta:{show:true}} */
        /* 双向数据绑定 */

       //第二种:模板字符串
        /*this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`) */
        /* 双向数据绑定 */

       //第三种:对象的写法 要在router中给对应路由起一个名字 name="",    双向数据绑定
        //this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
       

        /* *************************************************************************************************************************** */
        //面试题1:  路由传递参数(对象写法)path是否可以结合params参数一起使用? 
        /*答: 路由跳转传参的时候,对象的写法可以是name,path形式,但是注意,path这种写法不能与params参数一起使用。
        最终导致路由不能跳转,以及参数不能传递 不可以 */
        /* this.$router.push({path:"/search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
         */

        //面试题2:如何指定params参数可传可不传？ 
        //答:在配置路由的时候,在占位的后面加上一个问号【params可以传递或者不传递】
        /* 例如：配置路由的时候,占位了(params参数),但是路由跳转的时候不传递.路径(url)会出现问题,只会有params参数不会有对应路由出现 */
        /* this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}}) */

        //面试题3:params参数可以传递也可以不传递,但是如果传递的是空字符串,如何解决?
        //答:使用undefined解决:params参数可以传递,或者传递空字符串
        //传递的是空字符串,路径会有问题(url)不显示对应路由名字.
        //this.$router.push({name:'search', params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}})

        //面试题4:路由组件能不能传递props数据?
        //答:可以
        //有三种写法: (见路由)
        //this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
       
        if(this.$route.query){
            //代表的是如果有query参数也传递给Search页
            const location = {name:'search',params:{keyword:this.keyword||undefined}}
            location.query = this.$route.query
            this.$router.push(location)
        }
        
        /* this.$router.push({name:'search',params:{keyword:this.keyword}}) */
       
       }
    },
    mounted() {
        //通过全局事件总线清除关键字
        this.$bus.$on('clear',()=>{
            this.keyword = ''
        })
    },
}
</script>


<style scoped lang="less">
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>