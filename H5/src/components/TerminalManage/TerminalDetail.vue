<!--门店详情 -->
<template>
  <div class="transitionWrapper">
    <div class="headerWrap">
      <TerminalHeader :header="header"></TerminalHeader>
    </div>

    <div class="termWrap" ref="mainTopWrapper">
      <div class="ulTop">
        <div class="image-wrapper">
          <img class="image" src="./image/pic_picture1@2x.png" />
        </div>
        <div class="shop-detail" v-if="header.flag=='1'">
          <div class="detail-wrap">
            <div class="title">终端状态</div>
            <!-- <div class="content">正常</div> -->
            <div class="content bx">已报修,待维修</div>
            <!-- <div class="content bxz">维修中</div> -->
          </div>
          <div class="detail-wrap">
            <div class="title">报修时间</div>
            <div class="content">2019-09-01 12:20:20</div>
          </div>
          <div class="detail-wrap">
            <div class="title">报修人</div>
            <div class="content">13789898989</div>
          </div>
          <div class="detail-wrap row">
            <div class="reason">
              <div class="title">报修原因</div>
              <div class="content">其他</div>
            </div>

            <div class="info">屏幕破碎破碎破碎破碎破碎破碎破碎破碎</div>
          </div>
        </div>
        <div class="shop-detail">
          <div class="detail-wrap" v-if="header.flag!='1'">
            <div class="title">终端状态</div>
            <!-- <div class="content">正常</div> -->
            <div class="content bx">已报修,待维修</div>
            <!-- <div class="content bxz">维修中</div> -->
          </div>
          <div class="detail-wrap">
            <div class="title">终端型号</div>
            <div class="content">A920</div>
          </div>
          <div class="detail-wrap">
            <div class="title">终端号</div>
            <div class="content">88888888</div>
          </div>
          <div class="detail-wrap">
            <div class="title">终端SN</div>
            <div class="content">
              12345678
              <!-- <span>9</span>台 -->
            </div>
          </div>
          <div class="detail-wrap">
            <div class="title">所属厂商</div>
            <div class="content">百富</div>
          </div>
          <div class="detail-wrap">
            <div class="title">所属门店</div>
            <div class="content">肯德基-大宁店</div>
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
        </div>-->
      </div>
    </div>
    <div class="btn" v-if="header.flag=='1'&&flag=='0'" @click="repair">维修</div>
    <div class="btn" v-if="header.flag=='1'&&flag=='1'" @click="finished">完成</div>
    <van-popup class="pop center" v-model="show">
      <img src="./../Mine/RepairManagement/image/icon_success.png" />
      <div class="info1">终端维修完成</div>
      <!-- <div class="info2">请通知该员工尽快修改密码</div> -->
      <!-- <div class="btnWrap">
        
        <div class="btn btn-comfirm" @click="confirmReset">确定</div>
      </div>-->
    </van-popup>
  </div>
</template>

<script>
import TerminalHeader from "./TerminalHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      role: "1", //1机构2代理商3商户
      header: {
        title: "终端详情",
        icon: false,
        flag: "0" // 1.报修管理--终端详情   0.终端管理--终端详情
      },
      flag: "0", //0维修1维修完成
      show: false
    };
  },

  components: {
    TerminalHeader
  },
  created() {
    console.log(this.$route.params.titleObj);
    if (this.$route.params.titleObj != undefined) {
      this.header = Object.assign({}, this.$route.params.titleObj);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    repair() {
      this.flag = "1";
    },
    finished() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
        this.$router.push({
          name: "RepairManagement",
          params: { selected: "1" }
        });
      }, 3000);
    },
    back() {
      this.$router.push({ path: "/ShopManagement" });
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
        click: true,
        probeType: 3
      });
      console.log(this.mainTopScroll);
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
    height: 75%;
    overflow: hidden;

    .ulTop {
      width: 100%;
    }

    .image-wrapper {
      min-height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border-radius: 2px;
      margin: 12px 20px;
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
      margin: 12px 20px;
      padding: 0 16px 0 16px;

      .status {
        border-bottom: 1px solid #ddd;
        padding: 8px 0;
        display: flex;
        justify-content: space-between;

        .check {
          border-radius: 2px;
          width: 60px;
          height: 23px;
          line-height: 23px;
          text-align: center;
          font-family: PingFangSC-Medium;
          font-size: 12px;
          font-weight: 600;
        }

        .review {
          background: rgba(65, 186, 95, 0.1);
          color: #41BA5F;
        }

        .failure {
          color: #F76E6E;
          background: rgba(247, 110, 110, 0.1);
        }

        .reason {
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #999999;
          text-align: right;
          font-weight: 600;
          padding-top: 2px;
        }
      }

      .detail-wrap {
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        // height: 56px;
        line-height: 56px;
        border-bottom: 1px solid #F0F0F0;

        &.row {
          flex-direction: column;
        }

        &:last-child {
          border-bottom: 1px solid #fff;
        }

        .reason {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .info {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #999999;
          letter-spacing: 1px;
          line-height: 20px;
          padding-bottom: 18px;
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

  .btn {
    background: #306BE6;
    border-radius: 45px;
    margin: 24px 20px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: PingFangSC-Medium;
    font-size: 16px;
  }
}

.pop {
  display: flex;
  flex-direction: column;
  width: 179px;
  height: 150px;
  justify-content: center;
  align-items: center;

  .info1 {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    margin-top: 15px;
    letter-spacing: 1px;
  }
}
</style>