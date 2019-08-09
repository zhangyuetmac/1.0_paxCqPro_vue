<!--门店详情 -->
<template>
  <div class="transitionWrapper">
    <div class="headerWrap">
      <TransactionHeader   :header='header' ></TransactionHeader>
    </div>
    
    <div class="termWrap"  ref="mainTopWrapper">
      <ul class="ulTop">
         
        <li class="image-wrapper">
          <div class="infoWrap">
            <div class="money">￥100</div>
            <div class="info">交易成功</div>
            <!-- <img  class="image" src="./image/pic_picture1@2x.png"/> -->
          </div>
          
         
        </li>
        <li class="shop-detail">   
          <div class="detail-wrap">
            <div class="title">商户名称</div>
            <div class="content">上海市xxxxx有限公司</div>
          </div>
          <div class="detail-wrap">
            <div class="title">商户号</div>
            <div class="content">888888888888</div>
          </div>
          <div class="detail-wrap">
            <div class="title">终端号</div>
            <div class="content">88888888</div>
          </div>
          <div class="detail-wrap">
            <div class="title">所属门店</div>
            <div class="content">
              五角场门店
              <!-- <span>9</span>台 -->
            </div>
          </div>
          <div class="detail-wrap">
            <div class="title">终端号</div>
            <div class="content">88888888</div>
          </div>
          <div class="detail-wrap">
            <div class="title">操作员</div>
            <div class="content">01</div>
          </div>
        </li>
        <li class="shop-detail">
          <div class="detail-wrap">
            <div class="title">交易类型</div>
            <div class="content">扫码消费</div>
          </div>
          <div class="detail-wrap">
            <div class="title">支付方式</div>
            <div class="content">支付宝</div>
          </div>  
          <div class="detail-wrap">
            <div class="title">支付宝账户</div>
            <div class="content">137****0000</div>
          </div> 
          <div class="detail-wrap">
            <div class="title">支付时间</div>
            <div class="content">2015.09.12 16:10:00</div>
          </div>  
          <div class="detail-wrap">
            <div class="title">交易流水号</div>
            <div class="content">000001</div>
          </div>    
        </li>

        <li class="shop-detail">
          <div class="detail-wrap">
            <div class="title">交易类型</div>
            <div class="content">扫码消费</div>
          </div>
          <div class="detail-wrap">
            <div class="title">支付方式</div>
            <div class="content">支付宝</div>
          </div>  
          <div class="detail-wrap">
            <div class="title">支付宝账户</div>
            <div class="content">137****0000</div>
          </div> 
          <div class="detail-wrap">
            <div class="title">支付时间</div>
            <div class="content">2015.09.12 16:10:00</div>
          </div>  
          <div class="detail-wrap">
            <div class="title">交易流水号</div>
            <div class="content">000001</div>
          </div>    
        </li>


      </ul>
     
    </div>
    
  </div>
</template>

<script>
import TransactionHeader from "./TransactionHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      header: {
        title: "交易详情",
        icon: false,
        queryShow: false,
        searchSn: ""
      }
    };
  },

  components: {
    TransactionHeader
  },
  mounted() {
    this.$nextTick(() => {
      console.log("mounted");
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
    display: flex;
    justify-content: center;

    .header {
      height: 100%;
    }
  }

  .termWrap {
    height: 90%;
    overflow: hidden;

    .ulTop {
      width: 100%;
      box-sizing: border-box;

      .image-wrapper {
        width: 100%;

        .infoWrap {
          height: 95px;
          background: #FFFFFF;
          margin: 12px 20px;
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .money {
            font-family: SanFranciscoDisplay-Medium;
            font-size: 24px;
            color: #306BE6;
            letter-spacing: 1px;
          }

          .info {
            margin-top: 5px;
            font-family: SanFranciscoDisplay-Medium;
            font-size: 15px;
            color: #333;
            letter-spacing: 1px;
            font-weight: 600;
          }
        }
      }

      .shop-detail {
        background: #FFFFFF;
        border-radius: 2px;
        margin: 12px 20px;
        padding: 0 16px 0 16px;
        box-sizing: border-box;

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
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #F0F0F0;
          box-sizing: border-box;

          &:last-child {
            border-bottom: 1px solid #fff;
            margin-bottom: 15px;
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

            span {
              color: #FC9030;
            }
          }
        }
      }
    }
  }
}
</style>