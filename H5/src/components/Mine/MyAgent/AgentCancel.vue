<template>
  <div class="through">
    <div v-show="false" v-for="item in merchantMessage">
      <AgentItem  :merchantMessage="item"></AgentItem>
    </div>
    <div class="wrapper" v-show="true">
      <NoData></NoData>
    </div>
  </div>
</template>
<script>
import AgentItem from './AgentItem'
import NoData from './NoData'
export default {
  components:{
    AgentItem,
    NoData
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
  .wrapper
    width 100%
    height 100%
    display flex
    justify-content center
</style>

