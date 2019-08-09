<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header">
        <img src="./image/btn_back.png" @click="back" />
        <a>在线报修</a>
      </div>
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl">
          <li class="inputLi">
            <a>终端号</a>
            <div class="sn">
              <!-- <span>{{mySn}}</span> -->
              <input :placeholder="mySnInfo" v-model="mySn" />
              <img src="./image/btn_more2.png" @click="chooseSn" />
            </div>
          </li>
          <li class="inputLi">
            <a>报修原因</a>
            <div @click="chooseReason">
              <span>{{myReason}}</span>
              <img src="./image/btn_more2.png" />
            </div>
          </li>
          <li class="inputLi" v-show="myReason!='请选择'">
            <mt-field
              style="width:100%"
              @input="count"
              :attr="{ maxlength: 250 }"
              :placeholder="info"
              type="textarea"
              rows="12"
              v-model="introduction"
              class="info"
            ></mt-field>
            <div class="leftWord">({{leftWord}}/250)</div>
            <!--  :attr="{ maxlength: 250 }" -->
          </li>
        </ul>
      </div>

      <div class="bottomBtn">
        <button
          type="button"
          :class="[clickFlag?'btn':'btnLight']"
          :disabled="clickFlag"
          @click="send"
        >提交</button>
      </div>
    </div>
    <mt-popup style="width: 100%;" v-model="showSn" position="bottom">
      <div class="contentWrap">
        <div class="title">请选择证件终端</div>
        <ul>
          <li @click="selectSn('11111','1')" :class="['1'==selIndex?'active':'']">
            <div>终端号XXXXXXXXXXX</div>

            <img v-if="selIndex=='1'" src="./image/icon_arrowright4.png" />
            <img v-else src="./image/icon_arrowright3.png" />
          </li>
          <li @click="selectSn('2222','2')" :class="['2'==selIndex?'active':'']">
            <div>终端号XXXXXXXXXXX</div>

            <img v-if="selIndex=='2'" src="./image/icon_arrowright4.png" />
            <img v-else src="./image/icon_arrowright3.png" />
          </li>
        </ul>
      </div>
    </mt-popup>
    <mt-popup style="width: 100%;" v-model="showReason" position="bottom">
      <div class="contentWrap">
        <div class="title">请选择保修原因</div>
        <div
          class="ulWrap"
          ref="reasonTopWrapper"
          @touchstart="myTouchStart"
          @touchend="myTouchEnd"
        >
          <ul>
            <li
              v-for="(item,index) in reasonList"
              @click="selectReason(item,index)"
              :key="index"
              :class="[index==selRea?'active':'']"
            >
              <div>{{item}}</div>

              <img v-if="selRea==index" src="./image/icon_arrowright4.png" />
              <img v-else src="./image/icon_arrowright3.png" />
            </li>
          </ul>
        </div>
      </div>
    </mt-popup>
    <!-- 成功弹框 -->
    <van-popup class="paxalert" v-model="showSuccess">
      <img src="./image/icon_success.png" />
      <div class="success">提交成功</div>
      <div class="info">我们的工作人员将尽快与您联系</div>
    </van-popup>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { setTimeout } from "timers";
