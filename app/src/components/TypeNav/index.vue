<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow"><!-- 委派 -->
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition>
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <!-- 利用事件的委派+编程式导航实现路由的跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                                <!-- :class="{cls:currentIndex == index}意思是鼠标移到某个元素,那个元素才有cls这个类的样式 -->
                                <h3 @mouseenter="changeIndex(index)" :class="{cls:currentIndex == index}">
                                    <a :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                                </h3>
                                <!-- 二级,三级分类 -->
                                <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                                </em>

                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <!-- <h1>{{categoryList}}</h1> -->
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">惠购超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import{mapState} from 'vuex'
//引入lodash
import {throttle} from '../../../node_modules/lodash'

export default {
  name: 'TypeNav',
  //组件挂载完毕:可以向服务器发请求
  data(){
    return{
        //存储用户鼠标移动到哪一级
        currentIndex:-1,
        show:true
    }
  },
  mounted() {
    /* //通知Vuex发请求,获取数据,存储在仓库中,派发action
    this.$store.dispatch('categoryList') */
    //当组件挂载完毕的时候,让show属性变成false
    //如果不是home路由组件,将TypeNav进行隐藏
    if(this.$route.path!=='/home'){
        this.show = false
    }
  },
  computed:{
    //mapState是用来获取多个state的值
    ...mapState({
        //右侧需要的是一个函数,当使用这个计算属性的时候,右侧的函数会立即执行一次
        //会注入一个参数state,其实是大仓库中的数据
        /* categoryList:(state)=>{
            return state.home.categoryList
        } */
        //简写
        categoryList:state =>state.home.categoryList
    })
  },
  methods:{
    //鼠标进入分类时修改分类索引currentIndex属性
    /*changeIndex(index){ //未添加节流函数
        //index:鼠标移到某一个一级分类元素的索引值
        //正常情况(用户慢慢的移动鼠标进入一级分类),都会触发鼠标进入时间
        //非正常情况(用户快速移动鼠标进入一级分类),本身全部一级分类都应该触发鼠标进入时间,但实际上,是有部分h3触发事件
        //由于用户行为过快,导致浏览器反应不过来,如果回调函数中有大量业务,就会出现卡顿现象
        //this.currentIndex = index
        /* console.log(index) */
    //},
    changeIndex:throttle(function(index){ //es5的写法k:v  //throttle回调函数不能使用箭头函数,会识别不了参数
        //index:鼠标移到某一个一级分类元素的索引值
        //正常情况(用户慢慢的移动鼠标进入一级分类),都会触发鼠标进入时间
        //非正常情况(用户快速移动鼠标进入一级分类),本身全部一级分类都应该触发鼠标进入时间,但实际上,是有部分h3触发事件
        //由于用户行为过快,导致浏览器反应不过来,如果回调函数中有大量业务,就会出现卡顿现象
        this.currentIndex = index
        /* console.log(index) */
    },100),
    
    goSearch(event){//event是事件对象,可以获取到当前触发事件的节点
        //最好的解决方案:利用编程式导航 + 事件委派
        //利用事件委派存在的问题: 1:无法知道用户点击的是a标签  2:如何获取参数【1、2、3级分类的产品名字、id】
        
        //存在的一些问题: 事件委派, 是把全部的子节点【h3、dt、dl、em】的时间委派给父亲节点
        //点击a标签的时候,才会进行路由跳转【如何确定点击的标签一定是a标签并进行路由跳转?】
        
        //存在的另一个问题:【即使用户点击的是a标签,如何区分是一级，二级，还是三级分类标签?】

        
        //第一个问题:把子节点中的a标签,加上自定义属性:data-categoryName="c1.categoryName"，其他的子节点没有这个属性
        /* this.$router.push('search') */
        const el = event.target //打印出来的el值是元素节点
        console.log(event.target)
        //获取到当前触发这个事件的节点【h3、a、dt、dl】,需要带有:data-categoryname这样的节点一定是a标签
        //在元素节点中有一个属性叫dataset属性,可以获取元素节点的自定义属性与属性值 console.log(el.dataset)
        //可以解构出来el.dataset中带有的categoryName
        const {categoryname,category1id,category2id,category3id} = el.dataset
        //标签身上有categoryname一定是a标签
        if (categoryname) {
            //整理路由跳转的参数
            const location = { name: "search" }
            const query = { categoryName: categoryname }
            //一级，二级，三级分类a标签的区分
            if (category1id) {
                query.category1Id = category1id
            } else if (category2id) {
                query.category2Id = category2id
            } else {
                query.category3Id = category3id
            }
            //判断：如果路由跳转的时候，带有params参数，顺带传递过去
            if(this.$route.params){
                location.params = this.$route.params
                //合并两个categoryName,category1Id对象
                //给location动态添加query参数
                location.query = query
                //console.log(location, query)
                //路由跳转
                this.$router.push(location)
            }
            /* //合并两个categoryName,category1Id对象(单参数传递,query)
                //给location动态添加query参数
                location.query = query
                //console.log(location, query)
                //路由跳转
                this.$router.push(location) */
        }
    },
    //当鼠标移入的时候,让商品分类列表进行展示
    enterShow(){
        if(this.$route.path !='/home'){
            this.show = true
        }
        
    },
    //鼠标移出在一级分类菜单时的函数，让商品分类列表进行隐藏
      leaveShow() {
          //鼠标移出分类时修改分类索引currentIndex属性
          this.currentIndex = -1
          //判断如果是Search路由组件的时候才会执行
          if (this.$route.path != '/home') {
                  this.show = false
          }
      },  
  }
}
</script>

<style lang="less">




.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    /*&:hover {
                            .item-list {
                                display: block;
                            }
                        }*/

                }

                /*为分类菜单添加选中背景颜色*/
                /*.item:hover {
                        background: skyblue;
                    }*/
                .cls {
                    background: skyblue;
                }
            }
        }
        /*过渡动画的样式,注意如果transition标签带上name的属性属性值,
        下面的样式名就不在是v-而是name的属性值-*/
        /*过渡动画开始状态(进入)*/
        .v-enter {
            height: 0px;
            /*transform: rotate(0deg);*/
        }
        /*过渡动画结束状态(结束)*/
        .v-enter-to {
            height: 461px;
             /*transform: rotate(360deg);*/
        }
        /*定义动画时间,速率*/
        .v-enter-active {
            transition: all 0.5s linear;
        }
    }
}



</style>
