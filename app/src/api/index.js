//当前这个模块作用:统一管理API
import axios from 'axios';
import requests from './ajax';
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList get请求  无参数
//发请求: axios发请求返回结果是Promise对象

/* export const reqCategoryList = ()=>{
    return requests.get({url:"/product/getBaseCategoryList"})
} */
//简略写法
export const reqCategoryList = ()=> requests({url:"/product/getBaseCategoryList",method:'get'})
//注意:当前函数执行需要把服务器返回的结果返回出去


//获取banner(home首页轮播图接口)
export const reqGetBanners = ()=>mockRequests.get('/banner')


//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')


//获取Search模块数据, 地址:/api/list 方式:post 要带参数:参数见文档
//当前接口,给服务器传递参数params,至少是一个空对象,否则发起带参数的请求不成功,拿不到数据
export const reqGetSearchInfo = (params)=>requests({
    url:"/list",
    method:'post',
    data:params
})