import VueRouter from "vue-router"

//导入路由组件
import HomeContainer from "./components/tabbars/HomeContainer.vue"
import MemberContainer from "./components/tabbars/MemberContainer.vue"
import SearchContainer from "./components/tabbars/SearchContainer.vue"
import ShopCartContainer from "./components/tabbars/ShopCartContainer.vue"
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import Photolist from './components/photos/Photolist.vue'

//创建路由对象
const  router = new VueRouter ({
  routes:[
    {path:'/',redirect:'/home'},
    {path:"/home",component:HomeContainer},
    {path:"/member",component:MemberContainer},
    {path:"/search",component:SearchContainer},
    {path:"/shopcart",component:ShopCartContainer},
    {path:"/home/NewsList",component:NewsList},
    {path:"/home/newsinfo/:id",component:NewsInfo,props:true},
    //:是占位符   启用props来接收路由参数
    {path:"/home/photolist",component:Photolist}
  ],
  linkActiveClass:'mui-active' //手动设置被激活的路由链接的高亮类名
})

export default router