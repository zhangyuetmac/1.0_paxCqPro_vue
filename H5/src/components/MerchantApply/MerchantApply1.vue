<template>
  <div class="MerchantApply transitionWrapper" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <div class="head"  :style="{backgroundImage:myBackgroundImage,height:bgHeight}">
      <MerchantApplyHeader></MerchantApplyHeader>
      <div class="step">
        <div class="item" >
          <div class="number" >
            <a>1</a>
            <div class="dashed"></div>
          </div>
          <span>基本资料</span>
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>2</a>
            <div class="dashed"></div>
          </div>
          <span>法人信息</span>   
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>3</a>
            <div class="dashed"></div>
          </div>
          <span>开户资料</span>
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>4</a>
            <div class="dashed"></div>
          </div>
          <span>门店信息</span>
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
            <a>商户名称</a>
            <input class="myInput" type="text"  placeholder="点击输入名称"   v-model="merchantApply1.merchant_name"/>
          </li >
          <li class="inputLi">
            <a>联系人姓名</a>
            <input class="myInput" type="text"  placeholder="点击输入姓名" v-model="merchantApply1.contact_name"></input>
          </li>
          <li class="inputLi">
            <a>负责人电话</a>
            <input class="myInput" type="text" placeholder="手机或者座机"  v-model="merchantApply1.mobile"></input>
          </li>
          <li class="inputLi">
            <a>联系邮箱</a>
            <input class="myInput" type="text" placeholder="点击输入邮箱"  v-model="merchantApply1.email"></input>
          </li>
          <li class="inputLi borderNone">
            <a>传真</a>
            <input class="myInput" type="text" placeholder="点击输入传真"  v-model="merchantApply1.fax"></input>
          </li>
          <li style="background:#F8F8FA;height:10px;width:100%"></li>
          <li class="inputLi">     
            <a>企业类型</a>
            <div @click="toastProvince">
              <span>{{merchantApply1.enterprise_type}}</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>经营类目</a>
            <div @click="gategoryData.showGategory =true">
              <span>{{gategoryData.category_id}}</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li>
          <li class="inputLi">
            <a style="width:60%">统一社会信用代码</a>
            <input class="myInput" type="text" placeholder="如H001232"  v-model="merchantApply1.org_code"></input>
          </li>
          <li class="inputLi borderNone">
            <a>法定代表人</a>
            <input class="myInput" type="text" placeholder="请保持与证件一致"  v-model="merchantApply1.busi_legal_name"></input>
          </li>
          <li class="inputLi">     
            <a>注册资本</a>
            <div class="million">
              <input class="myInput" type="number"   v-model="merchantApply1.reg_capital"/>
              万
            </div>
          </li>
          <li class="inputLi">
            <a>注册地址</a>
            <div @click="toastArea">
              <span>{{regCity}}</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>详细地址</a>
            <input class="myInput" type="text" placeholder="点击输入地址"   v-model="merchantApply1.contact_address"></input>
          </li>
          <li class="inputLi">
            <a>成立日期</a>
            <div @click="openPicker">
              <span>{{merchantApply1.busi_start}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>   
          </li>
          <li class="inputLi">     
            <a style="width:60%">营业期限截止日期</a>
            <div @click="openPicker2">
              <span>{{merchantApply1.busi_end}}</span>
              <img src="./image/icon_arrowright1.png">
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
      <div class="bottomBtn" :style={height:btnHeight} @click="goToStep2">
        <div :class="this.merchantApply1.merchant_name&&this.merchantApply1.contact_name&&
                    this.merchantApply1.mobile&&this.merchantApply1.email&&this.merchantApply1.fax&&
                    this.merchantApply1.enterprise_type !== '请选择'&&this.myCategory_id !== '请选择'&&
                    this.merchantApply1.org_code&&this.merchantApply1.busi_legal_name&&this.merchantApply1.reg_capital&&
                    this.regCity !== '请选择'&&this.merchantApply1.contact_address&&this.regCity !== '请选择'&&
                    this.merchantApply1.contact_address&&this.merchantApply1.busi_start !== '请选择'&&
                    this.merchantApply1.busi_end !== '请选择'&&!this.havaBusinessImg
              ?'btnLight':'btn'">
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
    <!-- 省市三级联动 -->
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="AreaData" value="110101" @confirm="getArea" @cancel="showArea = false" />
    </van-popup>
    <!-- 显示行业类目 -->
    <van-popup v-model="gategoryData.showGategory" position="bottom">
      <mt-picker  show-toolbar :slots="gategoryData.slots" value-key="name" @change="onValuesChange">
        <div style="display: flex;height: 44px;line-height: 44px;-webkit-box-pack: justify;-ms-flex-pack: justify;justify-content: space-between;border-bottom:1px solid #ebedf0">
         <div @click="gategoryData.showGategory = false" class="van-picker__cancel">取消</div>
        <div @click="getGategory" class="van-picker__confirm">确认</div> </div> 
      </mt-picker> 
    </van-popup>
    <!-- 选择企业类型 -->
    <van-popup v-model="showProvince" position="bottom">
      <div style="width:100%">
        <TypeChoose 
          :chooseMsg="provinceType.chooseMsg"
          :firstMsg="provinceType.firstMsg"
          :secondMsg="provinceType.secondMsg"
          v-on:typeChoosed="typeChoosed">
        </TypeChoose>
      </div>
    </van-popup> 
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
    <MyLoading :myLoading="myLoading" :myLoadingMsg="myLoadingMsg"></MyLoading>
  </div>
</template>
<script>
import MerchantApplyHeader from "./MerchantApplyHeader";
// import TypeChoose from "../TypeChoose/TypeChoose";
import TypeChoose from '&/PublicComponents/TypeChoose'
import { dateExchange, timeExchange } from "../../common/js/myDate.js";
// import BScroll from "better-scroll"
import { Area, Popup, Picker } from "vant";
import { DatetimePicker } from "mint-ui";
import {cameraTakePicture,getLocalPicture} from "../../../static/cordovaplugin.js";
import MerchantApplyData from "./MerchantApplyData.js";
import AreaData from "../../common/data/Area.js";
import { Toast } from "vant";
import  MyLoading  from '&/PublicComponents/MyLoading'
import upLoadImg from "./upLoadImg.js";
import {getCategoriesAxios} from "common/js/basicAxios/getCategoriesAxios"


export default {
  data() {
    return {
      //行业类目的总数据
      gategoryData:{
        //点击确认选择的行业类目data
        myAddress:'',
        //行业类目中文选择
        category_id: "请选择",
        //行业类目后端获取到的数据
        gategoryAxiosData:[],
        //是否显示poplu弹出层
        showGategory:false,
        //行业类目的slots
        slots: [],
      },
      //上传图片的loading
      myLoading: false,
      myLoadingMsg: "",
      //显示行业类目弹出框
      showGategory: false,
      touchmoveData: {
        startX: "",
        startY: "",
        endX: "",
        endX: ""
      },
      btnHeight: "",
      fullHeight: "",
      myBackgroundImage: "url(" + require("./image/pic_shsq.png") + ")",
      bgHeight: "",
      havaBusinessImg: true,
      haveFill: true,
      showArea: false,
      value: null,
      value1: null,
      value2: null,
      startDate: new Date("1992-05-09"),
      endDate: new Date("2049-05-09"),
      regCity: "请选择",
      regCityNoPoint: "",
      //选择公司类型弹窗
      showProvince: false,
      //选择营业执照弹窗
      showBussinessChoose: false,
      provinceType: {
        chooseMsg: "请选择企业类型",
        firstMsg: "企业",
        secondMsg: "个体"
      },
      bussinessType: {
        chooseMsg: "请选择上传方式",
        firstMsg: "拍摄",
        secondMsg: "相册"
      },
      popupToast: {
        show: false,
        showImage: true
      },
      //城市三级联动数据
      AreaData,
      //商户申请默认数据
      MerchantApplyData,
      merchantApply1: {
        //商户名称
        merchant_name: "",
        //联系人名称
        contact_name: "",
        //联系人手机
        mobile: "",
        //联系人邮箱,
        email: "",
        //联系人传真,
        fax: "",
        //企业类型
        enterprise_type: "请选择",
        //统一社会信用代码
        org_code: "",
        //法定代表人
        busi_legal_name: "",
        //注册资本
        reg_capital: "",
        //注册地址省份编码
        busi_province: "",
        //注册地址城市编码
        busi_city: "",
        //注册地址区县编码
        busi_area: "",
        //详细地址
        contact_address: "",
        //省市区+详细地址
        busi_address: "",
        //成立日期
        busi_start: "请选择",
        //营业期限截止日期
        busi_end: "请选择",
        //经营类目
        category_id: ""
      },
      //base64位的营业执照图片
      yyzzImgbase64: ""
    };
  },
  components: {
    TypeChoose,
    MerchantApplyHeader,
    DatetimePicker,
    Area,
    Popup,
    MyLoading
  },
  methods: {
    //mounted的时候从后台获取行业类目的数据
    async getCategoriesDataByAxios(){
      const data = await getCategoriesAxios()
      console.log('reslove回来的经营类目数据')
      console.log(data)
      this.gategoryData.gategoryAxiosData = data
      console.log(this.gategoryData.gategoryAxiosData)
      this.gategoryData.slots =[
          {
            flex: 1,
            values: this.gategoryData.gategoryAxiosData,
            defaultIndex: 0,
            className: "slot1",
            textAlign: "center"
          },
          {
            divider: true,
            content: "",
            className: "slot2"
          },
          {
            flex: 1,
            values: this.gategoryData.gategoryAxiosData[0].children,
            defaultIndex: 0,
            className: "slot3",
            textAlign: "center"
          },
          {
            divider: true,
            content: "",
            className: "slot4"
          },
          {
            flex: 1,
            values: this.gategoryData.gategoryAxiosData[0].children[0].children,
            defaultIndex: 0,
            className: "slot5",
            textAlign: "center"
          }
      ]
      console.log('slots====')
      console.log(this.slots)
    },
    //行业类目的三级联动进行滑动改变的时候
    onValuesChange(picker, values) {
      console.log('picker====')
      console.log(picker);
      console.log('values====')
      console.log(values);
      console.log('values[0]====')
      console.log(values[0]);
      // if (!values[0]) {
      if (!values[0]) {   
        console.log('111')
        this.$nextTick(() => {
          if (this.myAdress) {
            // 赋默认值
            console.log(this.gategoryData.myAdress);
          } else {
            picker.setValues([
              this.gategoryData.gategoryAxiosData[0],
              this.gategoryData.gategoryAxiosData[0].children[0],
              this.gategoryData.gategoryAxiosData[0].children[0].children[0]
            ]);
          }
        });
      } else {
        console.log('222')
        console.log("values[0].children")
        console.log(values[0].children.length)
        if(values[0].children.length>0){
          console.log('cccc')
          picker.setSlotValues(1, values[0].children);
          let town = [];
          console.log("values[1].children")
          console.log(values[1].children)
          console.log(values[1].children.length)
          // if (values[1]) {
          if (values[1].children.length>0 ) {
            // town = values[1].children;
            picker.setSlotValues(2, values[1].children);
          } else {
            picker.setSlotValues(2, '');
          }
          // picker.setSlotValues(2, town);
        }else {
          picker.setSlotValues(1, '');
        }
      }
      this.gategoryData.myAddress = values;
      console.log("滑动选择到的myAddress")
      console.log(this.gategoryData.myAddress);
    },
    //点击确认，将选中的行业类目渲染到页面上
    getGategory(value) {
      console.log('选择的经营类目')
      console.log(this.gategoryData.myAddress);
      console.log("经营类目222");
      if (this.gategoryData.myAddress[2] != undefined) {
        console.log("经营类目333");
        this.gategoryData.category_id = this.gategoryData.myAddress[2].name;
        this.merchantApply1.category_id = this.gategoryData.myAddress[2].code;
      } else if (this.gategoryData.myAddress[1] != undefined) {
        this.gategoryData.category_id = this.gategoryData.myAddress[1].name;
        this.merchantApply1.category_id = this.gategoryData.myAddress[1].code;
      } else {
        this.gategoryData.category_id = this.gategoryData.myAddress[0].name;
        this.merchantApply1.category_id = this.gategoryData.myAddress[0].code;
      }
      this.gategoryData.showGategory = false;
    },
    //信息验证
    checkData() {
      return true;
      if (!this.merchantApply1.merchant_name) {
        Toast("请输入商户号");
        return false;
      } else if (!this.merchantApply1.contact_name) {
        Toast("请输入联系人名称");
        return false;
      } else if (!this.merchantApply1.mobile) {
        Toast("请输入负责人电话或者手机");
        return false;
      } else if (
        !/^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.merchantApply1.mobile) &&
        !/^(0[1-9]\d{1,2}-)\d{7,8}(-\d{1,8})?/.test(this.merchantApply1.mobile)
      ) {
        Toast("请输入正确的手机号或者电话");
        return false;
      } else if (!this.merchantApply1.email) {
        Toast("请输入联系人邮箱");
        return false;
      } else if (
        !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          this.merchantApply1.email
        )
      ) {
        Toast("请输入正确的联系人邮箱");
        return false;
      } else if (!this.merchantApply1.fax) {
        Toast("请输入联系人传真");
        return false;
      } else if (!/^(\d{3,4}-)?\d{7,8}$/.test(this.merchantApply1.fax)) {
        Toast("请输入正确的联系人传真");
        return false;
      } else if (this.merchantApply1.enterprise_type === "请选择") {
        Toast("请选择企业类型");
        return false;
      } else if (this.category_id_Chinese === "请选择") {
        Toast("请选择经营类目");
        return false;
      } else if (!this.merchantApply1.org_code) {
        Toast("请输入统一社会信用代码");
        return false;
      } else if (!this.merchantApply1.busi_legal_name) {
        Toast("请输入法定代表人");
        return false;
      } else if (!this.merchantApply1.reg_capital) {
        Toast("请输入注册资本");
        return false;
      } else if (this.regCity === "请选择") {
        Toast("请选择注册地址");
        return false;
      } else if (!this.merchantApply1.contact_address) {
        Toast("请输入详细地址");
        return false;
      } else if (this.merchantApply1.busi_start === "请选择") {
        Toast("请选择成立日期");
        return false;
      } else if (this.merchantApply1.busi_end === "请选择") {
        Toast("请选择营业截止日期");
        return false;
      } else if (this.havaBusinessImg) {
        Toast("请上传营业执照照片");
        return false;
      } else {
        console.log("输入成功");
        return true;
      }
    },
    //跳转到下一页
    async goToStep2() {
      //判断数据是否为空
      if (this.checkData()) {
        //点击跳转到第二页，把数据存入到vuex中去
        const MerchantApplyEntitity = this.MerchantApplyData;
        this.myLoading = true;
        this.myLoadingMsg = "营业执照上传中";
        console.log("营业执照的base64图片===" + this.yyzzImgbase64);
        try {
          // const imgUpLoadDataRes = await upLoadImg('jpg','营业执照',this.yyzzImgbase64)
          const imgUpLoadDataRes = await upLoadImg(
            "jpg",
            "营业执照",
            "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"
          );
          console.log(
            "apply1营业执照上传返回的data==" + JSON.stringify(imgUpLoadDataRes)
          );
          if (imgUpLoadDataRes[1] === "10000") {
            console.log("营业执照上传成功");
            //返回的code为10000表示图片上传成功
            console.log("ally1中取到的图片id==" + imgUpLoadDataRes[2]);
            this.myLoading = false;
            MerchantApplyEntitity.biz_content.busi_license_image =
              imgUpLoadDataRes[2];
          } else {
            this.myLoading = false;
            Toast("营业执照上传失败");
            return;
          }
        } catch (e) {
          this.myLoading = false;
          Toast("营业执照上传失败");
          return;
        }
        MerchantApplyEntitity.timestamp = timeExchange();
        MerchantApplyEntitity.sign_type = "RSA";
        MerchantApplyEntitity.hash_type = "SHA256";
        MerchantApplyEntitity.version = "1.0";
        MerchantApplyEntitity.method = "paxpay.market.merchant.create";
        MerchantApplyEntitity.partner_id = "88888948";
        MerchantApplyEntitity.biz_content.agent_id = "88888948";
        MerchantApplyEntitity.biz_content.merchant_name = this.merchantApply1.merchant_name;
        MerchantApplyEntitity.biz_content.contact_name = this.merchantApply1.contact_name;
        MerchantApplyEntitity.biz_content.mobile = this.merchantApply1.mobile;
        MerchantApplyEntitity.biz_content.email = this.merchantApply1.email;
        MerchantApplyEntitity.biz_content.fax = this.merchantApply1.fax;
        if (this.merchantApply1.enterprise_type == "企业") {
          MerchantApplyEntitity.biz_content.enterprise_type = 0;
        } else if (this.merchantApply1.enterprise_type == "个体") {
          MerchantApplyEntitity.biz_content.enterprise_type = 1;
        }
        MerchantApplyEntitity.biz_content.org_code = this.merchantApply1.org_code;
        MerchantApplyEntitity.biz_content.busi_legal_name = this.merchantApply1.busi_legal_name;
        MerchantApplyEntitity.biz_content.reg_capital = this.merchantApply1.reg_capital;
        MerchantApplyEntitity.biz_content.busi_province = this.merchantApply1.busi_province;
        MerchantApplyEntitity.biz_content.busi_city = this.merchantApply1.busi_city;
        MerchantApplyEntitity.biz_content.busi_area = this.merchantApply1.busi_area;
        MerchantApplyEntitity.biz_content.contact_address = this.merchantApply1.contact_address;
        MerchantApplyEntitity.biz_content.busi_address =
          this.regCityNoPoint + this.merchantApply1.contact_address;
        MerchantApplyEntitity.biz_content.busi_start = this.merchantApply1.busi_start;
        MerchantApplyEntitity.biz_content.busi_end = this.merchantApply1.busi_end;
        MerchantApplyEntitity.biz_content.category_id = this.merchantApply1.category_id;
        MerchantApplyEntitity.biz_content.city_code = this.merchantApply1.busi_area;
        MerchantApplyEntitity.biz_content.contact_province = this.merchantApply1.busi_province;
        MerchantApplyEntitity.biz_content.contact_city = this.merchantApply1.busi_city;
        MerchantApplyEntitity.biz_content.contact_area = this.merchantApply1.busi_area;
        MerchantApplyEntitity.biz_content.province_code = this.merchantApply1.busi_province;
        MerchantApplyEntitity.biz_content.district_code = this.merchantApply1.busi_area;
        this.$store.commit("setMerchantApplyEntitity", MerchantApplyEntitity);
        this.$router.push({ path: "./MerchantApply2" });
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
    //初始化better-scroll
    _initScroll() {
      console.log("百富");
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
    //弹出选择企业类型
    toastProvince() {
      this.showProvince = true;
      this._inputBlur();
    },
    //弹出选择城市
    toastArea() {
      this.showArea = true;
      this._inputBlur();
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
      this.merchantApply1.busi_start = date_value;
    },
    //获取截止日期
    handleChange2(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.merchantApply1.busi_end = date_value;
    },
    //获取城市名称
    getArea(value) {
      this.showArea = false;
      let myArea = "";
      let detailAreaCode = [];
      value.forEach((item, index) => {
        detailAreaCode.push(item.code);
        if (index < 2) {
          myArea += item.name + "-";
        } else {
          myArea += item.name;
        }
        this.regCityNoPoint += item.name;
      });
      this.regCity = myArea;
      this.merchantApply1.busi_province = detailAreaCode[0];
      this.merchantApply1.busi_city = detailAreaCode[1];
      this.merchantApply1.busi_area = detailAreaCode[2];
    },
    //选择的公司类型
    typeChoosed(data) {
      this.merchantApply1.enterprise_type = data[0];
      this.showProvince = false;
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
      }
      function onFail(message) {
        console.log("调用手机相册失败");
      }
    }
  },
  created() {
    //获取默认商户申请的数据,放入到vuex中去
    const data = MerchantApplyData;
    const defaultMerchantApplyEntitity = this.MerchantApplyData;
    this.$store.commit("setMerchantApplyEntitity",defaultMerchantApplyEntitity);
    //设置高度，点击输入框的时候页面不会变形
    this.bgHeight = document.body.scrollHeight * 35 / 100 + "px";
    this.btnHeight = document.body.scrollHeight * 13 / 100 + "px";
    // this.$nextTick(()=>{
    //   this._initScroll()
    // })
  },
  //
  mounted(){
    this.getCategoriesDataByAxios()
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.MerchantApply {
  width: 100%;
  height: 100%;

  .head {
    width: 100%;
    height: 35%;
    // background-image url('./image/pic_shsq.png');
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
        // width:15%
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

    .mainTop {
      width: 90%;
      height: 90%;
      background: #FFFFFF;
      margin-top: -10%;
      // overflow hidden
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
              display: block;
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


