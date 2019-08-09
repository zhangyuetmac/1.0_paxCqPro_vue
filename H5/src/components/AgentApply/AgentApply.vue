<template>
  <div class="AgentApply transitionWrapper">
    <AgentApplyHeader></AgentApplyHeader>
    <div class="main">
      <div class="type">
        <div class="title">
          <a>代理商类型</a>
        </div>
        <div class="select">
          <div :class="{'itemSelect':item.status == '1'}" v-for="(item,index) in typeData" class="item" @click="toSelectType(index)">
             <img :src="item.img">
             <span >{{item.text}}</span> 
          </div>
          <!-- <div class="item">
             <img src="./image/icon_enterprise_def@2x.png">
             <span>企业</span> 
          </div> -->
        </div>
      </div>
      <div class="rank">
        <div class="title">
          <a>代理商级别</a>
        </div>
        <div class="select">
          <div :class="{'rankSelect':item.status == '1'}" v-for="(item,index) in rankData" class="item" @click="toSelectRank(index)">
             <img :src="item.img">
             <span >{{item.text}}</span> 
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div :class="btnClass" @click="goAgentApply1Page">
        <a>下一步</a>
      </div>
    </div>
  </div>
</template>
<script>
import AgentApplyHeader from './AgentApplyHeader'
export default {
  data(){
    return{
      typeData:[
        {img:require("./image/icon_person_def@2x.png"),text:'个人',status:'0',type:'person'},
        {img:require("./image/icon_enterprise_def@2x.png"),text:'企业',status:'0',type:'province'},
      ],
      rankData:[
        {img:require("./image/icon_yjdls_def@2x.png"),text:'一级代理商',status:'0',rank:1},
        {img:require("./image/icon_ejdls_def@2x.png"),text:'二级代理商',status:'0',rank:2},
      ]
    }
  },
  computed:{
    btnClass(){
      console.log(this.typeData[0].status)
      if((this.typeData[0].status =='1' || this.typeData[1].status =='1')&&(this.rankData[0].status =='1' || this.rankData[1].status =='1')){
        return 'nextLight'
      }else{
        return 'next'
      }
    }
  },
  methods:{
    toSelectType(index){
      if(index==0 && this.typeData[0].status == '0' ){
        this.typeData[0].img = require("./image/icon_person_sel@2x.png")
        this.typeData[0].status = 1
        this.typeData[1].img = require("./image/icon_enterprise_def@2x.png")
        this.typeData[1].status = 0
      }  else if(index==1 && this.typeData[1].status == '0'){
        this.typeData[0].img = require("./image/icon_person_def@2x.png")
        this.typeData[0].status = 0
        this.typeData[1].img = require("./image/icon_enterprise_sel@2x.png")
        this.typeData[1].status = 1
      }
    },
    toSelectRank(index){
      if(index==0 && this.rankData[0].status == '0' ){
        this.rankData[0].img = require("./image/icon_yjdls_sel@2x.png")
        this.rankData[0].status = 1
        this.rankData[1].img = require("./image/icon_ejdls_def@2x.png")
        this.rankData[1].status = 0
      }  else if(index==1 && this.rankData[1].status == '0'){
        this.rankData[0].img = require("./image/icon_yjdls_def@2x.png")
        this.rankData[0].status = 0
        this.rankData[1].img = require("./image/icon_ejdls_sel@2x.png")
        this.rankData[1].status = 1
      }
    },
    goAgentApply1Page(){
      console.log(this.btnClass)
      if (this.btnClass === 'nextLight'){
        this.typeData.forEach((item)=>{
          if(item.status == '1'){
            this.$store.commit('setAgentType',item.type)
          }
        })
        this.rankData.forEach((item)=>{
          if(item.status == '1'){
            this.$store.commit('setAgentRank',item.rank)
          }
        })
        this.$router.push({path:'./AgentApply1'})
      }
    }
  },
  components:{
    AgentApplyHeader
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .AgentApply
    width 100%
    height 100%
    background #F8F8FA
    .main
      width 100%
      height 70%
      background #F8F8FA
      .type
        width 100%
        height 50%
        .title
          width 80%
          height 20%
          margin-left 10%
          display flex
          align-items center
        .select
          width 80%
          height 80%
          margin-left 10%
          display flex
          align-items center
          justify-content space-between
          .item
            width 45%
            height 100%
            background white
            mixinDisplay();
            flex-direction column
          .itemSelect 
            background #D0DBF6
            color #306BE6 
      .rank
        width 100%
        height 50%
        .title
          width 80%
          height 20%
          margin-left 10%
          display flex
          align-items center
        .select
          width 80%
          height 80%
          margin-left 10%
          display flex
          align-items center
          justify-content space-between
          .item
            width 45%
            height 100%
            background white
            mixinDisplay();
            flex-direction column
          .rankSelect 
            background #D0DBF6
            color #306BE6 
    .bottom
      width 100%
      height 15%
      mixinDisplay();
      .next
        width 85%
        height 50%
        background #DDDDDD
        border-radius 45px
        color #FFFFFF 
        mixinDisplay();
      .nextLight
        width 85%
        height 50%
        border-radius 45px
        background #306BE6
        color white
        mixinDisplay();
</style>



