<template>
  <div class="MerchantApply" :style="mainBackground" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <div class="head">
      <img src="./image/icon_arrowleft1.png" @click="goAgentApplyPage">
      <a>个人二级代理商</a>
    </div>
    <div class="step">
        <div class="item">
          <div class="number" >
            <a>1</a>
            <div class="dashed"></div>
          </div>
          <span>核实代理商</span>
        </div>
        <div class="item" :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>2</a>
          </div>
          <span>填写基本资料</span>
        </div>
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl">
          <li  class="inputLi">
            <a>一级代理商姓名</a>
            <input class="myInput" type="text" placeholder="点击输入姓名"   v-model="merchantApply3.accountname"></input>
          </li>
          <li  class="inputLi">
            <a>一级代理商电话</a>
            <input class="myInput" type="text" placeholder="点击输入手机号码"   v-model="merchantApply3.accountname"></input>
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
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="AreaData" :columns-num="2" value="110101"  @confirm="getArea" @cancel="showArea = false" />
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
  </div>
</template>
<script>
import AgentApplyHeader from './AgentApplyHeader'
// import TypeChoose from '../TypeChoose/TypeChoose'
import TypeChoose from '&/PublicComponents/TypeChoose'
import {dateExchange} from '../../common/js/myDate.js'
import BScroll from "better-scroll"
import { Area, Popup } from 'vant'
import { DatetimePicker } from 'mint-ui'
import { Toast } from 'vant';
import AreaData from '../../common/data/Area.js'
import {cameraTakePicture,getLocalPicture} from '../../../static/cordovaplugin.js'
// import  MyLoading  from '../MyLoading/MyLoading'
import  MyLoading  from '&/PublicComponents/MyLoading'
import upLoadImg from './upLoadImg.js'

