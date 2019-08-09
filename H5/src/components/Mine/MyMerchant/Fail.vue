<template>
  <div class="through">
    <div v-for="item in merchantMessage">
      <merchantItem    :merchantMessage="item"></merchantItem>
    </div>
  </div>
</template>
<script>
import merchantItem from './merchantItem'
export default {
  components:{
    merchantItem
  },
  data(){
    return{
      // merchantMessage:{
      //   img:require('../image/img_door-header.png'),
      //   name:'肯德基',
      //   number:'23',
      //   address:'上海市',
      //   goModify:true
      // }
      merchantMessage:[        
        {
          img:require('../image/img_door-header.png'),
          name:'上上谦',
          number:'5',
          address:'上海市',
          goModify:true
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.through
  width 100%
  height 75%
  background #f8f8fa
  overflow-y auto
  // display flex
  // flex-direction column
  // align-items  center
</style>

