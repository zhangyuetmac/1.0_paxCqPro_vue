<template>
  <div class="transitionWrapper" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <div class="head" :style="{backgroundImage:myBackgroundImage,height:bgHeight}">
      <ShopCreateHeader></ShopCreateHeader>
      <div class="step">
        <div class="item">
          <div class="number" >
            <a>1</a>
            <div class="solided"></div>
          </div>
          <span>基本资料</span>
        </div>
        <div class="item" >
          <div class="number">
            <a>2</a>
            <div class="solided"></div>
          </div>
          <span>法人信息</span>   
        </div>
        <div class="item">
          <div class="number">
            <a>3</a>
            <div class="solided"></div>
          </div>
          <span>资质证照</span>
        </div>
        <div class="item">
          <div class="number">
            <a>4</a>
            <div class="dashed first-child"></div>
          </div>
          <span>结算信息</span>
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>5</a>
          </div>
          <span>产品信息</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl">
           <li class="inputLi">     
            <a>账户类型</a>
            <div @click="getAccountType1">
              <span>{{accountType1}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li >
          <li class="inputLi">
            <a>开户人</a>
            <input class="myInput" type="text" placeholder="点击输入开户人"   v-model="shopList4.accountname" />
          </li>
          <li class="inputLi">
            <a>开户银行</a>
            <input class="myInput" type="text" placeholder="点击输入开户银行"   v-model="shopList4.bankname" />
          </li>
          <li class="inputLi">
            <a>开户支行</a>
            <input class="myInput" type="text" placeholder="点击输入开户支行"   v-model="shopList4.sub_bank_name" />
          </li>
          <li class="inputLi">
            <a>银行账号</a>
            <input class="myInput" type="text" placeholder="点击输入账号"   v-model="shopList4.account_code" />
          </li>
          <li class="inputLi">
            <a>开户省份和城市</a>
            <div @click="toastArea">
              <span>{{accountCity}}</span>
      
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li>
          <li class="inputLi borderNone">
            <a>预留手机号</a>
            <input class="myInput" type="text" placeholder="点击输入手机号"   v-model="shopList4.tel"/> 
          </li>
          <li class="IdCardLi"  v-if="shopList4.accounttype=='2'">
            <div class="IdCardText">
              <a>授权人身份证</a>
            </div>
              <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('idCardZm',0,'addImg1')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzrxm.png" class="imgGray" id="idCardZm">
                  <img v-show="addImg1" id="addImg1" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;人像面</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('idCardFm',1,'addImg2')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzghm.png" class="imgGray" id="idCardFm">
                  <img v-show="addImg2" id="addImg2" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;国徽面</span>
              </div>
            </div>
          </li>
          <li class="IdCardLi" v-if="shopList4.accounttype=='1'||shopList4.accounttype=='2'">
            <div class="IdCardText">
              <a>银行卡照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('bankCardZm',3,'addImg3')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_yhkzm.png" class="imgGray" id="bankCardZm">
                  <img v-show="addImg3" id='addImg3' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;银行卡正面</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('bankCardFm',4, 'addImg4')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_yhkfm.png" class="imgGray" id="bankCardFm">
                  <img v-show="addImg4" id='addImg4' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;银行卡反面</span>
              </div>
            </div>
          </li>
          <li class="IdCardLiFirst" v-if="shopList4.accounttype=='0'">
            <div class="IdCardText">
              <a>企业开户行许可证</a>
            </div>
            <div class="IdCardWrapper">
             
              <div class="IdCardDiv" @click="toChoosePicture('xukeZm',5,'addImg5')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="xukeZm">
                  <img v-show="addImg5" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;许可证</span>
              </div>          
              
            </div> 
          </li>
        </ul>
      </div>
      <div class="bottomBtn" :style={height:btnHeight} @click="goToStep4">
        <div :class="btnClass">
          <a>提交</a>
        </div>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="value1"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleChange">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      type="date"
      v-model="value2"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleChange2">
    </mt-datetime-picker>
    <van-popup v-model="showAccount" position="bottom">
      <van-area :area-list="AreaData" :columns-num="2" value="110101"  @confirm="getArea" @cancel="showAccount = false" />
    </van-popup>
    <van-popup v-model="showHangye" position="bottom">
      <van-picker show-toolbar
      @change="onChange"
      @cancel="onCancel"
      @confirm="onConfirm" 
      :columns="columns"/>
    </van-popup>
    <van-popup v-model="popupToast.show" position="bottom">
      <div style="width:100%">
        <TypeChoose 
          :showImage="popupToast.showImage"
          :imgSrc="popupToast.imgSrc"
          :chooseMsg="popupToast.chooseMsg"
          :firstMsg="popupToast.firstMsg"
          :secondMsg="popupToast.secondMsg"
          :name="popupToast.name"
          :addImg="popupToast.addImg"
          :imgIndex="popupToast.imgIndex"
          :thirdMsg="popupToast.thirdMsg"
          :showThirdMsg="popupToast.showThirdMsg"
          v-on:typeChoosed="typeChoosed">
        </TypeChoose>
      </div>
    </van-popup> 
    <MyLoading :myLoading="myLoading" :myLoadingMsg="myLoadingMsg"></MyLoading>
    <!-- </div> -->
  </div>
</template>
<script>
import ShopCreateHeader from "./ShopCreateHeader";
import TypeChoose from "../TypeChoose/TypeChoose";
import { dateExchange } from "../../common/js/myDate.js";
import BScroll from "better-scroll";
import { Area, Popup, Picker } from "vant";
import { DatetimePicker } from "mint-ui";
import { Toast } from "vant";
import {
  cameraTakePicture,
  getLocalPicture
} from "../../../static/cordovaplugin.js";
import AreaData from "../../common/data/Area.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import MyLoading from "../PublicComponents/MyLoading";
import upLoadImg from "./upLoadImg.js";
import creatMerchant from "./creatMerchant.js";

// import Three  from './Three.vue'
// import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
const citys = {
  一般类: {
    name: [
      "兽医服务",
      "农业合作",
      "景观美化及园林服务",
      "铁路运输",
      "救护车服务"
    ],
    code: [742, 763, 780, 4011, 4119]
  },
  房车类: {
    name: ["一般承包商-住宅与商业"],
    code: [1520]
  },
  民生类: {
    name: [
      "中国人民共和国铁道部",
      "本市和市郊挺勤旅游运输",
      "铁路客运",
      "出租车服务",
      "公路客运"
    ],
    code: [3998, 4111, 4112, 4121, 4131]
  }
};
export default {
  data() {
    return {
      //图片的base64格式
      imgBase64: {
        mtImgBase64: "",
        mdcsImgBase64: "",
        mdsytImgBase64: "",
        mdcpImgBase64: ""
      },
      //上传图片的loading
      myLoading: false,
      myLoadingMsg: "",

      touchmoveData: {
        startX: "",
        startY: "",
        endX: "",
        endX: ""
      },
      myBackgroundImage: "url(" + require("./image/pic_shsq.png") + ")",
      btnHeight: "",
      columns: [
        {
          values: Object.keys(citys)
        },
        {
          values: citys["一般类"]["name"],
          code: citys["一般类"]["code"]
        }
      ],
      AreaData,
      showHangye: false,
      show1: false,
      model1: "",
      bgHeight: "",
      establishDate: "请选择",
      closeDate: "请选择",
      regCity: "请选择",
      provinceDomType: "请选择",
      havaImg: [true, true, true, true],
      haveFill: true,

      value: null,
      value1: null,
      value2: null,
      startDate: new Date("1992-05-09"),
      endDate: new Date("2049-05-09"),
      //选择框
      popupToast: {
        show: false,
        showImage: false,
        imgSrc: "",
        chooseMsg: "",
        firstMsg: "",
        secondMsg: "",
        name: "",
        imgIndex: "",
        ThirdMsg: "",
        showThirdMsg: "",
        addImg: ""
      },
      accountType: "请选择",
      areaList: {
        province_list: {
          "100000": "一般类",
          "110000": "房车类",
          "120000": "民生类"
        },
        city_list: {
          "10010742": "兽医服务",
          "10020763": "农业合作",
          "10030780": "景观美化及园林服务",
          "10044011": "铁路运输",
          "10054119": "救护车服务",
          "11011520": "一般承包商住宅与商业",
          "12023998": "中国人民共和国铁道部",
          "12034111": "本市和市郊通勤旅游运输",
          "12044112": "铁路客运",
          "12054121": "出租车服务",
          "12064131": "公路客运"
        }
      },
      myProperty: "请选择",
      myMchdealtype: "请选择",
      myContact_type: "请选择",
      myMcc: "请选择",
      //账户类型
      accountType1: "请选择",
      //开户省市 二级
      showAccount: false,
      accountCity: "请选择",
      //照片

      addImg1: true, //身份证正面
      addImg2: true, //身份证反面
      addImg3: true, //银行卡正面
      addImg4: true, //银行卡反面
      addImg5: true, //许可证
      imageFlag: "",
      //图片的base64格式
      imgBase64: {
        sfzzmImgBase64: "", //身份证照正面
        sfzfmImgBase64: "", //身份证反面
        yhkzmImgBase64: "", //银行卡正面
        yhkfmImgBase64: "", //银行卡反面
        xukeImgBase64: "" //许可证
      },

      shopList4: {
        accounttype: "", //	账户类型  0：对公账户，1：对私法人账户, 2:对私授权人
        //对公必填
        enterprise_openint_licence: "a3d1582530b14ac19e2f2e240c7ccb1d",
        enterprise_account_cert: "a3d1582530b14ac19e2f2e240c7ccb1d", //可选 一般账户
        //对私法人必填 ,对私授权人必传
        bankcard_image1: "", //银行卡正面
        bankcard_image2: "", //银行卡反面
        //对私授权人必传
        idcard_image1: "", //授权人身份证正面
        idcard_image2: "", //授权人身份证反面

        accountname: "张三", //开户人
        bankname: "工商银行", //开户银行
        sub_bank_name: "中国工商银行股份有限公司北京长安支行", //开户支行
        account_code: "622212345678901234", //银行账户
        open_bank_pro: "", //开户行省市
        open_bank_city: "", //开户行城市
        tel: "13312312312" //预留手机号
      },
      mccDataEmpty: [],
      mccData: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ],
      A: "",
      YX: [
        {
          text: "计信院",
          ZY: [
            { text: "软件工程" },
            { text: "计算机科学与技术" },
            { text: "信息安全" }
          ]
        },
        {
          text: "商学院",
          ZY: [{ text: "旅游管理" }, { text: "工商管理" }, { text: "行政管理" }]
        }
      ]
    };
  },
  computed: {
    btnClass() {
      if (
        this.shopList4.licence_name &&
        this.shopList4.storeshortname &&
        this.shopList4.property !== "请选择" &&
        this.shopList4.mchdealtype !== "请选择" &&
        this.shopList4.mcc !== "请选择" &&
        this.shopList4.address &&
        this.shopList4.business_time &&
        this.shopList4.contact_type !== "请选择" &&
        this.shopList4.contact_number &&
        !this.addImg0 &&
        !this.addImg1 &&
        !this.addImg2 &&
        !this.addImg3
      ) {
        return "btnLight";
      } else {
        return "btn";
      }
    }
  },
  components: {
    TypeChoose,
    ShopCreateHeader,
    DatetimePicker,
    Area,
    Popup,
    MyLoading
  },
  methods: {
    checkData() {
      // if (!this.shopList4.licence_name){
      //   Toast('请输入营业执照名称')
      //   return false
      // } else if (!this.shopList4.storeshortname){
      //   Toast('请输入门店简称')
      //   return false
      // }else if (this.shopList4.property === '请选择'){
      //   Toast('请选择门店产权')
      //   return false
      // }else if (this.shopList4.mchdealtype === '请选择'){
      //   Toast('请选择经营类型')
      //   return false
      // }else if (this.shopList4.mcc === '请选择'){
      //   Toast('请选择行业类别')
      //   return false
      // }else if (!this.shopList4.address){
      //   Toast('请输入门店地址')
      //   return false
      // }else if (!this.shopList4.business_time){
      //   Toast('请输入经营时间')
      //   return false
      // }else if (this.shopList4.contact_type === '请选择'){
      //   Toast('请选择联系人类型')
      //   return false
      // }else if (!this.shopList4.contact_number){
      //   Toast('请输入联系人手机')
      //   return false
      // }
      // else if(this.addImg0){
      //   Toast('请上传门头照')
      //   return false
      // } else if(this.addImg1){
      //   Toast('请上传门店场所照')
      //   return false
      // } else if(this.addImg2){
      //   Toast('请上传门店收银台照')
      //   return false
      // } else if(this.addImg3){
      //   Toast('请上传门店产品照')
      //   return false
      // }  else {
      //   console.log('输入成功')
      //   return true
      // }
      return true;
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
    //点击获取账户类型
    getAccountType1() {
      this.popupToast.show = true;
      this.popupToast.showImage = false;
      this.popupToast.chooseMsg = "请选择账户类型";
      this.popupToast.firstMsg = "对公账户";
      this.popupToast.secondMsg = "对私法人账户";
      this.popupToast.thirdMsg = "对私授权人";
      this.popupToast.showThirdMsg = true;
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0;
    },
    //弹出选择行业类别
    toastHangye() {
      this.showHangye = true;
      this._inputBlur();
    },
    //选择行业类别时候滑动时候触发的onChange函数
    onChange(picker, values) {
      console.log(values);
      // console.log(picker.getColumnIndex(1))
      // console.log(this.columns[1].code[picker.getColumnIndex(1)])
      picker.setColumnValues(1, citys[values[0]].name);
    },
    onCancel() {
      console.log("取消");
    },
    onConfirm(value, index) {
      console.log(citys[value[0]].name[index[1]]);
      console.log(citys[value[0]].code[index[1]]);
      this.myMcc = citys[value[0]].name[index[1]];
      this.shopList4.mcc = citys[value[0]].code[index[1]];
      this.showHangye = false;
    },
    result1(ret) {
      this.model1 = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
    },
    //点击弹出选择拍照或者照片选择
    toChoosePicture(name, index, addImg) {
      this._inputBlur();
      this.popupToast.show = true;
      this.popupToast.showImage = true;
      this.popupToast.chooseMsg = "请选择上传方式";
      this.popupToast.firstMsg = "拍摄";
      this.popupToast.secondMsg = "相册";
      this.popupToast.name = name;
      this.popupToast.addImg = addImg;
      this.popupToast.imgIndex = index;
      this.popupToast.showThirdMsg = false;
      if (name === "idCardZm") {
        this.popupToast.imgSrc = require("./image/pic_sfzzm@2x.png");
      } else if (name === "idCardFm") {
        this.popupToast.imgSrc = require("./image/pic_sfzfm@2x.png");
      } else if (name === "xukeZm") {
        this.popupToast.imgSrc = require("./image/pic_scsfz@2x.png");
      } else if (name === "bankCardZm") {
        this.popupToast.imgSrc = require("./image/pic_yhkzm@2x.png");
      } else if (name === "bankCardFm") {
        this.popupToast.imgSrc = require("./image/pic_yhkfm@2x.png");
      }
    },
    //选择门店产权
    chooseProperty() {
      this._inputBlur();
      this.popupToast.show = true;
      this.popupToast.showImage = false;
      this.popupToast.chooseMsg = "请选择门店产权类型";
      this.popupToast.firstMsg = "租赁";
      this.popupToast.secondMsg = "自购";
      this.popupToast.showThirdMsg = false;
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0;
    },
    //选择联系人类型
    chooseContact_type() {
      this._inputBlur();
      this.popupToast.show = true;
      this.popupToast.showImage = false;
      this.popupToast.chooseMsg = "请选择联系人类型";
      this.popupToast.firstMsg = "财务";
      this.popupToast.secondMsg = "法人";
      this.popupToast.thirdMsg = "授权人";
      this.popupToast.showThirdMsg = true;
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0;
    },
    //选择经营类型
    chooseMchdealtype() {
      this._inputBlur();
      this.popupToast.show = true;
      this.popupToast.showImage = false;
      this.popupToast.chooseMsg = "请选择商户经营类型";
      this.popupToast.firstMsg = "实体";
      this.popupToast.secondMsg = "虚拟";
      this.popupToast.showThirdMsg = false;
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0;
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
        click: true,
        probeType: 3
      });
      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScroll.on("scroll", pos => {
        if (pos.y > 10) {
          // console.log('下拉距离超过10,文本框失去焦点')
          this._inputBlur();
        } else if (pos.y < -10) {
          // console.log('上拉距离超过10,文本框失去焦点')
          this._inputBlur();
        }
      });
    },
    openPicker() {
      this.$refs.picker.open();
    },
    openPicker2() {
      this.$refs.picker2.open();
    },
    //获取成立日期
    handleChange(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.establishDate = date_value;
    },
    //获取截止日期
    handleChange2(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.closeDate = date_value;
    },
    //获取城市名称
    getArea(value) {
      this.showAccount = false;
      let myArea = "";
      value.forEach((item, index) => {
        if (index < 1) {
          myArea += item.name + "-";
          this.shopList4.open_bank_pro = item.name;
        } else {
          myArea += item.name;
          this.shopList4.open_bank_city = item.name;
        }
      });
      console.log(JSON.stringify(myArea));
      this.accountCity = myArea;
    },
    //弹出选择城市
    toastArea() {
      this.showAccount = true;
      this._inputBlur();
    },
    //选择完成
    typeChoosed(data) {
      console.log("选择的==" + data);
      this.popupToast.show = false;
      if (data[0] === "拍摄") {
        // this.havaImg[data[2]] = false
        this._cameraTakePicture(data[1], data[4]);
      } else if (data[0] === "相册") {
        //const img = document.getElementsByClassName("addIdCardStep4")
        // this.havaImg[data[2],] = false
        this._getLocalPicture(data[1], data[4]);
      } else if (data[0] == "租赁") {
        this.shopList4.property = data[3] + 1;
        this.myProperty = data[0];
      } else if (data[0] == "自购") {
        this.shopList4.property = data[3] + 1;
        this.myProperty = data[0];
      } else if (data[0] == "实体") {
        this.shopList4.mchdealtype = data[3] + 1;
        this.myMchdealtype = data[0];
      } else if (data[0] == "虚拟") {
        this.shopList4.mchdealtype = data[3] + 1;
        this.myMchdealtype = data[0];
      } else if (data[0] == "财务") {
        this.shopList4.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "法人") {
        this.shopList4.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "授权人") {
        this.shopList4.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "对公账户" || "对私法人账户" || "对私授权人") {
        this.accountType1 = data[0];

        this.shopList4.accounttype = data[3];
        this.$nextTick(() => {
          this.mainTopScroll.refresh();
        });
      }
    },
    _cameraTakePicture(name, addImgName) {
      console.log("cordovaplugin.js调用拍照走到");
      const idName = name;
      const addImg = addImgName;
      console.log("cordova----addImg===" + addImgName);
      const that = this;
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      });
      function onSuccess(imageData) {
        var image = document.getElementById(idName);
        console.log("调用手机拍照成功");
        console.log("拍照返回的图片imageData===" + imageData);

        console.log("拍摄照片拿到的addImg==" + addImg);

        if (addImg === "addImg1") {
          //身份证正面
          that.addImg1 = false;
          that.imgBase64.sfzzmImgBase64 = imageData;
          that.imageFlag = "idcard_image1";
        } else if (addImg === "addImg2") {
          //身份证反面
          that.imgBase64.sfzfmImgBase64 = imageData;
          that.addImg2 = false;
          that.imageFlag = "idcard_image2";
        } else if (addImg === "addImg3") {
          //银行卡正面
          that.imgBase64.yhkzmImgBase64 = imageData;
          that.addImg3 = false;
          that.imageFlag = "bankcard_image1";
        } else if (addImg === "addImg4") {
          //银行卡反面
          that.imgBase64.yhkfmImgBase64 = imageData;
          that.addImg4 = false;
          that.imageFlag = "bankcard_image2";
        } else if (addImg === "addImg5") {
          //许可证
          that.imgBase64.xukeImgBase64 = imageData;
          that.addImg5 = false;
          that.imageFlag = "enterprise_openint_licence";
        }
        // var addImgDiv = document.getElementById(addImg)
        // addImgDiv.style.display = "none"
        // return imageData
        image.src = "data:image/jpeg;base64," + imageData;
        that.uploadImage();
      }
      function onFail(message) {
        console.log("调用相机失败:" + message);
      }
    },
    _getLocalPicture(name, addImgName) {
      console.log("cordovaplugin.js调用相册走到");
      const idName = name;
      const addImg = addImgName;
      const that = this;
      console.log("cordova----idName===" + idName);
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 0
      });
      function onSuccess(imageData) {
        var image = document.getElementById(idName);
        console.log("调用手机相册成功");
        console.log("调用相册选择的图片imageData===" + imageData);

        console.log("拍摄照片拿到的addImg==" + addImg);
        // var addImgDiv = document.getElementById(addImg)
        // addImgDiv.style.display = "none"
        // return imageURI
        if (addImg === "addImg1") {
          //身份证正面
          that.addImg1 = false;
          that.imgBase64.sfzzmImgBase64 = imageData;
          that.imageFlag = "idcard_image1";
        } else if (addImg === "addImg2") {
          //身份证反面
          that.imgBase64.sfzfmImgBase64 = imageData;
          that.addImg2 = false;
          that.imageFlag = "idcard_image2";
        } else if (addImg === "addImg3") {
          //银行卡正面
          that.imgBase64.yhkzmImgBase64 = imageData;
          that.addImg3 = false;
          that.imageFlag = "bankcard_image1";
        } else if (addImg === "addImg4") {
          //银行卡反面
          that.imgBase64.yhkfmImgBase64 = imageData;
          that.addImg4 = false;
          that.imageFlag = "bankcard_image2";
        } else if (addImg === "addImg5") {
          //许可证
          that.imgBase64.xukeImgBase64 = imageData;
          that.addImg5 = false;
          that.imageFlag = "enterprise_openint_licence";
        }
        that.uploadImage();
        image.src = "data:image/jpeg;base64," + imageData;
      }
      function onFail(message) {
        console.log("调用手机相册失败:" + message);
      }
    },
    //调起上传图片接口
    uploadImage() {
      console.log("当前图片字段" + this.imageFlag);
      console.log("当前图片字段" + this.imageFlag);
      if (this.imageFlag == "idcard_image1") {
        var src1 = this.imgBase64.sfzzmImgBase64;
      } else if (this.imageFlag == "idcard_image2") {
        var src1 = this.imgBase64.sfzfmImgBase64;
      } else if (this.imageFlag == "bankcard_image1") {
        var src1 = this.imgBase64.yhkzmImgBase64;
      } else if (this.imageFlag == "bankcard_image2") {
        var src1 = this.imgBase64.yhkfmImgBase64;
      } else if (this.imageFlag == "enterprise_openint_licence") {
        var src1 = this.imgBase64.xukeImgBase64;
      }

      this.myLoading = true;
      this.myLoadingMsg = "照片上传中";

      this.myLoading = true;
      this.myLoadingMsg = "照片上传中";
      console.log("照片的base64图片===" + src1);
      let merObj = {
        image_type: "jpg",
        image_name: "name",
        image_content: src1
      };
      console.log("upload打印的图片数据===" + merObj.image_content);
      console.log(encodeURIComponent(merObj.image_content));
      //获取上传图片公共参数
      console.log("=====获取上传图片公共参数(含sign,method)========");
      let commonObj = commonParms(methodObj.imageUpload); //methodObj存储所有接口method值
      console.log(JSON.stringify(commonObj));
      //合并公共参数和请求参数
      console.log("=====合并公共参数========");
      let params = { ...merObj, ...commonObj };
      console.log(JSON.stringify(params));
      console.log("=====排序待签名字符串========");
      let str = dictOrder(params);
      console.log(str);
      console.log("=====签名========");
      // str ="charset=utf-8&format=JSON&hash_type=SHA256&image_name=txc&image_type=jpg&method=paxpay.material.image.upload&image_name=海底捞&partner_id=88888960&sign_type=RSA&timestamp=2013-01-01 08:08:08&version=1.0";
      params.sign = encrypt(str);
      console.log(params);
      console.log(params.sign);
      // this.upload = params.sign;
      params.image_content = encodeURIComponent(params.image_content);
      console.log("准备发送请求的参数==" + JSON.stringify(params));
      this._Axios
        .post("/cms/gateway.do", params)
        .then(res => {
          // console.log("post访问公网接口返回的数据===");
          console.log("post访问公网接口返回的数据===" + JSON.stringify(res));
          console.log("=====验签========");
          let str2 = dictOrder(res.response);
          console.log(str2);
          let flag = decode(str2, res.sign);
          if (flag) {
            if (res.response.code === "10000") {
              console.log("照片上传成功");
              //返回的code为10000表示图片上传成功
              console.log("ally1中取到的图片id==" + JSON.stringify(res));
              this.myLoading = false;
              this.shopList4[this.imageFlag] = res.response.image_id;
            } else {
              this.myLoading = false;
              Toast("照片上传失败");
              return;
            }
          } else {
            Toast("数据验签不通过");
          }
        })
        .catch(() => {
          console.log("catch图片上传失败");
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        });
    },
    goToStep4() {
      this.$router.push({ path: "./ShopCreate5" });

      this.myLoading = true;
      this.myLoadingMsg = "门店创建中";

      const MerchantApplyEntitity = this.$store.state.shopCreateEntitity;
      console.log("shopstore:" + JSON.stringify(MerchantApplyEntitity));
      /*shopList4: {
        accounttype: "", //	账户类型  0：对公账户，1：对私法人账户, 2:对私授权人
        //对公必填
        enterprise_openint_licence: "a3d1582530b14ac19e2f2e240c7ccb1d",
        enterprise_account_cert: "a3d1582530b14ac19e2f2e240c7ccb1d", //可选 一般账户
        //对私法人必填 ,对私授权人必传
        bankcard_image1:"",//银行卡正面
        bankcard_image2:"",//银行卡反面
        //对私授权人必传
        idcard_image1:"",//授权人身份证正面
        idcard_image2:"",//授权人身份证反面

        accountname: "张三", //开户人
        bankname: "工商银行", //开户银行
        sub_bank_name: "中国工商银行股份有限公司北京长安支行", //开户支行
        account_code: "622212345678901234", //银行账户
        open_bank_pro: "", //开户行省市
        open_bank_city: "", //开户行城市
        tel: "13312312312" //预留手机号
      },*/
      MerchantApplyEntitity.biz_content.accounttype = this.shopList4.accounttype;
      MerchantApplyEntitity.biz_content.enterprise_openint_licence = this.shopList4.enterprise_openint_licence;
      MerchantApplyEntitity.biz_content.bankcard_image1 = this.shopList4.bankcard_image1;
      MerchantApplyEntitity.biz_content.bankcard_image2 = this.shopList4.bankcard_image2;
      MerchantApplyEntitity.biz_content.idcard_image1 = this.shopList4.idcard_image1;
      MerchantApplyEntitity.biz_content.idcard_image2 = this.shopList4.idcard_image2;
      MerchantApplyEntitity.biz_content.accountname = this.shopList4.accountname;
      MerchantApplyEntitity.biz_content.bankname = this.shopList4.bankname;
      MerchantApplyEntitity.biz_content.sub_bank_name = this.shopList4.sub_bank_name;
      MerchantApplyEntitity.biz_content.account_code = this.shopList4.account_code;
      MerchantApplyEntitity.biz_content.open_bank_pro = this.shopList4.open_bank_pro;
      MerchantApplyEntitity.biz_content.open_bank_city = this.shopList4.open_bank_city;
      MerchantApplyEntitity.biz_content.tel = this.shopList4.tel;
      this.$store.commit("setShopCreateEntitity", MerchantApplyEntitity);
      console.log(JSON.stringify(this.$store.state.shopCreateEntitity));
      //商户创建
      //merObj对象放置公共参数外的所有参数
      let merObj = {};
      merObj = {
        operate_notify_url: "http://example.com/gateway.do",
        biz_content: MerchantApplyEntitity.biz_content
      };
      let commonObj = commonParms(methodObj.shopCreate); //methodObj存储所有接口method值
      // console.log(commonObj);
      //合并公共参数和请求参数
      console.log("=====合并公共参数========");
      // console.log(merObj);

      let params = { ...merObj, ...commonObj };
      // console.log(params);

      console.log("=====排序待签名字符串========");
      let str = dictOrder(params);

      console.log("=====签名========");

      params.sign = encrypt(str);
      this.mer = encrypt(str);

      params.biz_content = JSON.stringify(params.biz_content);
      // console.log('请求开始:'+new Date().format("yyyy-MM-dd hh:mm:ss"));
      this._Axios
        .post("/cms/gateway.do", params)
        .then(res => {
          console.log("响应结束:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
          console.log("post访问公网接口返回的数据===");

          console.log(res);
          console.log("=====验签========");
          let str2 = dictOrder(res.response);
          console.log(str2);
          console.log(decode(str2, res.sign));
          this.merflag = decode(str2, res.sign);
          if (this.merflag) {
            if (res.response.code === "10000") {
              this.myLoading = false;
              Toast("门店创建成功");
            } else {
              this.myLoading = false;
              Toast("门店创建失败");
              return;
            }
          }
        })
        .catch(e => {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        });

      // this.$router.push({path:'./shopList4'})
      // const params = this.$store.state.merchantApplyEntitity;
      // console.log(params);
      // this.myLoadingMsg = "商户创建中";
      // try {
      //   const creatMerchantDataRes = await creatMerchant(params);
      //   if (creatMerchantDataRes === "10000") {
      //     this.myLoading = false;
      //     Toast("商户创建成功");
      //   } else {
      //     this.myLoading = false;
      //     Toast("门店创建失败");
      //     return;
      //   }

      // }
    }
  },
  created() {
    this.bgHeight = document.body.scrollHeight * 35 / 100 + "px";
    this.btnHeight = document.body.scrollHeight * 13 / 100 + "px";
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  update() {
    console.log("更新");
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

// @import 'iview/dist/styles/iview.css'
.transitionWrapper{
  width: 100%;
  height: 100%;

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
           &.first-child {
            opacity: 0.4;
          }
          position: absolute;
          width: 130%;
          border-bottom: 1px dashed #fff;
          height: 0;
          left: 25px;
          // opacity: 0.4;
          top: 50%;
        }
        .solided {
          position: absolute;
          width: 130%;
          border-bottom: 1px solid #fff;
          height: 0;
          left: 25px;
          opacity:1;
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

    .mainTop {
      width: 90%;
      height: 90%;
      background: #FFFFFF;
      margin-top: -10%;
      overflow: hidden;

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
            width: 35%;
          }

          input {
            display: block;
            width: 65%;
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
              display: flex;
              flex: 1;
              flex-direction: column;
              align-items: center;

              // background #F7F8F9
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

                .addIdCardStep3 {
                  position: absolute;
                  top: 50%;
                  left: 41%;
                  transform: translateY(-50%);
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
        }

        .IdCardLiFirst {
          width: 90%;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: start;

          .IdCardText {
            height: 50px;
            display: flex;
            align-items: center;

            a {
              font-size: 15px;
              font-weight: bold;
            }
          }

          .IdCardWrapper {
            position: relative;
            width: 146px;
            // height: 109px;
            mixinDisplay();

            // background: #F7F8F9;
            .IdCardDiv {
              display: flex;
              flex: 1;
              flex-direction: column;
              align-items: center;

              // background #F7F8F9
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

                .addIdCardStep3 {
                  position: absolute;
                  top: 50%;
                  left: 41%;
                  transform: translateY(-50%);
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
        }

        .borderNone {
          border: none;
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
            text-align: right;
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