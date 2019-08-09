<template>
  <div class="mineHeader">
    <img @click="goIndexPage" src="./image/icon_arrowleft2@2x.png">
    <a>请选择您的身份</a>
  </div>
</template>
<script>
export default {
  methods:{
    goIndexPage(){
      // this.$router.push({
      //   path:'./Index'
      // })
      this.$router.back()
      this.$store.commit("setTransitionName", "slide-left");
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .mineHeader
    width 100%
    height 15%
    // border solid 1px black
    display flex
    align-items center
    img 
     margin-left 5%
    a 
     font-size 24px
     color #333333
     margin-left 3%
</style>


