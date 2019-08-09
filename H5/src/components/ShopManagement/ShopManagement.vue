<!--门店管理-->
<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header" @click="back">
        <img src="./image/btn_back.png" />
        <div>门店管理</div>
      </div>
      <div class="addShop" @click="addShop">新增</div>
      <!-- <div  @click="addShop1">添加门店</div> -->
    </div>
    <van-tabs v-model="selected" class="tabContent" v-if="merflag=='1'" animated>
      <van-tab title="审核通过(12)">
        <div class="applyWrap">
          <div class="mainTop" ref="mainTopWrapperShop" v-if="selected=='0'">
            <ul class="mainTopUl">
              <li v-for="(item,index) in shopList" @click="check(item)" :key="index">
                <div class="shopList">
                  <img class="shopImage" src="./image/img_door-header_main.png" />
                  <div class="shopContent">
                    <div class="shopTitle">
                      <div class="name">{{item.name}}</div>
                      <!-- <div class="status  failure"></div> -->
                    </div>
                    <div class="address">
                      <div class="add">{{item.address}}</div>
                    </div>
                  </div>
                  <div class="btn-wrap">
                    <div class="btn-more"></div>
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
      <van-tab title="审核中(123)">
        <div class="applyWrap">
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
              <li v-if="$store.state.userCharacter=='3'">
                <div class="top-tip">
                  <span class="refresh-hook">{{pulldownMsg}}</span>
                </div>
              </li>
              <li v-for="(item,index) in shopList" @click="check(item)" :key="index">
                <div class="shopList">
                  <img class="shopImage" src="./image/img_door-header_main.png" />
                  <div class="shopContent">
                    <div class="shopTitle">
                      <div class="name">{{item.name}}</div>
                      <!-- <div class="status  failure"></div> -->
                    </div>
                    <div class="address">
                      <div class="add">{{item.address}}</div>
                    </div>
                  </div>
                  <div class="btn-wrap">
                    <div class="btn-more"></div>
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
      <van-tab title="审核失败(12)">
        <div class="applyWrap">
          <div class="mainTop" ref="mainTopWrapperShop" v-if="selected=='2'">
            <!-- 内容列表 -->
            <ul class="mainTopUl">
              <!-- 刷新提示信息 -->
              <li v-if="$store.state.userCharacter=='3'">
                <div class="top-tip">
                  <span class="refresh-hook">审核失败，您可以联系您的代理商进行确认</span>
                </div>
              </li>
              <li v-for="(item,index) in shopList" @click="check(item)" :key="index">
                <div class="shopList">
                  <img class="shopImage" src="./image/img_door-header_main.png" />
                  <div
                    class="shopContent"
                    :class="[$store.state.userCharacter=='4'?'role-jigou':'']"
                  >
                    <div class="shopTitle">
                      <div class="name">{{item.name}}</div>
                      <!-- <div class="status  failure"></div> -->
                    </div>
                    <div class="address">
                      <div class="add">{{item.address}}</div>
                    </div>
                  </div>
                  <div class="btn-wrap">
                    <div class="modify" v-if="$store.state.userCharacter=='4'">去修改</div>
                    <div class="btn-more"></div>
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

    <div class="applyShop" v-else>
      <div class="imageWrap"></div>
      <div class="info mt12">暂无门店信息</div>
      <div class="info">1.您可以通过申请代理商进行门店管理</div>
      <div class="info">2.您还可以联系您的代理商进行门店管理</div>
      <!-- <div class="apply" @click="apply">去申请</div> -->
    </div>
    <!-- alert提示刷新成功 -->
    <!-- <div class="alert-hook" :style="{display: alertHook}">刷新成功</div> -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      role: this.$store.state.userCharacter, // 2代理商3商户4机构
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
      checkFlag: "1", //0审核失败 1审核成功  2审核中

      merflag: "1", //商户是否存在 1--有商户---显示门店列表  0--无商户---去申请
      shopList: [],
      max: 45,
      current: 0,
      dataFlag: true
    };
  },

  components: {},
  created() {},
  mounted() {
    console.log(this.$store.state.userCharacter);
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
  },
  watch: {
    selected(val, old) {
      console.log(val, old);
      if (val != old) {
        //0审核失败 1审核成功  2审核中
        if (val == "0") {
          this.checkFlag = "1";
        } else if (val == "1") {
          this.checkFlag = "2";
        } else if (val == "2") {
          this.checkFlag = "0";
        }
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
      // setTimeout(() => {
      // this.$router.push({ path: "/Mine" });
      this.$router.back();
      // }, 20);
    },
    apply() {
      this.$router.push({ path: "/MerchantApply" });
    },
    check(item) {
      if (this.checkFlag == "0") {
        this.$router.push({
          name: "ShopCreate1",
          params: {
            title: "门店详情",
            flag: this.checkFlag,
            routeName: "ShopManagement"
          }
        });
      } else {
        this.$router.push({
          name: "ShopDetail",
          params: { flag: this.checkFlag }
        });
      }
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
@import '../../common/stylus/mixin';

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

            &:last-child {
              margin: 12px 20px 12px;
            }
          }
        }
      }

      .shopList {
        background: #FFFFFF;
        border-radius: 2px;
        display: flex;
        position: relative;

        .shopImage {
          width: 70px;
          height: 70px;
          margin: 14px 11px 14px 12px;
        }

        .shopContent {
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: space-between;
          flex: 1 1 auto;
          margin: 13px 0 14px 0;

          .shopTitle {
            display: flex;
            flex-direction: row;

            .name {
              font-family: PingFangSC-Medium;
              font-weight: 600;
              font-size: 15px;
              margin-top: 3px;
              color: #333333;
              flex: 1 1 auto;
              margin-top: 12px;
            }

            .status {
              width: 59px;
              height: 23px;
              margin: 0 18px 0 0;
              background-repeat: no-repeat;
              background-position: center;
            }

            .success {
              background-image: url('./image/icon_audit-failure.png');
            }

            .failure {
              background-image: url('./image/icon_auditing.png');
            }
          }

          .address {
            display: flex;
            flex-direction: row;
            margin-bottom: 5px;

            .add {
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #666666;
              width: 80%;
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
  }

  .applyWrap {
    margin-bottom: 12px;

    // height: 100%;
    .mainTop {
      // height: 100%;
      // overflow: hidden;
    }

    .shopList {
      background: #FFFFFF;
      border-radius: 2px;
      // margin: 12px 20px 0;
      display: flex;
      position: relative;

      .shopImage {
        width: 70px;
        height: 70px;
        margin: 14px 11px 14px 12px;
      }

      .shopContent {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        flex: 1 1 auto;
        margin: 13px 0 14px 0;

        &.role-jigou {
          margin-right: 40px;
        }

        .shopTitle {
          display: flex;
          flex-direction: row;

          .name {
            font-family: PingFangSC-Medium;
            font-weight: 600;
            font-size: 15px;
            margin-top: 3px;
            color: #333333;
            flex: 1 1 auto;
            margin-top: 12px;
          }

          .status {
            width: 59px;
            height: 23px;
            margin: 0 18px 0 0;
            background-repeat: no-repeat;
            background-position: center;
          }

          .success {
            background-image: url('./image/icon_audit-failure.png');
          }

          .failure {
            background-image: url('./image/icon_auditing.png');
          }
        }

        .address {
          display: flex;
          flex-direction: row;
          margin-bottom: 5px;

          .add {
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #666666;
            width: 80%;
          }
        }
      }

      .btn-wrap {
        right: 14px;
        bottom: 40%;
        position: absolute;
        display: flex;

        .modify {
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #999999;
        }

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

  .applyShop {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .imageWrap {
      bg-image('./image/pic_zwmdxx');
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