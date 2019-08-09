<template>
  <div class="accountBookWrapper">
    <AccountBookHeader 
      @showMerchantSelect="showMerchantSelect" 
      @changePageByIndex="changePageByIndex"
      :shadowShow="shadowShow">
    </AccountBookHeader>
    <div class="main"> 
      <div class="chart" v-if="currentChart==='dateChart'">
        <AmountAllDate ></AmountAllDate>
        <EChartsCompTestDate></EChartsCompTestDate>
        <MerchantIncome></MerchantIncome>
        <MerchantIncome></MerchantIncome>
      </div>
      <div class="chart" v-if="currentChart==='weekChart'">
        <AmountAllWeek ></AmountAllWeek>
        <EChartsCompTestWeek></EChartsCompTestWeek>
        <MerchantIncome></MerchantIncome>
      </div>
      <div class="chart" v-if="currentChart==='monthChart'">
        <AmountAllMonth ></AmountAllMonth>
        <EChartsCompTestMonth></EChartsCompTestMonth>
        <MerchantIncome></MerchantIncome>
        <MerchantIncome></MerchantIncome>
      </div>
    </div>
    <Shadow v-show="shadowShow" 
      @closeShadow="closeShadow" 
      @haveSelectMerchant="haveSelectMerchant">
    </Shadow>
  </div>
</template>
<script>
import NoData from '../Mine/MyMerchant/NoData'
import AccountBookHeader from './AccountBookHeader/AccountBookHeader'
import AmountAllDate from './AmountAll/AmountAllDate'
import AmountAllWeek from './AmountAll/AmountAllWeek'
import AmountAllMonth from './AmountAll/AmountAllMonth'
// import EChartsComp from './EChartsComp/EChartsComp'
import EChartsCompTestDate from './EChartsCompTest/EChartsCompTestDate'
import EChartsCompTestWeek from './EChartsCompTest/EChartsCompTestWeek'
import EChartsCompTestMonth from './EChartsCompTest/EChartsCompTestMonth'
import MerchantIncome from './MerchantIncome/MerchantIncome'
import Shadow from './Shadow/Shadow'
export default {
  data(){
    return {
      currentChart:"dateChart",
      //阴影部分是否显示
      shadowShow:false
    }
  },
  methods:{
    //子组件的header传过来index改变页面的components
    changePageByIndex(data){
      console.log('父组件'+data)
      if (data === 0 ){
        this.currentChart = 'dateChart'
      } else if(data === 1 ){
        this.currentChart = 'weekChart'
      } else if(data === 2 ){
        this.currentChart = 'monthChart'
      }
    },
    //阴影组件传过来点击阴影关闭阴影的方法
    closeShadow(){
      this.shadowShow = false
    },
    //阴影组件传过来的选择商户的方法
    haveSelectMerchant(){
      this.shadowShow = false
    },
    //头部组件传过来的选择商户的方法
    showMerchantSelect(){
      console.log('3333')
      if(this.shadowShow === true){
        this.shadowShow = false
      }else {
        this.shadowShow = true
      }
      console.log(this.shadowShow)
    }
  },
  components:{
    NoData,
    AccountBookHeader,
    AmountAllDate,
    AmountAllWeek,
    AmountAllMonth,
    EChartsCompTestDate,
    EChartsCompTestWeek,
    EChartsCompTestMonth,
    Shadow,
    MerchantIncome
  },

}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .accountBookWrapper
    width 100%
    height 92.5%
    position relative
    // overflow hidden
    .main
      width 100%
      height 88%
      overflow auto
      .chart
        width 100%
        height 100%
    .shadowWrapper
      width 100%
      height 88%
      background: rgba(0,0,0,0.3)
      position absolute
      top 12%
</style>


