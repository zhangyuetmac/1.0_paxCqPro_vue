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
            <a style="width:50%">门店营业执照名称</a>
            <input class="myInput" type="text" placeholder="请保持与证件一致"   v-model="merchantApply4.licence_name"></input>
          </li>
          <li class="inputLi">
            <a>门店简称</a>
            <input class="myInput" type="text" placeholder="请输入简称"   v-model="merchantApply4.storeshortname"></input>
          </li>
          <li class="inputLi">
            <a>门店产权</a>
            <div @click="chooseProperty">
              <span>{{myProperty}}</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li>
          <li class="inputLi" @click="chooseMchdealtype">
            <a>经营类型</a>
            <div>
              <span>{{myMchdealtype}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>  
          </li>
          <li class="inputLi">
            <a>行业类别</a>
            <div @click="toastHangye">
              <span>
                {{myMcc}}
              </span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>门店地址</a>
            <input class="myInput" type="text" placeholder="请输入详细地址"   v-model="merchantApply4.address"></input>   
          </li>
          <li class="inputLi">
            <a>经营时间</a>
            <div class="timePicker">
              <span @click="openStartTime">{{business_time_start}}</span>
              <span>-</span>
              <span @click="openEndTime">{{business_time_end}}</span>
            </div>
            <!-- <input class="myInput" type="text" placeholder="如9:00-18:00"   v-model="merchantApply4.business_time"></input>   
            <input class="myInput" type="text" placeholder="如9:00-18:00"   v-model="merchantApply4.business_time"></input>    -->
          </li>
          <li class="inputLi" @click="chooseContact_type">
            <a>联系人类型</a>
            <div>
              <span>{{myContact_type}}</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li>
          <li class="inputLi">
            <a>联系人手机</a>
            <input class="myInput" type="text" placeholder="支持多个手机,用逗号隔开"   v-model="merchantApply4.contact_number"></input>   
          </li>
          <li style="background:#F8F8FA;height:10px;width:100%"></li>
          <li class="IdCardLi">
            <div class="IdCardText">
              <a>银行卡照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('storeDoorway',0,'step4AddImg0')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storeDoorway">
                  <img v-show="addImg0" class="addIdCardStep4" id="step4AddImg0" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门头</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('storePlace',1,'step4AddImg1')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storePlace">
                  <img v-show="addImg1" class="addIdCardStep4" id="step4AddImg1" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门店场所</span>
              </div> 
              <div class="IdCardDiv" @click="toChoosePicture('storeCashier',2,'step4AddImg2')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storeCashier">
                  <img v-show="addImg2" class="addIdCardStep4" id="step4AddImg2" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门店收银台</span>
              </div>          
              <div class="IdCardDiv" @click="toChoosePicture('storeProdect',3,'step4AddImg3')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_pic.png" class="imgGray" id="storeProdect">
                  <img v-show="addImg3" class="addIdCardStep4" id="step4AddImg3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;门店产品</span>
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
    <!-- 选择经营开始时间 -->
    <mt-datetime-picker
      ref="pickerStart"
      type="time"
      v-model="business_time_start"
       @confirm="getStartTime">
    </mt-datetime-picker>
    <!-- 选择经营结束时间 -->
    <mt-datetime-picker
      ref="pickerEnd"
      type="time"
      v-model="business_time_end"
      @confirm="getEndTime">
    </mt-datetime-picker>
    <!-- 显示行业信息 -->
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
import MerchantApplyHeader from './MerchantApplyHeader'
// import TypeChoose from '../TypeChoose/TypeChoose'
import TypeChoose from '&/PublicComponents/TypeChoose'
import {dateExchange} from '../../common/js/myDate.js'
import BScroll from "better-scroll"
import { Area, Popup,Picker  } from 'vant'
import { DatetimePicker } from 'mint-ui'
import { Toast } from 'vant';
import {cameraTakePicture,getLocalPicture} from '../../../static/cordovaplugin.js'
import AreaData from '../../common/data/Area.js'
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import { commonParms, methodObj } from "./../../common/js/commonParams.js";
// import  MyLoading  from '../MyLoading/MyLoading'
import  MyLoading  from '&/PublicComponents/MyLoading'
import upLoadImg from './upLoadImg.js'
import creatMerchant from './creatMerchant.js'

// import Three  from './Three.vue'
// import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
const citys = {
  '一般类': {
    name:['兽医服务', '农业合作', '景观美化及园林服务', '铁路运输','救护车服务'],
    code:[742,763,780,4011,4119]
  },
  '房车类': {
    name:['一般承包商-住宅与商业'],
    code:[1520]
  },
  '民生类': {
    name:['中国人民共和国铁道部','本市和市郊挺勤旅游运输', '铁路客运','出租车服务','公路客运'],
    code:[3998,4111,4112,4121,4131]
  }
}
export default {
  data(){
    return{
      //经营开始时间
      business_time_start:'请选择',
      // 经营结束时间
      business_time_end:'请选择',
      //图片的base64格式
      imgBase64:{
        mtImgBase64:'',
        mdcsImgBase64:'',
        mdsytImgBase64:'',
        mdcpImgBase64:''
      }, 
      //上传图片的loading
      myLoading:false,
      myLoadingMsg:'',
      addImg0:true,
      addImg1:true,
      addImg2:true,
      addImg3:true,
      addImg4:true,
      addImg5:true,
      //监听页面滑动让input框隐藏
      touchmoveData:{
        startX:'',
        startY:'',
        endX:'',
        endX:''
      },
      myBackgroundImage: "url("+require('./image/pic_shsq.png')+")",
      btnHeight:'',
      columns: [
        {
          values: Object.keys(citys)
        },
        {
          values:citys['一般类']['name'],
          code: citys['一般类']['code']
        }
      ],
      AreaData:'',
      showHangye:false,
      show1: false,
      model1: '',
      bgHeight:'',
      establishDate: '请选择',
      closeDate: '请选择',
      regCity:'请选择',
      provinceDomType: '请选择',
      havaImg:[true,true,true,true],
      haveFill:true,
      showArea: false,
      //选择框
      popupToast:{
        show:false,
        showImage:false,
        imgSrc:'',
        chooseMsg:'',
        firstMsg:'',
        secondMsg:'',
        name:'',
        imgIndex:'',
        ThirdMsg:'',
        showThirdMsg:'',
        addImg:''
      },
      accountType: '请选择',
      areaList:{
        province_list: {
          '100000': '一般类',
          '110000': '房车类',
          '120000': '民生类'
        },
        city_list: {         
          '10010742': '兽医服务',
          '10020763': '农业合作',
          '10030780': '景观美化及园林服务',
          '10044011': '铁路运输',
          '10054119': '救护车服务',         
          '11011520': '一般承包商住宅与商业',
          '12023998':'中国人民共和国铁道部', 
          '12034111': '本市和市郊通勤旅游运输',
          '12044112': '铁路客运',
          '12054121': '出租车服务',
          '12064131': '公路客运'
        }
      },
      myProperty:'请选择',
      myMchdealtype:'请选择',
      myContact_type:'请选择',
      myMcc:'请选择',
      merchantApply4:{
        //门店营业执照名称
        licence_name:'',
        //门店简称
        storeshortname:'',
        //门店地址
        address:'',
        //经营时间
        business_time:'',
        //联系人手机
        contact_number:'',
        //门店产权
        property:'请选择',
        //经营类型
        mchdealtype:'请选择', 
        //行业类别
        mcc:'请选择',
        //联系人类型
        contact_type:'请选择',           
      },
      mccDataEmpty: [],
      A:'',
    }
  },
  computed:{
    btnClass(){
      if(this.merchantApply4.licence_name&&this.merchantApply4.storeshortname&&
          this.merchantApply4.property !== '请选择'&&this.merchantApply4.mchdealtype !== '请选择'&&
          this.merchantApply4.mcc !== '请选择'&&this.merchantApply4.address&&this.business_time_start !== '请选择'&&
          this.business_time_end !== '请选择'&&this.merchantApply4.contact_type !== '请选择'&&this.merchantApply4.contact_number&&!this.addImg0&&
          !this.addImg1&&!this.addImg2&&!this.addImg3)
     {
        return 'btnLight'
      } else {
        return 'btn'
      }
    }
  },
  components:{
    TypeChoose,
    MerchantApplyHeader,
    DatetimePicker,
    Area,
    Popup,
    MyLoading
  },
  methods:{
    //开始时间选择，点击确定
    getStartTime(value){
      // console.log('获取到的开始时间=='+value)
      this.business_time_start = value
    },
    //结束时间选择，点击确定
    getEndTime(value){
      // console.log('获取到的开始时间=='+value)
      this.business_time_end = value
    },
    //点击打开开始时间
    openStartTime() {
      this._inputBlur()
      this.$refs.pickerStart.open();
    },
    //点击打开结束时间
    openEndTime() {
      this._inputBlur()
      this.$refs.pickerEnd.open();
    },
    checkData(){
      return true
      if (!this.merchantApply4.licence_name){
        Toast('请输入营业执照名称')
        return false
      } else if (!this.merchantApply4.storeshortname){
        Toast('请输入门店简称')
        return false
      }else if (this.merchantApply4.property === '请选择'){
        Toast('请选择门店产权')
        return false
      }else if (this.merchantApply4.mchdealtype === '请选择'){
        Toast('请选择经营类型')
        return false
      }else if (this.merchantApply4.mcc === '请选择'){
        Toast('请选择行业类别')
        return false
      }else if (!this.merchantApply4.address){
        Toast('请输入门店地址')
        return false
      }else if (this.business_time_start === '请选择'){
        Toast('请输入经营开始时间')
        return false
      }else if (this.business_time_end === '请选择'){
        Toast('请输入经营结束时间')
        return false
      }else if (this.merchantApply4.contact_type === '请选择'){
        Toast('请选择联系人类型')
        return false
      }else if (!this.merchantApply4.contact_number){
        Toast('请输入联系人手机')
        return false
      } else if(!(/^0?1[3|4|5|6|7|8][0-9]\d{8}$/).test(this.merchantApply4.contact_number)){
        Toast('请输入正确的联系人手机号')
        return false
      }else if(this.addImg0){
        Toast('请上传门头照')
        return false
      } else if(this.addImg1){
        Toast('请上传门店场所照')
        return false
      } else if(this.addImg2){
        Toast('请上传门店收银台照')
        return false
      } else if(this.addImg3){
        Toast('请上传门店产品照')
        return false
      }  else {
        console.log('输入成功')
        return true       
      }
      return true
    },
    myTouchStart(e){
      this.touchmoveData.startX = e.changedTouches[0].pageX
      this.touchmoveData.startY = e.changedTouches[0].pageY
      // console.log('起始位置X=='+this.touchmoveData.startX)
      // console.log('起始位置Y=='+this.touchmoveData.startY)
    },
    myTouchEnd(e){
      this.touchmoveData.endX = e.changedTouches[0].pageX
      this.touchmoveData.endY = e.changedTouches[0].pageY
      // console.log('结束位置X=='+this.touchmoveData.endX)
      // console.log('结束位置Y=='+this.touchmoveData.endY)
      if(Math.abs(this.touchmoveData.endX - this.touchmoveData.startX) > 2 ){
        // console.log('X方向上滑动了')
        this._inputBlur()
      }
      if(Math.abs(this.touchmoveData.endY - this.touchmoveData.startY) > 2 ){
        // console.log('Y方向上滑动了')
        this._inputBlur()
      }
    },
    //让文本框失去焦点
    _inputBlur(){
      const inputMe = document.getElementsByClassName('myInput')
      for (var i=0;i<inputMe.length;i++){
        if(inputMe[i] == document.activeElement){
          inputMe[i].blur()
        }
      }
    },
    //弹出选择行业类别
    toastHangye(){
      this.showHangye = true
      this._inputBlur()
    },
    //选择行业类别时候滑动时候触发的onChange函数
    onChange(picker, values) {
      console.log(values)
      // console.log(picker.getColumnIndex(1))
      // console.log(this.columns[1].code[picker.getColumnIndex(1)])
       picker.setColumnValues(1, citys[values[0]].name)
    },
    onCancel(){
      console.log('取消')
    },
    onConfirm(value,index){
      console.log(citys[value[0]].name[index[1]])
      console.log(citys[value[0]].code[index[1]])
      this.myMcc = citys[value[0]].name[index[1]]
      this.merchantApply4.mcc = citys[value[0]].code[index[1]]
      this.showHangye = false
    },
    result1(ret) {
        this.model1 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
    },
    //点击弹出选择拍照或者照片选择
    toChoosePicture(name,index,addImg){
      this._inputBlur()
      this.popupToast.show = true
      this.popupToast.showImage = true     
      this.popupToast.chooseMsg = '请选择上传方式'
      this.popupToast.firstMsg = '拍摄'
      this.popupToast.secondMsg = '相册'
      this.popupToast.showThirdMsg = false
      this.popupToast.name = name
      this.popupToast.addImg = addImg
      this.popupToast.imgIndex = index
      if (name === 'storeDoorway') {
        this.popupToast.imgSrc = require('./image/pic_mt@2x.png')
      } else if (name === 'storePlace'){
        this.popupToast.imgSrc = require('./image/pic_mdcs@2x.png')
      } else if (name === 'storeCashier'){
        this.popupToast.imgSrc = require('./image/pic_syt@2x.png')
      } else if (name === 'storeProdect'){
        this.popupToast.imgSrc = require('./image/pic_mdcp@2x.png')
      }
    },
    //选择门店产权
    chooseProperty(){
      this._inputBlur()
      this.popupToast.show = true
      this.popupToast.showImage = false
      this.popupToast.chooseMsg = '请选择门店产权类型'
      this.popupToast.firstMsg = '租赁'
      this.popupToast.secondMsg = '自购'
      this.popupToast.showThirdMsg = false
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0
    },
    //选择联系人类型
    chooseContact_type(){
      this._inputBlur()
      this.popupToast.show = true
      this.popupToast.showImage = false
      this.popupToast.chooseMsg = '请选择联系人类型'
      this.popupToast.firstMsg = '财务'
      this.popupToast.secondMsg = '法人'
      this.popupToast.thirdMsg = '授权人'
      this.popupToast.showThirdMsg = true
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0
    },
    //选择经营类型
    chooseMchdealtype(){
      this._inputBlur()
      this.popupToast.show = true
      this.popupToast.showImage = false
      this.popupToast.chooseMsg = '请选择商户经营类型'
      this.popupToast.firstMsg = '实体'
      this.popupToast.secondMsg = '虚拟'
      this.popupToast.showThirdMsg = false
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0
    },
    _initScroll(){
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper,{
        click:true,
        probeType: 3
      })
      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScroll.on('scroll', (pos) => {
          if (pos.y > 10) {
            // console.log('下拉距离超过10,文本框失去焦点')
            this._inputBlur()
          } else if (pos.y < -10) {
            // console.log('上拉距离超过10,文本框失去焦点')
            this._inputBlur()
          }
      })
    },
    openPicker() {
      this.$refs.picker.open();
    },
    openPicker2() {
      this.$refs.picker2.open();
    },
    //获取成立日期
    handleChange(value) {
      console.log(value.toString())
      const date_value = dateExchange(value.toString())
      this.establishDate = date_value
    },
    //获取截止日期
    handleChange2(value) {
      console.log(value.toString())
      const date_value = dateExchange(value.toString())
      this.closeDate = date_value
    },
    //获取城市名称
    getArea(value){
      this.showArea = false
      let myArea = ''
      value.forEach((item,index)=>{
        if (index < 2 ){
          myArea += item.name + "-"
        } else {
          myArea += item.name
        }
      }) 
      console.log(JSON.stringify(myArea))
      this.regCity = myArea
    },
    //选择完成
    typeChoosed(data){
      console.log('选择的=='+data)
      this.popupToast.show = false     
      if (data[0] === '拍摄') {
        // this.havaImg[data[2]] = false
        this._cameraTakePicture(data[1],data[4] )        
      } else if (data[0]  === '相册') {
        //const img = document.getElementsByClassName("addIdCardStep4")
        // this.havaImg[data[2],] = false
        this._getLocalPicture(data[1],data[4])               
      } else if (data[0]  == '租赁') {
        this.merchantApply4.property = data[3] + 1
        this.myProperty = data[0]
      }else if (data[0]  == '自购') {
        this.merchantApply4.property = data[3] + 1
        this.myProperty = data[0]
      }else if (data[0]  == '实体') {
        this.merchantApply4.mchdealtype = data[3] + 1
        this.myMchdealtype = data[0]
      }else if (data[0]  == '虚拟') {
        this.merchantApply4.mchdealtype = data[3] + 1
        this.myMchdealtype = data[0]
      }else if (data[0]  == '财务') {
        this.merchantApply4.contact_type = data[3]
        this.myContact_type = data[0]
      }else if (data[0]  == '法人') {
        this.merchantApply4.contact_type = data[3]
        this.myContact_type = data[0]
      }else if (data[0]  == '授权人') {
        this.merchantApply4.contact_type = data[3]
        this.myContact_type = data[0]
      }
    },
    _cameraTakePicture(name,addImgName) {
      console.log('cordovaplugin.js调用拍照走到')
      const idName = name
      const addImg = addImgName
      console.log('cordova----addImg==='+addImgName)
      const that = this
      navigator.camera.getPicture(onSuccess,onFail,{
        quality:50,
        destinationType: Camera.DestinationType.DATA_URL
      });
      function onSuccess(imageData){
        var image = document.getElementById(idName)
        console.log('调用手机拍照成功')
        console.log('拍照返回的图片imageData==='+imageData)
        image.src = "data:image/jpeg;base64,"+imageData
        console.log('拍摄照片拿到的addImg=='+addImg)
        if (addImg === 'step4AddImg0'){
            that.addImg0 = false
            that.imgBase64.mtImgBase64 = imageData
        } else if (addImg === 'step4AddImg1'){
            that.addImg1 = false
            that.imgBase64.mdcsImgBase64 = imageData
        }else if (addImg === 'step4AddImg2'){
            that.addImg2 = false
            that.imgBase64.mdsytImgBase64 = imageData
        }else if (addImg === 'step4AddImg3'){
            that.addImg3 = false
            that.imgBase64.mdcpImgBase64 = imageData
        }
        // var addImgDiv = document.getElementById(addImg)
        // addImgDiv.style.display = "none"
        // return imageData
      }
      function onFail(message){
        console.log("调用相机失败:"+message)
      }
    },
    _getLocalPicture(name,addImgName) {
      console.log('cordovaplugin.js调用相册走到')
      const idName = name 
      const addImg = addImgName
      const that = this
      console.log('cordova----idName==='+idName)
      navigator.camera.getPicture(onSuccess,onFail,{
        quality:50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 0
      });
      function onSuccess(imageData){
        var image = document.getElementById(idName)
        console.log('调用手机相册成功')
        console.log('调用相册选择的图片imageData==='+imageData)
        image.src = "data:image/jpeg;base64,"+imageData
        console.log('拍摄照片拿到的addImg=='+addImg)
        // var addImgDiv = document.getElementById(addImg)
        // addImgDiv.style.display = "none"
        // return imageURI
        if (addImg === 'step4AddImg0'){
            that.addImg0 = false
            that.imgBase64.mtImgBase64 = imageData
        } else if (addImg === 'step4AddImg1'){
            that.addImg1 = false
            that.imgBase64.mdcsImgBase64 = imageData
        }else if (addImg === 'step4AddImg2'){
            that.addImg2 = false
            that.imgBase64.mdsytImgBase64 = imageData
        }else if (addImg === 'step4AddImg3'){
            that.addImg3 = false
            that.imgBase64.mdcpImgBase64 = imageData
        }
      }
      function onFail(message){
        console.log("调用手机相册失败:"+message)
      }
    },
    async goToStep4(){
      // await creatMerchant()
      // return 
      if (this.checkData()) {
        //弹出加载框       
        const MerchantApplyEntitity = this.$store.state.merchantApplyEntitity
        try{
          this.myLoading = true
          this.myLoadingMsg = '门店门头照上传中'
          // const imgUpLoadDataResMt = await upLoadImg('jpg','门店门头照',this.imgBase64.mtImgBase64)
          const imgUpLoadDataResMt = await upLoadImg('jpg','门店门头照','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')
          if (imgUpLoadDataResMt[1]==='10000') {
            //返回的code为10000表示图片上传成功
            console.log('成功success----1111111')
            console.log('ally4中取到的门头照片id=='+imgUpLoadDataResMt[2])
            console.log('MerchantApplyEntitity='+JSON.stringify(MerchantApplyEntitity))
            if(MerchantApplyEntitity&&MerchantApplyEntitity.biz_content){
              console.log('不是空对象')
              MerchantApplyEntitity.biz_content.main_image = imgUpLoadDataResMt[2]
            }            
            console.log('成功success----22222222')
          } else {
            this.myLoading = false
            Toast('门头照片上传失败')
            return 
          } 
        } catch (e){
          this.myLoading = false
          Toast('门头照片上传失败')
          return
        }   
        try{
          this.myLoadingMsg = '门店场所照上传中'
          // const imgUpLoadDataResMdcs = await upLoadImg('jpg','经营门店场所照',this.imgBase64.mdcsImgBase64)
          const imgUpLoadDataResMdcs = await upLoadImg('jpg','经营门店场所照','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')
          if (imgUpLoadDataResMdcs[1]==='10000') {
            //返回的code为10000表示图片上传成功
            console.log('ally4中取到的门店场所照片id=='+imgUpLoadDataResMdcs[2])
            if(MerchantApplyEntitity&&MerchantApplyEntitity.biz_content){
              MerchantApplyEntitity.biz_content.shop_place_image = imgUpLoadDataResMdcs[2]
            }
          } else {
            this.myLoading = false
            Toast('门店场所照片上传失败')
            return 
          }    
        }catch (e){
          this.myLoading = false
          Toast('门店场所照片上传失败')
          return 
        }              
        try{
          this.myLoadingMsg = '收银台照片上传中'
          // const imgUpLoadDataResSyt = await upLoadImg('jpg','经营门店产收银台照片',this.imgBase64.mdsytImgBase64)
          const imgUpLoadDataResSyt = await upLoadImg('jpg','经营门店产收银台照片','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')
          if (imgUpLoadDataResSyt[1]==='10000') {
            //返回的code为10000表示图片上传成功
            console.log('ally4中取到的收银台照片id=='+imgUpLoadDataResSyt[2])
            if(MerchantApplyEntitity&&MerchantApplyEntitity.biz_content){
              MerchantApplyEntitity.biz_content.shop_cashier_image = imgUpLoadDataResSyt[2]
            }
          } else {
            this.myLoading = false
            Toast('收银台照片上传失败')
            return 
          } 
        } catch (e){
          this.myLoading = false
          Toast('收银台照片上传失败')
          return
        }      
        try{
          this.myLoadingMsg = '门店产品照上传中'
          // const imgUpLoadDataResCp = await upLoadImg('jpg','经营门店产品照',this.imgBase64.mdcpImgBase64)
          const imgUpLoadDataResCp = await upLoadImg('jpg','经营门店产品照','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')
          if (imgUpLoadDataResCp[1]==='10000') {
            //返回的code为10000表示图片上传成功
            console.log('ally4中取到的产品id=='+imgUpLoadDataResCp[2])
            if(MerchantApplyEntitity&&MerchantApplyEntitity.biz_content){
              MerchantApplyEntitity.biz_content.shop_product_image = imgUpLoadDataResCp[2]
            }
          } else {
            this.myLoading = false
            Toast('产品照片上传失败')
            return 
          }
        } catch (e){
          this.myLoading = false
          Toast('产品照片上传失败')
          return 
        }
        MerchantApplyEntitity.biz_content.licence_name = this.merchantApply4.licence_name
        MerchantApplyEntitity.biz_content.storeshortname = this.merchantApply4.storeshortname
        MerchantApplyEntitity.biz_content.address = this.merchantApply4.address
        MerchantApplyEntitity.biz_content.business_time = this.business_time_start+'-'+this.business_time_end
        MerchantApplyEntitity.biz_content.contact_number = this.merchantApply4.contact_number
        MerchantApplyEntitity.biz_content.property = this.merchantApply4.property
        MerchantApplyEntitity.biz_content.mchdealtype = this.merchantApply4.mchdealtype
        MerchantApplyEntitity.biz_content.contact_type = this.merchantApply4.contact_type
        MerchantApplyEntitity.biz_content.mcc = this.merchantApply4.mcc
        this.$store.commit('setMerchantApplyEntitity',MerchantApplyEntitity)
        // this.$router.push({path:'./MerchantApply4'})
        const params = this.$store.state.merchantApplyEntitity
        console.log('step4商户创建的params==='+params)       
        try{
          this.myLoadingMsg = '商户创建中'
          const creatMerchantDataRes = await creatMerchant(params)
          if (creatMerchantDataRes ==='10000') {
            this.myLoading = false
            Toast('商户创建成功')
            this.$store.commit("setMerchantState",1)
            setTimeout(()=>{
              this.$router.push({path:'./MerchantApply5'})
            },2000)
          } else {
            this.myLoading = false
            Toast('商户创建失败')
            setTimeout(()=>{
              this.$router.push({path:'./MerchantApply5'})
            },2000)
            return 
          } 
        } catch (e){
          console.log('apply1中的catch='+e)
          this.myLoading = false
          Toast(e)
          return 
        }
      }
    },
  },
  created(){
    this.bgHeight = (document.body.scrollHeight)*35/100 + 'px'
    this.btnHeight = (document.body.scrollHeight)*13/100 + 'px'
    // this.$nextTick(()=>{
    //   this._initScroll()
    // })
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  // @import 'iview/dist/styles/iview.css'
  .MerchantApply
    width 100%
    height 100% 
    .head 
      width 100%
      height 35%
      // background-image: url('./image/pic_shsq.png');
      background-size: 100% 100%;
      background-repeat:no-repeat;
      display flex
      align-items  center
      flex-direction column
      .header
        width 100%
        height 30%
        // background red
        display flex
        align-items center
        img   
          margin-left 3%
        a
          margin-left 3%
          font-size 24px
          color #FFFFFF  
      .step
        width 90%
        height 40%
        // background yellow   
        display flex
        align-items center
        .itemOpacity
          opacity 0.4
          // width 25%
          height 100%
        .item
          // border solid 1px black
          // width 25%
          flex 1
          height 100%
          mixinDisplay()
          flex-direction column
          .number
            width 20px
            height 20px
            background #FFFFFF
            mixinDisplay()
            border-radius 50%
            color #6490EC
            font-size 14px
            position relative
          span 
            margin-top 10%
            font-size 12px
            color #FFFFFF
          .dashed
            position absolute
            width 130%
            border 1px dashed white
            left 30px
            top 50%
    .main
      width 100%
      height 65%
      background #F8F8FA
      display flex
      align-items  center
      flex-direction column
      .mainTop
        width 90%
        height 90%
        background #FFFFFF
        margin-top -10%
        // overflow hidden
        overflow-x hidden
        overflow-y auto
        .mainTopUl
          width 100%
          display flex
          flex-direction column
          align-items center
          .inputLi 
            width 90%
            height 50px
            line-height 50px
            border-bottom solid 1px #F7F7F7 
            background #FFFFFF
            flex 1
            display flex
            align-items center
            justify-content space-between
            .timePicker
              display flex
              align-items center
              span 
               margin-left 5px
            a 
              font-size 15px
              font-weight bold
              display block
              width 35%
            input 
              display block
              width 65%
              height 80%
              border none
              outline medium
              text-align:right
            span 
              font-size:15px
            .million
              display flex
              align-items center
              justify-content space-between
              width 65%
              height 100%
              input 
                width 90%         
          .IdCardLi
            width 90%
            border-bottom solid 1px #F7F7F7 
            .IdCardText
              height 35px
              display flex
              align-items center
              a 
                font-size 15px
                font-weight bold
            .IdCardWrapper
              width 100%
              display flex
              justify-content space-around
              flex-wrap: wrap 
              .IdCardDiv
                width 50%
                // background red
                display flex
                // flex 1
                flex-direction column
                align-items center
                // background #F7F8F9
                .idCardImgWrapper
                  mixinDisplay()
                  width 85%
                  height 109px
                  background #F7F8F9
                  position relative
                  .imgGray
                    width 107px
                    height 70px                                 
                  .addIdCardStep4
                    position absolute
                    top 50%
                    transform translateY(-50%)
                span 
                  font-size 13px
                  display block
                  margin-top 10px
                  margin-bottom 20px
          .borderNone
            border none
          .businessLicense
            width 90%
            border none
            display flex
            flex-direction column
            align-items start 
            .businessLicenseA 
              height 50px
              display flex
              align-items center
              a 
                font-size 15px
                font-weight bold
            .businessLicenseImgWrapper
              position relative
              width 146px
              height 109px
              mixinDisplay()
              background #F7F8F9
              #businessLicenseImg
                width 146px
                height 109px
              .add
                position absolute
                // left 50%
                // transform translateX(-50%)
                top 50%
                transform translateY(-50%)
            .businessLicenseSpan
              height 30px
              width 145px
              mixinDisplay()
              span
                font-size 13px
                color #666666 
      .bottomBtn
        width 100%
        height 20%
        mixinDisplay()   
        .btn
          width 80%
          height 50%
          border-radius 20px
          background #DDDDDD
          color white
          font-size 17px
          mixinDisplay() 
        .btnLight
          width 80%
          height 50%
          border-radius 20px
          background #306BE6
          color white
          font-size 17px
          mixinDisplay()
</style>