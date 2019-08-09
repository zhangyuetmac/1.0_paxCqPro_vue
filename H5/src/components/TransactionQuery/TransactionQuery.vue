<!-- 交易查询 -->
<template>
  <div class="transitionWrapper">
    <div class="headerWrap" ref="head" :class="[header.title!=''?'':'bg']">
      <TransactionHeader   :header='header' @childHead='popQuery'></TransactionHeader>
      <!-- <div class="searchWrap" v-if="showHeader">
    
        <van-search  class="searchNum"  placeholder="请输入订单号/商户号" v-model="header.searchSn" />
        
      </div> -->
       <div class="searchWrap" v-if="showHeader">
        <!-- <van-search placeholder="请输入搜索关键词" v-model="searchSn"  :left-icon="searchIcon" /> -->
        <img :src="searchIcon" class="icon">
        <input class="search" type="text" placeholder="请输入订单号/商户号" v-model="header.searchSn">
      </div>
      <!-- <div class="searchWrap" v-else>
        <img src="./image/icon_arrowleft2.png">
        <van-search  class="searchNum"  placeholder="请输入订单号/商户号" v-model="searchSn" />

      </div> -->
    </div>
    
    <div class="main" ref="main"> 
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl" v-if="termList">
          <li class="shopList" @click="jumpDetail">
            <div class="shopContent">
              <div class="shopTitle">   
                <div class="name">
                  <!-- <div class="resume"></div> -->
                  扫码消费</div>
                <div class="status">+100</div>
              </div>
              <div class="resumeWrap">
                <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div> 
    
              </div> 
               <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
              </div> 
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            <div class="shopContent">
              <div class="shopTitle">
                
                <div class="name">
                  <!-- <div class="resume"></div> -->
                  消费撤销</div>
                <div class="status  failure">-100</div>
              </div>
              <div class="resumeWrap">
                <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div> 
    
              </div> 
               <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
              </div> 
            </div>
          </li>

          <li class="shopList" @click="jumpDetail">
            <div class="shopContent">
              <div class="shopTitle">
                
                <div class="name">
                  <!-- <div class="resume"></div> -->
                  扫码消费</div>
                <div class="status">+100</div>
              </div>
              <div class="resumeWrap">
                <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div> 
    
              </div> 
               <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
              </div> 
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            <div class="shopContent">
              <div class="shopTitle">
                
                <div class="name">
                  <!-- <div class="resume"></div> -->
                  消费撤销</div>
                <div class="status  failure">-100</div>
              </div>
              <div class="resumeWrap">
                <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div> 
    
              </div> 
               <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
              </div> 
            </div>
          </li>

          <li class="shopList" @click="jumpDetail">
            <div class="shopContent">
              <div class="shopTitle">
                
                <div class="name">
                  <!-- <div class="resume"></div> -->
                  扫码消费</div>
                <div class="status">+100</div>
              </div>
              <div class="resumeWrap">
                <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div> 
    
              </div> 
               <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
              </div> 
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            <div class="shopContent">
              <div class="shopTitle">
                
                <div class="name">
                  <!-- <div class="resume"></div> -->
                  消费撤销</div>
                <div class="status  failure">-100</div>
              </div>
              <div class="resumeWrap">
                <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div> 
    
              </div> 
               <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
              </div> 
            </div>
          </li>
          
          
          
        </ul>
        <div class="noMain" v-else>
          <div class="imageWrap"></div> 
          <div class="info">暂无订单信息</div>
        </div>
      </div>
    </div>
    <van-popup v-model="header.queryShow" class="queryWrapper"  position="top" >
      <div class="queryContent">
        <div class="title">刷新条件</div>
        <div class="time">按时间<span>(支持一年之内数据查询)</span></div>
        <div class="timeWrap">
          <input class="search" type="number" placeholder="如:20190120" v-model="searchStart">
          <div>至</div>
           <input class="search" type="number" placeholder="如:20190720" v-model="searchEnd">
        </div>
        <div class="time">原交易状态</div>
        <div class="content">
          <div :key="index" v-for="(item,index) in transStatusData" class="itemDiv" @click="chooseTransStatus(index)">
            <img v-show="index==selTransStatus&selTransStatus!==''" src='./image/icon_shaixuan_sel.png'/>
            <!-- <img v-show="item.imgSelect" src='./image/icon_shaixuan_sel.png'/> -->
            <a :class="[index==selTransStatus&selTransStatus!==''?'col':'']">{{item.transType}}</a>
          </div>
        </div>
        <div class="time">按交易方式</div>
        <div class="content">
          <div :key="index" v-for="(item,index) in transTypeData" class="itemDiv" @click="chooseTransType(index)">
            <img v-show="index==selTransWay&selTransWay!==''" src='./image/icon_shaixuan_sel.png'/>
            <!-- <img v-show="item.imgSelect" src='./image/icon_shaixuan_sel.png'/> -->
            <a :class="[index==selTransWay&selTransWay!==''?'col':'']">{{item.transType}}</a>
          </div>
        </div>
        <div class="buttom">
          <div class="refresh" @click="reset">
            <a>重置</a>
          </div>
          <div class="sure" @click="transTypeConfirm">
            <a>确认</a>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import TransactionHeader from "./TransactionHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      termList: true,
      showHeader: true, //上滑
      header: {
        title: "交易查询",
        icon: true,
        queryShow: false,
        searchSn: ""
      },
      transTypeData: [
        { transType: "全部", code: "INSTALLMENT", imgSelect: false },
        {
          transType: "微信",
          code: "INSTALLMENT VOID",
          imgSelect: false
        },
        { transType: "支付宝", code: "PREAUTH", imgSelect: false },
        { transType: "翼支付", code: "PREAUTH COMPLETE", imgSelect: false },
        {
          transType: "云闪付",
          code: "PREAUTH COMPLETE ADVICE",
          imgSelect: false
        },
        {
          transType: "荷包支付",
          code: "PREAUTH COMPLETE VOID",
          imgSelect: false
        },
        { transType: "建行", code: "PREAUTH VOID", imgSelect: false },
        { transType: "其他", code: "REFUND", imgSelect: false }
      ],
      transStatusData: [
        { transType: "全部", code: "INSTALLMENT", imgSelect: false },
        {
          transType: "已支付",
          code: "INSTALLMENT VOID",
          imgSelect: false
        },
        { transType: "未完成", code: "PREAUTH", imgSelect: false },
        { transType: "已撤销", code: "PREAUTH COMPLETE", imgSelect: false }
      ],
      selTransWay: "", //交易方式选择
      selTransStatus: "", //交易状态选择
      searchStart: "",
      searchEnd: "",
      searchIcon: require("./image/icon_search@2x.png")
    };
  },
  created() {
    this.$nextTick(() => {
      if (this.termList) {
        this._initScroll();
      }
    });
  },
  watch: {
    showHeader(val, old) {
      console.log(val, old);
      if (val != old) {
        this.mainTopScroll.refresh();
      }
    }
  },
  methods: {
    popQuery(val, sn) {
      console.log(val, sn);
      this.header.queryShow = val;
    },
    jumpDetail() {
      this.$router.push({ path: "/TransactionDetail" });
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
        click: true,
        probeType: 3
      });
      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScroll.on("scroll", pos => {
        console.log(pos);
        if (pos.y > -50) {
          console.log("下拉距离超过-10");
          this.showHeader = true;
          this.$refs.head.style.height = "20%";
          this.$refs.main.style.height = "80%";
          this.header.title = "交易查询";
          // this.mainTopScroll.refresh();
          // this._inputBlur();
        } else if (pos.y < -50) {
          console.log("上拉距离超过10,文本框失去焦点");
          // this._inputBlur();
          this.showHeader = false;
          this.header.title = "";
          this.$refs.head.style.height = "10%";
          this.$refs.main.style.height = "90%";
          // this.mainTopScroll.refresh();
        }
      });
      //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
      /*this.mainTopScroll.on("touchEnd", pos => {
        console.log(pos.y);
        // 下拉动作
        if (pos.y > 50) {
          console.log("下拉刷新成功");
          // this.dropDown = false
        }
        //上拉加载 总高度>下拉的高度+10 触发加载更多
        if (this.scroll.maxScrollY > pos.y + 10) {
          console.log("加载更多");
          //使用refresh 方法 来更新scroll  解决无法滚动的问题
          this.mainTopScroll.refresh();
        }
        console.log(this.scroll.maxScrollY + "总距离----下拉的距离" + pos.y);
      });*/
    },
    chooseTransType(index) {
      console.log(index);
      // this.transTypeData[index].imgSelect = !this.transTypeData[index].imgSelect;
      this.selTransWay = index;
    },
    chooseTransStatus(index) {
      console.log(index);
      this.selTransStatus = index;
    },
    transTypeConfirm() {
      this.header.queryShow = false;
    },
    reset() {
      this.selTransWay = "";
      this.selTransStatus = "";
    }
  },

  components: {
    TransactionHeader
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;

  .headerWrap {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &.bg {
      background: #FFFFFF;
    }

    .header {
      height: 50%;
    }

    .searchWrap {
      width: 90%;
      margin: 0 auto;
      position: relative;

      .icon {
        position: absolute;
        width: 25px;
        height: 25px;
        top: 8px;
        left: 18px;
      }

      .searchNum {
        padding: 0;
        height: 41px;
        line-height: 41px;
        border-radius: 22px;
      }

      /deep/ .van-search__content {
        background: #fff;
        border-radius: 22px;
      }

      .search {
        box-sizing: border-box;
        width: 100%;
        height: 41px;
        line-height: 41px;
        background: #FFFFFF;
        border-radius: 22px;
        // margin-left: 60px;
        padding-left: 60px;
      }
    }
  }

  .main {
    width: 100%;
    height: 80%;

    // margin: 20px 0 0;
    // box-sizing: border-box;
    .mainTop {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      // background: #FFFFFF;
      overflow: hidden;

      .mainTopUl {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .shopList {
          background: #FFFFFF;
          border-radius: 2px;
          width: 100%;
          // margin: 12px 20px 0;
          margin: 6px 0;
          display: flex;
          position: relative;

          .shopImage {
            background: #F7F8F9;
            border-radius: 4px;
            width: 70px;
            height: 70px;
            margin: 14px 11px 14px 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              max-width: 100%;
            }
          }

          .shopContent {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: space-around;

            .shopTitle {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              // margin-bottom: 8px;
              height: 54px;
              line-height: 54px;
              border-bottom: 1px solid #F0F0F0;

              .name {
                font-family: PingFangSC-Medium;
                font-weight: 600;
                font-size: 15px;
                color: #333333;
                margin-left: 15px;

                .resume {
                  border-radius: 50%;
                  border: 2px solid #306BE6;
                  display: inline-block;
                  width: 5px;
                  height: 5px;
                  margin: 0 5px;
                }
              }

              .status {
                color: #306BE6;
                margin-right: 15px;

                &.failure {
                  color: #FD9745;
                }
              }
            }

            .resumeWrap {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #999999;
              letter-spacing: 1px;
              padding: 0 10px;

              .resume-info {
                display: flex;
                flex-direction: row;
                line-height: 37px;
                height: 37px;

                .info {
                  color: #333;
                  letter-spacing: 0;
                }
              }
            }
          }

          .btn-wrap {
            right: 14px;
            bottom: 40%;
            position: absolute;

            .btn-more {
              background-image: url('./image/btn_more2.png');
              background-repeat: no-repeat;
              background-position: center;
              width: 13px;
              height: 13px;
            }
          }
        }
      }

      .noMain {
        margin-top: 20%;

        .imageWrap {
          bg-image('./image/pic_zwddxx');
          min-width: 210px;
          min-height: 170px;
          background-repeat: no-repeat;
          background-position: center;
          margin: 0 auto;
        }

        .info {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #999999;
          letter-spacing: 0.89px;
          text-align: center;
        }
      }
    }
  }

  .queryWrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .queryContent {
      width: 90%;

      .title {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #333333;
        letter-spacing: 1px;
        line-height: 28px;
        margin: 15px 0;
        font-weight: 600;
      }

      .time {
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #333333;
        letter-spacing: 1px;
        line-height: 30px;
        font-weight: 600;

        span {
          color: #999999;
        }
      }

      .timeWrap {
        display: flex;
        align-items: center;
        justify-items: center;

        .search {
          width: 46%;
          background: #F8F8FA;
          border-radius: 2px;
          height: 36px;
          line-height: 36px;
          padding: 0 5px;
          font-size: 13px;
          olor: #333333;
          text-align: center;
        }
      }

      .content {
        width: 100%;
        // border solid 1px black
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .itemDiv {
          width: 30%;
          height: 40px;
          // background red
          margin: 1.5%;
          background: #F8F8FA;
          mixinDisplay();

          img {
            width: 100%;
            height: 100%;
          }

          a {
            display: block;
            position: absolute;
            color: #999999;
            font-size: 13px;
          }

          .col {
            color: #306BE6;
          }
        }
      }

      .buttom {
        width: 100%;
        height: 80px;
        mixinDisplay();

        .refresh {
          width: 36%;
          height: 38px;
          mixinDisplay();
          border-radius: 44px;
          font-size: 15px;
          border: 1px solid #306BE6;

          a {
            color: #306BE6;
          }
        }

        .sure {
          width: 36%;
          height: 40px;
          background: #306BE6;
          mixinDisplay();
          border-radius: 44px;
          margin-left: 5%;
          font-size: 15px;

          a {
            color: #FFFFFF;
          }
        }
      }
    }
  }
}
</style>