import { Toast } from "mint-ui";
import { Popup } from "vant";
export default {
  data() {
    return {
      info: "详细描述(选填),最多250字",
      mySnInfo: "可手动输入或点击选择",
      reasonList: [
        "屏幕碎裂",
        "刷卡无法识别",
        "挥卡无法识别",
        "插卡无法识别",
        "无法打印",
        "其他"
      ],
      touchmoveData: {
        startX: "",
        startY: "",
        endX: "",
        endX: ""
      },
      mySn: "",
      showSn: false,
      myReason: "请选择",
      showReason: false,
      selIndex: "",
      selRea: "",
      introduction: "",
      leftWord: 250,
      showSuccess: false //成功弹框
    };
  },
  components: {},
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  computed: {
    clickFlag() {
      if (this.mySn == "" || this.myReason == "请选择") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    // showReason(val) {
    //   console.log(val);
    //   if(val){
    //     console.log("屏幕窗口变化了");
    //     setTimeout(() => {
    //       this._initScroll();
    //     }, 20);
    //   }
    // }
  },
  methods: {
    send() {
      console.log(this.mySn);
      console.log(this.myReason);
      console.log(this.introduction);
      // Toast("商户不存在该终端号");
      this.showSuccess = true;
      // this._Axios
      //   .commonAxios(
      //     "post",
      //     "/stock/termReject",
      //     { sn: this.mySn },
      //     { commType: "json" }
      //   )
      //   .then(res => {
      //     console.log(res);
      //   });
    },
    getStringUTFLength(str) {
      var value = str.replace(/[^\x00-\xff]/g, "  ");
      return value.length;
    },
    leftUTFString(str, len) {
      if (this.getStringUTFLength(str) <= len) return str;
      var value = str.substring(0, len);

      while (this.getStringUTFLength(value) > len) {
        value = value.substring(0, value.length - 1);
      }
      return value;
    },

    count(value) {
      console.log(value);

      // value = this.introduction;
      console.log(value.length);
      if (value.length > 250) {
        this.leftWord = 0;
        this.introduction = value.substring(0, 250);
      } else {
        this.leftWord = 250 - value.length;
      }
      /* value = value.replace(/[\u4e00-\u9fa5]/g, "  ");
      //alert(value.length);
      if (value.length >= 250) {
        // with (window.event) {
        //   cancelBubble = true;
        //   keyCode = 0;
        //   returnValue = false;
        // }
        
        value = this.leftUTFString(value, 250);
        
      }
      this.leftWord = 250 - this.getStringUTFLength(value);
      */
    },
    chooseReason() {
      this.showReason = true;
      this.$nextTick(() => {
        setTimeout(() => {
          // this._initScroll();
          // if (!this.mainTopScroll) {
          console.log("初始化滚动");
          this._initScroll();
          // } else {
          //   console.log("刷新滚动");
          //   this.mainTopScroll.refresh();
          // }
        }, 600);
      });
    },
    chooseSn() {
      this.showSn = true;
    },
    selectSn(sn, i) {
      this.selIndex = i;
      this.mySn = sn;
      this.showSn = false;
    },
    selectReason(val, i) {
      console.log(val, i);
      this.selRea = i;
      this.myReason = val;
      this.showReason = false;
      if (this.myReason == "其他") {
        this.info = "请输入其他报修原因，最多250字";
      }
    },
    _initScroll() {
      console.log("百富");
      this.mainTopScroll = new BScroll(this.$refs.reasonTopWrapper, {
        click: true,
        probeType: 3
      });
      // 页面滑动的时候通过代码控制让获取焦点的input框失去焦点;
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
    myTouchStart(e) {
      this.touchmoveData.startX = e.changedTouches[0].pageX;
      this.touchmoveData.startY = e.changedTouches[0].pageY;
      // console.log('起始位置X=='+this.touchmoveData.startX)
      // console.log('起始位置Y=='+this.touchmoveData.startY)
    },
    myTouchEnd(e) {
      this.touchmoveData.endX = e.changedTouches[0].pageX;
      this.touchmoveData.endY = e.changedTouches[0].pageY;
      // console.log('结束位置X=='+this.touchmoveData.endX)
      // console.log('结束位置Y=='+this.touchmoveData.endY)
      if (Math.abs(this.touchmoveData.endX - this.touchmoveData.startX) > 2) {
        // console.log('X方向上滑动了')
        this._inputBlur();
      }
      if (Math.abs(this.touchmoveData.endY - this.touchmoveData.startY) > 2) {
        // console.log('Y方向上滑动了')
        this._inputBlur();
      }
    },
    //让文本框失去焦点
    _inputBlur() {
      const inputMe = document.getElementsByClassName("myInput");
      for (var i = 0; i < inputMe.length; i++) {
        if (inputMe[i] == document.activeElement) {
          inputMe[i].blur();
        }
      }
    },
    back() {
      this.$store.commit("setTransitionName", "slide-left");
      this.$router.push({ path: "/Mine" });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;

  .head {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .header {
      width: 100%;
      height: 100%;
      // background red
      display: flex;
      align-items: center;

      img {
        margin-left: 3%;
      }

      a {
        margin-left: 3%;
        font-size: 24px;
        font-family: PingFangSC-Medium;
        color: #333333;
      }
    }
  }

  .main {
    width: 100%;
    height: 90%;
    background: #F8F8FA;
    display: flex;
    align-items: center;
    flex-direction: column;

    .mainTop {
      width: 90%;
      height: 72%;
      // background: #FFFFFF;
      overflow: hidden;
      position: relative;

      .mainTopUl {
        width: 100%;
        display: flex;
        background: #FFFFFF;
        flex-direction: column;
        align-items: center;

        .inputLi {
          width: 90%;
          // height: 50px;
          line-height: 50px;
          // border-bottom: solid 1px #F7F7F7;
          background: #FFFFFF;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          /deep/ .mint-field-core {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #999999;
            line-height: 24px;
            // text-indent: 2em;
          }

          .leftWord {
            position: absolute;
            right: 0px;
            bottom: -10px;
            font-size: 14px;
            color: #3F3F3F;
          }

          a {
            font-size: 15px;
            font-weight: bold;
            display: block;
            width: 35%;
          }

          input {
            display: block;
            width: 90%;
            height: 80%;
            border: none;
            outline: medium;
            text-align: right;
          }

          img {
            margin: 0 0 0 5px;
          }

          .sn {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            a {
              width: 80%;
              text-align: right;
            }
          }

          span {
            font-size: 15px;
          }

          .million {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 65%;
            height: 100%;

            input {
              width: 90%;
            }
          }

          /deep/ .mint-cell-wrapper, /deep/ .mint-cell:last-child {
            background-image: none !important;
            background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%) !important;
          }
        }

        .borderNone {
          border: none;
        }

        .IdCardLi {
          width: 90%;
          border-bottom: solid 1px #F7F7F7;

          .IdCardText {
            height: 35px;
            display: flex;
            align-items: center;

            a {
              font-size: 15px;
              font-weight: bold;
            }
          }

          .IdCardWrapper {
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            .IdCardDiv {
              width: 50%;
              // background :red
              display: flex;
              // flex :1
              flex-direction: column;
              align-items: center;

              // background :#F7F8F9
              .idCardImgWrapper {
                mixinDisplay();
                width: 85%;
                height: 109px;
                background: #F7F8F9;
                position: relative;

                .imgGray {
                  width: 107px;
                  height: 70px;
                }

                .addIdCardStep4 {
                  position: absolute;
                  top: 50%;
                  left: 40%;
                  transform: translateY(-50%);
                }
              }
            }

            span {
              font-size: 13px;
              display: block;
              margin-top: 10px;
              margin-bottom: 20px;
            }
          }
        }

        .businessLicense {
          width: 90%;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: start;

          .businessLicenseA {
            height: 50px;
            display: flex;
            align-items: center;

            a {
              font-size: 15px;
              font-weight: bold;
            }
          }

          .businessLicenseImgWrapper {
            position: relative;
            width: 146px;
            height: 109px;
            mixinDisplay();
            background: #F7F8F9;

            #businessLicenseImg {
              width: 146px;
              height: 109px;
            }

            .add {
              position: absolute;
              // left 50%
              // transform translateX(-50%)
              top: 50%;
              transform: translateY(-50%);
            }
          }

          .businessLicenseSpan {
            height: 30px;
            width: 145px;
            mixinDisplay();

            span {
              font-size: 13px;
              color: #666666;
            }
          }
        }
      }
    }

    .mainNext {
      width: 90%;
      height: 50%;
      background: #FFFFFF;
      margin-top: 5%;
      overflow: hidden;

      .mainTopUl {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        li {
          width: 90%;
          height: 50px;
          border-bottom: solid 1px #F7F7F7;
          background: #FFFFFF;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          a {
            font-size: 15px;
            font-weight: bold;
            display: block;
            width: 35%;
          }

          input {
            display: block;
            width: 65%;
            height: 80%;
            border: none;
            outline: medium;
          }
        }

        .borderNone {
          border: none;
        }
      }
    }

    .bottomBtn {
      width: 100%;
      height: 20%;
      mixinDisplay();

      .btn {
        width: 80%;
        height: 45px;
        line-height: 45px;
        border: none;
        border-radius: 20px;
        background: #DDDDDD;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }

      .btnLight {
        width: 80%;
        height: 45px;
        line-height: 45px;
        border: none;
        border-radius: 20px;
        background: #306BE6;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }
    }
  }

  .contentWrap {
    margin: 24px 30px 16px;

    .title {
      font-family: PingFangTC-Medium;
      font-size: 20px;
      color: #333333;
      font-weight: 600;
      letter-spacing: 2.22px;
      padding: 0 0 28px;
    }

    .ulWrap {
      // padding: 28px 0 0;
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;

      // align-items: center;
      li {
        background: #F8F8FA;
        border-radius: 4px;
        height: 60px;
        line-height: 60px;
        margin-bottom: 12px;
        padding: 0 13px 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.active {
          background-color: rgba(48, 107, 230, 0.2);
          color: #306BE6;
        }

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .paxalert {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 25px 0;
    border-radius: 8px;

    .success {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding: 14px 0 4px;
    }

    .info {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #999;
      text-align: center;
      margin: 10px 0 0;
    }
  }
}
</style>