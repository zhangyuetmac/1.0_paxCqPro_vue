<!--门店管理-->
<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header" @click="back">
        <img src="./../image/btn_back.png" />
        <div>报修管理</div>
      </div>
      <!-- <div class="addShop" @click="addShop">新增</div> -->
      <!-- <div  @click="addShop1">添加门店</div> -->
    </div>
    <van-tabs v-model="selected" class="tabContent" animated>
      <van-tab title="待维修(12)">
        <div class="applyWrap" v-if="merflag=='1'">
          <div class="mainTop" ref="mainTopWrapperShop" v-if="selected=='0'">
            <ul class="mainTopUl">
              <li v-for="(item,index) in shopList" @click="check" :key="index">
                <div class="shopTitle">
                  <div class="name">
                    <!-- <div class="resume"></div> -->
                    终端号:11123459
                  </div>

                  <div class="time">2019.06.16</div>
                </div>
                <div class="shopList">
                  <div class="shopImage">
                    <!-- <div class="status bx">已报修</div> -->
                    <img src="./image/icon_terminal.png" />
                  </div>

                  <div class="shopContent">
                    <div class="shopTitle1">
                      <div class="dk">门店:</div>
                      <div class="name">门店名称1111啊大大仨吃撒吃啥大餐sad</div>
                      <!-- <div class="status  failure"></div> -->
                    </div>
                    <div class="address">
                      <div class="add">原因: 肯德基-大宁店爱上大大大大啊啊大大</div>
                    </div>
                  </div>
                  <div class="repair" @click.stop="repair">维修</div>
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
          <div class="info mt12">暂无需要维修的终端</div>
        </div>
      </van-tab>
      <van-tab title="维修中(123)">
        <div class="applyWrap" v-if="merflag=='1'">
          <div class="mainTop" ref="mainTopWrapperShop" v-if="selected=='1'">
            <ul class="mainTopUl">
              <!-- <li   @click="check">
                <div     class="shopList">
                   <img class="shopImage" src="./image/img_door-header_main.png"/> 
                  <div class="shopContent">
                    <div class="shopTitle">
                      <div class="name">门店名称1111</div>
                      <div class="status  failure"></div>
                    </div>
                    <div class="address">
                      <div class="add">上海市长宁区延安西路500号嘉宁国际大厦22楼</div> 
          
                    </div> 
                  </div>
                  <div class="btn-wrap">
                    <div class="btn-more"></div>
                  </div>
                </div>
               
              </li>-->
              <!-- 刷新提示信息 -->

              <li v-for="(item,index) in shopList" @click="check" :key="index">
                <div class="shopTitle">
                  <div class="name">
                    <!-- <div class="resume"></div> -->
                    终端号:11123459
                  </div>

                  <div class="time">2019.06.16</div>
                </div>
                <div class="shopList">
                  <div class="shopImage">
                    <!-- <div class="status bx">已报修</div> -->
                    <img src="./image/icon_terminal.png" />
                  </div>

                  <div class="shopContent">
                    <div class="shopTitle1">
                      <div class="dk">门店:</div>
                      <div class="name">门店名称1111啊大大仨吃撒吃啥大餐sad</div>
                      <!-- <div class="status  failure"></div> -->
                    </div>
                    <div class="address">
                      <div class="add">原因: 肯德基-大宁店爱上大大大大啊啊大大</div>
                    </div>
                  </div>
                  <div class="repair" @click.stop="finished">完成</div>
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
          <div class="info mt12">暂无维修中终端</div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- alert提示刷新成功 -->
    <!-- <div class="alert-hook" :style="{display: alertHook}">刷新成功</div> -->

    <van-popup class="pop center" v-model="show">
      <img src="./image/icon_success.png" />
      <div class="info1">终端维修完成</div>
      <!-- <div class="info2">请通知该员工尽快修改密码</div> -->
      <!-- <div class="btnWrap">
        
        <div class="btn btn-comfirm" @click="confirmReset">确定</div>
      </div>-->
    </van-popup>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      role: "3", //1机构2代理商3商户
      show: false,
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
      selected: "0",
      checkFlag: "1", // 1 报修管理--终端详情标志

      merflag: "1", //商户是否存在 1--有商户---显示门店列表  0--无商户---去申请
      shopList: [],
      max: 45,
      current: 0,
      dataFlag: true
    };
  },

  components: {},
  created() {
    console.log(this.$route.params.selected);
    if (this.$route.params.selected != undefined) {
      this.selected = this.$route.params.selected;
    }
  },
  mounted() {
    if (this.merflag == "1") {
      this.getData().then(res => {
        console.log(res);

        this.shopList = this.shopList.concat(res);
        this.$nextTick(() => {
          // setTimeout(() => {
          this._initScroll();
          this.refreshImg();
          // }, 300);
        });
      });
    }
  },
  watch: {
    selected(val, old) {
      console.log(val, old);
      if (val != old) {
        //0审核失败 1审核成功  2审核中
        // if (val == "0") {
        //   this.checkFlag = "1";
        // } else if (val == "1") {
        //   this.checkFlag = "2";
        // } else if (val == "2") {
        //   this.checkFlag = "0";
        // }
        if (this.mainTopScrollShop) {
          this.mainTopScrollShop.destroy();
        }

        this.current = 0;
        this.dataFlag = true;
        this.alertHook = "none";
        this.shopList = [];
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
      // if (val == "0") {

      // }
    }
  },

  methods: {
    getData() {
      return new Promise(resolve => {
        //模拟数据请求
        setTimeout(() => {
          const arr = [];
          for (let i = 1; i <= 10; i++) {
            let o = i + this.current * 10;
            if (o <= this.max) {
              let data = {
                name: "门店名称" + o,
                address: "上海市长宁区延安西路500号嘉宁国际大厦22楼" + o
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

    back() {
      this.$store.commit("setTransitionName", "slide-left");
      // setTimeout(() => {
      this.$router.push({ path: "/Mine" });
      // }, 20);
    },

    check(item) {
      this.$router.push({
        name: "TerminalDetail",
        params: {
          titleObj: {
            title: "终端详情",
            icon: false,
            flag: this.checkFlag,
            routeName: "/RepairManagement"
          }
        }
      });
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
    },
    repair() {
      this.selected = "1";
    },
    finished() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
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
            margin: 12px 20px 0;
            box-sizing: border-box;
            border: 1px solid transparent;
            background: #fff;

            &:last-child {
              margin: 12px 20px 12px;
            }

            .shopTitle {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              // margin-bottom: 8px;
              height: 50px;
              line-height: 50px;
              border-bottom: 1px solid #F0F0F0;
              margin: 0 16px;

              .name {
                font-family: PingFangSC-Medium;
                // font-weight: 600;
                font-size: 15px;
                color: #333333;

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
                font-family: SanFranciscoDisplay-Regular;
                font-size: 13px;
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

            .shopList {
              background: #FFFFFF;
              border-radius: 2px;
              display: flex;
              margin: 0 16px;
              align-items: center;

              .shopImage {
                background: #F7F8F9;
                border-radius: 4px;
                width: 70px;
                height: 70px;
                margin: 14px 11px 14px 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                img {
                  max-width: 100%;
                }
              }

              .shopContent {
                display: flex;
                width: 50%;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                margin-right: 5px;
                height: 60px;

                .shopTitle1 {
                  display: flex;
                  flex-direction: row;
                  font-family: PingFangSC-Medium;
                  font-size: 13px;
                  color: #666666;

                  .dk {
                    width: 35px;
                  }

                  .name {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                }

                .address {
                  display: flex;
                  flex-direction: row;
                  margin-bottom: 5px;

                  .add {
                    font-family: PingFangSC-Medium;
                    font-size: 13px;
                    // flex: 1 1 auto;
                    color: #666666;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
              }

              .repair {
                background: #306BE6;
                border-radius: 18px;
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #FFFFFF;
                width: 70px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
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
      bg-image('./image/pic_zwzd');
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