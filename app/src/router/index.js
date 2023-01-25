//配置路由的地方
import Vue from "vue";
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入路由组件(需要路由跳转显示的组件内容)
import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
//先把VueRouter原型对象的push|replace方法,先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace方法,
//第一个参数: 要传递参数告诉push往哪里跳转(传递哪些参数)
//第二个参数: 成功回调
//第三个参数: 失败回调
VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve && reject){
        //call||apply区别: 
        //相同点:都可以调用函数一次,都可以篡改函数上下文一次
        //不同点: call与apply传递参数: call传递参数用逗号隔开, apply方法执行,传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由,并且暴露出去路由对象实例
const router = new VueRouter({
    //配置路由 meta是路由元信息
    routes:[
        { path: '/home', component: Home, meta:{show:true} },
        { 
            path: '/search/:keyword?', 
            component: Search, 
            meta:{show:true}, 
            name:'search',
            //路由组件能不能传递props数据?
            //布尔值写法：只有params才行,只能传递params参数
            //props:true,
            //对象写法:额外给路由组件传递一些props
            /* props:{a:1,b:2} */
            //函数写法:可以把params参数,query参数,通过props传递给路由组件
            /* props:($route)=>{
                return {keyword:$route.params.keyword, k:$route.query.k}
            } */
        },
        { path: '/login', component: Login, meta:{show:false}},
        { path: '/register', component: Register, meta:{show:false}},
        //重定向, 当项目运转开始的时候,访问/,立马让项目定向到首页
        {path:'/',redirect:'/Home'}
    ]
})

export default router
