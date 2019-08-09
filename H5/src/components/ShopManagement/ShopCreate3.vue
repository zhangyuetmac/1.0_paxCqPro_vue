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
            <div class="dashed first-child"></div>
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
            <a>企业类型</a>
            <div @click="showEnterpriseType = true">
              <span>{{enterprise_type}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
           <li class="inputLi">
            <a style="width:60%">统一社会信用代码</a>
            <input type="text" placeholder="点击输入代码"  v-model="shopList3.org_code" />
          </li>
          <li class="inputLi">     
            <a style=" width: 57%;">门店营业执照名称</a>
            <input type="text" placeholder="请保持与证件一致"   v-model="shopList3.licence_name" />
          </li >
          <li class="inputLi borderNone">
            <a>法定代表人</a>
            <input type="text" placeholder="请保持与证件一致"  v-model="shopList3.busi_legal_name"/>
          </li>
          <li class="inputLi">     
            <a>注册资本</a>
            <div class="million">
              <input type="number"   v-model="shopList3.reg_capital"/>
              万
            </div>
          </li>
          <li class="inputLi">
            <a>注册地址</a>
            <div @click="showBusi = true" class="regCity">
              <span>{{busiCity}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>详细地址</a>
            <input type="text" placeholder="点击输入地址" v-model="shopList3.busi_address"/> 
          </li>
          <li class="inputLi">
            <a>成立日期</a>
            <div @click="openPicker">
              <span>{{shopList3.busi_start}}</span>
              <img src="./image/btn_more2.png">
            </div>   
          </li>
          <li class="inputLi" v-if="shopList3.enterprise_type=='0'">     
            <a style="width:60%">营业期限截止日期</a>
            <div @click="openPicker2">
              <span>{{shopList3.busi_end}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="businessLicense">
            <div class="businessLicenseA">
              <a>营业执照</a>
            </div>
            <div class="businessLicenseImgWrapper" @click="popupToast.show = true">
              <img  src="./image/icon_yyzz.png" id="businessLicenseImg">
              <img v-show="havaBusinessImg"  class="add" src="./image/icon_add.png">
            </div>          
            <div class="businessLicenseSpan">
              <span>点击上传&nbsp;营业执照</span>
            </div>
          </li>

 
         
        </ul>
      </div>
      <div class="bottomBtn" :style={height:btnHeight} @click="goToStep4">
        <div :class="btnClass()">
          <a>下一步</a>
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
    <!-- 注册地址 -->
    <van-popup v-model="showBusi" position="bottom">
      <van-area :area-list="AreaData" :columns-num="3" value="110101"  @confirm="getBusi" @cancel="showBusi = false" />
    </van-popup>
     <!-- 营业执照 -->
     <van-popup v-model="popupToast.show" position="bottom">
      <div style="width:100%">
        <TypeChoose 
          :chooseMsg="bussinessType.chooseMsg"
          :firstMsg="bussinessType.firstMsg"
          :secondMsg="bussinessType.secondMsg"
          :showImage="popupToast.showImage"
          v-on:typeChoosed="bussinessChoosed">
        </TypeChoose>
      </div>
    </van-popup>
    <!-- 企业类型 -->
    <van-popup v-model="showEnterpriseType" position="bottom">
      <div style="width:100%">
        <TypeChoose 
          :chooseMsg="provinceType.chooseMsg"
          :firstMsg="provinceType.firstMsg"
          :secondMsg="provinceType.secondMsg"
          v-on:typeChoosed="typeEnterprise">
        </TypeChoose>
      </div>
    </van-popup> 
    <!-- 企业类型 -->
    <!-- 选择门店地址：省市区 -->
    <van-popup v-model="showBusi" position="bottom">
      <van-area :area-list="AreaData" :columns-num="3" value="110101"  @confirm="getBusi" @cancel="showBusi = false" />
    </van-popup>
    <!-- 选择联系人地址：省市区 -->
    <MyLoading :myLoading="myLoading" :myLoadingMsg="myLoadingMsg"></MyLoading>
  </div>
</template>
<script>
import ShopCreateHeader from "./ShopCreateHeader";
import TypeChoose from "../TypeChoose/TypeChoose";
import { dateExchange } from "../../common/js/myDate.js";
import BScroll from "better-scroll";
import { Area, Popup } from "vant";
import { DatetimePicker } from "mint-ui";
import { Toast } from "vant";
import AreaData from "../../common/data/Area.js";
import {
  cameraTakePicture,
  getLocalPicture
} from "../../../static/cordovaplugin.js";
import MyLoading from "../PublicComponents/MyLoading";
import upLoadImg from "./upLoadImg.js";

import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
export default {
  data() {
    return {
      //图片的base64格式
      imgBase64: {
        sfzzmImgBase64: "",
        sfzfmImgBase64: "",
        scsfzImgBase64: "",
        yhkzmImgBase64: "",
        yhkfmImgBase64: "",
        hzzmImgBase64: "",
        hzfmImgBase64: ""
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
      bgHeight: "",
      btnHeight: "",
      regCity: "请选择",
      provinceDomType: "请选择",
      havaImg: [true, true, true, true, true],
      haveFill: true,
      showArea: false,
      value: null,
      value1: null,
      value2: null,
      startDate: new Date("1992-05-09"),
      endDate: new Date("2049-05-09"),
      //选择框
      popupToast: {
        show: false,
        showImage: true
      },
      accountType: "请选择",
      //城市三级联动数据
      AreaData,
      //企业类型
      showEnterpriseType: false,
      enterprise_type: "请选择",
      provinceType: {
        chooseMsg: "请选择企业类型",
        firstMsg: "企业",
        secondMsg: "个体"
      },
      //门店地址
      showBusi: false,
      busiCity: "请选择",
      //营业执照照片
      havaBusinessImg: true,
      yyzzImgbase64: "",
      bussinessType: {
        chooseMsg: "请选择上传方式",
        firstMsg: "拍摄",
        secondMsg: "相册"
      },
      shopList3: {
        enterprise_type: "", //企业类型
        org_code: "H001232", //统一社会信用代码
        licence_name: "来伊份上海分公司", //门店营业执照名称（执照注册名称）
        busi_legal_name: "张三", //法定代表人
        reg_capital: "100", //注册资本
        busi_province: "", //注册地址省份编码
        busi_city: "", //注册地址城市编码
        busi_area: "", //注册地址区县编码
        busi_address: "", //注册地址详细地址
        busi_start: "请选择", //成立时间，营业开始时间
        busi_end: "请选择", //营业截止时间（企业必填）
        busi_license_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //营业执照图片

        //账户类型
        accounttype: "",
        //开户人
        accountname: "",
        //开户银行
        bankname: "",
        //开户支行,
        sub_bank_name: "",
        //银行账号
        account_code: "",
        //预留手机号
        tel: "",
        //持卡人身份证起始日期
        idcard_start: "请选择",
        //持卡人身份证截止日期
        idcard_end: "请选择",
        //开户省份
        open_bank_pro: "",
        //开户城市
        open_bank_city: ""
      }
    };
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
    btnClass() {
      if (
        this.accountType !== "请选择" &&
        this.shopList3.accountname &&
        this.shopList3.bankname &&
        this.shopList3.sub_bank_name &&
        this.shopList3.account_code &&
        this.regCity !== "请选择" &&
        this.shopList3.tel &&
        this.shopList3.idcard_start !== "请选择" &&
        this.shopList3.idcard_end !== "请选择" &&
        !this.addImg0 &&
        !this.addImg1 &&
        !this.addImg2 &&
        !this.addImg3 &&
        !this.addImg4 &&
        !this.addImg5 &&
        !this.addImg6
      ) {
        return "btnLight";
      } else {
        return "btn";
      }
    },
    checkData() {
      // console.log(this.merchant_name
      // if(this.accountType === '请选择'){
      //   Toast('请选择账户类型')
      //   return false
      // } else if (!this.shopList3.accountname){
      //   Toast('请输入开户人')
      //   return false
      // } else if (!this.shopList3.bankname){
      //   Toast('请输入开户银行')
      //   return false
      // }else if (!this.shopList3.sub_bank_name){
      //   Toast('请输入开户支行')
      //   return false
      // }else if (!this.shopList3.account_code){
      //   Toast('请输入银行账号')
      //   return false
      // }else if (this.regCity === '请选择'){
      //   Toast('请选择开户省份和城市')
      //   return false
      // }else if (!this.shopList3.tel){
      //   Toast('请选择预留手机号')
      //   return false
      // }else if (this.shopList3.idcard_start === '请选择'){
      //   Toast('请输入身份证其实有效期')
      //   return false
      // }else if (this.shopList3.idcard_end === '请选择'){
      //   Toast('请输入身份证截止有效期')
      //   return false
      // } else
      console.log("加号图片");
      console.log(document.getElementById("addImg0"));
      // if(this.addImg0){
      //   Toast('请上传身份证头像照')
      //   return false
      // }
      // else if(document.getElementById('addImg1').style.display !== "none"){
      //   Toast('请上传身份证国徽照')
      //   return false
      // } else if(document.getElementById('addImg2').style.display !== "none"){
      //   Toast('请上传手持身份证照')
      //   return false
      // } else if(document.getElementById('addImg3').style.display !== "none"){
      //   Toast('请上传银行卡正面照')
      //   return false
      // } else if(document.getElementById('addImg4').style.display !== "none"){
      //   Toast('请上传银行卡反正照')
      //   return false
      // }else if(document.getElementById('addImg5').style.display !== "none"){
      //   Toast('请上传护照原件')
      //   return false
      // }else if(document.getElementById('addImg6').style.display !== "none"){
      //   Toast('请上传护照翻译')
      //   return false
      // } else {
      //   return true
      // }
      return true;
    },
    goToStep4() {
      console.log("shopList3:" + JSON.stringify(this.shopList3));
      /*enterprise_type: "", //企业类型
        org_code: "H001232", //统一社会信用代码
        licence_name: "来伊份上海分公司", //门店营业执照名称（执照注册名称）
        busi_legal_name: "张三", //法定代表人
        reg_capital: "100", //注册资本
        busi_province: "", //注册地址省份编码
        busi_city: "", //注册地址城市编码
        busi_area: "", //注册地址区县编码
        busi_address: "", //注册地址详细地址
        busi_start: "请选择", //成立时间，营业开始时间
        busi_end: "请选择", //营业截止时间（企业必填）
        busi_license_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //营业执照图片*/
      const MerchantApplyEntitity = this.$store.state.shopCreateEntitity;
      console.log("shopstore:" + JSON.stringify(MerchantApplyEntitity));
      MerchantApplyEntitity.biz_content.enterprise_type = this.shopList3.enterprise_type;
      MerchantApplyEntitity.biz_content.org_code = this.shopList3.org_code;
      MerchantApplyEntitity.biz_content.licence_name = this.shopList3.licence_name;
      MerchantApplyEntitity.biz_content.busi_legal_name = this.shopList3.busi_legal_name;
      MerchantApplyEntitity.biz_content.reg_capital = this.shopList3.reg_capital;
      MerchantApplyEntitity.biz_content.busi_province = this.shopList3.busi_province;
      MerchantApplyEntitity.biz_content.busi_city = this.shopList3.busi_city;
      MerchantApplyEntitity.biz_content.busi_area = this.shopList3.busi_area;
      MerchantApplyEntitity.biz_content.busi_address = this.shopList3.busi_address;
      MerchantApplyEntitity.biz_content.busi_start = this.shopList3.busi_start;
      MerchantApplyEntitity.biz_content.busi_end = this.shopList3.busi_end;
      MerchantApplyEntitity.biz_content.busi_license_image = this.shopList3.busi_license_image;
      this.$store.commit("setShopCreateEntitity", MerchantApplyEntitity);
      this.$router.push({ path: "./ShopCreate4" });
      /*if (this.checkData()) {
        //弹出加载框
        this.myLoading = true;
        this.myLoadingMsg = "身份证人像照上传中";
        //点击跳转到第二页，把数据存入到vuex中去
        const MerchantApplyEntitity = this.$store.state.merchantApplyEntitity;
        console.log(
          "身份证正面的base64图片===" + this.imgBase64.sfzzmImgBase64
        );
        // console.log('第三页的MerchantApplyEntitity=='+MerchantApplyEntitity)
        try {
          const imgUpLoadDataResSfzzm = await upLoadImg(
            "jpg",
            "身份证人像照",
            "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"
          );
          // const imgUpLoadDataResSfzzm = await upLoadImg('jpg','身份证人像照',this.imgBase64.sfzzmImgBase64)
          if (imgUpLoadDataResSfzzm[1] === "10000") {
            //返回的code为10000表示图片上传成功
            console.log(
              "apply3中取到的身份证正面照图片id==" + imgUpLoadDataResSfzzm[2]
            );
            MerchantApplyEntitity.biz_content.legal_id_image1 =
              imgUpLoadDataResSfzzm[2];
          } else {
            this.myLoading = false;
            Toast("身份证正面照上传失败");
            return;
          }
        } catch (e) {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        }
        this.myLoadingMsg = "身份证国徽照上传中";
        try {
          const imgUpLoadDataResSfzfm = await upLoadImg(
            "jpg",
            "身份证国徽照",
            this.imgBase64.sfzfmImgBase64
          );
          // const imgUpLoadDataResSfzfm = await upLoadImg('jpg','身份证国徽照','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')
          if (imgUpLoadDataResSfzfm[1] === "10000") {
            //返回的code为10000表示图片上传成功
            console.log(
              "ally3中取到的身份证反面照图片id==" + imgUpLoadDataResSfzfm[2]
            );
            MerchantApplyEntitity.biz_content.legal_id_image2 =
              imgUpLoadDataResSfzfm[2];
          } else {
            this.myLoading = false;
            Toast("身份证国徽照上传失败");
            return;
          }
        } catch (e) {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        }
        this.myLoadingMsg = "手持身份证照上传中";
        try {
          // const imgUpLoadDataResScsfz = await upLoadImg('jpg','手持身份证照片','/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCBIADYADASIAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAECAwQFBgf/xABKEAACAgECAwUGAwYFBAIAAQ0AAQIRAwQhEjFBBVFhcZETIoGhsfAUMsEGI0JS0eEVM2JygkOSovEksjRTY3MlRBbCNdKDk+Ly/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EACgRAQEBAAIDAAICAwEBAQADAAABEQISAyExE0EEUSIyYRRCBSNxgf/aAAwDAQACEQMRAD8A+N0KQp5XYIGEwBSFAg5ABCwB0KoUgIgLAAvQdDKLyCgAAChYKCFgbEooMhvcgtDqSwUWxZlvcWEaMZF7j8jV9TMnafiWD5M95shvLFxyNMyd2E5i6KZArS5gFAIBcwBTIsoEFlI0AKRFQCiBsAGEUgBbgAB1DJYKgyJFJyYG4/mR74LZeJ4FyPfi/wAuLOvjrHJ1x/nR7I7o8UdmnZ7IO0b5pGjydor9zGusj19Dz69XpJ963OeNRNBvp77nR6TwaTMsUckX1aaR1lqleyYWvW3uR8meX8UT8VKyo8+W46yT8UfUi00qPlZpOebi5bn1Ib4066E/a1u9mOhFsUqD5Hg7T/yoSfRs97PPq8byYeGgkfP0sfaZ1jfJq7O3soJV1vvLp8E45oyWyS5HTJp5yyNxdJvkSRqpi08J8nvZ8+UXDI1J00z6uDA8c7dnN6JSlKW9tdRg9WDfTwZsxig4YowbtpHQsQohQUSle+6PlaxR4lTrvPqTTcWlz5HmlpeJpumxB8tb3W59DBcdC634d6Oq0i7jpHTx9k4PkxpXzeGWTblfQ+hpsPBFO9zUdPGL25HZKkkLQAL1CJ0PNqv83C/E9R5dcl7OEu5kV6XzA7t+hQA6hFCOeTGpxad7moR4YKN8igKAFCIOYBVAEAK+QIAKikRQJ1KQEAAWESS4oSXgcNFthp9GeizMYqLbS58wrRbJYsAVksWu9FAqM8UV1Rl5YrqEdOYOftov+IjzwS/MFdC8zg9RBGfxUekX8QPQLPN+J7okeok3skEesNniefJ0QebJVWFexscSSuzw8c3/ABEub2tjB7+Jd6I8kFzkjw031fqOGwPW8+O/zD20K5nk4EXgQR6HqIpk/Eq3scOEcKCur1XciPUy6I58PgVRA1+IyXa+hHnzNbSXoShQEc5y/M7ZLZqhWwGWmxwbm0gXRnhLwmqBBnh2FFoq5gZooBUCgECgBQUGwADoAUAQooCFARRChFIIFzDTFAAWtgyonmUgCqQFQQonUoAABAW9gPIAAC0FSgB0AADkEUdSF+IBJgUEmABQt2BGUMBUW5egAEBaHQIICgFCkL1AEZegAiKQu4E6lAAAoIogAEToPIpCiigADAAAFAVB1KQAUAAAAIUDzAlUUAAAUIgQCIq2Cbi13gUEtV+aPqZeSC5yQGgY9rjv86MvUQtpW13oqOwPP+Kgn+Vh6nuiyar0chZ5vxE3sokebM+SA9Is8vFm6ND9+1vJfAD1PnVmXJd55/ZzfObHsn/MwPR7SPejLzQv8yOPsF4lWFLoB09vDxZPxEV0bJ7OPgVQQGXqH0iHqMnSCs1wlpNgcvbZuiVkTzNbNLzO9IlbgcuHJXvNE4GdqKiji8baObhc0k9kel8mcbqS8yDaxR2fXzNJJI0voGBmkKNGJyUFYGqBweproZ/FPlw0RXpLzPJ+JfFy5noxzUu8DaDGwAhQCgKJ1G4QBSdQHMhaIyigB8iB4A4PK+NxRcmRpXyGjt0BnFvC3zNACjoOuwAAgAFFoCB8g34kbrZtAUEUk+TMvJGOzZRtIGFli+pZTUY8T5EGi9DzrOpflCztOpbNgdxZzlkqF1ZwjmnNpLbwIPVZTyyeRc2bjm9zdqyjs5Jc2Zc4955pZOJkct9gPXxbX0OT1EOXU5ycnDmZ02O5K3YHrhLiV2Jy4VbNcunwOWa+GgOTzuUqW4c5LwM6dbyvv2O2eP7tPqBmE7huzi5t5ai0zWNSbdckZx7ZtlsB3rhhfPvOULlktHfJHih0OOKXBOmtujRB0nBxgmYjN/KjeWd7dxnFDifFLkBxkrz+NHpcPcR52+HLa2tUdJZHw8Mboo53U6Mt8Uqs7YsNu36CeOp2laAPFxRrc0sajCglJrqbWN8JB54L958T1S2ijnHDwzs7OOxR447ZG2y5ZKW3wOrwJu63NLCu4lHLguCaJCXAqrqepRSjXQz7KJJByi3PkizVHZRSDim+RoeRxcnTTo9GKHDHfn3m1FLoaSAgKAM8NlSRQBmigAKI+TLuKtbAcf4kdqOP8Xgd1yIJW1hl6EAxLGpu2yexSR0FjVY9khwK+puxT7mwMqKXI11HDP8Akl6FWPLJpLHK/ICEO/4TN/KajoM76IaPMEe5dmZP5vQ2uy++UrJ2HzybH1Y9mQ/ii2dY9nY+XAidh8S0Wn3M+4tBiX8KOsdNBfwx9B2H5/gm/wCCXoaWDO+WNn6BYoVy5F4I9xOyPgx0epk6UEvM3/h2frR9xKPgRzguqHZXyF2XLrP0Okeyls+Ns+i82NdUT8RjXUmjxx7MgnvxP4m12djXf6nb8XBGXrY8lHcmhHQ4lzjv5m1pcdcjj+Ma5Rsz+IyPkgY9awwXQqjFdDxvNmeyv4EvK+8i493urqhxR/mR4eDI3u2PYScrcmT0Y9jy41zmjL1OJfxHm/Cxb5FWlih2i9XZ6zEuu5zlrlW2J2ebNw4ppU6PRijGcb4UheWHVPxsv/ybvyMvV53yikd1jiuheCKXInderyvUZ3vaQvUz5SXoY1eRxpLzPRpd8ab7i3lhI5ezzT5tFWnyPm1R66BnvVx5vwu9tsn4eKe56ZyUep4M2aU5cEW7G2jusWNdfmbWOEuTOENK2k5Pmd4Yo4k6M1VcYxXMzCcZNqLTZ5tXrIQi4tNvwPHpNRPHLi4G7bpLejU4+tTX20kK2OGHO8kU3FrzM5dTwSSMq9IMcf7u31PN7dyy0mEetsy5xTptepx1Gdw91czzRwzz3JyZcGdXNPIlxLme3A1HEnJ0j5jwqGdRtyt7tn0pQcsSUHVIcvZHPJq9PxOLnudcEIUpR5ng1GNR3lFWz26JNYVfcSzIr0N1zPLm1LT4cdNm9VkcY0efTY3OfE0xJ+yuc9Zng/fjtfce7T5lmhaOWrjWGUerM6D3Y0i/Yj2sAGVAAFAAAAABgAIAAigAKidSgACABRgegCAAIoyFBREGUdAICkIHkKC2AAeQ6gIdACAAAB+eBL23F7kFAslgX6C9+Zm9hxegFbLyM2LKijmZsWBqxZm2L2CtNksnxJZEbsWYRQLY4tyCqKLxbiyNbhoBxCxwimA4mLKkKIqWS2Wi8IRncGuEvCUYZGdHFInCiwfM1Cksrvc5I9OtVZFtzPOdmAhWQAUz0KBUyAAByYHUAUgApATyAooVsXoA6EDYAArIA5ivQFQGX4Bo1Rllg0me3TO8SPCuR7NK7hT6HTh9Y5PRR68T9xHkPTg/IdOTMdaM5YLJjcXya3N+paMNPDHRNLdoq0do9tIdCK8v4SNcirSxPTRQmuC00ee1o6xXDGkaS7wU1FzKAA7hRQVGVGmVItbgilEKHzAdAEK2KAHUoEY6gBFQIUgdQAUQpAQU46yPFpZJc1VHUNqndBSDvHFtVsUlpJDiRBroDDmr5j2ke9FGwcvaxT3Y9tHvA67E6nF54oj1EUB6A2eZ6iuSsz+Il3AeuyWrPI88mZ9rMo9tpEc1tueNzlztnP2sm+db8yD6HEl1Q441zPF7z5toi')
          const imgUpLoadDataResScsfz = await upLoadImg(
            "jpg",
            "手持身份证照片",
            this.imgBase64.scsfzImgBase64
          );
          if (imgUpLoadDataResScsfz[1] === "10000") {
            //返回的code为10000表示图片上传成功
            console.log(
              "ally3中取到的手持身份证照片图片id==" + imgUpLoadDataResScsfz[2]
            );
            MerchantApplyEntitity.biz_content.legal_id_image5 =
              imgUpLoadDataResScsfz[2];
          } else {
            this.myLoading = false;
            Toast("手持身份证照片上传失败");
            return;
          }
        } catch (e) {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        }
        this.myLoadingMsg = "银行卡正面照上传中";
        try {
          const imgUpLoadDataResYhkzm = await upLoadImg(
            "jpg",
            "银行卡正面照",
            this.imgBase64.yhkzmImgBase64
          );
          if (imgUpLoadDataResYhkzm[1] === "10000") {
            //返回的code为10000表示图片上传成功
            console.log(
              "ally3中取到的银行卡正面照id==" + imgUpLoadDataResYhkzm[2]
            );
            MerchantApplyEntitity.biz_content.bankcard_image1 =
              imgUpLoadDataResYhkzm[2];
          } else {
            this.myLoading = false;
            Toast("银行卡正面照上传失败");
            return;
          }
        } catch (e) {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        }
        this.myLoadingMsg = "银行卡反面照上传中";
        try {
          const imgUpLoadDataResYhkfm = await upLoadImg(
            "jpg",
            "银行卡反面照",
            this.imgBase64.yhkfmImgBase64
          );
          if (imgUpLoadDataResYhkfm[1] === "10000") {
            //返回的code为10000表示图片上传成功
            this.myLoading = false;
            console.log(
              "ally3中取到的银行卡反面照图片id==" + imgUpLoadDataResYhkfm[2]
            );
            MerchantApplyEntitity.biz_content.bankcard_image2 =
              imgUpLoadDataResYhkfm[2];
          } else {
            this.myLoading = false;
            Toast("银行卡反面照上传失败");
            return;
          }
        } catch (e) {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        }
        try {
          const imgUpLoadDataResHzzm = await upLoadImg(
            "jpg",
            "护照正面照",
            this.imgBase64.hzzmImgBase64
          );
          if (imgUpLoadDataResHzzm[1] === "10000") {
            //返回的code为10000表示图片上传成功
            this.myLoading = false;
            console.log(
              "ally3中取到的护照正面照照图片id==" + imgUpLoadDataResHzzm[2]
            );
            MerchantApplyEntitity.biz_content.bankcard_image3 =
              imgUpLoadDataResHzzm[2];
          } else {
            this.myLoading = false;
            Toast("护照正面照上传失败");
            return;
          }
        } catch (e) {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        }
        try {
          const imgUpLoadDataResHzfm = await upLoadImg(
            "jpg",
            "护照反面照",
            this.imgBase64.hzfmImgBase64
          );
          if (imgUpLoadDataResHzfm[1] === "10000") {
            //返回的code为10000表示图片上传成功
            this.myLoading = false;
            console.log(
              "ally3中取到的护照反面照图片id==" + imgUpLoadDataResHzfm[2]
            );
            MerchantApplyEntitity.biz_content.bankcard_image4 =
              imgUpLoadDataResHzfm[2];
          } else {
            this.myLoading = false;
            Toast("护照反面照上传失败");
            return;
          }
        } catch (e) {
          console.log("apply1中的catch=" + e);
          this.myLoading = false;
          Toast(e);
        }
        setTimeout(() => {
          MerchantApplyEntitity.biz_content.accounttype = this.shopList3.accounttype;
          MerchantApplyEntitity.biz_content.accountname = this.shopList3.accountname;
          MerchantApplyEntitity.biz_content.bankname = this.shopList3.bankname;
          MerchantApplyEntitity.biz_content.sub_bank_name = this.shopList3.sub_bank_name;
          MerchantApplyEntitity.biz_content.account_code = this.shopList3.account_code;
          MerchantApplyEntitity.biz_content.tel = this.shopList3.tel;
          MerchantApplyEntitity.biz_content.idcard_start = this.shopList3.idcard_start;
          MerchantApplyEntitity.biz_content.idcard_end = this.shopList3.idcard_end;
          MerchantApplyEntitity.biz_content.legal_id_start = this.shopList3.idcard_start;
          MerchantApplyEntitity.biz_content.legal_id_end = this.shopList3.idcard_end;
          MerchantApplyEntitity.biz_content.open_bank_pro = this.shopList3.open_bank_pro;
          MerchantApplyEntitity.biz_content.open_bank_city = this.shopList3.open_bank_city;
          this.$store.commit("setMerchantApplyEntitity", MerchantApplyEntitity);
          this.$router.push({ path: "./MerchantApply4" });
        }, 2000);
      }*/
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
    //弹出显示城市
    toastArea() {
      this.showArea = true;
      this._inputBlur();
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
    openPicker() {
      this.$refs.picker.open();
    },
    openPicker2() {
      this.$refs.picker2.open();
    },
    //选择的公司类型
    typeEnterprise(data) {
      console.log(data);
      this.enterprise_type = data[0];
      if (data[0] == "企业") {
        this.shopList3.enterprise_type = "0";
      } else if (data[0] == "个体") {
        this.shopList3.enterprise_type = "1";
      }

      this.showEnterpriseType = false;
    },
    //点击获取账户类型
    getAccountType() {
      this._inputBlur();
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
      this._inputBlur();
      this.$refs.picker.open();
    },
    openPicker2() {
      this._inputBlur();
      this.$refs.picker2.open();
    },
    //获取成立日期
    handleChange(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList3.busi_start = date_value;
    },
    //获取截止日期
    handleChange2(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList3.busi_end = date_value;
    },
    //获取注册城市名称
    getBusi(value) {
      this.showBusi = false;
      let myArea = "";
      console.log(value);
      value.forEach((item, index) => {
        console.log("=====");
        console.log(index);
        console.log(item);
        if (index == "0") {
          this.shopList3.busi_province = item.code; //门店省份编码
        } else if (index == "1") {
          this.shopList3.busi_city = item.code; //门店城市编码
        } else if (index == "2") {
          this.shopList3.busi_area = item.code; //区县
        }
        if (index < 2) {
          myArea += item.name + "-";
        } else {
          myArea += item.name;
        }
      });
      console.log(JSON.stringify(myArea));
      this.busiCity = myArea;
    },
    //选择营业执照
    bussinessChoosed(data) {
      //拍照
      console.log(data);
      if (data[0] === "拍摄") {
        console.log("去拍照");
        this.popupToast.show = false;
        // this.havaBusinessImg = false
        this._getBusinessLicenseFromCamera();
        //相册选择
      } else {
        console.log("去相册");
        this.popupToast.show = false;
        // this.havaBusinessImg = false
        this._getBusinessLicenseFromPhone();
      }
    },
    //拍照获取营业照照片
    _getBusinessLicenseFromCamera() {
      console.log("cordovaplugin.js调用拍照走到");
      const that = this;
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      });
      function onSuccess(imageData) {
        var image = document.getElementById("businessLicenseImg");
        console.log("调用手机拍照成功");
        console.log("拍照返回的图片imageData===" + imageData);
        that.yyzzImgbase64 = imageData;
        // that.havaBusinessImg = false
        image.src = "data:image/jpeg;base64," + imageData;
        console.log("图片的src==" + image.src);
        if (imageData.length > 0) {
          console.log("走到1");
          that.havaBusinessImg = false;
          // document.getElementsByClassName('add').style.display = "none"
        }
        that.uploadImage();
      }
      function onFail(message) {
        alert("调用相机失败:" + message);
      }
    },
    //获取手机相册上的营业照照片
    _getBusinessLicenseFromPhone() {
      const that = this;
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        // destinationType: Camera.DestinationType.FILE_URI,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 0
      });
      function onSuccess(imageData) {
        const businessLicenseImg = document.getElementById(
          "businessLicenseImg"
        );
        console.log("调用手机相册成功");
        console.log("调用相册选择的图片imageData===" + imageData);
        that.yyzzImgbase64 = imageData;
        businessLicenseImg.src = "data:image/jpeg;base64," + imageData;
        console.log("图片的src==" + businessLicenseImg.src);
        if (imageData.length > 0) {
          console.log("走到2");
          that.havaBusinessImg = false;
        }
        that.uploadImage();
      }
      function onFail(message) {
        console.log("调用手机相册失败");
      }
    },
    //调起上传图片接口
    uploadImage() {
      console.log("当前图片字段" + this.imageFlag);

      this.myLoading = true;
      this.myLoadingMsg = "照片上传中";
      console.log("照片的base64图片===" + this.yyzzImgbase64);
      let merObj = {
        image_type: "jpg",
        image_name: "营业执照",
        image_content: this.yyzzImgbase64
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
              this.shopList1.busi_license_image = res.response.image_id;
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
    //选择完成
    typeChoosed(data) {
      console.log("选择的==" + data);
      this.popupToast.show = false;
      if (data[0] === "拍摄") {
        this._cameraTakePicture(data[1], data[4]);
      } else if (data[0] === "相册") {
        this._getLocalPicture(data[1], data[4]);
      } else if (data[0] == "对公账户" || "对私法人账户" || "对私授权人") {
        this.accountType = data[0];
        this.shopList3.accounttype = data[3];
      }
    }
  },
  created() {
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
          opacity: 1;
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

        .IdCardLiFirst {
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
            // justify-content space-around
            flex-wrap: wrap;

            .IdCardDiv {
              display: flex;
              width: 50%;
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
              left: 40%;
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


