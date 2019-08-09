<template>
  <div class="mineWrapper transitionWrapper">
    <MyMerchantHeader :message="baseInfoMessage"></MyMerchantHeader>
    <div class="Navigation">
      <div class="item" :class="{'itemIsActive': '/MyMerchant' === $route.path}"   @click="changeItem('/MyMerchant')">
          <a  :class="{'aIsActive': '/MyMerchant' === $route.path}">审核通过</a>
          <span>(333)</span>
      </div>
      <div class="item" :class="{'itemIsActive': '/Ing' === $route.path}"   @click="changeItem('/Ing')">
          <a  :class="{'aIsActive': '/Ing' === $route.path}">审核中</a>
          <span>(22)</span>
      </div>
      <div class="item" :class="{'itemIsActive': '/Fail' === $route.path}"   @click="changeItem('Fail')">
          <a  :class="{'aIsActive': '/Fail' === $route.path}">审核失败</a>
          <span>(33)</span>
      </div>
      <div class="item" :class="{'itemIsActive': '/Cancel' === $route.path}"  @click="changeItem('Cancel')">
          <a  :class="{'aIsActive': '/Cancel' === $route.path}">已取消</a>
          <span>(45)</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import MyMerchantHeader from "./MyMerchantHeader";
import { Toast } from "vant";
import axios from "axios";
export default {
  components: {
    MyMerchantHeader
  },
  data() {
    return {
      baseInfoMessage:'基本资料',
      //审核状态
      auditStatusData:[
        {status:'审核通过',number:'123'},
        {status:'审核中',number:'12'},
        {status:'审核失败',number:'12'},
        {status:'已取消',number:'3'},
      ]
    };
  },
  methods:{
    changeItem(path){
      this.$router.push(path)
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.mineWrapper 
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  display: flex;
  flex-direction: column;
  align-items: center;
  .Navigation
    height 10%
    width 100%
    background #FFFFFF
    display flex
    .itemIsActive
      border-bottom solid 5px #306BE6
    .item
      flex 1
      mixinDisplay()
      a 
        font-size 14px
        color #BBBBBB
      span 
        font-size 14px
        color #BBBBBB
      .aIsActive
        color #306BE6

  .main 
    width: 100%;
    height :80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y:auto;
    .normalLi 
      padding: 0 5% 0 5%;
      background: #FFFFFF;
      width: 80%;
      height: 60px;
      line-height: 60px;
      // border solid 1px black
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left
        a 
          font-size: 15px;
          color: #333333;
      .right
        display flex
        align-items center
        span 
          font-size: 15px;
          color: #999999;
</style>


