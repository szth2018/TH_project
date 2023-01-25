import { reqCategoryList, reqGetBanners,reqFloorList } from "@/api"
//home模块的小仓库
const state = {
    //state中的数据默认初始值不能乱写,服务器返回的对象,或者数组
    //【根据接口返回的类型来定义默认初始值】
    categoryList: [],
    //放轮播图数据的数组
    BannersList: [],
    //floor组件的数据
    floorList:[]
}

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList //服务器返回的数据放在categoryList
    },
    GETBANNERS(state, BannersList) {
        state.BannersList = BannersList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const actions = {
    //通过API里面的接口函数调用,向服务器发请求,获取服务器数据
    async categoryList({ commit }) {
        const result = await reqCategoryList()
        //打印的结果是一个promise对象,如果要显示对象里面的数据要使用async和await
        //注意:async放在函数名前,await放在发起请求函数前
        /* console.log(result) */
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }


    },
    //请求获取首页轮播图的数据
    async getBanners({ commit }) {
        const result = await reqGetBanners()
        console.log(result)
        if (result.code === 200) {
            commit('GETBANNERS', result.data)
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        const result = await reqFloorList()
        if(result.code ===200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
//计算属性
const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}