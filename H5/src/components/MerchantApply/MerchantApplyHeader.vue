<template>
  <div class="header" >
    <img @click="goBack" src="./image/icon_arrowleft1.png" >
    <a @click="goBack">商户申请</a>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
      this.$store.commit("setTransitionName", "slide-left");
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.header {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;

  img {
    margin-left: 3%;
  }

  a {
    margin-left: 3%;
    font-size: 24px;
    color: #FFFFFF;
  }
}
</style>


