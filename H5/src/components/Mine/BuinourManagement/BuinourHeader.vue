<template>
  <div class="header" >
    <div class="left">
      <img src="./image/icon_arrowleft2.png" @click="back()">
      <a v-if="header.title!=''">{{header.title}}</a>
      <!-- <van-search v-else  class="searchNumber"  placeholder="请输入分店名称查找" v-model="header.searchSn" /> -->
    </div>
     <div class="right"  @click="goAppoint" >
       <a>委任</a> 
    </div> 
  </div>
</template>
<script>
export default {
  props: {
    header: {}
  },
  data() {
    return {
      flag: false
    };
  },
  methods: {
    goAppoint() {
      this.$router.push({ path: "/BuinourAppoint" });
    },
    back() {
      console.log(JSON.stringify(this.header));
      this.$store.commit("setTransitionName", "slide-left");
      this.$router.push({ path: "/Mine" });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.header {
  width: 90%;
  height: 13%;
  // background: #F8F8FA;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    a {
      font-size: 24px;
    }

    .searchNumber {
      width: 86%;
      border-radius: 22px;
      display: inline-block;
    }

    /deep/ .van-search__content {
      background: #f8f8f8;
      border-radius: 22px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #666666;
  }
}
</style>



