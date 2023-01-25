//项目的JS打包入口文件
//1.导入Vue
import Vue from "vue";
//导入格式化时间的模块
import moment from "moment";

//导入全局的配置模块,这个模块中的代码和main.js中的VM实例没有关系
//只是全局的Vue配置,因此,抽离出去之后可以让项目结构更加清晰
import './globalConfig'

//导入根组件
import App from './components/App.vue'

//配置路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from "./router";


const vm = new Vue({
  el:'#app',
  render:c=>c(App),
  router//挂载路由
})