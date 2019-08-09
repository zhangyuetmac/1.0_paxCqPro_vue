<template>
  <div v-show="myLoading" class="toast">
    <img class="toastImg" src="./image/icon_loading.png">
    <a class="toastA">{{myLoadingMsg}}</a>
  </div>
</template>
<script>
export default {
  // data(){
  //   return {
  //     msg:'请输入密码'
  //   }
  // },
  props:{
    myLoadingMsg:{
      default:'图片上传中',
      type: String
    },
    myLoading:{
      default:false,
      type: Boolean
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .toast
    display flex
    flex-direction column
    align-items center
    background rgba(0,0,0,0.50)
    font-size 15px
    padding  5.5px 13px 10.5px 13px
    border-radius 4px
    position absolute
    top 50%
    left 50%
    transform translateX(-50%)
    .toastImg
      margin-top 10px
    .toastA
      margin-top 15px
    a 
      color white

</style>


