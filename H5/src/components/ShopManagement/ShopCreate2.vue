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
            <div class="dashed first-child"></div>
          </div>
          <span>法人信息</span>   
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>3</a>
            <div class="dashed"></div>
          </div>
          <span>资质证照</span>
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>4</a>
            <div class="dashed"></div>
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
            <a>证件类型</a>
            <div @click="getAccountType">
              <span>{{accountType}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li >
        
            <!-- 法人开始 -->
           <li class="inputLi">
            <a>法人姓名</a>
            <input type="text" v-model="shopList2.legal_name" placeholder="请输入姓名"  /> 
          </li>
          
          <li class="inputLi">
            <a>身份证号码</a>
            <input type="text" v-model="shopList2.legal_id_no" placeholder="请输入身份证号码"  />
          </li>
          <li class="inputLi">
            <a>起始有效期</a>
            <div @click="openPickerLegal">
              <span>{{shopList2.legal_id_start}}</span>
              <img src="./image/btn_more2.png">
            </div>   
          </li>
          <li class="inputLi">     
            <a style="width:60%">截止有效期</a>
            <div @click="openPickerLegal2">
              <span>{{shopList2.legal_id_end}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="IdCardLiFirst" v-if="shopList2.legal_id_type=='1'">
            <div class="IdCardText">
              <a>身份证照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('idCardZm',0,'addImg0')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzrxm.png" class="imgGray" id="idCardZm">
                  <img v-show="addImg0" id="addImg0" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;人像面</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('idCardFm',1,'addImg1')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzghm.png" class="imgGray" id="idCardFm">
                  <img v-show="addImg1" id="addImg1" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;国徽面</span>
              </div>
              <div class="IdCardDiv" @click="toChoosePicture('idCardSc',2 ,'addImg2')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_scsfz.png" class="imgGray" id="idCardSc">
                  <img v-show="addImg2" id='addImg2' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;手持身份证</span>
              </div>
            </div> 
          </li>
           <li class="IdCardLiFirst" v-if="shopList2.legal_id_type=='2'">
            <div class="IdCardText">
              <a>护照照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('huzhaoZm',5,'addImg5')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_yhkzm.png" class="imgGray" id="huzhaoZm">
                  <img v-show="addImg5" id='addImg5' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;法人护照(原件)</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('huzhaoFm',6, 'addImg6')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_yhkfm.png" class="imgGray" id="huzhaoFm">
                  <img v-show="addImg6" id='addImg6' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;法人护照(翻译)</span>
              </div>
            </div> 
          </li>
          <!-- 法人结束 -->
        </ul>
      </div>
      <div class="bottomBtn" :style={height:btnHeight} @click="goToStep3">
        <div :class="btnClass">
          <a>下一步</a>
        </div>
      </div>
    </div>
     <!-- 身份证发证截止时间 开始-->
    <mt-datetime-picker
      ref="pickerLegal"
      type="date"
      v-model="value1"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleChangeLegal">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="pickerLegal2"
      type="date"
      v-model="value2"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleChangeLegal2">
    </mt-datetime-picker>
    <!-- 身份证结束 -->
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
  </div>
</template>
<script>

import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import ShopCreateHeader from "./ShopCreateHeader";
import TypeChoose from "../TypeChoose/TypeChoose";
import { dateExchange } from "../../common/js/myDate.js";
import BScroll from "better-scroll";
import { Area, Popup } from "vant";
import { Toast } from "vant";
import {
  cameraTakePicture,
  getLocalPicture
} from "../../../static/cordovaplugin.js";

export default {
  data() {
    return {
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
        show: false,
        showImage: false,
        imgSrc: "",
        chooseMsg: "",
        firstMsg: "",
        secondMsg: "",
        name: "",
        imgIndex: ""
      },
      //身份证时间
      value1: null,
      value2: null,
      startDate: new Date("1992-05-09"),
      endDate: new Date("2049-05-09"),
      //证件类型
      accountType: "请选择",
      //照片
      addImg0: true,
      addImg1: true,
      addImg2: true,
      addImg3: true,
      addImg4: true,
      addImg5: true,
      addImg6: true,
      imageFlag: "",
      //图片的base64格式
      imgBase64: {
        sfzzmImgBase64: "", //身份证照正面
        sfzfmImgBase64: "", //身份证反面
        scsfzImgBase64: "", //手持身份证
        yhkzmImgBase64: "", //银行卡正面
        yhkfmImgBase64: "", //银行卡反面
        hzzmImgBase64: "", //护照正面
        hzfmImgBase64: "" //护照反面
      },
      shopList2: {
        legal_id_type: "", //证件类型 1身份证2护照
        legal_name: "张三", //法人姓名
        legal_id_no: "500106198606304321", //证件号
        //身份证必填开始
        legal_id_image1: "a3d1582530b14ac19e2f2e240c7ccb1d", //正面照片
        legal_id_image2: "a3d1582530b14ac19e2f2e240c7ccb1d", //背面照片
        legal_id_image5: "a3d1582530b14ac19e2f2e240c7ccb1d", //手持身份证照片
        legal_id_start: "请选择", //证件有效期起始日期
        legal_id_end: "请选择", //证件有效期截止日期
        //身份证必填结束
        //护照必填开始
        legal_id_image3: "a3d1582530b14ac19e2f2e240c7ccb1d", //原照
        legal_id_image4: "a3d1582530b14ac19e2f2e240c7ccb1d" //翻译照

        //护照必填结束
      }
    };
  },
  components: {
    TypeChoose,
    ShopCreateHeader,
    Popup
  },
  computed: {
    btnClass() {
      if (
        this.shopList2.legal_name &&
        this.accountType !== "请选择" &&
        this.shopList2.legal_id_no
      ) {
        return "btnLight";
      } else {
        return "btn";
      }
    }
  },
  methods: {
    checkData() {
      // console.log(this.merchant_name
      if (!this.shopList2.legal_name) {
        Toast("请输入法人姓名");
        return false;
      } else if (this.accountType === "请选择") {
        Toast("请选择证件类型");
        return false;
      } else if (!this.shopList2.legal_id_no) {
        Toast("请输入身份证号码");
        return false;
      } else {
        console.log("输入成功");
        return true;
      }
    },
    myTouchStart(e) {
      this.touchmoveData.startX = e.changedTouches[0].pageX;
      this.touchmoveData.startY = e.changedTouches[0].pageY;
      console.log("起始位置X==" + this.touchmoveData.startX);
      console.log("起始位置Y==" + this.touchmoveData.startY);
    },
    myTouchEnd(e) {
      this.touchmoveData.endX = e.changedTouches[0].pageX;
      this.touchmoveData.endY = e.changedTouches[0].pageY;
      console.log("结束位置X==" + this.touchmoveData.endX);
      console.log("结束位置Y==" + this.touchmoveData.endY);
      if (Math.abs(this.touchmoveData.endX - this.touchmoveData.startX) > 2) {
        console.log("X方向上滑动了");
        this._inputBlur();
      }
      if (Math.abs(this.touchmoveData.endY - this.touchmoveData.startY) > 2) {
        console.log("Y方向上滑动了");
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
    //------身份证开始时间
    openPickerLegal() {
      this.$refs.pickerLegal.open();
    },
    openPickerLegal2() {
      this.$refs.pickerLegal2.open();
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
      } else if (name === "idCardSc") {
        this.popupToast.imgSrc = require("./image/pic_scsfz@2x.png");
      } else if (name === "bankCardZm") {
        this.popupToast.imgSrc = require("./image/pic_yhkzm@2x.png");
      } else if (name === "bankCardFm") {
        this.popupToast.imgSrc = require("./image/pic_yhkfm@2x.png");
      } else if (name === "huzhaoZm") {
        this.popupToast.imgSrc = require("./image/pic_hz@2x.png");
      } else if (name === "huzhaoFm") {
        this.popupToast.imgSrc = require("./image/pic_hz@2x.png");
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
    //选择完成
    typeChoosed(data) {
      console.log("选择的==" + data);
      this.popupToast.show = false;
      if (data[0] == "身份证") {
        this.accountType = data[0];
        this.shopList2.legal_id_type = "1";
      } else if (data[0] == "护照") {
        this.accountType = data[0];
        this.shopList2.legal_id_type = "2";
      } else if (data[0] === "拍摄") {
        this._cameraTakePicture(data[1], data[4]);
      } else if (data[0] === "相册") {
        this._getLocalPicture(data[1], data[4]);
      }
      this.$nextTick(() => {
        this.mainTopScroll.refresh();
      });
    },
    //拍照获取营业照照片
    _cameraTakePicture(id, addImgName) {
      console.log(id);
      console.log("cordovaplugin.js调用拍照走到");
      const idName = id;
      const addImg = addImgName;
      console.log("cordova----addImg===" + addImgName);
      const that = this;
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      });
      function onSuccess(imageData) {
        console.log("拍照成功：" + id);
        var image = document.getElementById(id);
        console.log("调用手机拍照成功");
        console.log("拍照返回的图片imageData===" + imageData);
        console.log("拍摄照片拿到的addImg==" + addImg);

        /*
        sfzzmImgBase64:'',//身份证照正面
        sfzfmImgBase64:'',//身份证反面
        scsfzImgBase64:'',//手持身份证
        yhkzmImgBase64:'',//银行卡正面
        yhkfmImgBase64:'',//银行卡反面
        hzzmImgBase64:'',//护照正面
        hzfmImgBase64:''//护照反面
        //身份证必填开始
        legal_id_image1: "a3d1582530b14ac19e2f2e240c7ccb1d", //正面照片
        legal_id_image2: "a3d1582530b14ac19e2f2e240c7ccb1d", //背面照片
        legal_id_image5: "a3d1582530b14ac19e2f2e240c7ccb1d", //手持身份证照片
        //身份证必填结束
        //护照必填开始
        legal_id_image3: "a3d1582530b14ac19e2f2e240c7ccb1d", //原照
        legal_id_image4: "a3d1582530b14ac19e2f2e240c7ccb1d" //翻译照
*/
        //护照必填结束
        if (addImg === "addImg0") {
          //身份证正面
          that.addImg0 = false;
          that.imgBase64.sfzzmImgBase64 = imageData;
          that.imageFlag = "legal_id_image1";
        } else if (addImg === "addImg1") {
          //身份证反面
          that.imgBase64.sfzfmImgBase64 = imageData;
          that.addImg1 = false;
          that.imageFlag = "legal_id_image2";
        } else if (addImg === "addImg2") {
          //手持身份证
          that.imgBase64.scsfzImgBase64 = imageData;
          that.addImg2 = false;
          that.imageFlag = "legal_id_image5";
        } else if (addImg === "addImg3") {
          //银行卡正面
          that.imgBase64.yhkzmImgBase64 = imageData;
          that.addImg3 = false;
          that.imageFlag = "main_image";
        } else if (addImg === "addImg4") {
          //银行卡反面
          that.imgBase64.yhkfmImgBase64 = imageData;
          that.addImg4 = false;
          that.imageFlag = "main_image";
        } else if (addImg === "addImg5") {
          //护照正面
          that.imgBase64.hzzmImgBase64 = imageData;
          that.addImg5 = false;
          that.imageFlag = "legal_id_image3";
        } else if (addImg === "addImg6") {
          //护照反面
          that.imgBase64.hzfmImgBase64 = imageData;
          that.addImg6 = false;
          that.imageFlag = "legal_id_image4";
        }

        console.log("图片" + that.imageFlag);

        image.src = "data:image/jpeg;base64," + imageData;
        that.uploadImage();
      }
      function onFail(message) {
        alert("调用相机失败:" + message);
      }
    },
    //获取手机相册上的营业照照片
    _getLocalPicture(id, addImgName) {
      console.log("cordovaplugin.js调用相册走到");
      console.log(id);
      const idName = id;
      const addImg = addImgName;
      const that = this;
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 0
      });
      function onSuccess(imageData) {
        console.log("id" + id);
        console.log("imageData==" + imageData);
        var image = document.getElementById(id);
        console.log("调用手机拍照成功");
        console.log("拍照返回的图片imageData===" + imageData);

        console.log("调用相册拿到的addImg==" + addImg);
        if (addImg === "addImg0") {
          //身份证正面
          that.addImg0 = false;
          that.imgBase64.sfzzmImgBase64 = imageData;
          that.imageFlag = "legal_id_image1";
        } else if (addImg === "addImg1") {
          //身份证反面
          that.imgBase64.sfzfmImgBase64 = imageData;
          that.addImg1 = false;
          that.imageFlag = "legal_id_image2";
        } else if (addImg === "addImg2") {
          //手持身份证
          that.imgBase64.scsfzImgBase64 = imageData;
          that.addImg2 = false;
          that.imageFlag = "legal_id_image5";
        } else if (addImg === "addImg3") {
          //银行卡正面
          that.imgBase64.yhkzmImgBase64 = imageData;
          that.addImg3 = false;
          that.imageFlag = "main_image";
        } else if (addImg === "addImg4") {
          //银行卡反面
          that.imgBase64.yhkfmImgBase64 = imageData;
          that.addImg4 = false;
          that.imageFlag = "main_image";
        } else if (addImg === "addImg5") {
          //护照正面
          that.imgBase64.hzzmImgBase64 = imageData;
          that.addImg5 = false;
          that.imageFlag = "legal_id_image3";
        } else if (addImg === "addImg6") {
          //护照反面
          that.imgBase64.hzfmImgBase64 = imageData;
          that.addImg6 = false;
          that.imageFlag = "legal_id_image4";
        }
        console.log("图片" + that.imageFlag);

        // that.havaBusinessImg = false
        image.src = "data:image/jpeg;base64," + imageData;
        console.log("图片的src==" + image.src);
        that.uploadImage();
      }
      function onFail(message) {
        console.log("调用手机相册失败");
      }
    },
    //调起上传图片接口
    uploadImage() {
      console.log("当前图片字段" + this.imageFlag);
      if (this.imageFlag == "legal_id_image1") {
        var src1 = this.imgBase64.sfzzmImgBase64;
      } else if (this.imageFlag == "legal_id_image2") {
        var src1 = this.imgBase64.sfzfmImgBase64;
      } else if (this.imageFlag == "legal_id_image5") {
        var src1 = this.imgBase64.scsfzImgBase64;
      } else if (this.imageFlag == "legal_id_image3") {
        var src1 = this.imgBase64.hzzmImgBase64;
      } else if (this.imageFlag == "legal_id_image4") {
        var src1 = this.imgBase64.hzfmImgBase64;
      }

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
              console.log("ally1中取到的图片id==" + imgUpLoadDataRes[2]);
              this.myLoading = false;
              this.shopList1[imageFlag] = res.response.image_id;
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
    //------身份证开始时间
    openPickerLegal() {
      this.$refs.pickerLegal.open();
    },
    openPickerLegal2() {
      this.$refs.pickerLegal2.open();
    },
    handleChangeLegal(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList2.legal_id_start = date_value;
    },

    handleChangeLegal2(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList2.legal_id_end = date_value;
    },
    //身份证截止时间
    goToStep3() {
      // if (this.checkData()) {
      //   console.log("111");
      console.log(this.shopList2);
      //   console.log("222");
      const MerchantApplyEntitity = this.$store.state.shopCreateEntitity;
      console.log(MerchantApplyEntitity);
      MerchantApplyEntitity.biz_content.legal_name = this.shopList2.legal_name;
      MerchantApplyEntitity.biz_content.legal_id_type = this.shopList2.legal_id_type;
      MerchantApplyEntitity.biz_content.legal_id_no = this.shopList2.legal_id_no;
      MerchantApplyEntitity.biz_content.legal_id_image1 = this.shopList2.legal_id_image1;
      MerchantApplyEntitity.biz_content.legal_id_image2 = this.shopList2.legal_id_image2;
      MerchantApplyEntitity.biz_content.legal_id_image5 = this.shopList2.legal_id_image5;
      MerchantApplyEntitity.biz_content.legal_id_image3 = this.shopList2.legal_id_image3;
      MerchantApplyEntitity.biz_content.legal_id_image4 = this.shopList2.legal_id_image4;
      MerchantApplyEntitity.biz_content.legal_id_start = this.shopList2.legal_id_start;
      MerchantApplyEntitity.biz_content.legal_id_end = this.shopList2.legal_id_end;

      this.$store.commit("setShopCreateEntitity", MerchantApplyEntitity);
      this.$router.push({ path: "./ShopCreate3" });
      // }
    }
  },
  created() {
    console.log(this.$store.state.merchantApplyEntitity);
    console.log(this.$store.state.shopCreateEntitity);
    this.bgHeight = document.body.scrollHeight * 35 / 100 + "px";
    this.btnHeight = document.body.scrollHeight * 13 / 100 + "px";
    this.$nextTick(() => {
      this._initScroll();
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.transitionWrapper {
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
                  left: 40%;
                  top: 50%;
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
          border-botto: solid 1px #F7F7F7;

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
            // justify-content: space-around
            flex-wrap: wrap;

            .IdCardDiv {
              display: flex;
              width: 50%;
              flex-direction: column;
              align-items: center;

              // background: #F7F8F9
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
                  left: 40%;
                  top: 50%;
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