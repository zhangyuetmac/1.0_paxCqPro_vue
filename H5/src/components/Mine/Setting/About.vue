<template>
  <div class="mineWrapper">
    <SettingHeader :message="message"></SettingHeader>
    <ul class="main">
      <div class="logo">
        <img src="../image/icon_logo.png">
        <a>翼支付客户端</a>
        <span>{{version}}</span>
      </div>
      <li class="normalLi" >
        <div class="left">
          <a>检查最新版本</a>
        </div>
        <div class="right">
          <img src="../image/btn_more2.png"/>
        </div>
      </li>    
    </ul>
  </div>
</template>
<script>
import SettingHeader from "./SettingHeader";
import { Switch } from 'mint-ui';
import { Toast } from "vant";
import axios from "axios";
export default {
  components: {
    SettingHeader
  },
  data() {
    return {
      message:'关于',
      arrivalBroadcast:false,
      version:'v1.0.1'
    };
  },
  methods: {
   turn_ArrivalBroadcast(){
    //  this.arrivalBroadcast = !this.arrivalBroadcast
    console.log(this.arrivalBroadcast)
   }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.mineWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main {
    width: 100%;
    height :80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y:auto;
    .logo{
      width 100%
      height 35%
      mixinDisplay();
      flex-direction column
      a{
        margin-top 10px
        color #666666 
        font-size 14px
      }
      span{
        margin-top 8px
        color #666666 
        font-size 14px
      }
    }
    .normalLi {
      padding: 0 5% 0 5%;
      background: #FFFFFF;
      width: 80%;
      height: 60px;
      line-height: 60px;
      // border solid 1px black
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{

      }
        a {
          font-size: 15px;
          color: #333333;
        }
      .right{
        display flex
        align-items center
      }
        span {
          font-size: 15px;
          color: #999999;
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
        background: #306BE6;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }
    }
  }
}
</style>


