<template>
  <div class="agentApply1">
    <Personal_One_step1 v-if="$store.state.agentType==='person' && $store.state.agentRank==1"></Personal_One_step1>
    <Personal_Two_step1 v-if="$store.state.agentType==='person' && $store.state.agentRank==2"></Personal_Two_step1>
    <Province_One_step1 v-if="$store.state.agentType==='province' && $store.state.agentRank==1"></Province_One_step1>
    <Province_Two_step1 v-if="$store.state.agentType==='province' && $store.state.agentRank==2"></Province_Two_step1>
  </div>
</template>
<script>
import Personal_One_step1 from './Personal_One_step1'
import Personal_Two_step1 from './Personal_Two_step1'
import Province_One_step1 from './Province_One_step1'
import Province_Two_step1 from './Province_Two_step1'
export default {
  components:{
    Personal_One_step1,
    Personal_Two_step1,
    Province_One_step1,
    Province_Two_step1
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';
.agentApply1
  width 100%
  height 100%
  // background red
</style>


