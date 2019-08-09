<template>
  <div class="registerHeader">
    <div class="headerBack" @click="goToBack">
      <img v-show="true" src="./image/btn_back.png">
    </div>
    <div class="hello">
      <a>重置登陆密码</a>
    </div>
    <div class="welcome">
      <a>{{passwordMsg}}</a>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    passwordMsg:{
      default: '请输入已绑定的手机号',
      type: String
    }
  },
  methods:{
    goToBack(){
      console.log("111")
      this.$router.back()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .registerHeader
    width 100%
    height 21%
    // background white
    .headerBack
      width 100%
      height 55%
      display flex
      align-items center  
      img 
        margin-left 5.3%
    .hello
      width 100%
      height 23%
      // background red
      display flex
      align-items center
      a
        font-size 24px
        margin-left 5.3%
    .welcome
      width 100%
      height 22%
      // background yellow
      display flex
      align-items center
      a
        font-size 14px
        margin-left 5.3%
</style>


