<template>
  <div class="header" >
    <img @click="goBack" src="../image/btn_back.png" >
    <a @click="goBack">{{message}}</a>
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
      this.$store.commit("setTransitionName", "slide-left");
      this.$router.back();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.header {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;

  img {
    margin-left: 3%;
  }

  a {
    margin-left: 3%;
    font-size: 24px;
    color: black;
  }
}
</style>


