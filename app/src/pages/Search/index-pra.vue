<template>
  <div>
  搜索页
  <!-- <h1>params参数{{$route.params.keyword}}===={{keyword}}===={{a}}==={{b}}</h1>
  <h1>query参数{{$route.query.k}}==={{k}}</h1> -->
  <TypeNav></TypeNav>
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav/index.vue';
export default {
  name: '',
  //路由组件是可以传递props
  /* props:['keyword','a','b','k'], */
  components: {
    TypeNav
}
}
</script>

<style>

</style>
