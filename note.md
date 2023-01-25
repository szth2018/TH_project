## vue-cli脚手架初始化项目

node_modules文件夹:项目依赖文件夹
public文件夹:一般放置一些静态资源(图片等),注意:放在public文件夹中的静态资源,webpack进行打包的时候,会原封不动打包到dist文件夹中

src文件夹(程序员源代码文件夹):

    assets文件夹:一般也是放置静态资源(一般是放置多个组件共用的静态资源)
    注意:放置在assets文件夹里面的静态资源,当webpack打包的时候,webpack会吧静态资源当作一个模块,打包在js文件里面

    components文件夹:一般放置的是非路由组件(或是全局组件)

    App.vue:唯一的根组件,vue当中的组件(.vue)

    main.js:程序入口文件,也是程序最先开始执行的文件

babel.config.js:配置文件(与babel相关),把高级语法翻译成可供浏览器识别的较为低级的语法
package.json文件:记录项目的信息
package-lock.json:缓存性文件

## 项目运行起来的时候,让浏览器自动打开项目
1.1 ---package.json
    "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

1.2 eslint校验功能关闭,有时候定义变量后,不使用变量会报错
    ---在根目录下,创建一个vue.config.js
        在文件夹中写    
            module.exports = {
            //关闭eslint
            lintOnSave:false}

