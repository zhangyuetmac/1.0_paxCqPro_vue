<template>
  <div class="accountBookHeader">
    <div class="left" @click="showMerchantSelect">
      <a>全部商户</a>
      <img :src="this.shadowShow?require('../image/icon_arrowup@2x.png'):require('../image/icon_arrowdown2@2x.png')" />
    </div>
    <div class="right">
      <div v-for="(item,index) in date" class="item" @click.stop="changeIndex(index)">
      	<div class="item-child" :class="normalIndex==index?'item-child-active':null">
      		<a>{{item.name}}</a>
      	</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    shadowShow:{
      default:false,
      type:Boolean
    }
  },
  data(){
    return{
      date:[
        {name:'日'},
        {name:'周'},
        {name:'月'},
      ],
      normalIndex:0
    }
  },
  methods:{
    changeIndex(index){
      console.log(index)
      this.normalIndex = index
      this.$emit('changePageByIndex',index)
    },
    showMerchantSelect(){
      this.$emit("showMerchantSelect")
    }
  },
  components:{
  }
}
</script>
<style lang="stylus" scoped>
@import "../../../common/stylus/mixin"
.accountBookHeader
  width 100%
  height 12%
  background #347AEA
  display flex
  justify-content space-between
  align-items center
  .left
    margin-left 5%
    height 80%
    display flex
    align-items center
    a
     color white
     font-size 16px
    image
     margin-left 3px
  .right
    width 50%
    height 100%
    display flex
    align-items center
    .item
      flex 1
      height 100%
      display flex 
      align-items center 
      justify-content center
      .item-child-active
        border-bottom solid 3px white
      .item-child
	      width 50%
	      height 100%
	      display flex 
	      align-items center 
	      justify-content center
				a
				 color #FFFFFF
				 font-size 16px
			
</style>


