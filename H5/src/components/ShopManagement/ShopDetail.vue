<!--门店详情 -->
<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header" @click="back">
        <img src="./image/btn_back.png" />
        <div>肯德基-长宁店</div>
      </div>
      <div class="addShop" v-if="checkFlag!='2'" @click="editShop">编辑</div>
      <!-- <div  @click="addShop1">添加门店</div> -->
    </div>

    <div class="applyShop" v-if="checkFlag=='2'">
      <div class="imageWrap"></div>
      <div class="info mt12">申请正在审核中，请耐心等待</div>
      <!-- <div class="info">1.您可以通过申请代理商进行门店管理</div>
      <div class="info">2.您还可以联系您的代理商进行门店管理</div>-->
      <div class="apply" @click="changeFlag">查看详情</div>
    </div>
    <div class="detailWrapper" ref="mainTopWrapper" v-else>
      <ul class="ulTop">
        <!-- <div class="image-wrapper">
            <div class="back" @click="back"></div>
            <img  class="image" src="./image/img_door-header_main@2x.png"/>
         
        </div>-->
        <li class="horizonWrap" ref="personWrap">
          <ul class="ulHorizon" ref="personTab">
            <li class="slider-wrapper">
              <div>
                <img src="./image/pic_door1@2x.png" alt="门头图" />
                <div class="slider-title">门头图</div>
              </div>
            </li>
            <li class="slider-wrapper">
              <div>
                <img src="./image/pic_door1@2x.png" alt="收银台图" />
                <div class="slider-title">收银台图</div>
              </div>
            </li>
            <li class="slider-wrapper">
              <div>
                <img src="./image/pic_door1@2x.png" alt="产品图" />
                <div class="slider-title">产品图</div>
              </div>
            </li>
            <li class="slider-wrapper">
              <div>
                <img src="./image/pic_door1@2x.png" alt="场所图" />
                <div class="slider-title">场所图</div>
              </div>
            </li>
          </ul>
        </li>
        <li class="address-wrap">
          <img src="./image/icon_address@2x.png" />
          <div class="address">上海市长宁区延安西路500号嘉宁国际大厦22楼</div>
        </li>

        <li class="shop-detail">
          <!-- <div class="status" v-if="checkFlag='0'">
            <div class="check review">审核中</div>
            <div class="check failure">审核失败</div>
            <div class="reason">XXXXXXXXXXX失败原因</div>
          </div>-->
          <div class="detail-wrap">
            <div class="title">所属商户</div>
            <div class="content">XXXXXXXX</div>
          </div>
          <div class="detail-wrap">
            <div class="title">门店简称</div>
            <div class="content">肯德基-长宁路店</div>
          </div>
          <div class="detail-wrap">
            <div class="title">门店产权</div>
            <div class="content">租赁</div>
          </div>
          <div class="detail-wrap">
            <div class="title">经营类型</div>
            <div class="content">实体</div>
          </div>
          <div class="detail-wrap">
            <div class="title">行业类别</div>
            <div class="content">餐饮</div>
          </div>
          <div class="detail-wrap">
            <div class="title">MCC码</div>
            <div class="content">XXXXXX</div>
          </div>
          <div class="detail-wrap">
            <div class="title">经营时间</div>
            <div class="content">9:00-22:00</div>
          </div>
          <div class="detail-wrap">
            <div class="title">门店终端</div>
            <div class="content">
              <span>9</span>台
            </div>
          </div>
          <div class="detail-wrap">
            <div class="title">门店店员</div>
            <div class="content">5人</div>
          </div>
        </li>
        <li class="shop-detail">
          <div class="detail-wrap">
            <div class="title">联系人</div>
            <div class="content">XXXXXXX</div>
          </div>
          <div class="detail-wrap">
            <div class="title">联系类型</div>
            <div class="content">财务</div>
          </div>
          <div class="detail-wrap">
            <div class="title">联系电话</div>
            <div class="content">18521367442</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      checkFlag: "1", //状态0审核失败 1审核成功  2审核中
      status: "0"
    };
  },
  created() {
    console.log(this.$route.params.flag);
    this.checkFlag = this.$route.params.flag;
    if (this.checkFlag == "0") {
      this.editShop();
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log("mounted");
      if (this.checkFlag == "1") {
        this.refreshImg();
        this.personScroll();

        setTimeout(() => {
          this._initScroll();
        }, 20);
      }
    });
  },
  watch: {
    checkFlag(val, old) {
      console.log(val);
      if (val == "1") {
        setTimeout(() => {
          this.personScroll();
          this._initScroll();
          this.refreshImg();
        }, 20);
      }
    }
  },
  components: {},

  methods: {
    back() {
      this.$store.commit("setTransitionName", "slide-left");
      this.$router.push({ path: "/ShopManagement" });
    },
    editShop() {
      // alert("添加门店");
      this.$router.push({
        name: "ShopCreate1",
        params: { title: "门店详情", routeName: "ShopManagement" }
      });
    },
    //图片加载刷新滚动
    refreshImg() {
      console.log("图片加载是否完成");
      //解决better-scroll因为图片没有下载完导致的滚动条高度不够，无法浏览全部内容的问题。
      //原因是better-scroll初始化是在dom加载后执行，此时图片没有下载完成，导致滚动条高度计算不准确。
      //利用图片的complete属性进行判断，当所有图片下载完成后再对scroll重新计算。
      let img = this.$refs.mainTopWrapper.getElementsByTagName("img");
      let count = 0;
      let length = img.length;
      if (length) {
        let timer = setInterval(() => {
          if (count == length) {
            this.mainTopScroll.refresh(); //bs提供的刷新的方法，详见官网
            clearInterval(timer);
          } else if (img[count].complete) {
            console.log(img[count]);
            console.log(img[count].complete);
            count++;
          }
        }, 100);
      }
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
    },
    //横向滚动
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为185px
      let width = 1 * 280 + 3 * 272 + 20; //20最后的margin-right值
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    changeFlag() {
      // this.checkFlag = "1";
      this.$router.push({
        name: "ShopCreate1",
        params: {
          title: "门店详情",
          checkFlag: this.checkFlag,
          routeName: "ShopManagement"
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  overflow: auto;
  z-index: 550;

  .head {
    width: 100%;
    height: 10%;
    line-height: 5%;
    background: #F8F8FA;
    display: flex;

    .header {
      height: 100%;
      display: flex;
      align-items: center;
      flex: 1 1 auto;

      img {
        margin-left: 3%;
      }

      div {
        margin-left: 3%;
        font-size: 24px;
        color: #333;
        font-family: PingFangSC-Medium;
      }
    }

    .addShop {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      // color: #306BE6;
      color: #666666;
      margin: auto;
      margin-right: 20px;
    }
  }

  .detailWrapper {
    width: 100%;
    height: 90%;
    overflow: hidden;

    .ulTop {
      width: 100%;
      box-sizing: border-box;

      .image-wrapper {
        min-height: 225px;
        position: relative;

        .image {
          width: 100%;
          height: 100%;
        }

        .back {
          background-image: url('./image/btn_back2.png');
          position: absolute;
          top: 37px;
          left: 10px;
          width: 31px;
          height: 31px;
          z-index: 1;
        }
      }

      .address-wrap {
        display: flex;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #666666;
        margin: 12px 20px 20px;
        box-sizing: inherit;
        align-items: center;

        img {
          // width: 17px;
          // height: 17px;
          opacity: 0.9;
        }

        .address {
          margin-left: 5px;
          margin-top: 2px;
          color: #666666;
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .ulHorizon {
        display: flex;

        .slider-wrapper {
          box-sizing: inherit;
          background: #fff;
          display: flex;
          padding: 0 0 0 12px;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: #FFFFFF;

          &:first-child {
            padding: 0 0 0 20px;
          }

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
              top: 16px;
              right: 0px;
              margin: 0 auto;
              height: 30px;
              line-height: 30px;
              width: 71px;
              text-align: center;
              opacity: 0.7;
              background: #000000;
              border-radius: 100px 0 0 100px;
            }

            img {
              width: 260px;
            }
          }
        }
      }

      .shop-detail {
        box-sizing: inherit;
        background: #FFFFFF;
        border-radius: 2px;
        margin: 12px 20px;
        padding: 0 16px;

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
          height: 55px;
          line-height: 55px;
          border-bottom: 1px solid #F0F0F0;

          &:last-child {
            border-bottom: none;
          }

          .title {
            font-weight: 600;
          }

          .content {
            color: #666666;
            text-align: right;
            font-weight: 600;

            span {
              color: #FC9030;
            }
          }
        }
      }
    }
  }

  .applyShop {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .imageWrap {
      bg-image('./image/pic_sqzzsh');
      min-width: 140px;
      min-height: 140px;
      background-repeat: no-repeat;
      background-position: center;
      margin: 0 auto;
    }

    .info {
      text-align: center;
      font-size: 15px;
      font-family: PingFangSC-Medium;
      color: #666666;
      line-height: 18px;

      &.mt12 {
        margin-bottom: 12px;
      }
    }

    .apply {
      background: #306BE6;
      border-radius: 45px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-family: PingFangSC-Medium;
      font-size: 17px;
      color: #FFFFFF;
      text-align: center;
      margin: 110px 30px 0 30px;
    }
  }
}
</style>