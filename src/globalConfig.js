import Vue from 'vue'
//全局配置MintUI组件库
import MintUI from 'mint-ui'
//导入mint-ui样式表
import 'mint-ui/lib/style.css'
//使用Vue.use来批量注册mint-ui的组件
Vue.use(MintUI)

//导入MUI的样式
import '../lib/mui/dist/css/mui.min.css'
//导入MUI的扩展图标样式
import '../lib/mui/examples/hello-mui/css/icons-extra.css'

//直接导入并执行filters.js模块,从而为Vue挂载全局的过滤器
import './filters'


//配置axios
import axios from "axios";
Vue.prototype.$http = axios.create({
  //把axios挂载到Vue的原型对象上 http://api.cms.liulongbin.top/   http://127.0.0.1:3007
  //在全局设置axios的请求根路径,这样在发起请求的时候可以不写根地址
  baseURL:'http://api.cms.liulongbin.top/'
  /* baseURL:'http://127.0.0.1:3007/' */
})


/* 这种写法请求数据弊端：当请求数据接口改变要修改多出的请求数据根地址 */
/* Vue.prototype.$http = axios
this.$http.get('http://www.liulongbin.top:3005/api/getlunbo') */