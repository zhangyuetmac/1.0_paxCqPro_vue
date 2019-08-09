<template>
  <div class="ShopAdd">
    <div class="head">
      <div class="header">
        <img src="./image/btn_back.png">
        <a>添加门店</a>
      </div>
      
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl">
          <li class="inputLi">
            <a>经营类目</a>
            <div @click="showGategory = true">
              <span>{{category_id}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi">     
            <a style=" width: 57%;">门店营业执照名称</a>
            <input type="text" placeholder="请保持与证件一致"   v-model="shopList.licence_name" />
          </li >
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
          <li class="inputLi">
            <a>门店简称</a>
            <input type="text" placeholder="请输入简称"  v-model="shopList.storeshortname"/>
          </li>
        
           <li class="inputLi">     
            <a>门店产权</a>
            <div @click="chooseProperty">
              <span>{{myProperty}}</span>
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
          <!-- <li class="inputLi borderNone">
            <a>经营类型</a>
            <input type="text" placeholder="点击输入邮箱"  > 
          </li> -->
          <li class="inputLi">     
            <a>企业类型</a>
            <div @click="showEnterpriseType = true">
              <span>{{enterprise_type}}</span>
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
            <a style="width:60%">统一社会信用代码</a>
            <input type="text" placeholder="点击输入代码"  v-model="shopList.org_code" />
          </li>
          <li class="inputLi borderNone">
            <a>法定代表人</a>
            <input type="text" placeholder="请保持与证件一致"  v-model="shopList.busi_legal_name"/>
          </li>
          <li class="inputLi">     
            <a>注册资本</a>
            <div class="million">
              <input type="number"   v-model="shopList.reg_capital"/>
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
            <input type="text" placeholder="点击输入地址" v-model="shopList.busi_address"/> 
          </li>
          <li class="inputLi">
            <a>成立日期</a>
            <div @click="openPicker">
              <span>{{shopList.busi_start}}</span>
              <img src="./image/btn_more2.png">
            </div>   
          </li>
          <li class="inputLi" v-if="shopList.enterprise_type=='0'">     
            <a style="width:60%">营业期至</a>
            <div @click="openPicker2">
              <span>{{shopList.busi_end}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <!-- 法人开始 -->
           <li class="inputLi">
            <a>法人姓名</a>
            <input type="text" v-model="shopList.legal_name" placeholder="请输入姓名"  /> 
          </li>
          <li class="inputLi">     
            <a>证件类型</a>
            <div @click="getAccountType">
              <span>{{accountType}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li >
          <li class="inputLi">
            <a>身份证号码</a>
            <input type="text" v-model="shopList.legal_id_no" placeholder="请输入身份证号码"  />
          </li>
          <li class="IdCardLiFirst" v-if="shopList.legal_id_type=='1'">
            <div class="IdCardText">
              <a>身份证照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('idCardZm',0)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzrxm.png" class="imgGray" id="idCardZm">
                  <img v-show="havaImg[0]" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;人像面</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('idCardFm',1)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzghm.png" class="imgGray" id="idCardFm">
                  <img v-show="havaImg[1]" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;国徽面</span>
              </div>
              <div class="IdCardDiv" @click="toChoosePicture('idCardSc',2)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_scsfz.png" class="imgGray" id="idCardSc">
                  <img v-show="havaImg[2]" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;手持身份证</span>
              </div>
            </div> 
          </li>
           <li class="IdCardLiFirst" v-if="shopList.legal_id_type=='2'">
            <div class="IdCardText">
              <a>护照照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('idCardZm',0)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzrxm.png" class="imgGray" id="idCardZm">
                  <img v-show="havaImg[0]" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;护照(原件)</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('idCardFm',1)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzghm.png" class="imgGray" id="idCardFm">
                  <img v-show="havaImg[1]" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;护照(翻译)</span>
              </div>
              <!-- <div class="IdCardDiv" @click="toChoosePicture('idCardSc',2)">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_scsfz.png" class="imgGray" id="idCardSc">
                  <img v-show="havaImg[2]" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;手持身份证</span>
              </div> -->
            </div> 
          </li>
          <li class="inputLi">
            <a>起始有效期</a>
            <div @click="openPickerLegal">
              <span>{{shopList.legal_id_start}}</span>
              <img src="./image/btn_more2.png">
            </div>   
          </li>
          <li class="inputLi">     
            <a style="width:60%">截止有效期</a>
            <div @click="openPickerLegal2">
              <span>{{shopList.legal_id_end}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <!-- 法人结束 -->
           <li class="inputLi">
            <a>经营时间</a>
            <input type="text" placeholder="如9:00-18:00"   v-model="shopList.business_time"/>  
          </li>
           <li class="inputLi">
            <a>联系人姓名</a>
            <input type="text" placeholder="点击输入姓名" v-model="shopList.contact_name" >
          <li class="inputLi" @click="chooseContact_type">
            <a>联系人类型</a>
            <div>
              <span>{{myContact_type}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>联系人手机</a>
            <input type="text" placeholder="多个手机,用逗号隔开"   v-model="shopList.contact_number"/>
          </li>
           <li class="inputLi">
            <a>联系人邮箱</a>
            <input type="text" placeholder="如:XXXX@163.com"   v-model="shopList.email"/>
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
            <input type="text" placeholder="点击输入地址" v-model="shopList.address"/> 
          </li>
          <!-- <li class="inputLi">     
            <a style="width:60%">营业期限截止日期</a>
            <div @click="openPicker2">
              <span>{{closeDate}}</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li> -->
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

          <!--开户资料开始 -->
          <li class="inputLi">     
            <a>账户类型</a>
            <div @click="getAccountType1">
              <span>{{accountType1}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li >
          <li class="inputLi">
            <a>开户人</a>
            <input type="text" placeholder="点击输入开户人"   v-model="shopList.accountname"></input>
          </li>
          <li class="inputLi">
            <a>开户银行</a>
            <input type="text" placeholder="点击输入开户银行"   v-model="shopList.bankname"></input>
          </li>
          <li class="inputLi">
            <a>开户支行</a>
            <input type="text" placeholder="点击输入开户支行"   v-model="shopList.sub_bank_name"></input> 
          </li>
          <li class="inputLi">
            <a>银行账号</a>
            <input type="text" placeholder="点击输入账号"   v-model="shopList.account_code"></input>
          </li>
          <li class="inputLi">
            <a>开户省份和城市</a>
            <div @click="showAccount = true">
              <span>{{accountCity}}</span>
              <img src="./image/btn_more2.png">
            </div> 
          </li>
          <li class="inputLi borderNone">
            <a>预留手机号</a>
            <input type="text" placeholder="点击输入手机号"   v-model="shopList.tel"></input>
          </li>
          <!-- 开始资料结束 -->
        </ul>
      </div>
      <!-- <div class="mainNext" ref="mainNextWrapper">
        <ul class="mainTopUl">
          <li>     
            <a>商户名称</a>
            <input type="text" placeholder="点击输入名称"  dir='rtl'/>
          </li>
          <li>
            <a>联系人姓名</a>
            <input type="text" placeholder="点击输入姓名" dir='rtl'></input>
          </li>
          <li>
            <a>负责人电话</a>
            <input type="text" placeholder="手机或者座机" dir='rtl'></input>
          </li>
          <li class="borderNone">
            <a>联系邮箱</a>
            <input type="text" placeholder="点击输入邮箱" dir='rtl'></input>
          </li>
          <li>     
            <a>商户名称</a>
            <input type="text" placeholder="点击输入名称"  dir='rtl'/>
          </li>
          <li>
            <a>联系人姓名</a>
            <input type="text" placeholder="点击输入姓名" dir='rtl'></input>
          </li>
          <li>
            <a>负责人电话</a>
            <input type="text" placeholder="手机或者座机" dir='rtl'></input>
          </li>
          <li class="borderNone">
            <a>联系邮箱</a>
            <input type="text" placeholder="点击输入邮箱" dir='rtl'></input>
          </li>
          <li>     
            <a>商户名称</a>
            <input type="text" placeholder="点击输入名称"  dir='rtl'/>
          </li>
          <li>
            <a>联系人姓名</a>
            <input type="text" placeholder="点击输入姓名" dir='rtl'></input>
          </li>
          <li>
            <a>负责人电话</a>
            <input type="text" placeholder="手机或者座机" dir='rtl'></input>
          </li>
          <li class="borderNone">
            <a>联系邮箱</a>
            <input type="text" placeholder="点击输入邮箱" dir='rtl'></input>
          </li>
        </ul>
      </div> -->
      <div class="bottomBtn" @click="putData">
        <div class="btn">
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
    <!-- 经营类目 -->
    
    <!-- 门店产权 -->
     
    <!-- 经营类型 -->
     
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
    <!-- 经营类型结束 -->
    <!-- 行业类型 -->
    <van-popup v-model="showMcc" position="bottom">
      <van-picker show-toolbar
      @change="onChange"
      @cancel="onCancel"
      @confirm="onConfirm" 
      :columns="columns"/>
    </van-popup>
    <!-- 选择门店地址：省市区 -->
    <van-popup v-model="showBusi" position="bottom">
      <van-area :area-list="AreaData" :columns-num="3" value="110101"  @confirm="getBusi" @cancel="showBusi = false" />
    </van-popup>
    <!-- 选择联系人地址：省市区 -->
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="AreaData" :columns-num="3" value="110101"  @confirm="getArea" @cancel="showArea = false" />
    </van-popup>
    <!-- 身份证件 -->
      <van-popup v-model="popupToast1.show" position="bottom">
      <div style="width:100%">
        <TypeChoose 
          :showImage="popupToast1.showImage"
          :imgSrc="popupToast1.imgSrc"
          :chooseMsg="popupToast1.chooseMsg"
          :firstMsg="popupToast1.firstMsg"
          :secondMsg="popupToast1.secondMsg"
          :name="popupToast1.name"
          :imgIndex="popupToast1.imgIndex"
          v-on:typeChoosed="typeChoosed1">
        </TypeChoose>
      </div>
    </van-popup>  
    <!-- 图片 -->
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
    <!-- 开户省市 -->
    <van-popup v-model="showAccount" position="bottom">
      <van-area :area-list="AreaData" :columns-num="2" value="110101"  @confirm="getAccount" @cancel="showAccount = false" />
    </van-popup>
    <!-- 营业执照 -->
     <van-popup v-model="popupToast2.show" position="bottom">
      <div style="width:100%">
        <TypeChoose 
          :chooseMsg="bussinessType.chooseMsg"
          :firstMsg="bussinessType.firstMsg"
          :secondMsg="bussinessType.secondMsg"
          :showImage="popupToast2.showImage"
          v-on:typeChoosed="bussinessChoosed">
        </TypeChoose>
      </div>
    </van-popup>
    <MyLoading :myLoading="myLoading" :myLoadingMsg="myLoadingMsg"></MyLoading>
  </div>
</template>
<script>
import RegisterHeader from "../Register/RegisterHeader";
import TypeChoose from "../TypeChoose/TypeChoose";
import MyLoading from "../PublicComponents/MyLoading";
import { dateExchange } from "../../common/js/myDate.js";
import BScroll from "better-scroll";
import { Area, Popup } from "vant";
import AreaData from "../../common/data/Area.js";
import { DatetimePicker } from "mint-ui";
import CategoryData from "./data/Category.js";
import CategoryDataObj from "./data/CategoryObj.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import {
  cameraTakePicture,
  getLocalPicture
} from "../../../static/cordovaplugin.js";
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
const categoryList = {
  // 美食: ["中餐", "火锅", "烧烤", "其他美食", "汤/粥/煲/砂锅/炖菜","快餐","休闲食品"],

  美食: {
    中餐: [
      { code: "101001", name: "川菜" },
      { code: "101002", name: "湘菜" },
      { code: "101003", name: "湖北菜" }
    ],
    //     川菜: {
    //       id: 101001,
    //       code: "2015050700000010"
    //     },
    //     湘菜: {
    //       id: 101002,
    //       code: "2015050700000010"
    //     },
    //     湖北菜: {
    //       id: 101003,
    //       code: "2015050700000010"

    火锅: [
      {
        name: "麻辣烫/串串香",
        code: "102001"
      },
      {
        name: "云南火锅",
        code: "102002"
      },
      {
        name: "羊蝎子",
        code: "102003"
      }
    ]
  },
  超市便利店: [
    {
      name: "超市",
      code: "103004"
    }
  ]
  // 超市便利店: ["超市", "个人护理", "莆田", "三明", "泉州"],
  // K歌:['KTV','量贩式KTV']
};
export default {
  data() {
    return {
      myAdress: null,
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

      //选择框
      popupToast: {
        show: false,
        showLegal: false,
        showImage: false,
        imgSrc: "",
        chooseMsg: "",
        firstMsg: "",
        secondMsg: "",
        name: "",
        imgIndex: "",
        ThirdMsg: "",
        showThirdMsg: ""
      },
      //身份类型
      popupToast1: {
        show: false,
        showImage: false,
        imgSrc: "",
        chooseMsg: "",
        firstMsg: "",
        secondMsg: "",
        name: "",
        imgIndex: ""
      },
      // category_id_Chinese: "请选择",

      // //行业类目数据
      // CategoryData,
      // //行业类目数据obj
      // CategoryDataObj,
      // //行业类目中文名称
      // category_id_Chinese: "请选择",
      //营业执照
      bussinessType: {
        chooseMsg: "请选择上传方式",
        firstMsg: "拍摄",
        secondMsg: "相册"
      },
      popupToast2: {
        show: false,
        showImage: true
      },
      havaBusinessImg: true,
      //上传图片的loading
      myLoading: false,
      myLoadingMsg: "",
      //base64位的营业执照图片
      yyzzImgbase64: "",
      //经营类目
      category_id: "请选择",
      showGategory: false, //选择经营；类型弹出
      // categoryColumns: [
      //   {
      //     values: Object.keys(categoryList),
      //     className: "column1"
      //   },
      //   {
      //     values: categoryList["美食"],
      //     className: "column2",
      //     defaultIndex: 0
      //   },
      //   {
      //     values: categoryList["美食"],
      //     className: "column3",
      //     defaultIndex: 2
      //   }
      // ],
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
      //企业类型
      showEnterpriseType: false,
      enterprise_type: "请选择",
      provinceType: {
        chooseMsg: "请选择企业类型",
        firstMsg: "企业",
        secondMsg: "个体"
      },
      //营业执照照片
      havaBusinessImg: true,
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
      //证件类型
      accountType: "身份证",
      //账户类型
      accountType1: "请选择",

      //门店地址
      showBusi: false,
      busiCity: "请选择",
      //联系人地址
      showArea: false,
      regCity: "请选择",
      //开户省市 二级
      showAccount: false,
      accountCity: "请选择",
      //城市三级联动数据
      AreaData,
      //联系人类别
      myContact_type: "请选择",
      //照片
      havaImg: [true, true, true, true],
      shopList: {
        cid: "0885190600000001", //上海id
        // merchant_name: "肯德基",
        category_id: "", //经营类目id
        licence_name: "来伊份上海分公司", //门店营业执照名称（执照注册名称）
        busi_license_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //营业执照图片
        storeshortname: "万塘路店", //门店简称
        property: "请选择", //门店产权 1租赁2自购
        enterprise_type: "", //企业类型
        org_code: "H001232", //统一社会信用代码
        mchdealtype: "请选择", //商户经营类型 1实体2虚拟
        mcc: "", //行业类别
        busi_province: "", //注册地址省份编码
        busi_city: "", //注册地址城市编码
        busi_area: "", //注册地址区县编码
        busi_address: "", //注册地址详细地址
        busi_legal_name: "张三", //法定代表人
        reg_capital: "100", //注册资本
        busi_start: "请选择", //成立时间，营业开始时间
        busi_end: "", //营业截止时间（企业必填）
        legal_id_type: "1", //证件类型 1身份证2护照
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
        legal_id_image4: "a3d1582530b14ac19e2f2e240c7ccb1d", //翻译照

        //护照必填结束

        accounttype: "", //	账户类型  0：对公账户，1：对私法人账户, 2:对私授权人
        //对公必填
        // enterprise_openint_licence: "a3d1582530b14ac19e2f2e240c7ccb1d",
        // enterprise_account_cert: "a3d1582530b14ac19e2f2e240c7ccb1d",

        accountname: "张三", //开户人
        bankname: "工商银行", //开户银行
        sub_bank_name: "中国工商银行股份有限公司北京长安支行", //开户支行
        account_code: "622212345678901234", //银行账户
        open_bank_pro: "", //开户行省市
        open_bank_city: "", //开户行城市
        tel: "13312312312", //预留手机号

        province_code: "", //门店地址省份编码
        city_code: "", //门店地址城市编码
        district_code: "", //门店地址区县编码
        address: "万塘路18号黄龙时代广场", //门店地址详细地址  4-50个字符
        business_time: "9:00-11:00,13:00-22:00", //营业时间9:00-11:00 分段英文逗号分割
        contact_type: "", //联系人类型 0财务 1法人 2授权人
        contact_name: "张三", //联系人姓名
        contact_number: "13521367556", //联系人手机号码 （数字 +-）多电话逗号分割
        email: "wangyan@163.com", //联系人邮箱
        main_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //门店门头照
        shop_place_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //经营门店场所照
        shop_cashier_image: "a3d1582530b14ac19e2f2e240c7ccb1d", //门店收银台照
        shop_product_image: "a3d1582530b14ac19e2f2e240c7ccb1d" //经营门店产品照
      },
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
        showThirdMsg: ""
      },

      haveFill: true,
      establishDate: "请选择",
      closeDate: "请选择",
      regCity: "请选择",
      provinceDomType: "请选择",
      showArea: false,
      showProvince: false,
      value: null,
      value1: null,
      value2: null,
      startDate: new Date("1992-05-09"),
      endDate: new Date("2049-05-09"),

      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
        }
      }
    };
  },
  components: {
    TypeChoose,
    RegisterHeader,
    DatetimePicker,
    Area,
    Popup,
    MyLoading
  },
  methods: {
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
    //选择的公司类型
    typeEnterprise(data) {
      console.log(data);
      this.enterprise_type = data[0];
      if (data[0] == "企业") {
        this.shopList.enterprise_type = "0";
      } else if (data[0] == "个体") {
        this.shopList.enterprise_type = "1";
      }

      this.showEnterpriseType = false;
    },
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
        this.shopList.category_id = this.myAddress[2].code;
      } else {
        this.category_id = this.myAddress[1].name;
        this.shopList.category_id = this.myAddress[1].code;
      }

      this.showGategory = false;
      //     this.shopList.category_id = key;
      //   }
      // }
    },
    //获取成立日期
    handleChange(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList.busi_start = date_value;
    },
    //获取截止日期
    handleChange2(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList.busi_end = date_value;
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
      this.shopList.legal_id_start = date_value;
    },

    handleChangeLegal2(value) {
      console.log(value.toString());
      const date_value = dateExchange(value.toString());
      this.shopList.legal_id_end = date_value;
    },
    //身份证截止时间
    //获取门店城市名称
    getBusi(value) {
      this.showBusi = false;
      let myArea = "";
      console.log(value);
      value.forEach((item, index) => {
        console.log("=====");
        console.log(index);
        console.log(item);
        if (index == "0") {
          this.shopList.busi_province = item.code; //门店省份编码
        } else if (index == "1") {
          this.shopList.busi_city = item.code; //门店城市编码
        } else if (index == "2") {
          this.shopList.busi_area = item.code; //区县
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
          this.shopList.province_code = item.code; //门店省份编码
        } else if (index == "1") {
          this.shopList.city_code = item.code; //门店城市编码
        } else if (index == "2") {
          this.shopList.district_code = item.code; //区县
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
    //获取开户省市二级
    getAccount(value) {
      this.showAccount = false;
      let myArea = "";
      value.forEach((item, index) => {
        if (index < 1) {
          myArea += item.name + "-";
          this.shopList.open_bank_pro = item.name;
        } else {
          myArea += item.name;
          this.shopList.open_bank_city = item.name;
        }
      });
      this.accountCity = myArea;
    },
    //选择的公司类型

    //选择完成
    typeChoosed(data) {
      // console.log(val);
      console.log("选择的==" + data);
      this.popupToast.show = false;
      if (data[0] === "拍摄") {
        this.havaImg[data[2]] = false;
        cameraTakePicture(data[1]);
      } else if (data[0] === "相册") {
        const img = document.getElementsByClassName("addIdCardStep4");
        this.havaImg[data[2]] = false;
        getLocalPicture(data[1]);
      } else if (data[0] == "租赁") {
        this.shopList.property = data[3] + 1;
        this.myProperty = data[0];
      } else if (data[0] == "自购") {
        this.shopList.property = data[3] + 1;
        this.myProperty = data[0];
      } else if (data[0] == "实体") {
        this.shopList.mchdealtype = data[3] + 1;
        this.myMchdealtype = data[0];
      } else if (data[0] == "虚拟") {
        this.shopList.mchdealtype = data[3] + 1;
        this.myMchdealtype = data[0];
      } else if (data[0] == "财务") {
        this.shopList.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "法人") {
        this.shopList.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "授权人") {
        this.shopList.contact_type = data[3];
        this.myContact_type = data[0];
      } else if (data[0] == "身份证") {
        this.accountType = data[0];
        this.shopList.legal_id_type = "1";
        this._initScroll();
      } else if (data[0] == "护照") {
        this.accountType = data[0];
        this.shopList.legal_id_type = "2";
        this._initScroll();
      } else if (data[0] == "对公账户" || "对私法人账户" || "对私授权人") {
        this.accountType1 = data[0];
        this.shopList.accounttype = data[3];
      }
    },
    typeChoosed1(data) {
      // console.log(val);
      console.log("选择的==" + data);
      this.popupToast1.show = false;
      if (data[0] == "身份证") {
        this.accountType = data[0];
        this.shopList.legal_id_type = "1";
      } else if (data[0] == "护照") {
        this.accountType = data[0];
        this.shopList.legal_id_type = "2";
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
    //行业类型
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
      this.shopList.mcc = citys[value[0]].code[index[1]];
      this.showMcc = false;
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
    //证件类型
    //点击获取证件类型
    getAccountType() {
      this.popupToast1.show = true;
      this.popupToast1.showImage = false;
      this.popupToast1.chooseMsg = "请选择证件类型";
      this.popupToast1.firstMsg = "身份证";
      this.popupToast1.secondMsg = "护照";
      //没什么用处的，为了不报错
      this.popupToast1.imgIndex = 0;
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
      console.log(data);
      if (data[0] === "拍摄") {
        console.log("去拍照");
        this.popupToast2.show = false;
        // this.havaBusinessImg = false
        this._getBusinessLicenseFromCamera();
        //相册选择
      } else {
        console.log("去相册");
        this.popupToast2.show = false;
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
    },
    //提交数据
    putData() {
      console.log(this.shopList);
      //商户创建
      //merObj对象放置公共参数外的所有参数
      let merObj = {};
      merObj = {
        operate_notify_url: "http://example.com/gateway.do",
        biz_content: this.shopList
        // request_id: '2015123235324534',

        // biz_content:{
        // 	// cid:'0885190600000001',
        // 	cid:'0885190600000077',
        // 	merchant_name: "海底捞",
        // 	contact_name: "张三",
        // 	mobile: "13312345678",
        // 	fax: "02367904081",
        // 	contract_num: "12345312",
        // 	outer_contract_num: "121321321",
        // 	customer_manager: "李四",
        // 	//经营类目id
        // 	category_id: '2015050700000018',
        // 	storeshortname: '万塘路店',
        // 	property: '1',
        // 	mchdealtype: '1',
        // 	mcc: '4011',
        // 	province_code: '110000',
        // 	city_code: '140500',
        // 	district_code: '140521',
        // 	address: '万塘路18号黄龙时代广场',
        // 	business_time: '09:00-11:00,13:00-15:00',
        // 	contact_type: '0',
        // 	contact_name: '张三',
        // 	contact_number: '13612344321',
        // 	email:'zhangsan@paxsz.com',
        // 	office_number:'13867498729',
        // 	contact_province:'110000',
        // 	contact_city:'140500',
        // 	contact_area:'140521',
        // 	contact_address:'万塘路18号黄龙时代广场',
        // 	main_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	shop_place_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	shop_product_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	shop_cashier_image:'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	//企业类型：  0企业   1个体
        // 	enterprise_type:'0',
        // 	//统一社会信用代码
        // 	org_code: 'H001232',
        // 	licence_name: '来伊份上海分公司',
        // 	busi_address: 'XX省XX市XX区XX',
        // 	//法定代表人
        // 	busi_legal_name: '张三',
        // 	//注册资本
        // 	reg_capital: '100',
        // 	busi_province: '110000',
        // 	busi_city: '140500',
        // 	busi_area: '140521',
        // 	busi_start: '2010-03-20',
        // 	busi_end: '2020-03-20',
        // 	busi_license_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	legal_id_type: '1',
        // 	legal_id_image1: 'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	legal_id_image2: 'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	legal_id_image5: 'a3d1582530b14ac19e2f2e240c7ccb1d',
        // 	legal_id_start: '2020-10-20',
        // 	legal_id_end: '2020-10-20',
        // 	legal_name: '张三',
        // 	legal_id_no: '500106198606304321',
        // 	accounttype: '1',
        // 	accountname: '张三',
        // 	account_code: '622212345678901234',
        // 	bankname: '工商银行',
        // 	sub_bank_name: '中国工商银行股份有限公司北京通州支行新华分理处',
        // 	open_bank_pro: '北京',
        // 	open_bank_city: '北京市',
        // 	tel: '13312312312'
        // }
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
          }
        })
        .catch();
    }
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.ShopAdd {
  width: 100%;
  height: 100%;
  background: #F8F8FA;

  .head {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .header {
      width: 100%;
      height: 100%;
      // background red
      display: flex;
      align-items: center;

      img {
        margin-left: 3%;
      }

      a {
        margin-left: 3%;
        font-size: 24px;
        font-family: PingFangSC-Medium;
        color: #333333;
      }
    }
  }

  .main {
    width: 100%;
    height: 90%;
    background: #F8F8FA;
    display: flex;
    align-items: center;
    flex-direction: column;

    .mainTop {
      width: 90%;
      height: 100%;
      background: #FFFFFF;
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

          .regCity {
            width: 65%;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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

          .businessLicenseImg {
            position: relative;
            width: 145px;
            height: 109px;
            mixinDisplay();
            background: #F7F8F9;

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
              // left:50%
              // transform:translateX(-50%)
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
    }
  }
}
</style>


