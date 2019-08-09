<!--新增员工-->
<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header" @click="back">
          <img src="./image/btn_back.png">
          <div>新增员工</div>     
      </div>
      <!-- <div class="addShop"   @click="addShop">新增</div> -->
        <!-- <div  @click="addShop1">添加门店</div> -->
      <div class="stepWrap">
        <div class="step">
          <div class="item" >
            <div :class="[haveFill>=1?'number active':'number']" >
              <a>1</a>
              
            </div>
            <!-- <span>基本资料</span> -->
          </div>
          <div :class="[haveFill>='2'?'solided first-child':'dashed first-child']"></div>
          <div  class="item">
            <div :class="[haveFill>=2?'number active':'number']">
              <a>2</a>
             
            </div>
            <!-- <span>法人信息</span>    -->
          </div>
          <div :class="[haveFill=='3'?'solided':'dashed']"></div>
          <div  class="item">
            <div :class="[haveFill>=3?'number active':'number']">
              <a>3</a>
              
            </div>
            <!-- <span>资质证照</span> -->
          </div> 
        </div> 

        <div  class="stepTitle">
          <div :class="[haveFill>=1?'active':'']">添加员工</div>
          <div :class="[haveFill>=2?'active':'']">确认信息</div>
          <div :class="[haveFill==3?'active':'']">分配工号</div>
        </div>
      </div>
      
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapperShop" > 
        <ul class="mainTopUl">   
          <li v-if="haveFill=='1'"> 
            <div class="title">门店名称a</div>
            <van-field v-model="phone" label="手机号"  placeholder="请输入手机号" />
          </li>
          <li v-if="haveFill=='2'"> 
            <div class="title">手机号 {{phone}}</div>
            <van-field v-model="name" label="姓名"  placeholder="请输入姓名" />
          </li>    
          <li v-if="haveFill=='3'"> 
            <div class="title">工号为POS终端登录签到的账号</div>
            <van-field v-model="num" label="工号"  clearable  placeholder="工号为两位数，如01" />
          </li>    
        </ul> 
      </div>
      <div class="bottomBtn"  >
        <button type=button :class="[clickFlag1?'btn':'btnLight']" v-if="haveFill=='1'"  :disabled='clickFlag1'  @click="goStep2">下一步</button>
        <button type=button :class="[clickFlag2?'btn':'btnLight']" v-if="haveFill=='2'"  :disabled='clickFlag2'  @click="goStep3">下一步</button>
        <button type=button :class="[clickFlag3?'btn':'btnLight']" v-if="haveFill=='3'"  :disabled='clickFlag3'  @click="send">确定</button>
      </div>
    </div>
   
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from "vant";
export default {
  data() {
    return {
      haveFill: "1",
      phone: "", //手机号
      name: "",
      num: "",
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
      pulldownMsg: "下拉刷新",
      pullupMsg: "加载更多",
      alertHook: "none",
      selected: "0",

      merflag: "1", //商户是否存在 1--有商户---显示门店列表  0--无商户---去申请
      shopList: [],
      max: 45,
      current: 0,
      dataFlag: true
    };
  },

  components: {},
  created() {},

  computed: {
    clickFlag1() {
      if (this.phone == "") {
        return true;
      } else {
        return false;
      }
    },
    clickFlag2() {
      if (this.name == "") {
        return true;
      } else {
        return false;
      }
    },
    clickFlag3() {
      if (this.num == "") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {},

  methods: {
    goStep2() {
      let rePhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      let regPhone = new RegExp(rePhone);
      if (regPhone.test(this.phone)) {
        this.haveFill = "2";
      } else {
        Toast("手机号格式不正确");
      }
    },
    goStep3() {
      let rePhone = /^[\u4e00-\u9fa5]{2,}$/;
      let regPhone = new RegExp(rePhone);
      if (regPhone.test(this.name)) {
        this.haveFill = "3";
      } else {
        Toast("请至少输入两个汉字");
      }
    },
    send() {
      console.log(this.phone);
      console.log(this.name);
      console.log(this.num);
      let rePhone = /^[0-9]{2}$/;
      let regPhone = new RegExp(rePhone);
      if (regPhone.test(this.num)) {
        alert("提交");
      } else {
        Toast("请输入两位数字");
      }
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

    back() {
      this.$store.commit("setTransitionName", "slide-left");
      this.$router.back();
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
  background: #F8F8FA;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .head {
    width: 100%;
    height: 25%;
    line-height: 5%;
    background: #F8F8FA;
    display: flex;
    flex-direction: column;

    .header {
      height: 50%;
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
      color: #306BE6;
      margin: auto;
      margin-right: 20px;
    }

    .stepWrap {
      display: flex;
      height: 50%;
      justify-content: center;
      background: #fff;
      flex-direction: column;
      align-items: center;

      .step {
        width: 80%;
        height: 50%;
        // background yellow
        display: flex;
        align-items: center;

        .itemOpacity {
          opacity: 0.4;
          // width 25%
          height: 100%;
        }

        .item {
          // border solid 1px black
          // width 25%
          flex: 1;
          height: 100%;
          mixinDisplay();
          flex-direction: column;
          background: #fff;
          position: relative;

          .number {
            width: 20px;
            height: 20px;
            mixinDisplay();
            border-radius: 50%;
            color: #FFFFFF;
            font-size: 13px;
            position: relative;
            // opacity: 0.8;
            border: 1px solid #306BE6;
            background: #fff;
            color: #306BE6;

            &.active {
              background-image: linear-gradient(-90deg, #68A6FC 0%, #1D6AE1 100%);
              background-image: linear-gradient(-90deg, #173CDD 0%, #4399F1 100%);
              background: #306BE6;
              color: #FFFFFF;
            }
          }

          span {
            margin-top: 10%;
            font-size: 14px;
            color: #306BE6;
            position: absolute;
            bottom: 15px;
          }
        }

        .dashed {
          // &.first-child {
          // opacity: 0.4;
          // }

          // position: absolute;
          width: 20%;
          border-bottom: 1px dashed #306BE6;
          height: 0;
          left: 25px;
          // opacity: 0.4;
          // top: 50%;
        }

        .solided {
          // position: absolute;
          width: 20%;
          border-bottom: 1px solid #306BE6;
          height: 0;
          // left: 25px;
          opacity: 1;
          // top: 50%;
        }
      }

      .stepTitle {
        height: 30%;
        width: 80%;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        align-items: center;
        margin-top: 5px;

        div {
          height: 20px;
          line-height: 20px;
          color: #306BE6;
          opacity: 0.8;

          &.active {
            color: #306BE6;
            opacity: 1;
          }
        }
      }
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

  .main {
    height: 73%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .mainTop {
      width: 100%;
      height: 40%;
      overflow: hidden;

      .mainTopUl {
        width: 100%;
        box-sizing: border-box;

        li {
          margin: 12px 20px 0;
          box-sizing: border-box;
          border: 1px solid transparent;

          .title {
            font-family: PingFangSC-Medium;
            font-size: 15px;
            color: #666666;
            letter-spacing: 0;
            margin-bottom: 10px;
          }

          &:last-child {
            margin: 12px 20px 12px;
          }

          /deep/ .van-field__control {
            text-align: right;
          }
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
    }
  }
}
</style>