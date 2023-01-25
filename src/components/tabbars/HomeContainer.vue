<template>
    <div class="app-container">
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000" >
        <mt-swipe-item v-for="(item,i) in lunbotu" :key="i">
            <img :src="item.img">
        </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/NewsList">
		                    <img src="../../img/news.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><routerLink to="/home/photolist">
		                    <img src="../../img/share.png" alt="">
		                    <div class="mui-media-body">图片共享</div></routerLink></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/purchase.png" alt="">
		                    <div class="mui-media-body">商品购买</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/comments.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/vedio.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/contact.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		            
		        </ul> 
        <h3>首页根组件123</h3>
    </div>
</template>

<script>
export default{
    data(){
        return{
            lunbotu:[]//轮播图的数组,把轮播图的数据放在data里面的lunbotu[]数组里
        }
    },
    created(){
        this.getLunbotu()
    },
    methods: {
       async getLunbotu(){//获取轮播图数据的方法
           const{data} = await this.$http.get('/api/getlunbo');
            if(data.status===0) this.lunbotu = data.message
        },
    },
}
</script>

<!-- 这里写的样式要符合scss语法,并且样式是当前组件私有的,不会成为全局的样式,也不会应用到子组件 -->
<style lang="scss" scoped>
.mint-swipe{
    height: 180px;
    margin-top: -40px;
}

.mint-swipe-item{
    img{
        height: 100%;
        width: 100%;
    }

    &:nth-child(1){
        background-color: red;
    }

    &:nth-child(2){
        background-color: yellow;
    }

    &:nth-child(3){
        background-color: blue;
    }
}

.mui-grid-view{
    li{
        img{
            width: 70px;
            height: 70px;
        }
    }
}

.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right: none;
    border-bottom: none;
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 13px;
}
</style>