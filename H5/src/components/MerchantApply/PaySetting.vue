<template>
  <div class="PaySetting"  >
    <div class="header" :style="mainBackground" >
      <div class="top">
        <img src="./image/icon_arrowright.png" @click="goBack">
        <a>{{$store.state.paySettingType}}</a>
      </div>
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl">
          <li class="inputLi">
            <a v-if="$store.state.paySettingType === '银行卡'|| $store.state.paySettingType==='云闪付'">借记卡手续费</a>
            <a v-if="$store.state.paySettingType === '支付宝'|| $store.state.paySettingType==='微信'">{{$store.state.paySettingType}}手续费</a>
            <input class="myInput" type="number" ></input>
            %
          </li>
          <li class="inputLi">
            <a>手续费最低值</a>
            <input class="myInput" type="number" ></input>元
          </li>
           <li class="inputLi">
            <a>手续费最高值</a>
            <input class="myInput" type="number"></input>元
          </li>
          <li v-if="$store.state.paySettingType === '银行卡'|| $store.state.paySettingType==='云闪付'" class="inputLi">
            <a>贷记卡手续费</a>
            <input class="myInput" type="number" ></input>
            %
          </li>
          <li v-if="$store.state.paySettingType === '银行卡'|| $store.state.paySettingType==='云闪付'" class="inputLi">
            <a>手续费最低值</a>
            <input class="myInput" type="number" ></input>元
          </li>
           <li v-if="$store.state.paySettingType === '银行卡'|| $store.state.paySettingType==='云闪付'" class="inputLi">
            <a>手续费最高值</a>
            <input class="myInput" type="number" ></input>元
          </li>
          <li class="inputLi">     
            <a>结算周期</a>
            <div @click="goSettlementPage">
              <span>请选择</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li >
          <li class="inputLi">     
            <a>接入通道</a>
            <div>
              <span>请选择</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li >
        </ul>
      </div>
      <div class="bottomBtn" :style={height:btnHeight}>
        <div class="btn">
          <a>下一步</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnHeight: "",
      //头部标题名称
      title: "",
      mainBackground: {
        backgroundImage: "url(" + require("./image/pic_shsq.png") + ")",
        backgroundSize: "100% 100%"
      }
    };
  },
  methods: {
    goBack(){
      this.$router.back()
    },
    goSettlementPage(){
      this.$router.push({
        path:'./Settlement'
      })
    }
  },
  created() {
    console.log("444");
    console.log(this.$route.query.title);
    this.title = this.$route.query.title;
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.PaySetting {
  width: 100%;
  height: 100%;
  background: #EEEEEE;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    width: 100%;
    height: 40%;

    .top {
      width: 100%;
      height: 30%;
      display: flex;
      align-items: center;

      img {
        margin-left: 5%;
      }

      a {
        font-size: 24px;
        margin-left: 3%;
        color: #FFFFFF;
      }
    }
  }

  .main {
    width: 100%;
    height: 95%;
    margin-top: -35%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .mainTop {
      width: 90%;
      height: 90%;
      background: #FFFFFF;
      overflow-x: hidden;
      overflow-y: auto;

      .mainTopUl {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .inputLi {
          width: 90%;
          height: 50px;
          line-height: 50px;
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
            width: 40%;
          }

          input {
            display: block;
            width: 60%;
            height: 80%;
            border: none;
            outline: medium;
            text-align: right;
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
        }

        .borderNone {
          border: none;
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
      height: 50%;
      border-radius: 20px;
      background: #DDDDDD;
      color: white;
      font-size: 17px;
      mixinDisplay();
    }

    .btnLight {
      width: 80%;
      height: 50%;
      border-radius: 20px;
      background: #306BE6;
      color: white;
      font-size: 17px;
      mixinDisplay();
    }
  }
}
</style>


