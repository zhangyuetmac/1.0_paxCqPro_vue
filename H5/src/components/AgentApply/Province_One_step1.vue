<template>
  <div class="MerchantApply" :style="mainBackground" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <div class="head">
      <img src="./image/icon_arrowleft1.png" @click="goAgentApplyPage">
      <a>企业一级代理商</a>
    </div>
    <div class="step">
        <div class="item">
          <div class="number" >
            <a>1</a>
            <div class="dashed"></div>
          </div>
          <span>填写基本资料</span>
        </div>
        <div class="item"  :class="haveFill?'itemOpacity':'item'">
          <div class="number">
            <a>2</a>
          </div>
          <span>填写企业信息</span>
        </div>
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl">
          <li  class="inputLi">
            <a>真实姓名</a>
            <input class="myInput" type="text" placeholder="点击输入姓名"   v-model="merchantApply3.accountname"></input>
          </li>
          <li  class="inputLi">
            <a>手机号码</a>
            <input class="myInput" type="text" placeholder="点击输入电话"   v-model="merchantApply3.accountname"></input>
          </li>
          <li style="background:#F8F8FA;height:10px;width:100%"></li>
          <li class="inputLi borderNone">
            <a>身份证号码</a>
            <input class="myInput" type="text" placeholder="点击输入身份证号" ></input>
          </li>
          <li   class="inputLi" >
            <a>起始有效期</a>
            <div @click="openPicker">
              <span>{{merchantApply3.idcard_start}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>
          </li>
          <li  class="inputLi">
            <a style="width:60%">截止有效期</a>
            <div @click="openPicker2">
              <span>{{merchantApply3.idcard_end}}</span>
              <img src="./image/icon_arrowright1.png">
            </div>
          </li>
          <li class="IdCardLiFirst">
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
            </div>
          </li>         
          <li style="background:#F8F8FA;height:10px;width:100%"></li>
          <li class="inputLi borderNone">
            <a>银行卡号</a>
            <input class="myInput" type="text" placeholder="点击输入银行卡号" ></input>
          </li>
          <li  class="IdCardLi">
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
import MerchantApplyHeader from '&/MerchantApply/MerchantApplyHeader'
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
      mainBackground: {
        backgroundImage:"url("+require('./image/pic_shsq.png')+")" ,
        backgroundSize: "100% 40%",
        backgroundRepeat:"no-repeat"
      },
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
      myBackgroundImage: "url("+require('./image/pic_shsq.png')+")",
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
    MerchantApplyHeader,
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
      // console.log(this.merchant_name
      if(this.accountType === '请选择'){
        Toast('请选择账户类型')
        return false
      } else if (!this.merchantApply3.accountname){
        Toast('请输入开户人')
        return false
      } else if (!this.merchantApply3.bankname){
        Toast('请输入开户银行')
        return false
      }else if (!this.merchantApply3.sub_bank_name){
        Toast('请输入开户支行')
        return false
      }else if (!this.merchantApply3.account_code){
        Toast('请输入银行账号')
        return false
      } else if (!(/\d{15}|\d{19}/).test(this.merchantApply3.account_code)){
        Toast('请输入正确的银行账号')
        return false
      }
      else if (this.regCity === '请选择'){
        Toast('请选择开户省份和城市')
        return false
      }else if (!this.merchantApply3.tel){
        Toast('请输入预留手机号')
        return false
      } else if(!(/^0?1[3|4|5|6|7|8][0-9]\d{8}$/).test(this.merchantApply3.tel)){
        Toast('请输入正确的预留手机号')
        return false
      }
      else if (this.merchantApply3.idcard_start === '请选择'){
        Toast('请输入起始有效期')
        return false
      }else if (this.merchantApply3.idcard_end === '请选择'){
        Toast('请输入截止有效期')
        return false
      }else if(this.addImg3){
        Toast('请上传银行卡正面照')
        return false
      } else if(this.addImg4){
        Toast('请上传银行卡反正照')
        return false
      }
      if(this.$store.state.photoType === '1'){
        if(this.addImg0){
          Toast('请上传身份证人像照')
          return false
        }else if(this.addImg1){
          Toast('请上传身份证国徽照')
          return false
        } else if(this.addImg2){
          Toast('请上传手持身份证照')
          return false
        } 
      } else if(this.$store.state.photoType === '2') {
        if(this.addImg5){
          Toast('请上传护照原件')
          return false
        }else if(this.addImg6){
          Toast('请上传护照翻译')
          return false
        }
      }  else {
        Toast('未选择证件类型')
      }
      return true
    },
    async goToStep4(){
      this.$router.push({
        path:'./Province_One_step2'
      })
      if (this.checkData()) {
        //点击跳转到第二页，把数据存入到vuex中去
        const MerchantApplyEntitity = this.$store.state.merchantApplyEntitity
        // console.log('第三页的MerchantApplyEntitity=='+MerchantApplyEntitity)
        if (this.$store.state.photoType === '1') {
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
          try{
            this.myLoadingMsg = '银行卡正面照上传中'
            // const imgUpLoadDataResYhkzm = await upLoadImg('jpg','银行卡正面照',this.imgBase64.yhkzmImgBase64)
            const imgUpLoadDataResYhkzm = await upLoadImg('jpg','银行卡正面照','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')
            if (imgUpLoadDataResYhkzm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              console.log('ally3中取到的银行卡正面照id=='+imgUpLoadDataResYhkzm[2])
              MerchantApplyEntitity.biz_content.bankcard_image1 = imgUpLoadDataResYhkzm[2]
            } else {
              this.myLoading = false
              Toast('银行卡正面照上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('银行卡正面照上传失败')
            return
          }        
          try{
            this.myLoadingMsg = '银行卡反面照上传中'
            // const imgUpLoadDataResYhkfm = await upLoadImg('jpg','银行卡反面照',this.imgBase64.yhkfmImgBase64)
            const imgUpLoadDataResYhkfm = await upLoadImg('jpg','银行卡反面照','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')
            if (imgUpLoadDataResYhkfm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              this.myLoading = false
              Toast('照片上传成功')
              console.log('ally3中取到的银行卡反面照图片id=='+imgUpLoadDataResYhkfm[2])
              MerchantApplyEntitity.biz_content.bankcard_image2 = imgUpLoadDataResYhkfm[2]
            } else {
              this.myLoading = false
              Toast('银行卡反面照上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('银行卡反面照上传失败')
            return
          }  
        } else if (this.$store.state.photoType === '2'){
          try{
            this.myLoading = true
            this.myLoadingMsg = '银行卡正面照上传中'
            // const imgUpLoadDataResYhkzm = await upLoadImg('jpg','银行卡正面照',this.imgBase64.yhkzmImgBase64)
            const imgUpLoadDataResYhkzm = await upLoadImg('jpg','银行卡正面照','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')
            if (imgUpLoadDataResYhkzm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              console.log('ally3中取到的银行卡正面照id=='+imgUpLoadDataResYhkzm[2])
              MerchantApplyEntitity.biz_content.bankcard_image1 = imgUpLoadDataResYhkzm[2]
            } else {
              this.myLoading = false
              Toast('银行卡正面照上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            Toast('照片上传成功')
            this.myLoading = false
            Toast('银行卡正面照上传失败')
            return
          }        
          try{
            this.myLoadingMsg = '银行卡反面照上传中'
            // const imgUpLoadDataResYhkfm = await upLoadImg('jpg','银行卡反面照',this.imgBase64.yhkfmImgBase64)
            const imgUpLoadDataResYhkfm = await upLoadImg('jpg','银行卡反面照','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')
            if (imgUpLoadDataResYhkfm[1]==='10000') {
              //返回的code为10000表示图片上传成功
              // this.myLoading = false
              console.log('ally3中取到的银行卡反面照图片id=='+imgUpLoadDataResYhkfm[2])
              MerchantApplyEntitity.biz_content.bankcard_image2 = imgUpLoadDataResYhkfm[2]
            } else {
              this.myLoading = false
              Toast('银行卡反面照上传失败')
              return
            }
          }catch (e){
            console.log('apply1中的catch='+e)
            this.myLoading = false
            Toast('银行卡反面照上传失败')
            return
          }  
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
          return 
        }
        setTimeout(()=>{
          MerchantApplyEntitity.biz_content.accounttype = this.merchantApply3.accounttype
          MerchantApplyEntitity.biz_content.accountname = this.merchantApply3.accountname
          MerchantApplyEntitity.biz_content.bankname = this.merchantApply3.bankname
          MerchantApplyEntitity.biz_content.sub_bank_name = this.merchantApply3.sub_bank_name
          MerchantApplyEntitity.biz_content.account_code = this.merchantApply3.account_code
          MerchantApplyEntitity.biz_content.tel = this.merchantApply3.tel
          MerchantApplyEntitity.biz_content.idcard_start = this.merchantApply3.idcard_start
          MerchantApplyEntitity.biz_content.idcard_end = this.merchantApply3.idcard_end
          MerchantApplyEntitity.biz_content.legal_id_start = this.merchantApply3.idcard_start
          MerchantApplyEntitity.biz_content.legal_id_end = this.merchantApply3.idcard_end
          MerchantApplyEntitity.biz_content.open_bank_pro = this.merchantApply3.open_bank_pro
          MerchantApplyEntitity.biz_content.open_bank_city = this.merchantApply3.open_bank_city
          this.$store.commit('setMerchantApplyEntitity',MerchantApplyEntitity)
          this.$router.push({path:'./MerchantApply4'})
        },2000)
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


