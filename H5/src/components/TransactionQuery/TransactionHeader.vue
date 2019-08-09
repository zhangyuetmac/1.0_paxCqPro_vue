<template>
  <div class="header" >
    <div class="left">
      <img src="./image/icon_arrowleft2.png" @click="back()">
      <a v-if="header.title!=''">{{header.title}}</a>
      <!-- <van-search v-else  class="searchNumber"  placeholder="请输入订单号/商户号" v-model="header.searchSn" /> -->
       <div class="searchNumber" v-else >
        <!-- <van-search placeholder="请输入搜索关键词" v-model="searchSn"  :left-icon="searchIcon" /> -->
        <img :src="searchIcon" class="icon">
        <input class="search" type="text" placeholder="请输入订单号/商户号" v-model="header.searchSn">
      </div>
    </div>
    <div class="right" v-if="header.icon" @click="fatherFun">
      <img src="./image/icon_screen@2x.png">
      <!-- <a>报修</a> -->
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
      flag: false,
      searchIcon: require("./image/icon_search@2x.png")
    };
  },
  methods: {
    fatherFun() {
      if (this.flag) {
        this.flag = false;
      }
      this.flag = !this.flag;
      this.$emit("childHead", this.flag, this.header.searchSn);
    },
    back() {
      console.log(JSON.stringify(this.header));
      this.$store.commit("setTransitionName", "slide-left");
      if (this.header.title == "交易详情") {
        this.$router.push({ path: "/TransactionQuery" });
      } else {
        this.$router.push({ path: "/Index" });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

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
      position: relative;

      .icon {
        position: absolute;
        width: 25px;
        height: 25px;
        top: 8px;
        left: 18px;
      }

      .search {
        box-sizing: border-box;
        width: 100%;
        height: 41px;
        line-height: 41px;
        background: #FFFFFF;
        border-radius: 22px;
        // margin-left: 60px;
        padding-left: 50px;
        background: #f8f8f8;
        border-radius: 22px;
      }
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

    img {
      width: 25px;
    }
  }
}
</style>



