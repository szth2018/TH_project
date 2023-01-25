<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}}</h1>
							<p class='mui-ellipsis'><span>发表时间:{{item.add_time|dateFormat}}</span><span>浏览次数:{{item.click}}</span>
                            
                            </p>
						</div>
					</router-link>
				</li>
				<!-- <li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../img/comments.png">
						<div class="mui-media-body">
							<h1>幸福</h1>
							<p class='mui-ellipsis'><span>发表时间:2022-6-6</span><span>浏览次数:1</span>
                            
                            </p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../img/comments.png">
						<div class="mui-media-body">
							<h1>幸福</h1>
							<p class='mui-ellipsis'><span>发表时间:2022-6-6</span><span>浏览次数:1</span>
                            
                            </p>
						</div>
					</a>
				</li> -->

			</ul>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                newslist:[]//默认在页面中挂载一个空数组
            };
        },
        created(){
            //每当页面加载的时候,就获取数据
           this.getNewsList()
        },
        methods:{
            async getNewsList(){
                //获取新闻列表内容
              const {data} = await this.$http.get("/api/getnewslist");
              if(data.status===0) {
                  this.newslist=data.message
                  console.log(data.message);
              }
              //如果获取数据成功,则把数据挂载到data上
              
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-media-body{
        h1{
            font-size: 14px;
        }
    }
    .mui-ellipsis{
        color:#26a2ff;
        display:flex;
        font-size: 13px;
        //x轴控制方向,space-between意思是两个元素空间对半平分,各自贴边占据
        //space-around 意思是两个元素周围的空白区域相等,不各自贴边占据
        justify-content: space-between;
        //Y轴控制方向
        //align-items: ;
    }
</style>