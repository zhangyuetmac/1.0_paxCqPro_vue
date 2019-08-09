<template>
  <div class="ContactService transitionWrapper"  >
    <div  class="header">
      <img class="headBack" src="../image/btn_back.png" @click="goMinePge">
      <a>联系客服</a> 
    </div> 
    <div class="scanCode">
      <img src="../image/pic_ewm@2x.png">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods:{
    goMinePge(){
      this.$router.back()
      this.$store.commit("setTransitionName", "slide-left");
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.ContactService 
  width: 100%;
  height: 100%;
  // background: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header
    width 100%
    height 15%
    // background red
    display flex
    align-items center
    img 
      margin-left 3%
    a 
     margin-left 3%
     font-size 24px
  .scanCode
    width 100%
    height 55%
    display flex
    justify-content center 
    align-items center

</style>


