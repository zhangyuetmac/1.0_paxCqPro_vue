<template>
  <div class="transitionWrapper" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <div class="head" :style="{backgroundImage:myBackgroundImage,height:bgHeight}">
      <ShopCreateHeader :header="header"></ShopCreateHeader>
      <div class="step">
        <div class="item" >
          <div class="number" >
            <a>1</a>
            <div class="dashed first-child"></div>
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
          <span>资质证照</span>
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>4</a>
         
            <div class="dashed"></div>
           
          </div>
          <span>结算信息</span>
        </div>
        <!-- <div class="item" :class="haveFill?'itemOpacity':'item'"> -->
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>5</a>
          </div>
          <span>产品信息</span>
        </div>
      </div>
      <!-- <i class="jt"></i> -->
    </div>
    <div class="main">
       <!-- <i class="jt"></i> -->
      <div class="mainTop" ref="mainTopWrapper">
        
        <ul class="mainTopUl">
          <!-- <li class="inputLi">     
            <a>所属商户</a>
            <input type="text"  placeholder="点击输入名称"   v-model="shopList1.merchant_name"/>
          </li > -->
          <li class="inputLi">
            <a>门店简称</a>
            <input type="text" placeholder="请输入简称"  v-model="shopList1.storeshortname"/>
          </li>
          <li class="inputLi">
            <a>行业类目</a>
            <div @click="showGategory = true">
              <span>{{category_id}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
           <li class="inputLi">     
            <a>门店产权</a>
            <div @click="chooseProperty">
              <span>{{myProperty}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>经营类型</a>
            <div @click="chooseMchdealtype">
              <span>{{myMchdealtype}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
           <li class="inputLi">
            <a>行业类别</a>
            <div @click="showMcc = true">
              <span>{{myMcc}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>门店地址</a>
            <div @click="showArea = true" class="regCity">
              <span>{{regCity}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>详细地址</a>
            <input type="text" placeholder="点击输入地址" v-model="shopList1.address"/> 
          </li>
           <li class="inputLi">
            <a>经营时间</a>
            <input type="text" placeholder="如9:00-18:00"   v-model="shopList1.business_time"/>  
          </li>


          <li class="inputLi">
            <a>联系人姓名</a>
            <input type="text"  placeholder="点击输入姓名" v-model="shopList1.contact_name"/> 
          </li>
          <li class="inputLi" @click="chooseContact_type">
            <a>联系人类型</a>
            <div>
              <span>{{myContact_type}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>联系人手机</a>
            <input type="text" placeholder="多个手机,用逗号隔开"   v-model="shopList1.contact_number"/>
          </li>
           <li class="inputLi">
            <a>联系人邮箱</a>
            <input type="text" placeholder="如:XXXX@163.com"   v-model="shopList1.email"/>
          </li>
          <li class="IdCardLi">
            <div class="IdCardText">
              <a>门店照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('storeDoorway',0)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storeDoorway">
                  <img v-show="havaImg[0]" class="addIdCardStep4" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门头</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('storePlace',1)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storePlace">
                  <img v-show="havaImg[1]" class="addIdCardStep4" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门店场所</span>
              </div> 
              <div class="IdCardDiv" @click="toChoosePicture('storeCashier',2)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storeCashier">
                  <img v-show="havaImg[2]" class="addIdCardStep4" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门店收银台</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('storeProdect',3)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storeProdect">
                  <img v-show="havaImg[3]" class="addIdCardStep4" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门店产品</span>
              </div>
            </div> 
          </li>
          <!-- <li class="businessLicense">
            <div class="businessLicenseA">
              <a>营业执照</a>
            </div>
            <div class="businessLicenseImgWrapper" @click="popupToast.show = true">
              <img  src="./image/icon_yyzz.png" id="businessLicenseImg">
              <img v-show="havaBusinessImg" class="add" src="./image/icon_add.png">
            </div>          
            <div class="businessLicenseSpan">
              <span>点击上传&nbsp;营业执照</span>
            </div>
          </li> -->
        </ul>
      </div>
      <!-- <div class="mainNext" ref="mainNextWrapper">
        <ul class="mainTopUl">
          <li>     
            <a>商户名称</a>
            <input type="text" placeholder="点击输入名称"   />
          </li>
          <li>
            <a>联系人姓名</a>
            <input type="text" placeholder="点击输入姓名"  ></input>
          </li>
          <li>
            <a>负责人电话</a>
            <input type="text" placeholder="手机或者座机"  ></input>
          </li>
          <li class="borderNone">
            <a>联系邮箱</a>
            <input type="text" placeholder="点击输入邮箱"  ></input>
          </li>
          <li>     
            <a>商户名称</a>
            <input type="text" placeholder="点击输入名称"   />
          </li>
          <li>
            <a>联系人姓名</a>
            <input type="text" placeholder="点击输入姓名"  ></input>
          </li>
          <li>
            <a>负责人电话</a>
            <input type="text" placeholder="手机或者座机"  ></input>
          </li>
          <li class="borderNone">
            <a>联系邮箱</a>
            <input type="text" placeholder="点击输入邮箱"  ></input>
          </li>
          <li>     
            <a>商户名称</a>
            <input type="text" placeholder="点击输入名称"   />
          </li>
          <li>
            <a>联系人姓名</a>
            <input type="text" placeholder="点击输入姓名"  ></input>
          </li>
          <li>
            <a>负责人电话</a>
            <input type="text" placeholder="手机或者座机"  ></input>
          </li>
          <li class="borderNone">
            <a>联系邮箱</a>
            <input type="text" placeholder="点击输入邮箱"  ></input>
          </li>
        </ul>
      </div> -->
      <div class="bottomBtn" >
        <button type=button :class="[clickFlag?'btn':'btnLight']"   :disabled='clickFlag'  @click="goToStep2">下一步</button>
        <!-- <div class="btn"  @click="goToStep2">
          <a>下一步</a>
        </div> -->
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
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="AreaData" value="110101" @confirm="getArea" @cancel="showArea = false" />
    </van-popup>
    
      <!-- 行业类型开始 -->
    <van-popup v-model="showGategory" position="bottom">
      <mt-picker  show-toolbar :slots="slots" value-key="name" @change="onValuesChange">
        <div style="    display: flex;height: 44px;
    line-height: 44px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;border-bottom:1px solid #ebedf0">
         <div @click="showGategory = false" class="van-picker__cancel">取消</div>
          <div @click="getGategory" class="van-picker__confirm">确认</div> </div> 
      </mt-picker> 
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
          :imgIndex="popupToast.imgIndex"
          :thirdMsg="popupToast.thirdMsg"
          :showThirdMsg="popupToast.showThirdMsg"
          v-on:typeChoosed="typeChoosed">
        </TypeChoose>

      </div>
    </van-popup> 
        <!-- 行业类型开始 -->
   <!-- 行业类型 -->
    <van-popup v-model="showMcc" position="bottom">
      <van-picker show-toolbar
      @change="onChange"
      @cancel="onCancel"
      @confirm="onConfirm" 
      :columns="columns"/>
    </van-popup>
    <!-- <van-popup v-model="popupToast.show" position="bottom">
      <div style="width:100%">
        <TypeChoose 
          :chooseMsg="bussinessType.chooseMsg"
          :firstMsg="bussinessType.firstMsg"
          :secondMsg="bussinessType.secondMsg"
          :showImage="popupToast.showImage"
          v-on:typeChoosed="bussinessChoosed">
        </TypeChoose>
      </div>
    </van-popup>    -->
  </div>
</template>
<script>
import ShopCreateHeader from "./ShopCreateHeader";
import TypeChoose from "../TypeChoose/TypeChoose";
import { dateExchange, timeExchange } from "../../common/js/myDate.js";
import BScroll from "better-scroll";
import { Area, Popup, Picker } from "vant";
import { DatetimePicker } from "mint-ui";
import {
  cameraTakePicture,
  getLocalPicture
} from "../../../static/cordovaplugin.js";
import MerchantApplyData from "./MerchantApplyData.js";
import AreaData from "../../common/data/Area.js";
import CategoryData from "./data/Category.js";
import CategoryDataObj from "./data/CategoryObj.js";

import { Toast } from "vant";
import MyLoading from "../PublicComponents/MyLoading";
import upLoadImg from "./upLoadImg.js";

import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
//行业类型
const address = [
  {
    code: "",
    name: "美食",
    childs: [
      {
        code: "",
        name: "中餐",
        childs: [
          {
            code: "2015050700000010",
            name: "川菜"
          },
          {
            code: "2015050700000010",
            name: "湘菜"
          },
          {
            code: "2015050700000010",
            name: "湖北菜"
          },
          {
            code: "2015050700000010",
            name: "台湾菜"
          },
          {
            code: "2015050700000010",
            name: "新疆菜"
          },
          {
            code: "2015050700000010",
            name: "江浙菜"
          },
          {
            code: "2015050700000010",
            name: "云南菜"
          },
          {
            code: "2015050700000010",
            name: "贵州菜"
          }
        ]
      },
      {
        code: "",
        name: "火锅",
        childs: [
          {
            code: "2015050700000020",
            name: "麻辣烫/串串香"
          },
          {
            code: "2015050700000020",
            name: "川味/重庆火锅"
          }
        ]
      },
      {
        code: "",
        name: "烧烤",
        childs: [
          {
            code: "2015050700000040",
            name: "中式烧烤"
          },
          {
            code: "2015050700000040",
            name: "拉美烧烤"
          }
        ]
      }
    ]
  },
  {
    code: "",
    name: "超市便利店",
    childs: [
      {
        code: "2015091000058480",
        name: "超市",
        childs: []
      },
      {
        code: "2015091000056950",
        name: "个人护理",
        childs: []
      },
      {
        code: "2015091000060130",
        name: "便利店",
        childs: []
      }
    ]
  },
  {
    code: "",
    name: "K歌",
    childs: [
      {
        code: "",
        name: "KTV",
        childs: [
          {
            code: "2015090700042460",
            name: "量贩式KTV"
          },
          {
            code: "2016042200000050",
            name: "会所式KTV"
          }
        ]
      }
    ]
  },
  {
    code: "",
    name: "电影",
    childs: [
      {
        code: "2016062900190380",
        name: "电影院",
        childs: []
      },
      {
        code: "2016062900190380",
        name: "私人电影",
        childs: []
      }
    ]
  }
];
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
      header:{},
      slots: [
        {
          flex: 1,
          values: address,
          defaultIndex: 10,
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
          values: address[0].childs,
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
          values: address[0].childs[0].childs,
          defaultIndex: 0,
          className: "slot5",
          textAlign: "center"
        }
      ],
      //门店产权弹框

      myProperty: "请选择",
      propertyType: {
        chooseMsg: "请选择门店产权",
        firstMsg: "租赁",
        secondMsg: "自购"
      },
      //经营类型
      myMchdealtype: "请选择",
      mchdealtypeType: {
        chooseMsg: "请选择经营类型",
        firstMsg: "实体",
        secondMsg: "虚拟"
      },
      //行业类别
      showMcc: false,
      myMcc: "请选择",
      columns: [
        {
          values: Object.keys(citys)
        },
        {
          values: citys["一般类"]["name"],
          code: citys["一般类"]["code"]
        }
      ],
      //门店地址
      showBusi: false,
      busiCity: "请选择",
      //联系人类别
      myContact_type: "请选择",
      //照片
      havaImg: [true, true, true, true],
      touchmoveData: {
        startX: "",
        startY: "",
        endX: "",
        endX: ""
      },
      bgHeight: "",
      myBackgroundImage: "url(" + require("./image/pic_shsq.png") + ")",
      havaBusinessImg: true,
      haveFill: true,
      showArea: false,
      showGategory: false,
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
      myAddress: [], //类目数据
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
      //行业类目数据
      CategoryData,
      //行业类目数据obj
      CategoryDataObj,
      //行业类目中文名称
      category_id: "请选择",
      //门店申请默认数据
      MerchantApplyData,
      shopList1: {
        cid: "0885190600000001", //商户id
        storeshortname: "万塘路店", //门店简称
        property: "", //门店产权 1租赁2自购
        mchdealtype: "请选择", //商户经营类型 1实体2虚拟
        mcc: "", //行业类别
        province_code: "", //门店地址省份编码
        city_code: "", //门店地址城市编码
        district_code: "", //门店地址区县编码
        address: "万塘路18号黄龙时代广场", //门店地址详细地址  4-50个字符
        business_time: "9:00-11:00,13:00-22:00", //营业时间9:00-11:00 分段英文逗号分割
        contact_name: "", //联系人名称
        contact_type: "", //联系人类型 0财务 1法人 2授权人
        contact_number: "", //联系人手机号码 （数字 +-）多电话逗号分割
        email: "", //联系人邮箱,

        main_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //门店门头照
        shop_place_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //经营门店场所照
        shop_cashier_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //门店收银台照
        shop_product_image: "a3d1582530b14ac19e2f2e240c7ccb1d" //经营门店产品照
      },
      main_image: "", //门店门头照
      shop_place_image: "", //经营门店场所照
      shop_cashier_image: "", //门店收银台照
      shop_product_image: "", //经营门店产品照
      imageFlag: "" //图片字段

      // clickFlag:true,
    };
  },
  components: {
    TypeChoose,
    ShopCreateHeader,
    DatetimePicker,
    Area,
    Popup
  },
  methods: {
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
    onValuesChange(picker, values) {
      console.log(picker);
      console.log(values);
      if (!values[0]) {
        this.$nextTick(() => {
          if (this.myAdress) {
            // 赋默认值
            console.log(this.myAdress);
          } else {
            picker.setValues([
              address[0],
              address[0].childs[0],
              address[0].childs[0].childs[0]
            ]);
          }
        });
      } else {
        picker.setSlotValues(1, values[0].childs);
        let town = [];
        if (values[1]) {
          town = values[1].childs;
        }
        picker.setSlotValues(2, town);
      }
      this.myAddress = values;
      console.log(this.myAddress);
    },
    //行业类别
    onChange(picker, values) {
      console.log(values);
      // console.log(picker.getColumnIndex(1))
      // console.log(this.columns[1].code[picker.getColumnIndex(1)])
      picker.setColumnValues(1, citys[values[0]].name);
    },
    //经营类目

    onCancel() {
      console.log("取消");
    },
    onConfirm(value, index) {
      console.log(citys[value[0]].name[index[1]]);
      console.log(citys[value[0]].code[index[1]]);
      this.myMcc = citys[value[0]].name[index[1]];
      this.shopList1.mcc = citys[value[0]].code[index[1]];
      this.showMcc = false;
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
      this.shopList1.busi_start = date_value;
    },
    //获取截止日期
    handleChange2(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList1.busi_end = date_value;
    },
    //获取门店城市名称
    getArea(value) {
      this.showArea = false;
      let myArea = "";
      console.log(value);
      value.forEach((item, index) => {
        console.log("=====");
        console.log(index);
        console.log(item);
        if (index == "0") {
          this.shopList1.province_code = item.code; //门店省份编码
        } else if (index == "1") {
          this.shopList1.city_code = item.code; //门店城市编码
        } else if (index == "2") {
          this.shopList1.district_code = item.code; //区县
        }
        if (index < 2) {
          myArea += item.name + "-";
        } else {
          myArea += item.name;
        }
      });
      console.log(JSON.stringify(myArea));
      this.regCity = myArea;
    },
    //获取经营类目
    // getGategory(value) {
    //   this.showGategory = false;
    //   this.category_id = value;
    //   for (let key in this.CategoryDataObj) {
    //     if (this.CategoryDataObj[key] === value) {
    //       console.log("aaa");
    //       console.log(key);
    //       this.shopList1.category_id = key;
    //     }
    //   }
    // },
    //获取经营类目
    getGategory(value) {
      // this.showGategory = false;
      // this.category_id = value;
      // for (let key in this.CategoryDataObj) {
      //   if (this.CategoryDataObj[key] === value) {
      console.log("经营类目id");
      console.log(value);
      console.log(this.myAddress);
      if (this.myAddress[2] != undefined) {
        this.category_id = this.myAddress[2].name;
        this.shopList1.category_id = this.myAddress[2].code;
      } else {
        this.category_id = this.myAddress[1].name;
        this.shopList1.category_id = this.myAddress[1].code;
      }

      this.showGategory = false;
      //     this.shopList.category_id = key;
      //   }
      // }
    },
    //选择的公司类型
    typeChoosed(data) {
      // console.log(val);
      console.log("选择的==" + data);
      this.popupToast.show = false;
      if (data[0] === "拍摄") {
        this.havaImg[data[2]] = false;
        this._getBusinessLicenseFromCamera(data[1]);
      } else if (data[0] === "相册") {
        // const img = document.getElementsByClassName("addIdCardStep4");
        this.havaImg[data[2]] = false;
        console.log("去相册");

        this._getBusinessLicenseFromPhone(data[1]);
        // getLocalPicture(data[1]);
      } else if (data[0] == "租赁") {
        this.shopList1.property = data[3] + 1;
        this.myProperty = data[0];
      } else if (data[0] == "自购") {
        this.shopList1.property = data[3] + 1;
        this.myProperty = data[0];
      } else if (data[0] == "实体") {
        this.shopList1.mchdealtype = data[3] + 1;
        this.myMchdealtype = data[0];
      } else if (data[0] == "虚拟") {
        this.shopList1.mchdealtype = data[3] + 1;
        this.myMchdealtype = data[0];
      } else if (data[0] == "财务") {
        this.shopList1.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "法人") {
        this.shopList1.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "授权人") {
        this.shopList1.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "身份证") {
        this.accountType = data[0];
        this.shopList1.legal_id_type = "1";
      } else if (data[0] == "护照") {
        this.accountType = data[0];
        this.shopList1.legal_id_type = "2";
      } else if (data[0] == "对公账户" || "对私法人账户" || "对私授权人") {
        this.accountType1 = data[0];
        this.shopList1.accounttype = data[3];
      }
    },
    //选择门店产权
    chooseProperty() {
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
    //选择商户经营类型
    chooseMchdealtype() {
      this.popupToast.show = true;
      this.popupToast.showImage = false;
      this.popupToast.chooseMsg = "请选择商户经营类型";
      this.popupToast.firstMsg = "实体";
      this.popupToast.secondMsg = "虚拟";
      this.popupToast.showThirdMsg = false;
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0;
    },
    //点击弹出选择拍照或者照片选择
    toChoosePicture(name, index) {
      this.popupToast.show = true;
      this.popupToast.showImage = true;
      this.popupToast.chooseMsg = "请选择上传方式";
      this.popupToast.firstMsg = "拍摄";
      this.popupToast.secondMsg = "相册";
      this.popupToast.showThirdMsg = false;
      this.popupToast.name = name;
      this.popupToast.imgIndex = index;
      if (name === "storeDoorway") {
        this.popupToast.imgSrc = require("./image/img_door-header_add@2x.png");
      } else if (name === "storePlace") {
        this.popupToast.imgSrc = require("./image/img_place_add@2x.png");
      } else if (name === "storeCashier") {
        this.popupToast.imgSrc = require("./image/img_check-out_add@2x.png");
      } else if (name === "storeProdect") {
        this.popupToast.imgSrc = require("./image/img_product_add@2x.png");
      }
    },
    //选择营业执照
    bussinessChoosed(data) {
      //拍照
      if (data === this.bussinessType.firstMsg) {
        this.popupToast.show = false;
        this.havaBusinessImg = false;
        this._getBusinessLicenseFromCamera();
        //相册选择
      } else {
        this.popupToast.show = false;
        this.havaBusinessImg = false;
        this._getBusinessLicenseFromPhone();
      }
    },
    //拍照获取营业照照片
    _getBusinessLicenseFromCamera(id) {
      console.log(id);
      console.log("cordovaplugin.js调用拍照走到");
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

        if (id === "storeDoorway") {
          that.main_image = imageData;
          that.imageFlag = "main_image";
        } else if (id === "storePlace") {
          that.shop_place_image = imageData;
          that.imageFlag = "shop_place_image";
        } else if (id === "storeCashier") {
          that.shop_cashier_image = imageData;
          that.imageFlag = "shop_cashier_image";
        } else if (id === "storeProdect") {
          that.shop_product_image = imageData;
          that.imageFlag = "shop_product_image";
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
    _getBusinessLicenseFromPhone(id) {
      console.log(id);
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

        //     main_image: "", //门店门头照
        // shop_place_image: "", //经营门店场所照
        // shop_cashier_image: "", //门店收银台照
        // shop_product_image: "" //经营门店产品照
        if (id === "storeDoorway") {
          that.main_image = imageData;
          that.imageFlag = "main_image";
        } else if (id === "storePlace") {
          that.shop_place_image = imageData;
          that.imageFlag = "shop_place_image";
        } else if (id === "storeCashier") {
          that.shop_cashier_image = imageData;
          that.imageFlag = "shop_cashier_image";
        } else if (id === "storeProdect") {
          that.shop_product_image = imageData;
          that.imageFlag = "shop_product_image";
        }
        console.log("图片" + that.imageFlag);

        // that.havaBusinessImg = false
        image.src = "data:image/jpeg;base64," + imageData;
        console.log("图片的src==" + image.src);
        that.uploadImage();
        if (imageData.length > 0) {
          console.log("走到1");

          if (id === "storeDoorway") {
            that.havaImg[0] = false;
          } else if (id === "storePlace") {
            that.havaImg[1] = false;
          } else if (id === "storeCashier") {
            that.havaImg[2] = false;
          } else if (id === "storeProdect") {
            that.havaImg[3] = false;
          }
          // document.getElementsByClassName('add').style.display = "none"
        }
      }
      function onFail(message) {
        console.log("调用手机相册失败");
      }
    },
    //调起上传图片接口
    uploadImage() {
      console.log("当前图片字段" + this.imageFlag);
      if (this.imageFlag == "main_image") {
        var src1 = this.main_image;
      } else if (this.imageFlag == "shop_place_image") {
        var src1 = this.shop_place_image;
      } else if (this.imageFlag == "shop_cashier_image") {
        var src1 = this.shop_cashier_image;
      } else if (this.imageFlag == "shop_product_image") {
        var src1 = this.shop_product_image;
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
    goToStep2() {
      //点击跳转到第二页，把数据存入到vuex中去
      if (this.myProperty == "请选择") {
      }
      console.log("shopList1");
      console.log(JSON.stringify(this.shopList1));
      console.log(this.MerchantApplyData);
      const MerchantApplyEntitity = this.MerchantApplyData;

      (MerchantApplyEntitity.biz_content.cid = this.shopList1.cid), //商户id
        (MerchantApplyEntitity.biz_content.category_id = this.shopList1.category_id), // 行业类目
        (MerchantApplyEntitity.biz_content.storeshortname = this.shopList1.storeshortname), // storeshortname: "万塘路店", //门店简称
        (MerchantApplyEntitity.biz_content.property = this.shopList1.property), // property: "", //门店产权 1租赁2自购
        (MerchantApplyEntitity.biz_content.mchdealtype = this.shopList1.mchdealtype), // mchdealtype: "请选择", //商户经营类型 1实体2虚拟
        (MerchantApplyEntitity.biz_content.mcc = this.shopList1.mcc), // mcc: "", //行业类别
        (MerchantApplyEntitity.biz_content.province_code = this.shopList1.province_code), // province_code: "", //门店地址省份编码
        (MerchantApplyEntitity.biz_content.city_code = this.shopList1.city_code), // city_code: "", //门店地址城市编码
        (MerchantApplyEntitity.biz_content.district_code = this.shopList1.district_code), // district_code: "", //门店地址区县编码
        (MerchantApplyEntitity.biz_content.address = this.shopList1.address), // address: "万塘路18号黄龙时代广场", //门店地址详细地址  4-50个字符
        (MerchantApplyEntitity.biz_content.business_time = this.shopList1.business_time), // business_time: "9:00-11:00,13:00-22:00", //营业时间9:00-11:00 分段英文逗号分割
        (MerchantApplyEntitity.biz_content.contact_name = this.shopList1.contact_name), // contact_name: "", //联系人名称
        (MerchantApplyEntitity.biz_content.contact_type = this.shopList1.contact_type); // contact_type: "", //联系人类型 0财务 1法人 2授权人
      (MerchantApplyEntitity.biz_content.contact_number = this.shopList1.contact_number), // contact_number: "", //联系人手机号码 （数字 +-）多电话逗号分割
        (MerchantApplyEntitity.biz_content.email = this.shopList1.email), // email: "", //联系人邮箱,
        // main_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //门店门头照
        // shop_place_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //经营门店场所照
        // shop_cashier_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //门店收银台照
        // shop_product_image: "a3d1582530b14ac19e2f2e240c7ccb1d" //经营门店产品照

        console.log(this.MerchantApplyData);
      this.$store.commit("setShopCreateEntitity", MerchantApplyEntitity);
      this.$router.push({ path: "./ShopCreate2" });
    }
  },
  created() {
    console.log(this.$route.params);
    if(this.$route.params.title!=undefined){
      this.header=this.$route.params
    }
    //获取默认商户申请的数据,放入到vuex中去
    const data = MerchantApplyData;
    const defaultMerchantApplyEntitity = this.MerchantApplyData;
    console.log(defaultMerchantApplyEntitity);
    this.$store.commit("setShopCreateEntitity", defaultMerchantApplyEntitity);
    //设置高度，点击输入框的时候页面不会变形

    this.$nextTick(() => {
      this.bgHeight = document.body.scrollHeight * 35 / 100 + "px";
      this._initScroll();
    });
  },
  watch: {
    fullHeight(val) {
      console.log(val);
      console.log("屏幕窗口变化了");
      this.mainTopScroll.refresh();
    },
    myProperty(val, old) {
      console.log(val, old);
    }
  },
  computed: {
    clickFlag() {
      console.log("11");
      if (
        this.shopList1.storeshortname == "" ||
        this.category_id == "请选择" ||
        this.myProperty == "请选择" ||
        this.myMchdealtype == "请选择" ||
        this.myMcc == "请选择" ||
        this.regCity == "请选择" ||
        this.shopList1.address == "" ||
        this.shopList1.bussiness_time == "" ||
        this.shopList1.contact_name == "" ||
        this.myContact_type == "请选择" ||
        this.shopList1.contact_number == "" ||
        this.shopList1.email == ""
      ) {
        return true;
      } else {
        let rePhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        let regPhone = new RegExp(rePhone);
        let reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let regEmail = new RegExp(reEmail);
        if (
          regPhone.test(this.shopList1.contact_number) &&
          regEmail.test(this.shopList1.email)
        ) {
          console.log("手机号正确");
          return false;
        } else {
          return true;
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  z-index: 600;
  .head {
    width: 100%;
    height: 35%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

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

    .jt {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 17px solid red;
      position: absolute;
      z-index: 1000;
      left: 10%;
      bottom: 14%;
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

    .jt {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 17px solid red;
      position: absolute;
      z-index: 1000;
      left: 10%;
      bottom: 14%;
    }

    .mainTop {
      width: 90%;
      height: 90%;
      background: #FFFFFF;
      margin-top: -10%;
      overflow: hidden;
      position: relative;

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
        height: 50%;
        border: none;
        border-radius: 20px;
        background: #DDDDDD;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }

      .btnLight {
        width: 80%;
        height: 50%;
        border: none;
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


