<!--消息通知-->
<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header" @click="back">
        <img src="./../image/btn_back.png" />
        <div>消息通知</div>
      </div>
      <!-- <div class="addShop"   @click="addShop">新增</div> -->
      <!-- <div  @click="addShop1">添加门店</div> -->
    </div>
    <van-tabs v-model="selected" @change="changeTabs" class="tabContent" animated swipeable>
      <van-tab name="yujing">
        <div slot="title" class="titleWrap">
          <div>日活预警</div>
          <div class="title">2</div>
        </div>
        <div class="applyWrap" v-if="merflag=='1'">
          <div class="mainTop" ref="mainTopWrapperShop" v-if="selectedName=='yujing'">
            <ul class="mainTopUl">
              <li v-for="(item,index) in yujingList" :key="index">
                <div class="shopList yujing">
                  <div class="time">{{item.time}}</div>
                  <div class="numWrap">
                    <div>历史平均交易笔数</div>
                    <div class="num">{{item.historyNum}}</div>
                  </div>
                  <div class="numWrap">
                    <div>当前交易笔数</div>
                    <div class="num">{{item.currentNum}}</div>
                  </div>
                </div>
              </li>

              <li :style="{display: alertHook}">
                <!-- 底部提示信息 -->
                <div class="bottom-tip">
                  <span class="loading-hook" v-if="dataFlag">{{pullupMsg}}</span>
                  <span v-else>没有更多数据</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="applyShop" v-else>
          <div class="imageWrap"></div>
          <div class="info">暂无数据</div>
        </div>
      </van-tab>
      <van-tab v-if="$store.state.userCharacter=='4'" name="account">
        <div slot="title" class="titleWrap">
          <div>对账不平</div>
          <div class="title">22</div>
        </div>
        <div class="applyWrap">
          <div class="mainTop" ref="mainTopWrapperShop" v-if="selectedName=='account'">
            <ul class="mainTopUl">
              <!-- 刷新提示信息 -->
              <!-- <li>
                <div class="top-tip">
                  <span class="refresh-hook">{{pulldownMsg}}</span>
                </div>
              </li>-->
              <li v-for="(item,index) in shopList" :key="index">
                <div class="shopList account">
                  <div class="shopContent">
                    <div class="shopTitle">
                      <div class="name">
                        <!-- <div class="resume"></div> -->
                        荷包支付
                      </div>
                      <div class="time">15:26</div>
                    </div>
                    <div class="resumeWrap">
                      <div class="info">
                        <span class="name">通道汇款总额</span>
                        <span class="name num mt15">￥10000</span>
                      </div>
                      <div class="info">
                        <span class="name">平台汇款金额</span>
                        <span class="name num mt15">￥9000</span>
                      </div>
                      <div class="info">
                        <span class="name">差错金额</span>
                        <span class="name num mt15">￥1000</span>
                      </div>

                      <!-- <div class="resume-info"><div>交易类型:</div><div class="info">支付宝</div></div> 
                      <div class="resume-info"><div>门店:</div><div class="info">五角场分店</div></div>-->
                    </div>
                    <!-- <div class="resumeWrap">
                <div class="resume-info"><div>流水号:</div><div class="info">984445</div></div> 
                <div class="resume-info"><div>日期:</div><div class="info">2016.07.03 10:04:00</div></div> 
    
                    </div>-->
                  </div>
                </div>
              </li>
              <li :style="{display: alertHook}">
                <!-- 底部提示信息 -->
                <div class="bottom-tip">
                  <span class="loading-hook" v-if="dataFlag">{{pullupMsg}}</span>
                  <span v-else>没有更多数据</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab name="repair">
        <div slot="title" class="titleWrap">
          <div>商户报修</div>
          <!-- <div class="title">222</div>  -->
          <div class="title lh">...</div>
        </div>
        <div class="applyWrap">
          <div class="mainTop" ref="mainTopWrapperShop" v-if="selectedName=='repair'">
            <!-- 商户报修列表 -->
            <ul class="mainTopUl">
              <li>
                <!-- 刷新提示信息 -->
                <!-- <div class="top-tip">
                    <span class="refresh-hook">{{pulldownMsg}}</span>
                </div>-->
              </li>
              <li v-for="(item,index) in shopList" :key="index">
                <div class="shopList repair">
                  <div class="shopContent">
                    <div class="shopTitle">
                      <div class="name">
                        <!-- <div class="resume"></div> -->
                        {{item.name}}
                      </div>
                      <div
                        class="status"
                        :class="[item.status=='已修复'?'success':item.status=='待维修'?'apply':item.status=='维修中'?'repair':'failure']"
                      >{{item.status}}</div>
                      <div class="time">{{item.time}}</div>
                    </div>
                    <div class="resumeWrap">
                      <div class="wrap">
                        <div class="info">
                          <span class="name">类型：</span>
                          <span class="num">{{item.type}}</span>
                        </div>
                        <div class="info">
                          <span class="name">终端号：</span>
                          <span class="num">{{item.termNo}}</span>
                        </div>
                      </div>
                      <div class="wrap mb10">
                        <div class="info">
                          <span class="name">详情：</span>
                          <span class="num">{{item.info}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li :style="{display: alertHook}">
                <!-- 底部提示信息 -->
                <div class="bottom-tip">
                  <span class="loading-hook" v-if="dataFlag">{{pullupMsg}}</span>
                  <span v-else>没有更多数据</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- alert提示刷新成功 -->
    <!-- <div class="alert-hook" :style="{display: alertHook}">刷新成功</div> -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      role: "4", //4机构显示对账不平 2.代理商3商户
      options: {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          // threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        },
        pullDownRefresh: true,

        pullUpLoad: true,
        //pullDownRefresh: false, //关闭下拉
        //pullUpLoad: false, // 关闭上拉
        click: true,
        probeType: 3,
        startY: 0,
        scrollbar: true
      },
      pulldownMsg: "申请正在审核中，请耐心等待…",
      pullupMsg: "加载更多",
      alertHook: "none",
      selected: "0", //yujing日活预警 account对账不平  repair商户报修
      selectedName: "yujing",

      merflag: "1", //商户是否存在 1--有商户---显示门店列表  0--无商户---去申请
      shopList: [
        {
          name: "来伊份",
          status: "已修复",
          time: "13:16",
          type: "屏幕碎裂",
          termNo: "1234567890",
          info: "打印机卡纸无法打印"
        },
        {
          name: "来伊份-五角场分店",
          status: "待维修",
          time: "昨天",
          type: "屏幕碎裂",
          termNo: "1234567890",
          info: "打印机卡纸无法打印"
        },
        {
          name: "商户名称最多显示到这里",
          status: "维修中",
          time: "星期六",
          type: "屏幕碎裂",
          termNo: "1234567890",
          info: "打印机卡纸无法打印"
        },
        {
          name: "商户名称XXXX",
          status: "报废",
          time: "19/06/12",
          type: "屏幕碎裂",
          termNo: "1234567890",
          info:
            "打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印打印机卡纸无法打印"
        }
      ], //商户报修列表
      yujingList: [
        // { time: "12:15", historyNum: "10000000", currentNum: "100" }
      ],
      accountList: [],
      max: 45,
      current: 0,
      dataFlag: true
    };
  },

  components: {},
  created() {},
  mounted() {
    if (this.merflag == "1") {
      this.getYujingData().then(res => {
        console.log(res);
        this.yujingList = this.yujingList.concat(res);
        this.$nextTick(() => {
          // setTimeout(() => {
          this._initScroll();

          // }, 300);
        });
      });
    }
  },
  watch: {
    selected(val, old) {
      console.log(val, old);

      if (val != old) {
        if (this.$store.state.userCharacter== "4") {
          if (val == "0") {
            this.selectedName = "yujing";
          } else if (val == "1") {
            this.selectedName = "account";
          } else if (val == "2") {
            this.selectedName = "repair";
          }
        } else {
          if (val == "0") {
            this.selectedName = "yujing";
          } else if (val == "1") {
            this.selectedName = "repair";
          }
        }
        if (this.mainTopScrollShop) {
          this.mainTopScrollShop.destroy();
        }

        this.current = 0;
        this.dataFlag = true;
        this.alertHook = "none";

        if (val == "0") {
          this.yujingList = [];
          this.getYujingData().then(res => {
            console.log(res);

            this.yujingList = this.yujingList.concat(res);
            this.$nextTick(() => {
              setTimeout(() => {
                console.log("重新设置滚动");
                this._initScroll();
              }, 500);
            });
          });
        } else {
          // this.shopList = [];
          this.getData().then(res => {
            console.log(res);

            this.shopList = this.shopList.concat(res);
            this.$nextTick(() => {
              setTimeout(() => {
                this._initScroll();
                this.refreshImg();
              }, 300);
            });
          });
        }
      }
    }
  },

  methods: {
    changeTabs(index, title) {
      console.log(index, title);
    },
    getData() {
      return new Promise(resolve => {
        //模拟数据请求
        setTimeout(() => {
          const arr = [];
          for (let i = 1; i <= 10; i++) {
            let o = i + this.current * 10;
            if (o <= this.max) {
              let data = {
                name: "来伊份" + o,
                status: "维修中",
                time: "19/06/12",
                type: "屏幕碎裂",
                termNo: "1234567890",
                info: "打印机卡纸无法打印"
              };
              arr.push(data);
              if (i == 10) {
                ++this.current;
              }
            } else {
              this.dataFlag = false;
              break;
            }
          }
          resolve(arr);
        }, 1000);
      });
    },
    getYujingData() {
      return new Promise(resolve => {
        //模拟数据请求
        setTimeout(() => {
          const arr = [];
          for (let i = 1; i <= 10; i++) {
            let o = i + this.current * 10;
            if (o <= this.max) {
              let data = {
                time: "15:16",
                historyNum: "1000000",
                currentNum: "100" + o
              };
              arr.push(data);
              if (i == 10) {
                ++this.current;
              }
            } else {
              this.dataFlag = false;
              break;
            }
          }
          resolve(arr);
        }, 1000);
      });
    },
    refreshalert() {
      //刷新成功提示
      this.alertHook = "block";
      // setTimeout(() => {
      //   this.alertHook = "none";
      // }, 1000);
    },
    _initScroll() {
      console.log("初始化滚动");
      let that = this;
      /*this.mainTopScrollShop = new BScroll(this.$refs.mainTopWrapperShop, {
        click: true,
        probeType: 3,
        // 上拉加载
        pullUpLoad: {
          // 当上拉距离超过30px时触发 pullingUp 事件
          threshold: -50
        },
        // 下拉刷新
        pullDownRefresh: {
          // 下拉距离超过30px触发pullingDown事件
          threshold: 50,
          // 回弹停留在距离顶部20px的位置
          stop: 20
        }
      });*/
      this.mainTopScrollShop = new BScroll(
        this.$refs.mainTopWrapperShop,
        this.options
      );
      console.log(this.mainTopScrollShop);

      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScrollShop.on("scroll", pos => {
        // console.log(pos);
        // console.log(this.alertHook);
        if (pos.y > 30) {
          console.log("下拉距离超过30");
          // this.pulldownMsg = "释放立即刷新";
          // this.mainTopScroll.refresh();
          // this._inputBlur();
        } else if (
          pos.y < this.mainTopScrollShop.maxScrollY - 30 &&
          this.alertHook == "none"
        ) {
          //上拉加载
          // if (this.scroll.y <= this.scroll.maxScrollY + 50 && this.loading) {
          // }
          // //this.loading 一个设置当前是否加载的开关变量，进行完if判断后置为false，当请求完成后置为true

          // else if (pos.y < -30) {
          //下拉加载

          console.log("派发滚动事件");

          if (this.dataFlag) {
            that.refreshalert();
            this.pullupMsg = "加载中...";
            setTimeout(() => {
              if (this.selected == "0") {
                that.getYujingData().then(res => {
                  console.log(res);
                  //恢复文本值
                  that.pullupMsg = "加载更多";
                  that.yujingList = that.yujingList.concat(res);
                  setTimeout(() => {
                    that.mainTopScrollShop.refresh();
                  }, 20);
                  that.alertHook = "none";
                });
              } else {
                that.getData().then(res => {
                  console.log(res);
                  //恢复文本值
                  that.pullupMsg = "加载更多";
                  that.shopList = that.shopList.concat(res);
                  setTimeout(() => {
                    that.mainTopScrollShop.refresh();
                  }, 20);
                  that.alertHook = "none";
                });
              }
            }, 1000);
          } else {
            that.refreshalert();
          }
        }
      });
      this.mainTopScrollShop.on("touchEnd", pos => {
        // 下拉动作

        console.log(pos);
        if (pos.y > 30) {
          setTimeout(() => {
            console.log("下拉刷新数据");
            that.getData().then(res => {
              //刷新数据
              // that.data = res;
              //恢复刷新提示文本值
              // that.pulldownMsg = "下拉刷新";
              //刷新成功后提示
              // that.refreshalert();
              //刷新列表后，重新计算滚动区域高度
              // that.mainTopScrollShop.refresh();
            });
          }, 2000);
        } else if (
          pos.y < this.mainTopScrollShop.maxScrollY - 30 &&
          this.alertHook == "none"
        ) {
          //上拉加载
          // if (this.scroll.y <= this.scroll.maxScrollY + 50 && this.loading) {
          // }
          // //this.loading 一个设置当前是否加载的开关变量，进行完if判断后置为false，当请求完成后置为true

          // else if (pos.y < -30) {
          //下拉加载

          console.log("派发滚动事件");

          if (this.dataFlag) {
            that.refreshalert();
            this.pullupMsg = "加载中...";
            setTimeout(() => {
              that.getData().then(res => {
                console.log(res);
                //恢复文本值
                that.pullupMsg = "加载更多";
                that.shopList = that.shopList.concat(res);
                setTimeout(() => {
                  that.mainTopScrollShop.refresh();
                }, 20);
                that.alertHook = "none";
              });
            }, 1000);
          } else {
            that.refreshalert();
          }

          // console.log(this.dataFlag);
          // if (!this.dataFlag) {
          //   that.alertHook = "none";
          // }
        }
        /*else if (
          pos.y < this.mainTopScrollShop.maxScrollY + 30 && this.alertHook == "none") {
          //上拉加载
          // if (this.scroll.y <= this.scroll.maxScrollY + 50 && this.loading) {
          // }
          // //this.loading 一个设置当前是否加载的开关变量，进行完if判断后置为false，当请求完成后置为true

          // else if (pos.y < -30) {
          //下拉加载
          //下拉加载
          console.log("加载刷新数据");
          console.log(pos.y);
          console.log(this.mainTopScrollShop.maxScrollY);
          if (this.dataFlag) {
            that.refreshalert();
            this.pullupMsg = "加载中...";
            setTimeout(() => {
              that.getData().then(res => {
                console.log(res);
                //恢复文本值
                that.pullupMsg = "加载更多";
                that.shopList = that.shopList.concat(res);
                setTimeout(() => {
                  that.mainTopScrollShop.refresh();
                }, 20);
                that.alertHook = "none";
              });
            }, 2000);
          } else {
            that.refreshalert();
            setTimeout(() => {
               that.alertHook = "none";
            })
          }
        }*/
      });
      this.mainTopScrollShop.on("pullingUp", () => {
        console.log("处理pullingUp上拉加载操作");
        setTimeout(() => {
          // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
          this.scroll.finishPullUp();
        }, 2000);
      });
      this.mainTopScrollShop.on("pullingDown", () => {
        console.log("处理pullingDown下拉刷新操作");
        setTimeout(() => {
          console.log("下拉事件执行一次");
          // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
          this.mainTopScrollShop.finishPullDown();
        }, 2000);
      });
    },
    pullingDownUp() {
      this.mainTopScrollShop.refresh(); //重新计算元素高度
    },
    addShop1() {
      // alert("添加门店");
      this.$router.push({ path: "/ShopAdd" });
    },
    addShop() {
      // alert("添加门店");
      this.$router.push({ path: "/ShopCreate1" });
    },
    back() {
      this.$store.commit("setTransitionName", "slide-left");
      setTimeout(() => {
        this.$router.push({ path: "/Mine" });
      }, 20);
    },
    apply() {
      this.$router.push({ path: "/MerchantApply" });
    },
    check() {
      this.$router.push({ path: "/shopDetail" });
    },
    //图片加载刷新滚动
    refreshImg() {
      console.log("图片加载是否完成");
      //解决better-scroll因为图片没有下载完导致的滚动条高度不够，无法浏览全部内容的问题。
      //原因是better-scroll初始化是在dom加载后执行，此时图片没有下载完成，导致滚动条高度计算不准确。
      //利用图片的complete属性进行判断，当所有图片下载完成后再对scroll重新计算。
      let img = this.$refs.mainTopWrapperShop.getElementsByTagName("img");

      let count = 0;
      let length = img.length;
      if (length) {
        let timer = setInterval(() => {
          if (count == length) {
            this.mainTopScrollShop.refresh(); //bs提供的刷新的方法，详见官网
            clearInterval(timer);
          } else if (img[count].complete) {
            count++;
          }
        }, 100);
      }
    }
  }
};
</script>
<style>
#app {
  /* min-height: 100%; */
  background: #f8f8fa;
}
</style>

