<template>
  <div class="MerchantApply" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <div class="head" :style="{backgroundImage:myBackgroundImage,height:bgHeight}">
      <MerchantApplyHeader></MerchantApplyHeader>
      <div class="step">
        <div class="item">
          <div class="number" >
            <a>1</a>
            <div class="dashed"></div>
          </div>
          <span>基本资料</span>
        </div>
        <div class="item" >
          <div class="number">
            <a>2</a>
            <div class="dashed"></div>
          </div>
          <span>法人信息</span>   
        </div>
        <div class="item">
          <div class="number">
            <a>3</a>
            <div class="dashed"></div>
          </div>
          <span>开户资料</span>
        </div>
        <div class="item">
          <div class="number">
            <a>4</a>
            <div class="dashed"></div>
          </div>
          <span>门店信息</span>
        </div>
        <div class="item">
          <div class="number">
            <a>5</a>           
          </div>
          <span>产品信息</span>
        </div>
      </div>
    </div>
    <div class="main">
      <ul class="mainUl">
        <li class="normalLi">
          <div class="left" >
            <a>开通交易类型</a>
          </div>
          <div class="right" @click="getTransType">
            <span>{{toChoose}}</span>
            <img src="./image/icon_arrowright1.png">
          </div>
        </li> 
        <div class="payType">
          <a>支付方式设置</a>
        </div>  
        <li class="normalLi" v-for="(item,index) in payType" @click="goPaySetting(index)">
          <div class="left">
            <a>{{item}}</a>
          </div>
          <div class="right">
          <img src="./image/icon_arrowright1.png">
          </div>
        </li>    
      </ul>
      <div class="bottomBtn" :style={height:btnHeight} @click="goCreatProduct">
        <div :class="btnClass">
          <a>提交</a>
        </div>
      </div>
    </div>
    <van-popup v-model="popupToast.show" position="bottom">
      <div class="typeChoose">
        <div class="header">
          <a>交易类型(可多选)</a>
        </div>
        <div class="content">
          <div :key="index" v-for="(item,index) in transTypeData" class="itemDiv" @click="chooseTransType(index)">
            <img v-show="item.imgSelect" src='./image/icon_shaixuan_sel.png'/>
            <a>{{item.transType}}</a>
          </div>
        </div>
        <div class="buttom">
          <div class="refresh">
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
import MerchantApplyHeader from "./MerchantApplyHeader";
// import TypeChoose from "../TypeChoose/TypeChoose";
import TypeChoose from '&/PublicComponents/TypeChoose'
import { dateExchange } from "../../common/js/myDate.js";
// import BScroll from "better-scroll"
import { Area, Popup } from "vant";
import { Toast } from "vant";
import {
  cameraTakePicture,
  getLocalPicture
} from "../../../static/cordovaplugin.js";
import ProductCreateData from "./ProductCreateData.js";
import productCreate from "./productCreate.js";

