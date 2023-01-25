<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑,页面带搜索关键字标签和X-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCatesName">×</i></li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeSearchName">×</i></li>
            <!-- 品牌名字的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">×</i></li>
            <!-- 产品属性的面包屑 -->
            <li class="with-x" v-for="(attrValue, index ) in searchParams.props" :key="index" @click="removeAttrs(index)">{{attrValue.split(':')[1]}}<i>×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrsSelected="attrsSelected" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{active:realOne}" @click="orderChange('1')">
                  <a >综合<span v-show="realOne" class="iconfont" :class="{'icon-up':realAscInUplogo, 'icon-down': realDescInDownlogo }"></span></a>
                </li>
                <li :class="{active:realTwo}" @click="orderChange('2')">
                  <a >价格<span v-show="realTwo" class="iconfont" :class="{'icon-up':realAscInUplogo, 'icon-down': realDescInDownlogo }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                    <img :src="goods.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 这里的数据为假数据--> <!-- 父子组件传值 -->
          <Pagination :pageNo="1" :pageSize="3" :total="91" :continues="5"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapGetters } from 'vuex'
import Pagination from '../../components/Pagination/index.vue'
  export default {
    name: 'Search',
    components: {
    SearchSelector,
    Pagination
},
    data() {
      return {
        //带给服务器参数
        searchParams: {//此数组值为空,未发生变化
          //一级分类的id
          category1Id:'',
          //二级分类的id
          category2Id:'',
          //三级分类的id
          category3Id:'',
          //分类的名字
          categoryName:'',
          //关键字
          keyword:'',
          //排序:初始状态应该是综合降序
          order:'1:desc',
          //分页器用的,代表当前是第几页
          pageNo:1,
          //每一页显示多少条数据
          pageSize:10,
          //平台售卖属性
          props:[],
          //品牌
          trademark:''
        },
      };
    },
    //当组件挂载完毕之前执行一次【先于mounted之前】

    beforeMount() {

      //复杂的修改searchParams参数的写法
      /* this.searchParams.category1Id = this.$route.query.category1Id
      this.searchParams.category2Id = this.$route.query.category2Id
      this.searchParams.category3Id = this.$route.query.category3Id
      this.searchParams.categoryName = this.$route.query.categoryName
      this.searchParams.keyword = this.$route.params.keyword */
      

      //在发请求之前,把接口需要传递的参数,进行整理(发请求之前,把整理好的参数发出去,服务器就会对应返回相应的内容回来)
      //简单的修改searchParams参数的写法
      //Object.assign:ES6新增的语法,合并对象
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    //组件挂载完毕执行一次【仅仅执行一次】,当用户想要搜索其他内容的时候就不会再发请求来获取内容了
    mounted() {
      //在发请求之前带给服务器参数【searchParams参数发生变化,有值传给服务器】
      this.getSearchData()
      
    },
    computed:{
      /* ...mapState({//已经在search仓库中进行了getters计算属性,因此不需要写这一步了
        goodsList:state=>state.search.searchInfoList.goodsList
      }) */
      /* 当使用计算属性过后,仓库中的getters是不区分home和search下的数据,不分模块
      也就是...mapGetters()不能写成...mapGetters({}) 只能写成数组的形式
      只要仓库中有goodsList这个属性就可以拿到 */
      ...mapGetters(['goodsList']),
      realOne (){
        //返回的是布尔值,判断order里面是否有1,1代表综合降序
        return  this.searchParams.order.indexOf('1')!=-1
      },
      realTwo(){
        return  this.searchParams.order.indexOf('2')!=-1
      },
      realAscInUplogo(){
        return  this.searchParams.order.indexOf('asc')!=-1
      },
      realDescInDownlogo(){
        return  this.searchParams.order.indexOf('desc')!=-1
      }
    },
    methods: {
      //向服务器发起请求获取search模块数据(根据参数不同返回不同的数据进行展示)
      getSearchData(){//想在哪调用就在哪调用,函数声明一次可以多次调用
        //把这次请求封装成一个函数,当需要调用的时候调用即可
        //发起请求时,如果数据带有参数,则在发起请求的时候至少需要传一个空对象来传递这些参数
        //否则将无法获取数据,传递参数的时候服务器可以根据需要的参数来传回相应的数据
        //在data里创建一个带有参数但不带属性值的空数组,放在发起请求的语句里
        this.$store.dispatch('getSearchListData',this.searchParams)
      },
      //删除面包屑分类的名字
      removeCatesName(){
        //把带给服务器的参数置空了,还是需要向服务器发请求
        //带给服务器的参数(都是可有可无的)设置为undefined好处是不会向服务器提交参数,可以占用更少的宽带
        //如果将参数设置为空还是会向服务器传递空值参数,会占用一定宽带
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.searchParams.categoryName = undefined
        this.getSearchData()
        //地址栏也需要清空参数:进行路由跳转(自己跳自己)
        //this.$router.push({name:'search'})
        //不严谨:本意是删除query中的参数,如果路径当中出现了params参数,路由跳转的时候就不应该删除,
        if(this.$route.params){
          this.$router.push({name:"search",params:this.$route.params})
        }

      },
      //删除搜索关键字以及面包屑分类名字
      removeSearchName(){
        //把带服务器的参数searchParams中keyword置空
        this.searchParams.keyword = undefined
        //删除标签后再次发起请求展示默认数据
        this.getSearchData()
        //通知兄弟组件Header清除关键字
        this.$bus.$emit('clear')
        //进行路由的跳转,要带上query参数放在地址栏
        if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query})
        }
      },
      //自定义事件的回调----子父组件传值
      trademarkInfo(trademark){
        //整理品牌字段的参数: 'ID:品牌名称'
        //console.log('父组件',trademark)
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        //再次发请求获取search模块数据并进行展示
        this.getSearchData()
      },
      //移除用户点击的品牌名面包屑
      removeTradeMark(){
        this.searchParams.trademark = undefined
        this.getSearchData()
      },
      //收集用户点击产品属性(面包屑)的回调函数(自定义事件)
      attrsSelected(attrs,attrValue){
        //['属性ID:属性名:属性值']
        //把要带给服务器的参数整理好参数格式(数组)【使用模版字符串】
        const props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
        //数组去重否则用户可以无限点击筛选条件导致面包屑会有重复条件显示
        if(this.searchParams.props.indexOf(props)==-1)this.searchParams.props.push(props)
        //再次发起请求
        this.getSearchData()
      },
      //删除产品属性,要传递一个参数index,props是一个数组,要点击删除按钮来删除数组里的值,所以用index作为索引来删除
      removeAttrs(index){
        //再次整理删除的参数
        this.searchParams.props.splice(index,1)
        //再次发起请求
        this.getSearchData()
      },
      //排序的处理函数
      orderModify(index){
        //index是一个形参:是一个标记,代表用户点击的是综合(1)还是价格(2)【用户点击的时候传递进来的】
        const oriOrder = this.searchParams.order
        //这里获取到的是起始的时候是1还是2的状态
        const oriIndex = this.searchParams.order.split(':')[0]
        const oriSort = this.searchParams.order.split(':')[1]
        //准备一个新的order的属性值
        let newOrder =''
        //console.log('起始index'+oriIndex,'点击的index'+ index)
        //这个判断条件是为了确定用户点击的一定是综合
        if(index==oriIndex){
          //判断开始排序oriSort是升序还是降序,oriSort刚开始等不等于desc?如果等于就取反为asc否则就desc
          newOrder = `${oriIndex}:${oriSort=="desc"?"asc":"desc"}`
        }else{//为了确定用户点击的一定是价格,不管用户点击的是哪个按钮默认一开始展示降序
          newOrder = `${index}:${"desc"}`
        }
        //将新的order值赋予searchParams,再次发起请求
        this.searchParams.order = newOrder
        //再次发起请求
        this.getSearchData()
        
      },
    },
    //数据监听:监听组件实例身上属性的属性值变化
    watch:{
      //监听路由信息发生变化,如果发生变化就再次发起请求
      $route(newValue,oldValue){
        //当路由信息发生变化的时候,再次发请求之前需要再次整理路由信息发送给服务器拿到响应数据
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        //再次发起ajax请求
        this.getSearchData();
        //每一次请求完毕,应该把相应的1，2，3级分类的id清空,让它接收下一次相应1，2，3级分类的id
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>