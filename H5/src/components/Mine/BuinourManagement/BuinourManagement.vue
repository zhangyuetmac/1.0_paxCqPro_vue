<!-- 店长管理 -->
<template>
  <div class="transitionWrapper">
    <div class="headerWrap" ref="head" :class="[header.title!=''?'':'bg']">
      <BuinourHeader   :header='header' ></BuinourHeader>
      <div class="searchWrap"  >
        <!-- <van-search placeholder="请输入搜索关键词" v-model="searchSn"  :left-icon="searchIcon" /> -->
        <!-- <img :src="searchIcon" class="icon"> -->
        <van-search  class="searchNum"  placeholder="请输入分店名称查找" v-model="searchShop" />
        <!-- <input class="search" type="text" placeholder="请输入终端号" v-model="searchSn"> -->
      </div>
      <!-- <div class="searchWrap" v-else>
        <img src="./image/icon_arrowleft2.png">
        <van-search  class="searchNum"  placeholder="请输入订单号/商户号" v-model="searchSn" />

      </div> -->
    </div>
    
    <div class="main" ref="main"> 
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl" v-if="termList">
          <li class="shopList" v-for="(item,index) in buinourList" :key="index">
            <div class="shopContent">
              <div class="shopTitle">   
                <div class="name">
                  <!-- <div class="resume"></div> -->
                  {{item.shopName}}</div>
                <!-- <div class="status">+100</div> -->
              </div>
              <div class="resumeWrap">
                <img src="./../image/img_shop-manager.png"/>
                <div class="info">
                  <span class="name">{{item.name}} <span class="num">(工号{{item.id}})</span></span>
                  <span class="name mt15">{{item.phone}}</span>
                </div>
                <div class="cancel" @click="cancel(item)">取消委任</div>
                
                <!-- <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div>  -->
    
              </div> 
              <!-- <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
              </div>  -->
            </div>
          </li>
          
          
          
          
        </ul>
        <div class="noMain" v-else>
          <div class="imageWrap"></div> 
          <div class="info">暂无订单信息</div>
        </div>
      </div>
    </div>
    <van-popup class="pop" v-model="showPopup">
      <div class="info">确定要取消</div>
      <div class="info">{{selBuinour.name}}的店长委任吗？</div>
      <div class="btnWrap">
        <div class="btn btn-cancel" @click="cancelbtn">取消</div>
        <div class="btn btn-comfirm" @click="confirmbtn">确定</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import BuinourHeader from "./BuinourHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      termList: true,
      showPopup: false,
      showHeader: true, //上滑
      header: {
        title: "店长管理",
        icon: false
      },
      searchShop: "",
      selBuinour: {},
      buinourList: [
        {
          id: "01",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        },
        {
          id: "02",
          shopName: "肯德基五角场分店",
          name: "张一",
          phone: "13121367442"
        },
        {
          id: "03",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        },
        {
          id: "04",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        },
        {
          id: "05",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        },
        {
          id: "06",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        },
        {
          id: "07",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        },
        {
          id: "08",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        },
        {
          id: "09",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442"
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      if (this.termList) {
        this._initScroll();
      }
    });
  },

  methods: {
    cancel(item) {
      console.log("取消委任");
      this.selBuinour = item;
      this.showPopup = true;
    },
    cancelbtn() {
      console.log("取消");
      this.selBuinour = {};
      this.showPopup = false;
    },
    confirmbtn() {
      console.log(this.selBuinour);
      console.log("确定");
      // this.showPopup = true;
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
        click: true,
        probeType: 3
      });
      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScroll.on("scroll", pos => {
        // console.log(pos);
        if (pos.y > -50) {
          console.log("下拉距离超过-10");

          // this.mainTopScroll.refresh();
          // this._inputBlur();
        } else if (pos.y < -50) {
          console.log("上拉距离超过10,文本框失去焦点");
          // this._inputBlur();

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
    BuinourHeader
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

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
              height: 90px;
              padding: 0 10px;
              align-items: center;

              .info {
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-left: 13px;

                .num {
                  font-size: 13px;
                  color: #999999;
                }

                .name {
                  font-size: 16px;
                  color: #333333;
                }

                .mt15 {
                  margin-top: 15px;
                }
              }

              .cancel {
                border: 1px solid #306BE6;
                border-radius: 22px;
                width: 83px;
                height: 31px;
                font-family: PingFangSC-Medium;
                font-size: 13px;
                color: #306BE6;
                letter-spacing: 1.44px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
              }

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
              // background-image: url('./image/btn_more2.png');
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
          bg-image('./image/img_no-data');
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

  .pop {
    box-sizing: border-box;
    width: 279px;
    height: 174px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    padding: 40px 27px 20px 27px;

    .info {
      margin-bottom: 8px;
      text-align: center;
    }

    .btnWrap {
      display: flex;
      flex: 1;
      justify-items: right;
      justify-content: space-around;
      align-items: center;

      .btn {
        border-radius: 20px;
        width: 105px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 15px;
        border: 1px solid #306BE6;
      }

      .btn-cancel {
        background: #fff;
        color: #306BE6;
      }

      .btn-comfirm {
        background: #306BE6;
        color: #fff;
      }
    }
  }
}
</style>
