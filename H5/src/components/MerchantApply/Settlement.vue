<template>
  <div class="PaySetting"  >
    <div class="header" :style="mainBackground" >
      <div class="top">
        <img src="./image/icon_arrowright.png" @click="goBack">
        <a>结算周期</a>
      </div>
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl">
          <li class="inputLi">
            <a>D+0</a>
            <mt-switch v-model="choosed_D0" @change="turn_D0"></mt-switch>
          </li>
          <li v-if="choosed_D0"  class="inputLi">
            <a>附加手续费</a>
            <input class="myInput" type="number" ></input>%
          </li>
          <li v-if="choosed_D0"   class="inputLi">
            <a>手续费最低值</a>
            <input class="myInput" type="number" ></input>元
          </li>
           <li v-if="choosed_D0" class="inputLi">
            <a>手续费最高值</a>
            <input class="myInput" type="number"></input>元
          </li>
          <li v-if="choosed_D0" class="inputLi">
            <a>提现手续费</a>
            <input class="myInput" type="number" ></input>
            %
          </li>
          <li v-if="choosed_D0" class="inputLi">
            <a>手续费最低值</a>
            <input class="myInput" type="number" ></input>元
          </li>
           <li v-if="choosed_D0" class="inputLi">
            <a>手续费最高值</a>
            <input class="myInput" type="number" ></input>元
          </li>
           <li class="inputLi">
            <a>D+1</a>
            <mt-switch v-model="choosed_T0" @change="turn_T0"></mt-switch>
          </li>
          <li  class="inputLi">
            <a>T+1</a>
            <mt-switch v-model="choosed_T1" @change="turn_T1"></mt-switch>
          </li>
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
import { Switch } from 'mint-ui';
export default {
  data() {
    return {
      choosed_D0:false,
      choosed_T0:true,
      choosed_T1:false,
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
    turn_D0(){
      console.log(this.choosed_D0)
    },
    turn_T0(){
      console.log(this.choosed_T0)
    },
    turn_T1(){
      console.log(this.choosed_T1)
    },
    goBack(){
      this.$router.back()
    }
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
<style>
.mint-switch-core{
  height:25px !important;
  /* width:42px !important */
}
.mint-switch-core::after{
  height:23px !important;
  /* width:40px !important */
}
.mint-switch-core::before{
  height:23px !important;
  /* width:40px !important */
}
</style>



