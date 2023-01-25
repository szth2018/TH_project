<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件展示坑位 -->
    <router-view></router-view>
    <!-- 在Home, Search显示, 在登录,注册隐藏 -->
    <!-- <Footer v-show="$route.path=='/home' || $router.path'/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
    根组件
  </div>
</template>

<script>
//引入
//头部组件
import Header from './components/Header'
//脚部组件
import Footer from './components/Footer'
export default {
  name: '',
  components: {
   Header,
   Footer
  },
  mounted(){//只会执行一次,只会请求数据一次
    //通知Vuex发请求,获取数据,存储在仓库中,派发action
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