export default {
  data() {
    return {
      toChoose:'请选择',
      payType: ["银行卡", "支付宝", "微信", "云闪付"],
      //引入的默认的产品添加的数据
      ProductCreateData: "",
      transTypeData: [
        { transType: "分期", code: "INSTALLMENT", imgSelect: false },
        {
          transType: "分期消费撤销",
          code: "INSTALLMENT VOID",
          imgSelect: false
        },
        { transType: "预授权", code: "PREAUTH", imgSelect: false },
        { transType: "预授权完成", code: "PREAUTH COMPLETE", imgSelect: false },
        {
          transType: "预授权完成通知",
          code: "PREAUTH COMPLETE ADVICE",
          imgSelect: false
        },
        {
          transType: "预授权完成撤销",
          code: "PREAUTH COMPLETE VOID",
          imgSelect: false
        },
        { transType: "预授权撤销", code: "PREAUTH VOID", imgSelect: false },
        { transType: "退货", code: "REFUND", imgSelect: false }
      ],
      touchmoveData: {
        startX: "",
        startY: "",
        endX: "",
        endX: ""
      },
      myBackgroundImage: "url(" + require("./image/pic_shsq.png") + ")",
      bgHeight: "",
      btnHeight: "",
      haveFill: true,
      showArea: false,
      //选择框
      popupToast: {
        show: false
      },
      accountType: "请选择",
      merchantApply2: {
        //法人姓名
        legal_name: "",
        //证件类型
        legal_id_type: "",
        //身份证号码
        legal_id_no: ""
      }
    };
  },
  components: {
    MerchantApplyHeader,
    Popup
  },
  computed: {
    btnClass() {
      if (
        this.merchantApply2.legal_name &&
        this.accountType !== "请选择" &&
        this.merchantApply2.legal_id_no
      ) {
        return "btnLight";
      } else {
        return "btn";
      }
    }
  },
  methods: {
    //点击去进行交易类型的设置
    goPaySetting(index) {
      this.$store.commit("setPaySettingType", this.payType[index]);
      this.$router.push({
        path: "/PaySetting"
      });
    },
    //去创建门店产品(把数据添加进去并且调用接口)
    async goCreatProduct() {
      const ProductCreateEntitity = this.ProductCreateData;
      const res = productCreate(ProductCreateEntitity);
      console.log(JSON.stringify(res));
    },
    //交易类型选择完成  点击确定
    transTypeConfirm() {
      console.log("11");
      this.transTypeData.forEach(element => {
        // console.log(element.imgSelect)
        if (element.imgSelect) {
          console.log(element.transType);
          console.log(element.code);
          const obj = {
            code: element.code
          };
          this.ProductCreateData.biz_content.transtypes.push(obj);
          console.log(
            "添加数据以后的data===" + JSON.stringify(this.ProductCreateData)
          );
          this.toChoose = '已设置'
        }
      });
      this.popupToast.show = false;
    },
    //多选框交易类型的选择
    chooseTransType(index) {
      console.log(index);
      this.transTypeData[index].imgSelect = !this.transTypeData[index].imgSelect;
    },
    //点击弹出获取交易类型的框
    getTransType() {
      this.popupToast.show = true;
      console.log("aaa");
    },
    checkData() {
      return true;
      // console.log(this.merchant_name
      if (!this.merchantApply2.legal_name) {
        Toast("请输入法人姓名");
        return false;
      } else if (this.accountType === "请选择") {
        Toast("请选择证件类型");
        return false;
      } else if (!this.merchantApply2.legal_id_no) {
        Toast("请输入身份证或者护照号码");
        return false;
      } else if (
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
          this.merchantApply2.legal_id_no
        ) &&
        !/^([a-zA-z]|[0-9]){5,17}$/.test(this.merchantApply2.legal_id_no)
      ) {
        Toast("请输入正确身份证或者护照号码");
        return false;
      } else {
        console.log("输入成功");
        return true;
      }
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
    //点击弹出选择拍照或者照片选择
    toChoosePicture(name, index) {
      this.popupToast.show = true;
      this.popupToast.showImage = true;
      this.popupToast.chooseMsg = "请选择上传方式";
      this.popupToast.firstMsg = "拍摄";
      this.popupToast.secondMsg = "相册";
      this.popupToast.name = name;
      this.popupToast.imgIndex = index;
      if (name === "idCardZm") {
        this.popupToast.imgSrc = require("./image/pic_sfzzm@2x.png");
      } else if (name === "idCardFm") {
        this.popupToast.imgSrc = require("./image/pic_sfzfm@2x.png");
      } else if (name === "bankCardZm") {
        this.popupToast.imgSrc = require("./image/pic_yhkzm@2x.png");
      } else if (name === "bankCardFm") {
        this.popupToast.imgSrc = require("./image/pic_yhkfm@2x.png");
      }
    },
    //点击获取证件类型
    getAccountType() {
      this._inputBlur();
      this.popupToast.show = true;
      this.popupToast.showImage = false;
      this.popupToast.chooseMsg = "请选择证件类型";
      this.popupToast.firstMsg = "身份证";
      this.popupToast.secondMsg = "护照";
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0;
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
        click: true
      });
    },
    openPicker() {
      this.$refs.picker.open();
    },
    openPicker2() {
      this.$refs.picker2.open();
    },
    //选择完成
    typeChoosed(data) {
      console.log("选择的==" + data);
      this.popupToast.show = false;
      if (data[0] == "身份证") {
        this.accountType = data[0];
        this.merchantApply2.legal_id_type = "1";
      } else if (data[0] == "护照") {
        this.accountType = data[0];
        this.merchantApply2.legal_id_type = "2";
      }
    },
    goToStep3() {
      if (this.checkData()) {
        //判断选择的证件类型是身份证还是护照，存到store里面，到第三页的时候去使用
        if (this.merchantApply2.legal_id_type === "1") {
          this.$store.commit("setPhotoType", "1");
        } else if (this.merchantApply2.legal_id_type === "2") {
          this.$store.commit("setPhotoType", "2");
        } else {
          this.$store.commit("setPhotoType", "");
        }
        console.log(this.merchantApply2.legal_name);
        console.log("222");
        const MerchantApplyEntitity = this.$store.state.merchantApplyEntitity;
        MerchantApplyEntitity.biz_content.legal_name = this.merchantApply2.legal_name;
        MerchantApplyEntitity.biz_content.legal_id_type = this.merchantApply2.legal_id_type;
        MerchantApplyEntitity.biz_content.legal_id_no = this.merchantApply2.legal_id_no;
        this.$store.commit("setMerchantApplyEntitity", MerchantApplyEntitity);
        this.$router.push({ path: "./MerchantApply3" });
      }
    }
  },
  created() {
    //把外部引入的数据  放到自己的data里面去
    this.ProductCreateData = ProductCreateData;
    this.bgHeight = document.body.scrollHeight * 35 / 100 + "px";
    this.btnHeight = document.body.scrollHeight * 13 / 100 + "px";
    // this.$nextTick(()=>{
    //   this._initScroll()
    // })
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.MerchantApply {
  width: 100%;
  height: 100%;

  .typeChoose {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: #333333;
    font-size: 20px;

    .header {
      width: 90%;
      height: 55px;
      display: flex;
      align-items: center;

      a {
        font-weight: 600;
      }
    }

    .content {
      width: 95%;
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

  .head {
    width: 100%;
    height: 35%;
    // background-image: url('./image/pic_shsq.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    flex-direction: column;

    .header {
      width: 100%;
      height: 30%;
      // background red
      display: flex;
      align-items: center;

      img {
        margin-left: 3%;
      }

      a {
        margin-left: 3%;
        font-size: 24px;
        color: #FFFFFF;
      }
    }

    .step {
      width: 90%;
      height: 40%;
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

        .number {
          width: 20px;
          height: 20px;
          background: #FFFFFF;
          mixinDisplay();
          border-radius: 50%;
          color: #6490EC;
          font-size: 14px;
          position: relative;
        }

        span {
          margin-top: 10%;
          font-size: 12px;
          color: #FFFFFF;
        }

        .dashed {
          position: absolute;
          width: 130%;
          border: 1px dashed white;
          left: 30px;
          top: 50%;
        }
      }
    }
  }

  .main {
    width: 100%;
    height: 65%;
    background: #F8F8FA;
    display: flex;
    align-items: center;
    flex-direction: column;

    .mainUl {
      width: 100%;
      height: 100%;
      margin-top: -10%;
      display: flex;
      flex-direction: column;

      // align-items center
      .payType {
        height: 50px;
        display: flex;
        align-items: center;
        margin-left: 5%;
      }

      .normalLi {
        padding: 0 5% 0 5%;
        background: #FFFFFF;
        width: 80%;
        margin-left: 5%;
        height: 55px;
        // border solid 1px black
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
          font-size: 15px;
          color: #333333;
        }

        span {
          font-size: 15px;
          color: #999999;
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
}
</style>


