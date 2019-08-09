<template>
  <div class="typeChoose">
    <div class="header">
      <a>{{chooseMsg}}</a>
    </div>
    <div v-show="showImage" class="showImage">
      <div class="showImage_a">
        <a>请参考下图选择上传的图片</a>
      </div>
      <img :src="imgSrc">
    </div>
    <div class="firstType" @click="firstClick">
      <a>{{firstMsg}}</a>
      <img src="./image/icon_arrowright4.png">
    </div>
    <div class="secondType" @click="secondClick">
      <a>{{secondMsg}}</a>
      <img src="./image/icon_arrowright3.png">
    </div>
    <div v-show="showThirdMsg" class="thirdType" @click="thirdClick">
      <a>{{thirdMsg}}</a>
      <img src="./image/icon_arrowright3.png">
    </div>
  </div>
</template>
<script>
export default {
  props:{
    chooseMsg:{
      default:'请选择上传方式',
      type: String
    },
    firstMsg:{
      default:'拍摄',
      type: String
    },
    secondMsg:{
      default:'相册',
      type: String
    },
    thirdMsg:{
      default:'其他',
      type: String
    },
    showImage:{
      default:false,
      type:Boolean
    },
    showThirdMsg:{
      default:false,
      type:Boolean
    },
    imgSrc:{
      default:require('./image/pic_yyzz1@2x.png'),
      type:String
    },
    name:{
      default:'你好',
      type:String
    },
    addImg:{
      default:'加号',
      type:String
    },
    imgIndex:{
      default:0,
      type:Number
    }
  },
  methods:{
    firstClick(){
      console.log(this.name)
      this.$emit('typeChoosed', [this.firstMsg,this.name,this.imgIndex,0,this.addImg]);
    },
    secondClick(){
      console.log(this.name)
      this.$emit('typeChoosed', [this.secondMsg,this.name,this.imgIndex,1,this.addImg]);
    },
    thirdClick(){
      console.log(this.name)
      this.$emit('typeChoosed', [this.thirdMsg,this.name,this.imgIndex,2,this.addImg]);
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .typeChoose
    display flex
    flex-direction column
    align-items center
    width 100%
    color #333333 
    font-size 20px
    .header 
      width 90%
      height 55px
      display flex
      align-items center
      a
        font-weight 600
    .firstType
      width 80%
      padding 0 5%
      height 55px
      display flex
      align-items center
      justify-content space-between
      background #D6E1FA 
      a
        color:#306BE6
        opacity 1 
    .secondType
      width 80%
      padding 0 5%
      height 55px
      display flex
      align-items center
      justify-content space-between
      margin-top 12px
      background #F8F8FA
      margin-bottom 12px
      a 
        color #999999 
        font-size 16px
    .thirdType
      width 80%
      padding 0 5%
      height 55px
      display flex
      align-items center
      justify-content space-between
      background #F8F8FA
      margin-bottom 20px
      a 
        color #999999 
        font-size 16px
    .showImage
      width 90%
      padding 0 5%
      display flex
      flex-direction column
      margin-bottom 15px
      img 
        margin-top 10px   
        height 200px   
      a
        color #999999 
        font-size 15px

</style>