export default {
  data(){
    return{
      //对应第二页选择的证件
      photoType:'',
      //图片的base64格式
      imgBase64:{
        sfzzmImgBase64:'',
        sfzfmImgBase64:'',
        scsfzImgBase64:'',
        yhkzmImgBase64:'',
        yhkfmImgBase64:'',
        hzzmImgBase64:'',
        hzfmImgBase64:''
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
      addImg6:true,
      touchmoveData:{
        startX:'',
        startY:'',
        endX:'',
        endX:''
      },
      mainBackground: {
        backgroundImage:"url("+require('./image/pic_shsq.png')+")" ,
        backgroundSize: "100% 40%",
        backgroundRepeat:"no-repeat"
      },
      bgHeight:'',
      btnHeight:'',
      regCity:'请选择',
      provinceDomType: '请选择',
      havaImg:[true,true,true,true,true],
      haveFill:true,
      showArea: false,
      value:null,
      value1:null,
      value2:null,
      startDate: new Date('1992-05-09'),
      endDate: new Date('2049-05-09'),
      //选择框
      popupToast:{
        show:false,
        showImage:false,
        imgSrc:'',
        chooseMsg:'',
        firstMsg:'',
        secondMsg:'',
        ThirdMsg:'',
        showThirdMsg:'',
        name:'',
        imgIndex:'',
        addImg:''
      },
      accountType: '对公',
      //城市三级联动数据
      AreaData,
      merchantApply3:{
        //账户类型
        accounttype:'',
        //开户人
        accountname:'',
        //开户银行
        bankname:'',
        //开户支行,
        sub_bank_name:'',
        //银行账号
        account_code: '',
        //预留手机号
        tel:'',
        //持卡人身份证起始日期
        idcard_start:'请选择',
        //持卡人身份证截止日期
        idcard_end:'请选择',
        //开户省份
        open_bank_pro:'',
        //开户城市
        open_bank_city:'',

      }
    }
  },
  components:{
    TypeChoose,
    AgentApplyHeader,
    DatetimePicker,
    Area,
    Popup,
    MyLoading
  },
  methods:{
    //返回入口页面
    goAgentApplyPage(){
      this.$router.push({
        path:'./AgentApply'
      })
    },
    btnClass(){
      if (this.$store.state.photoType === '1'){
        if(this.accountType !== '请选择'&&this.merchantApply3.accountname&&this.merchantApply3.bankname&&
          this.merchantApply3.sub_bank_name&&this.merchantApply3.account_code&&this.regCity !== '请选择'&&
          this.merchantApply3.tel&&this.merchantApply3.idcard_start !== '请选择'&&this.merchantApply3.idcard_end !== '请选择'&&
          !this.addImg0&&!this.addImg1&&!this.addImg2&&!this.addImg3&&!this.addImg4)
        {
          return 'btnLight'
        } else {
          return 'btn'
        }
      } else if(this.$store.state.photoType === '2'){
        if(this.accountType !== '请选择'&&this.merchantApply3.accountname&&this.merchantApply3.bankname&&
          this.merchantApply3.sub_bank_name&&this.merchantApply3.account_code&&this.regCity !== '请选择'&&
          this.merchantApply3.tel&&this.merchantApply3.idcard_start !== '请选择'&&this.merchantApply3.idcard_end !== '请选择'&&
          !this.addImg3&&!this.addImg4&&!this.addImg5&&!this.addImg6)
        {
          return 'btnLight'
        } else {
          return 'btn'
        }
      } else {
        return 'btn'
      }
    },
    checkData(){
      return true
    },
    goToStep4(){
      this.$router.push({
        path:'./Personal_Two_step2'
      })
    },
    myTouchStart(e){
      this.touchmoveData.startX = e.changedTouches[0].pageX
      this.touchmoveData.startY = e.changedTouches[0].pageY
    },
    myTouchEnd(e){
      this.touchmoveData.endX = e.changedTouches[0].pageX
      this.touchmoveData.endY = e.changedTouches[0].pageY
      if(Math.abs(this.touchmoveData.endX - this.touchmoveData.startX) > 2 ){
        this._inputBlur()
      }
      if(Math.abs(this.touchmoveData.endY - this.touchmoveData.startY) > 2 ){
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
    //弹出显示城市
    toastArea(){
      this.showArea = true
      this._inputBlur()
    },
    //点击弹出选择拍照或者照片选择
    toChoosePicture(name,index,addImg){
      this._inputBlur()
      this.popupToast.show = true
      this.popupToast.showImage = true
      this.popupToast.chooseMsg = '请选择上传方式'
      this.popupToast.firstMsg = '拍摄'
      this.popupToast.secondMsg = '相册'
      this.popupToast.name = name
      this.popupToast.addImg = addImg
      this.popupToast.imgIndex = index
      this.popupToast.showThirdMsg = false
      if (name === 'idCardZm') {
        this.popupToast.imgSrc = require('./image/pic_sfzzm@2x.png')
      } else if (name === 'idCardFm'){
        this.popupToast.imgSrc = require('./image/pic_sfzfm@2x.png')
      }else if (name === 'idCardSc'){
        this.popupToast.imgSrc = require('./image/pic_scsfz@2x.png')
      } else if (name === 'bankCardZm'){
        this.popupToast.imgSrc = require('./image/pic_yhkzm@2x.png')
      } else if (name === 'bankCardFm'){
        this.popupToast.imgSrc = require('./image/pic_yhkfm@2x.png')
      }else if (name === 'huzhaoZm'){
        this.popupToast.imgSrc = require('./image/pic_hz@2x.png')
      }else if (name === 'huzhaoFm'){
        this.popupToast.imgSrc = require('./image/pic_hz@2x.png')
      }
    },
    //点击获取账户类型
    getAccountType(){
      this._inputBlur()
      this.popupToast.show = true
      this.popupToast.showImage = false
      this.popupToast.chooseMsg = '请选择账户类型'
      this.popupToast.firstMsg = '对公'
      this.popupToast.secondMsg = '对私法人'
      this.popupToast.thirdMsg = '对私授权人'
      this.popupToast.showThirdMsg = true
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
      this._inputBlur()
      this.$refs.picker.open();
    },
    openPicker2() {
      this._inputBlur()
      this.$refs.picker2.open();
    },
    //获取持卡人身份证起始日期
    handleChange(value) {
      console.log(value.toString())
      const date_value = dateExchange(value.toString())
      this.merchantApply3.idcard_start = date_value
    },
    //获取持卡人身份证截止日期
    handleChange2(value) {
      console.log(value.toString())
      const date_value = dateExchange(value.toString())
      this.merchantApply3.idcard_end = date_value
    },
    //获取城市名称
    getArea(value){
      this.showArea = false
      let myArea = ''
      value.forEach((item,index)=>{
        if (index < 1 ){
          myArea += item.name + "-"
          this.merchantApply3.open_bank_pro = item.name
        } else {
          myArea += item.name
          this.merchantApply3.open_bank_city = item.name
        }
      })
      this.regCity = myArea
    },
    //选择完成
    typeChoosed(data){
      console.log('选择的=='+data)
      this.popupToast.show = false
      if (data[0] === '拍摄') {
        this._cameraTakePicture(data[1],data[4])
      } else if (data[0]  === '相册') {
        this._getLocalPicture(data[1],data[4])
      } else if (data[0]  == '对公' || '对私法人' || '对私授权人') {
        this.accountType = data[0]
        this.merchantApply3.accounttype = data[3]
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
        if (addImg === 'addImg0'){
            that.addImg0 = false
            that.imgBase64.sfzzmImgBase64 = imageData
        } else if (addImg === 'addImg1'){
            that.imgBase64.sfzfmImgBase64 = imageData
            that.addImg1 = false
        }else if (addImg === 'addImg2'){
            that.imgBase64.scsfzImgBase64 = imageData
            that.addImg2 = false
        }else if (addImg === 'addImg3'){
            that.imgBase64.yhkzmImgBase64 = imageData
            that.addImg3 = false
        }else if (addImg === 'addImg4'){
            that.imgBase64.yhkfmImgBase64 = imageData
            that.addImg4 = false
        }else if (addImg === 'addImg5'){
            that.imgBase64.hzzmImgBase64 = imageData
            that.addImg5 = false
        }else if (addImg === 'addImg6'){
            that.imgBase64.hzfmImgBase64 = imageData
            that.addImg6 = false
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
        console.log('调用相册拿到的addImg=='+addImg)
        // var addImgDiv = document.getElementById(addImg)
        // addImgDiv.style.display = "none"
        // return imageURI
        if (addImg === 'addImg0'){
            that.addImg0 = false
            that.imgBase64.sfzzmImgBase64 = imageData
        } else if (addImg === 'addImg1'){
            that.imgBase64.sfzfmImgBase64 = imageData
            that.addImg1 = false
        }else if (addImg === 'addImg2'){
            that.imgBase64.scsfzImgBase64 = imageData
            that.addImg2 = false
        }else if (addImg === 'addImg3'){
            that.imgBase64.yhkzmImgBase64 = imageData
            that.addImg3 = false
        }else if (addImg === 'addImg4'){
            that.imgBase64.yhkfmImgBase64 = imageData
            that.addImg4 = false
        }else if (addImg === 'addImg5'){
            that.imgBase64.hzzmImgBase64 = imageData
            that.addImg5 = false
        }else if (addImg === 'addImg6'){
            that.imgBase64.hzfmImgBase64 = imageData
            that.addImg6 = false
        }
      }
      function onFail(message){
        console.log("调用手机相册失败:"+message)
      }
    }
  },
  // created(){
  //   this.bgHeight = (document.body.scrollHeight)*35/100 + 'px'
  //   this.btnHeight = (document.body.scrollHeight)*13/100 + 'px'
  //   this.$nextTick(()=>{
  //     this._initScroll()
  //   })
  // },
  mounted(){
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
  .MerchantApply
    width 100%
    height 100%
    background #F8F8FA
    .head
      width 100%
      height 15%
      display flex
      align-items  center
      img 
        margin-left 5%
      a 
        color #ffffff
        font-size 22px
        margin-left 3%
    .step
        width 80%
        height 15%
        margin-left 10%
        // background yellow
        mixinDisplay()
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
            width 530%
            border 1px dashed white
            left 30px
            top 50%
    .main
      width 100%
      height 70%
      // background #F8F8FA
      display flex
      align-items  center
      flex-direction column
      .mainTop
        width 90%
        height 90%
        background #FFFFFF
        // margin-top -10%
        overflow-x hidden
        overflow-y auto
        .mainTopUl
          width 100%
          display flex
          flex-direction column
          align-items center
          // overflow-y hidden
          // overflow-y scroll
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
            a
              font-size 15px
              font-weight bold
              display block
              width 38%
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
          .IdCardLiFirst
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
              // justify-content space-around
              flex-wrap: wrap
              .IdCardDiv
                display flex
                width:50%
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
                  .addIdCardStep3
                    position absolute
                    top 50%
                    transform translateY(-50%)
                span
                  font-size 13px
                  display block
                  margin-top 10px
                  margin-bottom 20px
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
              .IdCardDiv
                display flex
                flex 1
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
                  .addIdCardStep3
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
      .mainNext
        width 90%
        height 50%
        background #FFFFFF
        margin-top 5%
        overflow hidden
        .mainTopUl
          width 100%
          display flex
          flex-direction column
          align-items center
          li
            width 90%
            height 50px
            border-bottom solid 1px #F7F7F7
            background #FFFFFF
            flex 1
            display flex
            align-items center
            justify-content space-between
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
          .borderNone
            border none
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


