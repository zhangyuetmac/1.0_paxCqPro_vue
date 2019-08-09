<template>
    <div class="accountShadow" @click="closeShadow">
      <ul class="accountShadow_ul">
        <li v-for="(item,index) in merchantData" @click.stop="selectMerchant(index)">
          <a :class="item.haveSelect?'aActive':null">{{item.name}}</a>
          <img v-show="item.haveSelect" src="../image/icon_duigou.png">
        </li>      
      </ul>
    </div>
</template>
<script>
export default {
  data(){
    return {
      merchantData:[
        {
          name:"全部",
          haveSelect:true
        },
        {
          name:"商户A",
          haveSelect:false
        },
        {
          name:"商户BBBBBBBBBBBBBBBB",
          haveSelect:false
        },
        {
          name:"商户C",
          haveSelect:false
        },
        {
          name:"商户D",
          haveSelect:false
        },
        {
          name:"商户E",
          haveSelect:false
        },
      ]
    }
  },
  methods:{
    selectMerchant(index){
      console.log("selectMerchant")
      this.merchantData.map((item)=>{
        item.haveSelect = false
      })
      this.merchantData[index].haveSelect = true
      this.$emit("haveSelectMerchant")
    },
    closeShadow(){
      console.log("closeShadow")
      this.$emit("closeShadow")
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../../common/stylus/mixin"
.accountShadow
  width 100%
  height 88%
  background: rgba(0,0,0,0.3)
  position absolute
  top 12%
  .accountShadow_ul
    width 100%
    background #FFFFFF
    li 
      width 90%
      height 50px
      line-height 50px
      display flex
      align-items center
      justify-content space-between
      margin-left 5%
      border-bottom solid 1px #F0F0F0 
      a 
        color #666666
        font-size 16px
      .aActive
        color red
    li:last-child
      border-bottom:none

</style>