1.3 src文件夹简写方法,配置别名。@代表的是src文件夹   @只能在src文件夹中使用到路径时使用
在根目录下创建一个jsconfig.json文件, jsconfig.json配置别名@提示
    {
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*":["src/*"]
        }
    },
    "exclude": ["node_modules","dist"]
}




## 项目路由分析
vue-router
前端路由:KV键值对.
key: URL(地址栏中的路径)
value:相应的路由组件
注意:项目分为上中下结构

路由组件:
Home首页路由组件、Search搜索组件、login登录路由、register注册路由
非路由组件:
Header【首页、搜索页有】、Footer【在首页、搜索页有】,在登录|注册页面没有
1. 完成非路由组件Header与Footer业务
在开发项目时:
    a.书写静态页面(html+css)
    b.拆分组件
    c.获取服务器数据动态展示
    d.完成相应的动态业务逻辑

注意1:创建组件的时候,组件结构 + 组件样式 + 图片资源
注意2:项目采用的是less样式,但是浏览器不识别less样式,需要通过less、less-loader[安装版本5]进行处理,把less样式变为css样式,浏览器才能识别
注意3:如果想让组件识别less样式,需要在style标签身上添加lang=less

2. 使用组件的步骤(非路由组件)
    --创建或定义
    --引入(import)
    --注册
    --使用

3. 路由组件的搭建
vue-router
    路由组件应该有四个: Home, Search, Login, Register
    --components文件夹:放置非路由组件(共用的全局组件)
    --page|views文件夹:放置路由组件

    3.1 配置路由
    项目当中配置的路由一般放置在router文件夹中
    配置完路由文件需要回到主入口文件(main.js)进行注册使用

    3.2 总结
    路由组件与非路由组件的区别?
        1. 路由组件一半放置在page|views文件夹, 非路由组件一般放置在components文件夹
        2. 路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字),非路由组件在使用的时候一半都是以标签的形式使用
        3. 注册完路由,不管是路由组件,还是非路由组件身上都有$route、$router属性
            $route：一般获取路由信息【路径、query、params等等】
            $router:一般进行编程式导航进行路由跳转【push|replace】(二者区别就是能不能记住历史记录)
    
    3.3 路由的跳转?
    路由的跳转有两种形式:
    声明式导航router-link,可以进行路由的跳转
    编程式导航push|replace,可以进行路由的跳转

    编程式导航:声明式导航能做的,编程式导航都能做,
    但是编程式导航除了可以进行路由跳转, 还可以做一些其他的业务逻辑(比如数据请求,收集用户信息进行登录注册,然后再进行路由跳转)

4. 非路由组件Footer显示与隐藏
显示或隐藏组件:    v-if(操作dom在节点树上是真有还是假有,会频繁操作dom消耗性能) 或 v-show(只是在样式上将元素进行显示或隐藏)
Footer组件:在Home、Search显示Footer组件
Footer组件:在登录、注册页面隐藏
    4.1 可以根据组件身上的$route 获取当前的路由信息(路径),通过路由路径判断Footer显示与隐藏  <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer>
    4.2 配置路由的时候,可以给路由添加路由元信息【meta】,路由需要配置对象,它的key不能乱写
        { path: '/login', component: Login, meta:{show:false}},写完路由元信息,通过根组件来挂载$route.meta.show来指定非路由组件的显示或隐藏
        <Footer v-show="$route.meta.show"></Footer>

5. 路由传参
    5.1 路由跳转的几种方式
    比如: A->B
    声明式导航:router-link (必须要有to属性),可以实现路由的跳转
    编程式导航: 使用的是组件实例的$route.push|replace方法,可以实现路由的跳转(优点:在跳转之前可以写一些自己的业务 比如:发起请求,收集用户填写的数据)

    5.2 路由传参的几种写法
    params参数: 属于路径当中的一部分,注意: 在配置路由的时候,需要占位
    query参数: 不属于路径当中的一部分,类似于ajax中的queryString 
        例:/home?name=zs&gender=male,不需要占位



## push 和 replace 方法
    1. 编程式路由跳转到当前路由(参数不变),多次执行会跑出NavigationDuplicated的警告错误?
    --路由跳转的两种方式:声明式导航, 编程式导航
    --声明式导航没有这类问题, Vue-router底层已经解决了NavigationDuplicated的警告错误
        1.1 为什么编程式导航在路由跳转的过程中,会有这种警告错误?
            最新的vue-router引入了promise
                解决方法: 通过push方法传递相应的成功,失败的回调函数,可以捕获到当前错误,可以解决
                this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{})---此种方法不能彻底解决问题,将来在别的组件当中不管用push|replace方法,编程式导航还是会有类似的错误
        
        1.2 
        this:当前组件实例(search)
        this.$router属性: 当前的这个属性,属性值是vuerouter类的一个实例,是当在入口文件注册路由的时候,给组件实例添加$router|$route属性
        push方法:是VueRouter类的一个实例



## Home模块组件拆分
    --先把静态页面完成
    --拆分出静态组件
    --获取服务器的数据进行展示
    --动态业务

    1. 三级联动组件(html + css + 图片资源)
    ---由于这个组件在Home、Search、Detail页面中出现了,因此把三级联动注册成全局组件  好处:主需要注册一次,就可以在任意地方使用
    2. 剩余的静态组件(html + css + 图片资源)



## axios二次封装
数据请求的集中方式 XMLHttpRequest、fetch、Jquery、Axios
    1.1为什么需要进行二次封装axios?
        请求拦截器、响应拦截器
        请求拦截器:可以在发请求之前可以处理一些业务
        响应拦截器:当服务器数据返回后,可以处理一些业务
    1.2 在项目中经常会有API文件夹【axios】
    接口中：路径都带有/api
    baseURL:'/api'



## 接口统一管理
    第一:现在vue.config.js中配置webpack的代理功能, 第二:在项目的目录下的src文件中创建index.js并引入axios在request.js中暴露出来的requests在index.js文件夹中,然后配置路径以及请求方法,最后在项目的主入口文件main.js引入index.js暴露出来的方法


## 跨域问题
什么是关于: 出现协议、域名、端口号不同的请求,叫做跨域
跨域问题的解决方案： cors, jsonp, 代理(proxy)



## nprogress进度条的使用---项目发起请求时使用这个进度条,请求数据成功后进度条显示结束 (在拦截器中使用)
    start():代表进度条开始
    done():代表进度条结束
    进度条的颜色是可以修改的:需要改nprogress包里面自带的样式(css)



## vuex状态管理库
    vuex是什么? vuex是官方提供的一个插件,状态管理库,可以用来集中管理项目中组件共用的数据.
    //state：仓库存储数据的地方
    //mutations:修改state的唯一手段
    //actions:处理action，可以书写自己的业务逻辑,也可以用来处理异步,但不能修改state
    //getters：计算属性,更多是用于简化仓库数据,让组件获取仓库的数据更加方便
    注意:并不是全部的项目都需要vuex,如果项目很小,不需要vuex, 如果项目很大，组件很多，数据很多，数据维护复杂，就需要使用vuex

    1.1 vuex基本使用
    1.2 vuex实现模块式开发
        如果项目过大,组件很多,接口也很多,数据也很多,可以让Vuex实现模块式开发



## 完成TypeNav三级联动展示数据业务
服务器返回的三级联动数据内容json
[
    {
        id:1,
        name:'电子书',
        child:[
            {id:2,name:'夕阳下', child:[]},
        ]
    }
]



## 完成一级分类动态添加背景颜色
    方案一:采用样式完成(hover)
    /*.item:hover {
            background: skyblue;
            }*/
    方案二:使用JS
    :class="{cls:currentIndex == index}"


## 通过JS控制二三级商品分类的显示与隐藏

最开始的时候,是通过CSS样式display:block|none显示与隐藏二三级分类

JS来控制显示与隐藏二三级分类
:style="{display:currentIndex == index?'block':'none'}"


## 卡顿现象
正常: 事件触发地非常频繁,每一次触发,回调函数都要去执行(如果时间很短,且回调函数内部有大量的业务,就有可能出现浏览器卡顿)


函数的防抖与节流： lodash插件:里面封装了函数的防抖与节流业务[如果自己封装需要学习闭包与延迟器]
防抖:   前面的所有触发都被取消,最后一次执行在规定的时间后才会触发,也就是如果连续快速触发,只会执行一次        _.debounce(func(){},time,[option])

节流:   在规定的间隔时间范围内不会重复触发回调,只有大于这个时间间隔才会触发回调,把频繁触发变成少量触发       _.throttle(func(){},time,[option])



## 完成三级联动节流的操作
先按需从lodash包中引入_.throttle函数,然后在三级联动鼠标触发的函数中使用_.throttle函数并把index参数传进throttle函数中,设置节流时间



## 三级联动组件的路由跳转与传递参数

三级联动用户可以点击的菜单有:一级分类, 二级分类, 三级分类,当用户点击的时候
Home模块跳转到Search模块,一级分类会把用户选中的产品(产品的名字,产品的id)在路由跳转的时候,进行传递

路由跳转:
声明式导航:router-link
编程式导航:push|replace

三级联动:如果使用的是声明式导航router-link,可以实现路由的跳转与传递参数
但是会出现卡顿现象

router-link: 是一个组件, 当服务器数据返回后,会循环出很多的router-link组件【创建很多组件】,当创建大量的组件实例的时候,会消耗很多内存和时间,所以会出现卡顿现象

完成三级联动路由跳转与传递参数
路由跳转时,可以在二三级分类中添加自定义属性来区分用户点击的是一级,二级还是三级标签
this.$router.push({name:'search',query:{categoryName:'xxx',name:'xxx'} })



## 开发Search模块中的TypeNav商品分类菜单(拥有过渡动画)

1.需要修改TypeNav商品分类菜单中的template,在<div>中委派添加两个事件mouseenter和mouseleave来控制菜单的显示与隐藏,然后在三级联动中使用v-show来控制显示与隐藏
    注意: 需要判断路由是否为search来区分TypeNav商品分类菜单在home页和Search页固定显示还是触摸显示

2.过渡动画:
    使用过渡动画的前提:组件|元素必须要有v-if|v-show指令才能进行过渡动画

3.优化商品分类三级列表
    把TypeNav中的发起数据请求this.$store.dispatch('categoryList')放入到App.vue里的mounted中.这样可以节约性能,避免了在不同路由之间来回跳转一直发请求获取数据【因为App.vue根组件只会执行一次】

4.合并params与query参数
    TypeNav三级联动分类中的参数合并
    //判断：如果路由跳转的时候，带有params参数，顺带传递过去
            if(this.$route.params){
                location.params = this.$route.params
                //合并两个categoryName,category1Id对象
                //给location动态添加query参数
                location.query = query
                //console.log(location, query)
                //路由跳转
                this.$router.push(location)
            }
    Header里面的搜索框中的参数合并
    if(this.$route.query){
            //代表的是如果有query参数也传递给Search页
            const location = {name:'search',params:{keyword:this.keyword||undefined}}
            location.query = this.$route.query
            this.$router.push(location)
        }



## 开发首页中的ListContainer组件与Floor组件
服务器返回的数据(接口)只有商品分类菜单分类数据,ListContainer组件与Floor组件,服务器没有提供数据(可以使用mock模拟数据)

mock数据(模拟):用于模拟数据,需要使用到一个插件叫mockjs
    mock使用步骤:
        1.在项目中的src文件夹中创建一个mock文件夹
        2.第二步:准备json数据(在mock文件夹中创建相应的文件)-----json数据中不能带有空格
        3.第三步:把mock数据需要的图片放到pubic文件夹中[public文件夹在打包的时候,会吧相应的资源原封不动地放到dist中]
        4.第四步:创建mockServe.js开始mock(模拟数据),通过mockjs模块实现
        5.mockserve.js文件在入口文件中引入(至少需要执行一次,才能模拟数据)

ListContainer组件开发
    1.要安装Swiper插件:最新版本是8,最新版可能会有问题,安装版本5 
    cnpm i --s swiper



## 开发floor组件
注意:仓库中的state的数据格式不能乱写,要根据服务器返回的数据类型
    1.getFloorList这个action在哪里触发?
        (服务器返回的数据中数组有两个对象,这两个对象是给两个floor使用的,而两个floor是需要v-for遍历出来,如果放在floor组件内部发起请求则不能v-for遍历出两个floor,因此不能放在floor)
        因此:需要在Home路由组件中的发起action,

    2.v-for也可以在自定义标签中使用
    
    3.组件通信的方式有哪些? (面试频率极高)
            props:用于父子组件通信
            自定义事件: @on  @emit  可以实现子给父通信
            全局事件总线: $bus 全能
            pubsub-js:vue当中几乎不用  全能
            插槽
            vuex



## 把首页中的轮播图拆分为一个全局组件（未完成）



## Search模块开发
    1.静态页面+静态组件拆分出来
    2.发请求(api)
    3.vuex(三连环)
    4.组件获取仓库数据,动态展示数据

    a.  Search模块需要的服务器数据,已经请求到了,并且存储于vuex仓库中,一些数据已经通过getters进行了简化  注意:getters就是用于数据简化的
    b.  商品列表,产品售卖属性已经动态展示出来了(服务器数据)
    c.  动态开发面包屑中的分类名:获取以及删除面包屑功能(编程式导航路由跳转【自己跳自己】)
    d.  动态开发面包屑中的搜索关键字
            d.1当面包屑中的关键字清除以后,需要通知兄弟组件Hearder让兄弟组件header中的关键字清除
                组件通信:
                    props:父子
                    自定义事件:子父 使用方法:在子组件中的html自定义@点击事件(形参),然后在methods中自定义@点击事件(形参),在事件中this.$emit('父组件@自定义事件名',形参),在父组件中html自定义@自定义事件名='自定义事件名',
                    在methods中定义自定义事件名(形参)
                    vuex:万能
                    插槽:父子
                    pubsub-js:万能(很少用)
                    $bus:全局事件总线
    e.  动态开发面包屑中展示用户点击的品牌名面包屑
            e.1 需要在子组件中设置点击事件,传入形参trademark获取来表明用户点击标签的参数,
            使用$emit('父组件自定义事件名',形参),在父组件中的html结构中添加自定义事件处理函数,
            e.2 在父组件的自定义处理函数中整理品牌字段的参数: 'ID:品牌名称',使用模板字符串
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`,然后再次发起请求获取数据
    f.  动态开发移除用户点击的品牌名面包屑
            f.1 需要在子组件中设置点击事件,传入形参attrs,attrValue来获取用户点击哪个属性
            f.2 产品属性值的点击事件处理函数需要带上参数(装着用户点击哪个属性【这个属性就是attrs,attrValue】['属性ID:属性值:属性名'])
            f.3 使用$emit和e项目步骤类似,最后让this.searchParams.trademark = undefined不把参数传递给服务器,然后重新发请求



## 开发排序功能
    1:综合,2:价格 asc:升序,desc:降序
    示例:'1:desc'
    1.1问题
        order属性的属性值最多有多少种写法?
        1:asc
        1:desc
        2:asc
        2:desc
    1.2问题 默认谁应该有类名?
        通过order的属性值中是包含1(综合)还是包含2(价格)?,:class="{active:realOne}动态类通过函数判断order里面是否有1,1代表综合降序,2代表价格降序,
    1.3问题 谁应该有箭头(谁有类名【谁高亮】谁就有箭头)
    1.4问题 箭头图标用什么展示出来?(阿里图标库iconfont)

    2.1为什么很多电商平台要用分页?
        对于浏览器而言一瞬间渲染大量数据(比如一万条数据),可能会出现卡顿
        所以才使用分页器减少一次性数据的加载量
    
    2.2分页器展示,需要哪些数据(条件)?
        需要知道当前是第几页:   pageNo字段代表当前是第几页
        需要知道每一页需要展示多少条数据:   pageSize字段代表展示多少条数据
        需要知道整个分页器一共有多少条数据(页): total字段代表分页器展示数据总量
        需要知道分页器省略按钮省略连续页面的个数:   一般是5或者7【奇数】(对称)

    2.3自定义分页器:开发的时候,先使用假数据来进行测试,测试成功后再使用服务器数据

    2.4对于分页器而言,一个重要的地方就是【算出连续页码的起始数字和结束数字】

## 当前完成内容
    1.完成商品分类的三级列表路由跳转以及一级路由传参(参数合并)
    2.完成search模块中对TypeNav的使用(过度动画)
    3.对于typeNav请求次数进行优化(在App.vue中进行派发(dispatch))
    4.Swiper插件:经常用于(轮播图的制作)[pc|移动端都可以使用]
        使用步骤:
            a.引入相应的包(swiper.js|swiper.css)
            b.页面中swiper的html结构必须要有
            c.初始化swiper实例,给轮播图添加动态效果
    5.mock数据:通过mockjs模块实现的
 最完美解决轮播图的方案,解决轮播图问题
    使用watch + nextTick监听轮播图的数据:监听数据变化
        $nextTick:  /* nextTick:在下次 DOM 更新(服务器的数据已经回来了,并且v-for已经遍历完成)  循环结束之后(v-for遍历完成)执行延迟回调。在修改数据之后(组件从空数组到挂载有4条数据的新组件)立即使用这个方法，获取更新后的 DOM */,
        $nextTick:  可以保证页面中的结构是一定有的,经常与很多插件一起使用【很多插件都需要DOM已经存在的情况下使用】
    6.完成家用电器以及手机通讯Floor的数据展示