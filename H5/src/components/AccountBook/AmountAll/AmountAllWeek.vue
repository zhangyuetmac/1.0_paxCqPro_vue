<template>
  <div class="amountall">
    <div class="item">
      <a>分润总收益(￥)</a>
      <span>356258.98</span>
    </div>
    <div class="item">
      <a>有效总金额(￥)</a>
      <span>356258.98</span>
    </div>
    <div class="item">
      <a>有效总笔数</a>
      <span>356258.98</span>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
  },
  components:{
  }
}
</script>
<style lang="stylus" scoped>
@import "../../../common/stylus/mixin"
.amountall
  width 100%
  height 16%
  background #347AEA
  display flex
  align-items center
  .item
    height 100%
    flex 1
    display flex
    flex-direction column
    justify-content center
    align-items center
    a 
      opacity 0.7
      font-size 12px
      color #FFFFFF
    span 
      font-size 18px
      color #FFFFFF
      margin-top 7px
			
</style>


