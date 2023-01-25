<template>
    <div>
		<!-- 图片分类区域 -->
        <div id="slider" class="mui-slider ">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<span :class="['mui-control-item',item.id===0 ?'mui-active':'']" v-for="item in category" :key="item.id">
							{{item.name}}
						</span>
						
					</div>
				</div>
			</div>
			
			<!-- 图片的列表区域 -->
	<ul class = "lazyul">
  		<li v-for="item in imagesList" :key="item.id">
    	<img src="http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg">
		<h1 class="info-title">asdasdsadasdsasad</h1>
		<div class="info-content">sadasdadsadasdqwsad</div>
		<img src="http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg">
  		<h1 class="info-title">12sadsad123e1asdas</h1>
		<div class="info-content">12dsaddsvsvccxzcxzczxcas</div>
		<img src="http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg">
		<h1 class="info-title">12dsaddsvsvccxzcxzczxcas</h1>
		<div class="info-content">asdasdsadasdsasad</div>
		
		<img v-lazy="item.url">
		<div class="info">
			<h1 class="info-title">{{item.title}}</h1>
			<div class="info-content">{{item.zhaiyao}}</div>
		</div>
		</li>
	</ul>
    </div>
</template>

<script src="//code.jquery.com/jquery-3.5.1.min.js"></script>

<script>
//导入Mui的js文件,这样就可以使用mui来初始化滑动控件了
import mui from '../../../lib/mui/js/mui.min.js'
import 'mint-ui/lib/style.css'

/* mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
}); */
export default{
    data() {
        return {
           category:[], //所有的图片分类数据
		   imagesList:[],//承接请求回来图片数据的数组 getimgcategory
        };
    },
	created(){
		this.getPhotosCategory()
		this.getImgsbyCategory(0)
	},
    methods: {
       async getPhotosCategory(){
			/* const {data} = await this.$http.get('/api/getimgcategory')
			console.log(data)
			if(data.status===0){
				//手动补全分类信息 
				data.message.unshift({title:'全部',id:0})
				this.category = data.message
			}  */

			const {data} = await this.$http.get('http://127.0.0.7:3007/api/artlist')
			console.log(data)
			if(data.status === 0 ){
				data.message.unshift({name:'全部',id:0})
				this.category = data.message
			}



		},
		async getImgsbyCategory(index){
			/* //根据图片分类的id来获取具体图片的数据	/api/getimgages/ +id	http://test.inis.cn/api/other/hot
			const {data} = await this.$http.get('http://127.0.0.7:3007/api/getImg')
			if(data.status===0)return this.imagesList = data.message */

			const {data} = await this.$http.get('http://127.0.0.7:3007/api/getImg')
			console.log(data);
			if(data.status === 0) return this.imagesList = data.message
		}
    },
    mounted(){//当这个钩子函数执行的时候,才可以进行控件或插件的初始化工作
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
}
</script>

<style lang="scss">
.mui-slider{
    touch-action: pan-x;
}

.lazyul{
	margin: 0;
	padding: 10px;
	li{
		background-color: #ccc;
		text-align: center;
		box-shadow: 0 0 7px grey;
		position: relative;
		&+li{
			//这种样式的写法,适用场景:排除第一个,应用给其他所有的li
			margin-top: 10px;
		}
		img{
			vertical-align: middle;
			width: 100%;
		}
		img[lazy="loading"] {
			width: 40px;
			height: 200px;
			margin: auto;
		}
	}
}
.info{
		position: absolute;
		bottom: 0;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
		.info-title{
			font-size: 5px;
		}
		.info-content{
			font-size: 13px;
			text-align: left;
			text-indent: 2em;
		}
	}


</style>