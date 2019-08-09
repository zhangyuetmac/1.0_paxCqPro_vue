<template>
  <div class="noData">
    <img src="../image/img_no-data.png">
    <a>暂无数据</a>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin'
.noData
  width 50%
  height 50%
  margin-top 100px
  display flex
  align-items center 
  // border solid 1px black
  flex-direction column
  a 
   color #999999 
   margin-top 10px
</style>


