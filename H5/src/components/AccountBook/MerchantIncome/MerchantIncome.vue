<template>
  <div class="MerchantIncome">
    <div class="title"> 
      <a>肯德基五角场店</a>
      <span>2019.06~2019.07</span>
    </div>
    <div class="content">
      <div class="left">
        <a>分润(￥)</a>
        <span>10000000.15</span>
      </div>
      <div class="right">
        <div class="item">
          <a>有效金额(￥)</a>
          <span>10000000.15</span>
        </div>
        <div class="item">
          <a>有效金额</a>
          <span>10000000.15</span>
        </div>
        <div class="item">
          <a>撤销金额(￥)</a>
          <span>10000000.15</span>
        </div>
        <div class="item">
          <a>有效金额</a>
          <span>10000000.15</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import "../../../common/stylus/mixin"
.MerchantIncome
  width 90%
  height 150px
  margin-left 5%
  background #FFFFFF
  margin-top 10px
  margin-bottom  10px
  .title
    width 90%
    height 30%
    margin-left 5%
    display flex
    align-items center
    justify-content space-between
    border-bottom solid 1px #F0F0F0
    a 
      color #333333 
      font-size 15px
      font-weight 650
    span 
      color #666666
      font-size 13px
  .content
    width 100%
    height 70%
    display flex
    .left 
      width 40%
      height 100%
      display flex
      align-items center
      flex-direction column
      justify-content center
      a 
        color #333333
        font-size 14px
        margin-top -10px
      span 
        color #306BE6
        font-size 18px
        margin-top 10px
    .right 
      width 60%
      height 100%
      display flex
      flex-wrap wrap
      .item 
        width 50%
        height 50%
        display flex
        align-items center
        justify-content center
        flex-direction column
        a 
          font-size 12px
          margin-top 5px
          color #999999
        span 
          font-size 14px
          margin-top 5px
          color #333333


</style>