<style lang='stylus' scoped>
@import '../../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  z-index: 500;
  background: #F8F8FA;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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

  .tabHeader {
    width: 100%;
    height: 7%;

    .tab {
      width: 90%;
    }

    /deep/ .mint-navbar .mint-tab-item.is-selected {
      font-family: PingFangSC-Medium;
      border-bottom: 3px solid #306BE6;

      .mint-tab-item-label {
        color: #306BE6;
      }
    }

    /deep/ .mint-tab-item-label {
      font-size: 14px;
      color: #BBBBBB;
    }
  }

  .tabContent {
    width: 100%;
    height: 83%;

    /deep/ .mint-tab-container-wrap {
      height: 100%;
    }

    /deep/ .van-tabs__content {
      height: 100%;
    }

    /deep/ .van-tabs__line {
      background-color: #306BE6;
    }

    /deep/ .van-tab--active {
      color: #306BE6;
    }

    .titleWrap {
      position: relative;

      .title {
        position: absolute;
        left: 80%;
        top: 8px;
        /* width: 23px; */
        height: 16px;
        padding: 0 5px;
        background: #FC4040;
        line-height: 16px;
        color: #fff;
        border-radius: 8px;
        font-family: Helvetica;
        font-size: 12px;

        &.lh {
          line-height: 10px;
        }
      }
    }

    .applyWrap {
      margin-bottom: 12px;
      height: 100%;

      .mainTop {
        height: 100%;
        overflow: hidden;

        .mainTopUl {
          width: 100%;
          box-sizing: border-box;

          li {
            margin: 12px 10px 0;
            box-sizing: border-box;
            border: 1px solid transparent;

            &:last-child {
              margin: 12px 10px 12px;
            }
          }
        }
      }

      .shopList {
        background: #FFFFFF;
        border-radius: 2px;
        display: flex;
        position: relative;

        &.yujing {
          justify-content: space-between;
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #999999;
          height: 89px;
          text-align: center;
          align-items: center;

          .time {
            width: 80px;
            height: 47px;
            display: flex;
            align-items: center;
            border-right: 1px solid #DEDEDE;
            justify-content: center;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
          }

          .numWrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: 47px;
            flex: 1;

            .num {
              font-family: Helvetica;
              font-size: 19px;
              color: #FD9745;
            }
          }
        }

        .shopImage {
          width: 70px;
          height: 70px;
          margin: 14px 11px 14px 12px;
        }

        &.account {
          padding: 0 16px;

          .shopContent {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: space-around;
            margin: 0;

            .shopTitle {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              // margin-bottom: 8px;
              height: 50px;
              line-height: 50px;
              border-bottom: 1px solid #F0F0F0;

              .name {
                font-family: PingFangSC-Medium;
                // font-weight: 600;
                font-size: 15px;
                color: #666666;

                .resume {
                  border-radius: 50%;
                  border: 2px solid #306BE6;
                  display: inline-block;
                  width: 5px;
                  height: 5px;
                  margin: 0 5px;
                }
              }

              .time {
                font-family: SanFranciscoDisplay-Medium;
                font-size: 14px;
                color: #999999;
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
              height: 80px;
              // padding: 0 10px;
              align-items: center;

              .info {
                display: flex;
                flex-direction: column;

                // flex: 1;
                // margin-left: 13px;
                .name {
                  font-family: PingFangSC-Medium;
                  font-size: 13px;
                  color: #999999;
                  text-align: center;
                }

                .num {
                  font-family: SanFranciscoDisplay-Medium;
                  font-size: 19px;
                  color: #FD9745;
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
        }

        &.repair {
          padding: 0 16px;

          @media screen and (max-width: 359px) {
            &.repair {
              padding: 0 8px;
            }
          }

          .shopContent {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: space-around;
            margin: 0;

            .shopTitle {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              // margin-bottom: 8px;
              height: 50px;
              line-height: 50px;
              border-bottom: 1px solid #F0F0F0;

              .name {
                font-family: PingFangSC-Medium;
                // font-weight: 600;
                font-size: 15px;
                color: #666666;
                flex: 1;

                .resume {
                  border-radius: 50%;
                  border: 2px solid #306BE6;
                  display: inline-block;
                  width: 5px;
                  height: 5px;
                  margin: 0 5px;
                }
              }

              .time {
                font-family: SanFranciscoDisplay-Medium;
                font-size: 14px;
                color: #999999;
                width: 60px;
                text-align: center;
              }

              .status {
                width: 55px;
                height: 23px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: PingFangSC-Medium;
                font-size: 12px;
                border-radius: 2px;
              }

              .success {
                background: #EFFAF1; // rgba(239,250,241,0.1);
                color: #78D38C;
              }

              .failure {
                background: #FFF0EC;
                color: #FF6B4A;
              }

              .repair {
                background: #EEF3FF;
                color: #629EFF;
              }

              .apply {
                background: #FEF4EC;
                color: #FD9745;
              }
            }

            .resumeWrap {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #999999;
              letter-spacing: 1px;

              .wrap {
                display: flex;
                justify-content: space-between;
              }

              .mb10 {
                margin-bottom: 10px;
              }

              .info {
                // display: flex;
                margin: 10px 0 5px;

                // flex-direction: column;

                // flex: 1;
                // margin-left: 13px;
                .name {
                  font-family: PingFangSC-Medium;
                  font-size: 13px;
                  color: #999999;
                  text-align: center;
                }

                .num {
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #333333;
                  height: 21px;
                  line-height: 21px;
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
  }

  .applyShop {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .imageWrap {
      bg-image('./../image/img_no-data');
      min-width: 140px;
      min-height: 140px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
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

/* 下拉、上拉提示信息 */
.top-tip {
  // position: absolute;
  // top: 115px;
  // left: 0;
  // z-index: 1;
  width: 100%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 13px;
  color: #666666;
  letter-spacing: 0.9px;
}

.bottom-tip {
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #777;
  background: #f2f2f2;
  // position: absolute;
  // bottom: 10px;
  // left: 0;
}

/* 全局提示信息 */
.alert-hook {
  display: none;
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  background: rgba(7, 17, 27, 0.5);
}
</style>