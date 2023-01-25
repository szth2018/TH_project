//1.导入Vue
import Vue from "vue";
//导入格式化时间的模块
import moment from "moment";



//定义全局的时间过滤器
Vue.filter('dateFormat',function(datestr,formatStr = 'YYYY-MM-DD HH:mm:ss'){
    //在过滤器的处理函数中,最后,必须return出去结果,这样才是过滤器的标准格式
    return moment(datestr).format(formatStr)
  
  })