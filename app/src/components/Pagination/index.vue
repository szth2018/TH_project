<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>{{totalPage}}</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>
  
  <script>
import { start } from 'nprogress';

export default {
  name: "Pagination",
  props:['pageNo','pageSize', 'total', 'continues'],
  components: {},
  computed:{
    //总共多少页
    totalPage(){
      //向上取整
      return Math.ceil(this.total/this.pageSize)
    },
    //计算出连续页码的起始数字和结束数字[连续页码数字最少是5]
    startNumAndEndNum(){
      //要解构出来,不解构是使用组件身上的属性
      const {continues,pageNo,totalPage} = this
      //先定义两个变量存储起始的数字和结束的数字
      let startNum = 0, endNum = 0
      //连续页码数字是5【至少5页】,也有可能数据不多产生的展示页少于5,要做判断
      //总页数小于连续页码数【不正常情况】
      if(continues > totalPage){
        startNum = 1
        endNum = totalPage
      }else{
        //正常情况【连续页码数5,总页数一定是大于5】 连续页码数是5或7
        //起始数字
        startNum = pageNo - parseInt(continues/2)
        //结束数字
        endNum = pageNo + parseInt(continues/2)
      }
      return {startNum,endNum}
    }
  }
};
</script>
  
  <style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
  