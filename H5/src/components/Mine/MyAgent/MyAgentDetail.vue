<template>
  <div class="agentApply1">
    <Personal_One v-if="$store.state.agentType==='person' && $store.state.agentRank==1"></Personal_One>
    <Personal_Two v-if="$store.state.agentType==='person' && $store.state.agentRank==2"></Personal_Two>
    <Province_One v-if="$store.state.agentType==='province' && $store.state.agentRank==1"></Province_One>
    <Province_Two v-if="$store.state.agentType==='province' && $store.state.agentRank==2"></Province_Two>
  </div>
</template>
<script>
import Personal_One from './Personal_One'
import Personal_Two from './Personal_Two'
import Province_One from './Province_One'
import Province_Two from './Province_Two'
export default {
  components:{
    Personal_One,
    Personal_Two,
    Province_One,
    Province_Two
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.agentApply1
  width 100%
  height 100%
  // background red
</style>


