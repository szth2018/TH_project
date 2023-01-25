import { reqGetSearchInfo } from "@/api"
//search模块的小仓库
const state = {
    //仓库初始状态
    searchInfoList:{}
}

const mutations = {
    GETSEARCHINFO(state,searchInfoList){
        state.searchInfoList = searchInfoList
    }
}

const actions = {
    //获取search模块数据
    async getSearchListData ({commit},params={}){//action第一个参数是{commit}向上提交,第二个参数是params载荷
        
        //reqGetSearchInfo,调用的时候至少要传一个参数(空对象)来接住服务器返回数据的参数
        //params形参:是当用户派发(dispatch)action的时候,第二个参数是传递过来的,至少是个空对象
        const result = await reqGetSearchInfo(params)
        console.log(result)
        if(result.code == 200){
            commit('GETSEARCHINFO',result.data)
        }
    }
}
//计算属性：在项目中,是为了简化数据的
//在项目中getters主要作用是简化仓库中的数据不用一直.出来需要的数据
//就像这样goodsList:state=>state.search.searchInfoList.goodsList
//可以简化组件中将来需要用到的数据
const getters = {
    //当前形参state,是当前仓库中的state,并不是大仓库中的state
    //利用已有的属性的属性值成为一个新的属性
    //这里的goodsList不一定是要和服务器返回数据中的具体某一项数据名相同
    goodsList(state){
        /* 这样写是有问题的, 
        当没有网络的时候就发不了请求因此searchInfoList:{}永远是空的,
        goodsList也就成了undefined,将来v-for遍历的时候遍历不到数据*/
        //假如没有网络state.searchInfoList.goodList应该返回的是undefined
        //当没有网络时计算新的属性的属性值至少给v-for传递一个空数组去遍历
        return state.searchInfoList.goodsList||[]
    },
    trademarkList(state){
        return state.searchInfoList.trademarkList
    },
    //简写
    attrsList:(state)=>state.searchInfoList.attrsList
    /* attrsList(state){
        return state.searchInfoList.attrsList
    } */
}


export default {
    state,
    mutations,
    actions,
    getters
}

//state：仓库存储数据的地方
//mutations:修改state的唯一手段
//actions:处理action，可以书写自己的业务逻辑,也可以用来处理异步,但不能修改state
//getters：计算属性,更多是用于简化仓库数据,让组件获取仓库的数据更加方便