<!--门店详情 -->
<template>
  <div class="transitionWrapper">
    <div class="headerWrap">
      <StaffHeader :header='header'></StaffHeader>
    </div>
    
    <div class="termWrap"  ref="mainTopWrapper">
      <div class="ulTop">
        <div class="shop-detail">
        <div class="image-wrapper">
          <div class="statusWrap"><div class="status" v-if="dataList.flag=='1'" >店长</div></div>
          <img  class="image" src="./image/img_staff_detail@2x.png"/>
          <div>(工号{{dataList.id}})</div>
        </div>
        </div>
        <div class="shop-detail">   
          <div class="detail-wrap">
            <div class="title">姓名</div>
            <!-- <div class="content">正常</div> -->
            <div class="content">{{dataList.name}}</div>
            <!-- <div class="content bxz">维修中</div> -->
          </div>
          <div class="detail-wrap">
            <div class="title">手机</div>
            <div class="content">{{dataList.phone}}</div>
          </div>
          <div class="detail-wrap">
            <div class="title">门店</div>
            <div class="content">{{dataList.shopName}}</div>
          </div>
        </div>
        <!-- <div class="shop-detail">
          <div class="detail-wrap">
            <div class="title">联系人</div>
            <div class="content">XXXXXXX</div>
          </div>
          <div class="detail-wrap">
            <div class="title">联系电话</div>
            <div class="content">18521367442</div>
          </div>   
        </div> -->
      </div>
     
    </div>
    
  </div>
</template>

<script>
import StaffHeader from "./StaffHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      header: {
        title: "员工详情",
        icon: false
      },
      dataList: {}
    };
  },

  components: {
    StaffHeader
  },
  mounted() {
    // this.$router
    console.log(this.$route.params.list);
    this.dataList = this.$route.params.list;
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    back() {
      this.$router.push({ path: "/ShopManagement" });
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
        click: true,
        probeType: 3
      });
      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScroll.on("scroll", pos => {
        if (pos.y > 10) {
          // console.log('下拉距离超过10,文本框失去焦点')
          // this._inputBlur();
        } else if (pos.y < -10) {
          // console.log('上拉距离超过10,文本框失去焦点')
          // this._inputBlur();
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  overflow: auto;

  .headerWrap {
    height: 10%;

    .header {
      height: 100%;
    }
  }

  .termWrap {
    height: 90%;
    overflow: hidden;

    .ulTop {
      width: 100%;
    }

    .image-wrapper {
      min-height: 165px;
      display: flex;
      align-items: center;
      background: #FFFFFF;
      border-radius: 2px;
      // margin: 0 20px;
      font-size: 14px;
      color: #999999;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid #ddd;

      .statusWrap {
        display: flex;
        width: 100%;
        // margin-right: 15px;
        // padding: 8px 0;
        justify-content: flex-end;

        .status {
          background: rgba(253, 151, 69, 0.1);
          border-radius: 4px;
          width: 55px;
          height: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #FD9745;
        }
      }

      .image {
        width: 73px;
        height: 73px;
      }
    }

    .slider-wrapper {
      background: #fff;
      display: flex;
      padding: 12px 0 12px 20px;
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      color: #FFFFFF;

      div {
        &:first-child {
          margin-left: 0;
        }

        margin-left: 12px;
        position: relative;

        .slider-title {
          position: absolute;
          z-index: 2;
          color: #fff;
          bottom: 5px;
          margin: 0 auto;
          opacity: 0.9;
          width: 100%;
          text-align: center;
        }
      }
    }

    .shop-detail {
      background: #FFFFFF;
      border-radius: 2px;
      margin: 0 20px;
      padding: 0 16px 0 16px;

      .detail-wrap {
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        height: 56px;
        line-height: 56px;
        border-bottom: 1px solid #F0F0F0;

        &:last-child {
          border-bottom: 1px solid #fff;
        }

        .title {
          font-family: PingFangSC-Medium;
          font-size: 15px;
          color: #333333;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .content {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #666666;

          &.bx {
            color: #F76E6E;
          }

          &.bxz {
            color: #FD9745;
          }

          span {
            color: #FC9030;
          }
        }
      }
    }
  }
}
</style>