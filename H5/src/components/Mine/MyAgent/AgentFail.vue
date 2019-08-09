<template>
  <div class="through">
    <div v-for="item in merchantMessage">
      <AgentItem    :merchantMessage="item"></AgentItem>
    </div>
  </div>
</template>
<script>
import AgentItem from './AgentItem'
export default {
  components:{
    AgentItem
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
          name:'肯德基',
          tel:'18257562578',
          number:'23',
          goModify:true,
          merchantNumber:12,
          shopNumber:99,
          type:'个体'
        },
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

