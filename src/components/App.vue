<template>
    <div class="app-container">
        <!-- 在这里放头部header -->
        <mt-header fixed title="辉的第一个Vue项目">
            <span  slot="left">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <!-- 路由展示容器(展示坑) -->
		
        <transition>
			<router-view></router-view>
		</transition>
        

        <!-- Tabbar区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="my-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="my-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="my-tab-item" to="/shopcart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="my-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>

</script>

<!-- 这里写的样式要符合scss语法,并且样式是当前组件私有的,不会成为全局的样式,也不会应用到子组件 -->
<style lang="scss" scoped>
.app-container{
    padding-top: 40px;
	//当有组件切换动画效果的一瞬间,页面的宽度会变成正宽度的两倍
	//此时需要隐藏超出屏幕宽度的区域
	overflow: hidden;
}

//动画效果相关类的样式
.v-enter{
	opacity: 0;
	//让即将进入的页面,向右偏移100%屏幕的宽度
	transform: translateX(100%);
}
.v-enter-to{
	opacity: 0;
	//让即将进入的页面,向左偏移100%屏幕的宽度
	transform: translateX(-100%);
}

.v-enter-active,
.v-leave-active{
	transition: all 0.8s ease;
	position: absolute;
}
.mint-header{
	z-index: 99;
}

.mui-bar-tab .my-tab-item.mui-active {
    color: #007aff;
}

.mui-bar-tab .my-tab-item {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .my-tab-item.mui-icon{
	top:3px;
	widows: 24px;
	height: 24px;
	padding-top: 0 ;
	padding-bottom: 0;
}

.mui-bar-tab.my-tab-item.mui-icon~.mui-bar-label{
	font-size: 10px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>