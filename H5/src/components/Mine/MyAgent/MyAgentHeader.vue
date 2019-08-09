<template>
  <div class="header" >
    <div class="left">
      <img @click="goBack" src="../image/btn_back.png" > 
      <a @click="goBack">我的代理商</a>
    </div>
    <div class="right">
      <img src="../image/icon_search.png" > 
      <a @click="goAgentApplyPage">新增</a>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    message:{
      type:String,
      default:'默认值'
    }
  },
  methods: {
    goBack() {
      this.$router.push({path:'/Mine'});
      this.$store.commit("setTransitionName", "slide-left");
    },
    goAgentApplyPage(){
      this.$router.push({path:'/AgentApply'});
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.header 
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content space-between
  .left
    display flex
    align-items: center;
    width: 50%;
    height: 100%;
    margin-left 5%
    a 
      margin-left: 3%;
      font-size: 24px;
      color: black;
  .right
    display flex
    align-items: center;
    justify-content center
    width: 30%;
    height: 100%;
    a 
      margin-left: 5%;
      font-size: 16px;
      color: #666666;
</style>


