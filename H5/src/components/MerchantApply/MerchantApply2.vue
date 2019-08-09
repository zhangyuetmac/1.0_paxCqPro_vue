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
            <a>法人姓名</a>
            <input class="myInput" type="text" v-model="merchantApply2.legal_name" placeholder="请输入姓名"  ></input>
          </li>
          <li class="inputLi">     
            <a>证件类型</a>
            <div @click="getAccountType">
              <span>{{accountType}}</span>
              <img src="./image/icon_arrowright1.png">
            </div> 
          </li >
          <li class="inputLi">
            <a>证件号码</a>
            <input class="myInput" type="text" v-model="merchantApply2.legal_id_no" placeholder="请输入证件号码"  ></input>
          </li>
          <li style="background:#F8F8FA;height:10px;width:100%"></li>
          <li v-if="accountType === '身份证'" class="IdCardLiFirst">
            <div class="IdCardText">
              <a>身份证照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('idCardZm',1,'addImg_1')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzrxm.png" class="imgGray" id="idCardZm">
                  <img v-show="addImg_1" id="addImg_1" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;人像面</span>
              </div>
              <div class="IdCardDiv" @click="toChoosePicture('idCardFm',2,'addImg_2')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_sfzghm.png" class="imgGray" id="idCardFm">
                  <img v-show="addImg_2" id="addImg_2" class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;国徽面</span>
              </div>
              <div class="IdCardDiv" @click="toChoosePicture('idCardSc',3 ,'addImg_3')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_scsfz.png" class="imgGray" id="idCardSc">
                  <img v-show="addImg_3" id='addImg_3' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;手持身份证</span>
              </div>
            </div>
          </li>
          <li class="inputLi" v-if="accountType === '身份证'">
            <a>起始有效期</a>
            <div @click="openPicker">
              <span>{{merchantApply2.idcard_start}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>
          </li>
          <li class="inputLi" v-if="accountType === '身份证'">
            <a style="width:60%">截止有效期</a>
            <div @click="openPicker2">
              <span>{{merchantApply2.idcard_end}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>
          </li>
          <li v-if="accountType === '护照'" class="IdCardLi">
            <div class="IdCardText">
              <a>护照照片</a>
            </div>
            <div class="IdCardWrapper">
              <div class="IdCardDiv" @click="toChoosePicture('huzhaoZm',4,'addImg_4')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_yhkzm.png" class="imgGray" id="huzhaoZm">
                  <img v-show="addImg_4" id='addImg5' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;法人护照(原件)</span>
              </div>
              <div class="IdCardDiv" @click="toChoosePicture('huzhaoFm',5, 'addImg_5')">
                <div class="idCardImgWrapper">
                  <img  src="./image/icon_yhkfm.png" class="imgGray" id="huzhaoFm">
                  <img v-show="addImg_5" id='addImg_5' class="addIdCardStep3" src="./image/icon_add.png">
                </div>
                <span>点击上传&nbsp;法人护照(翻译)</span>
              </div>
            </div>
          </li>
          <li v-if="accountType === '护照'" class="inputLi" >
            <a>起始有效期</a>
            <div @click="openPicker">
              <span>{{merchantApply2.idcard_start}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>
          </li>
          <li v-if="accountType === '护照'" class="inputLi">
            <a style="width:60%">截止有效期</a>
            <div @click="openPicker2">
              <span>{{merchantApply2.idcard_end}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>
          </li>
        </ul>
      </div>
      <div class="bottomBtn" :style={height:btnHeight} @click="goToStep3">
        <div :class="btnClass">
          <a>下一步</a>
        </div>
      </div>
    </div>
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
          v-on:typeChoosed="typeChoosed">
        </TypeChoose>
      </div>
    </van-popup>  
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
  </div>
</template>
<script>
import MerchantApplyHeader from './MerchantApplyHeader'
import TypeChoose from '../TypeChoose/TypeChoose'
// import TypeChoose from '&/PublicComponents/TypeChoose'
import {dateExchange} from '../../common/js/myDate.js'
// import BScroll from "better-scroll"
import { Area, Popup } from 'vant'
import { Toast } from 'vant';
// import  MyLoading  from '../MyLoading/MyLoading'
import  MyLoading  from '&/PublicComponents/MyLoading'
import upLoadImg from './upLoadImg.js'
import {cameraTakePicture,getLocalPicture} from '../../../static/cordovaplugin.js'

export default {
  data(){
    return{
      value1:null,
      value2:null,
      startDate: new Date('1992-05-09'),
      endDate: new Date('2049-05-09'),
      touchmoveData:{
        startX:'',
        startY:'',
        endX:'',
        endX:''
      },
      //图片的base64格式
      imgBase64:{
        sfzzmImgBase64:'',
        sfzfmImgBase64:'',
        scsfzImgBase64:'',
        hzzmImgBase64:'',
        hzfmImgBase64:''
      },
      //上传图片的loading
      myLoading:false,
      myLoadingMsg:'',
      addImg_1:true,
      addImg_2:true,
      addImg_3:true,
      addImg_4:true,
      addImg_5:true,
      myBackgroundImage: "url("+require('./image/pic_shsq.png')+")",
      bgHeight:'',
      btnHeight:'',
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
        imgIndex:''
      },
      accountType: '身份证',
      merchantApply2:{
        //法人姓名
        legal_name:'',
        //证件类型
        legal_id_type:'',
        //证件号码
        legal_id_no:'',
        //新加的
        idcard_start:'',
        idcard_end:''
      }
    }
  },
  components:{
    TypeChoose,
    MerchantApplyHeader,
    Popup
  },
  computed:{
    btnClass(){
      if (this.merchantApply2.legal_name&&this.accountType !== '请选择'&&this.merchantApply2.legal_id_no){
        return 'btnLight'
      }else {
        return 'btn'
      }
    }
  },
  methods:{
    openPicker() {
      this.$refs.picker.open();
    },
    openPicker2() {
      this.$refs.picker2.open();
    },
    //获取持卡人身份证起始日期
    handleChange(value) {
      console.log(value.toString())
      const date_value = dateExchange(value.toString())
      this.merchantApply2.idcard_start = date_value
    },
    //获取持卡人身份证截止日期
    handleChange2(value) {
      console.log(value.toString())
      const date_value = dateExchange(value.toString())
      console.log('截止日期=='+date_value)
      this.merchantApply2.idcard_end = date_value
    },
    checkData(){
      return true
      // console.log(this.merchant_name
      if(!this.merchantApply2.legal_name){
        Toast('请输入法人姓名')
        return false
      } else if (this.accountType === '请选择'){
        Toast('请选择证件类型')
        return false
      } else if (!this.merchantApply2.legal_id_no){
        Toast('请输入身份证或者护照号码')
        return false
      } else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.merchantApply2.legal_id_no) && !(/^([a-zA-z]|[0-9]){5,17}$/).test(this.merchantApply2.legal_id_no)){
        Toast('请输入正确身份证或者护照号码')
        return false
      } else {
        console.log('输入成功')
        return true       
      }
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
    //点击弹出选择拍照或者照片选择
    toChoosePicture(name,index){
      this.popupToast.show = true
      this.popupToast.showImage = true     
      this.popupToast.chooseMsg = '请选择上传方式'
      this.popupToast.firstMsg = '拍摄'
      this.popupToast.secondMsg = '相册'
      this.popupToast.name = name
      this.popupToast.imgIndex = index
      if (name === 'idCardZm') {
        this.popupToast.imgSrc = require('./image/pic_sfzzm@2x.png')
      } else if (name === 'idCardFm'){
        this.popupToast.imgSrc = require('./image/pic_sfzfm@2x.png')
      } else if (name === 'idCardSc'){
        this.popupToast.imgSrc = require('./image/pic_scsfz@2x.png')
      } else if (name === 'huzhaoZm'){
        this.popupToast.imgSrc = require('./image/pic_hz@2x.png')
      } else if (name === 'huzhaoFm'){
        this.popupToast.imgSrc = require('./image/pic_hz@2x.png')
      }
    },
    //点击获取证件类型
    getAccountType(){
      this._inputBlur()
      this.popupToast.show = true
      this.popupToast.showImage = false
      this.popupToast.chooseMsg = '请选择证件类型'
      this.popupToast.firstMsg = '身份证'
      this.popupToast.secondMsg = '护照'
      //没什么用处的，为了不报错
      this.popupToast.imgIndex = 0
    },
    // _initScroll(){
    //   this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper,{
    //     click:true
    //   })
    // },
    
    //选择完成
    typeChoosed(data){
      console.log('选择的=='+data)
      this.popupToast.show = false     
      if (data[0] === '拍摄') {
        this._cameraTakePicture(data[1],data[4])
      } else if (data[0]  === '相册') {
        this._getLocalPicture(data[1],data[4])
      } else if (data[0]  == '身份证') {
        this.accountType = data[0]
        this.merchantApply2.legal_id_type = '1'
      } else if (data[0]  ==  '护照') {
        this.accountType = data[0]
        this.merchantApply2.legal_id_type = '2'
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
        if (addImg === 'addImg_1'){
            that.addImg_1 = false
            that.imgBase64.sfzzmImgBase64 = imageData
        } else if (addImg === 'addImg_2'){
            that.imgBase64.sfzfmImgBase64 = imageData
            that.addImg_2 = false
        }else if (addImg === 'addImg_3'){
            that.imgBase64.scsfzImgBase64 = imageData
            that.addImg_3 = false
        }else if (addImg === 'addImg_4'){
            that.imgBase64.hzzmImgBase64 = imageData
            that.addImg_4 = false
        }else if (addImg === 'addImg_5'){
            that.imgBase64.hzfmImgBase64 = imageData
            that.addImg_5 = false
        }
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
        if (addImg === 'addImg_1'){
            that.addImg_1 = false
            that.imgBase64.sfzzmImgBase64 = imageData
        } else if (addImg === 'addImg_2'){
            that.imgBase64.sfzfmImgBase64 = imageData
            that.addImg_2 = false
        }else if (addImg === 'addImg_3'){
            that.imgBase64.scsfzImgBase64 = imageData
            that.addImg_3 = false
        }else if (addImg === 'addImg_4'){
            that.imgBase64.hzzmImgBase64 = imageData
            that.addImg_4 = false
        }else if (addImg === 'addImg_5'){
            that.imgBase64.hzfmImgBase64 = imageData
            that.addImg_5 = false
        }
      }
      function onFail(message){
        console.log("调用手机相册失败:"+message)
      }
    },
    async goToStep3(){
      if (this.checkData()) {
        //判断选择的证件类型是身份证还是护照，存到store里面，到第三页的时候去使用
        // if(this.merchantApply2.legal_id_type === '1'){
        //   this.$store.commit('setPhotoType','1')
        // } else if(this.merchantApply2.legal_id_type === '2') {
        //   this.$store.commit('setPhotoType','2')
        // } else {
        //   this.$store.commit('setPhotoType','')
        // }
        console.log(this.merchantApply2.legal_name)
        console.log('222')
        
        //如果是身份证或者护照类型，把数据放到交易实体里
        if (this.accountType === '身份证') {
          try{
            //弹出加载框
            this.myLoading = true
            this.myLoadingMsg = '身份证人像照上传中'
            const imgUpLoadDataResSfzzm = await upLoadImg('jpg','身份证人像照','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')
            // const imgUpLoadDataResSfzzm = await upLoadImg('jpg','身份证人像照',this.imgBase64.sfzzmImgBase64)
            console.log('身份证正面的base64图片==='+this.imgBase64.sfzzmImgBase64)
            if (imgUpLoadDataResSfzzm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              console.log('apply3中取到的身份证正面照图片id=='+imgUpLoadDataResSfzzm[2])
              MerchantApplyEntitity.biz_content.legal_id_image1 = imgUpLoadDataResSfzzm[2]
            } else {
              this.myLoading = false
              Toast('身份证正面照上传失败')
              return
            }
          } catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('身份证正面照上传失败')
            return
          }
          try{
            this.myLoadingMsg = '身份证国徽照上传中'
            // const imgUpLoadDataResSfzfm = await upLoadImg('jpg','身份证国徽照',this.imgBase64.sfzfmImgBase64)
            const imgUpLoadDataResSfzfm = await upLoadImg('jpg','身份证国徽照','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')
            if (imgUpLoadDataResSfzfm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              console.log('ally3中取到的身份证反面照图片id=='+imgUpLoadDataResSfzfm[2])
              MerchantApplyEntitity.biz_content.legal_id_image2 = imgUpLoadDataResSfzfm[2]
            } else {
              this.myLoading = false
              Toast('身份证国徽照上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('身份证国徽照上传失败')
            return
          }     
          try{
            this.myLoadingMsg = '手持身份证照上传中'
            const imgUpLoadDataResScsfz = await upLoadImg('jpg','手持身份证照片','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')
            // const imgUpLoadDataResScsfz = await upLoadImg('jpg','手持身份证照片',this.imgBase64.scsfzImgBase64)
            if (imgUpLoadDataResScsfz[1]==='10000') {
              //返回的code为10000表示图片上传成功
              console.log('ally3中取到的手持身份证照片图片id=='+imgUpLoadDataResScsfz[2])
              MerchantApplyEntitity.biz_content.legal_id_image5 = imgUpLoadDataResScsfz[2]
            } else {
              this.myLoading = false
              Toast('手持身份证照片上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('手持身份证照上传失败')
            return
          } 
        } else if (this.accountType === '护照'){
          try{
            this.myLoadingMsg = '护照正面照上传中'
            // const imgUpLoadDataResHzzm = await upLoadImg('jpg','护照正面照',this.imgBase64.hzzmImgBase64)
            const imgUpLoadDataResHzzm = await upLoadImg('jpg','护照正面照','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')
            if (imgUpLoadDataResHzzm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              // this.myLoading = false
              console.log('ally3中取到的护照正面照照图片id=='+imgUpLoadDataResHzzm[2])
              MerchantApplyEntitity.biz_content.legal_id_image3 = imgUpLoadDataResHzzm[2]
            } else {
              this.myLoading = false
              Toast('护照正面照上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('护照正面照上传失败')
            return
          }      
          try{
            this.myLoadingMsg = '护照反面照上传中'
            // const imgUpLoadDataResHzfm = await upLoadImg('jpg','护照反面照',this.imgBase64.hzfmImgBase64)
            const imgUpLoadDataResHzfm = await upLoadImg('jpg','护照反面照','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')
            if (imgUpLoadDataResHzfm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              this.myLoading = false
              Toast('照片上传成功')
              console.log('ally3中取到的护照反面照图片id=='+imgUpLoadDataResHzfm[2])
              MerchantApplyEntitity.biz_content.legal_id_image4 = imgUpLoadDataResHzfm[2]
            } else {
              this.myLoading = false
              Toast('护照反面照上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('护照反面照上传失败')
            return
          }
        } else {
          Toast('未选择证件类型')
        }
        const MerchantApplyEntitity = this.$store.state.merchantApplyEntitity
        MerchantApplyEntitity.biz_content.legal_name = this.merchantApply2.legal_name
        MerchantApplyEntitity.biz_content.legal_id_type = this.merchantApply2.legal_id_type
        MerchantApplyEntitity.biz_content.legal_id_no = this.merchantApply2.legal_id_no    
        this.$store.commit('setMerchantApplyEntitity',MerchantApplyEntitity)
        this.$router.push({path:'./MerchantApply3'})
      }
    }
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


