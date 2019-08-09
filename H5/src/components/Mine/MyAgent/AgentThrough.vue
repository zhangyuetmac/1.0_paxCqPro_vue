<template>
  <div class="through">
    <div v-for="item in merchantMessage" @click="goMyAgentDetailPage">
      <AgentItem :merchantMessage="item"></AgentItem>
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
      merchantMessage:[
        {
          img:require('../image/img_door-header.png'),
          name:'张三',
          tel:'18257562578',
          number:'23',
          goModify:false,
          merchantNumber:2,
          shopNumber:9,
          type:'个体'
        },
        {
          img:require('../image/img_door-header.png'),
          name:'王五',
          tel:'18257562578',
          number:'28',
          goModify:false,
          merchantNumber:12,
          shopNumber:99,
          type:'企业'
        },
        {
          img:require('../image/img_door-header.png'),
          name:'肯德基',
          tel:'18257562578',
          number:'23',
          goModify:false,
          merchantNumber:12000,
          shopNumber:15,
          type:'个体'
        },
        {
          img:require('../image/img_door-header.png'),
          name:'张三',
          tel:'18257562578',
          number:'23',
          goModify:false,
          merchantNumber:12,
          shopNumber:99,
          type:'企业'
        },
        {
          img:require('../image/img_door-header.png'),
          name:'李四',
          tel:'18257562578',
          number:'23',
          goModify:false,
          merchantNumber:12,
          shopNumber:1009,
          type:'个体'
        },
        {
          img:require('../image/img_door-header.png'),
          name:'肯德基',
          tel:'18257562578',
          number:'23',
          goModify:false,
          merchantNumber:12,
          shopNumber:99,
          type:'个体'
        },
        {
          img:require('../image/img_door-header.png'),
          name:'肯德基',
          tel:'18257562578',
          number:'23',
          goModify:false,
          merchantNumber:12,
          shopNumber:99,
          type:'个体'
        },
      ]
    }
  },
  methods:{
    goMyAgentDetailPage(){
      console.log('11')
      this.$router.push({
        path:'/MyAgentDetail'
      })
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

