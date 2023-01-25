import Vue from 'vue'
import App from './App.vue'


//注册全局组件
//三级联动组件
import TypeNav from '@/components/TypeNav'
//第一个参数:全局组件的名字,第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav)


//引入全局的轮播图组件
/* import Banners from '@/components/Banners'
Vue.component(Banners.name,Banners) */


//引入全局的分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//引入路由
import router from '@/router'
//引入仓库
import store from './store'
//引入mock数据(mockserve.js)
import '@/mock/mockserve'


//全局引入Swiper样式
import 'swiper/css/swiper.css'


import { reqGetSearchInfo } from './api'
console.log(reqGetSearchInfo({}))
new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this //VM
  },
  //注册使用路由：底下的写法kv一直省略v【router是小写的】
  //注册路由信息:当这里书写router的时候,组件身上都拥有$route, $router属性
  router,
  //注册仓库：组件实例的身上会多出一个属性$store属性
  store
}).$mount('#app')
