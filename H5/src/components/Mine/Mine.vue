<template>
  <div class="mineWrapper" :style="mainBackground">
    <!-- 游客 -->
    <VisitorState v-if="$store.state.userCharacter===1"></VisitorState>
    <!-- 代理商 -->
    <!-- <AgentState1 v-if="$store.state.userCharacter===2&&$store.state.AgentState === 1"></AgentState1> -->
    <AgentState2 v-if="$store.state.userCharacter===2&&$store.state.AgentState === 2"></AgentState2>
    <AgentState3 v-if="$store.state.userCharacter===2&&$store.state.AgentState === 3"></AgentState3>
    <AgentState4 v-if="$store.state.userCharacter===2&&$store.state.AgentState === 4"></AgentState4>
    <AgentState5 v-if="$store.state.userCharacter===2&&$store.state.AgentState === 5"></AgentState5>
    <AgentState6 v-if="$store.state.userCharacter===2&&$store.state.AgentState === 6"></AgentState6>
    <AgentState7 v-if="$store.state.userCharacter===2&&$store.state.AgentState === 7"></AgentState7>
    <!-- 商户 -->
    <MerchantState1 v-if="$store.state.userCharacter===3&&$store.state.MerchantState === 1"></MerchantState1>
    <MerchantState2 v-if="$store.state.userCharacter===3&&$store.state.MerchantState === 2"></MerchantState2>
    <MerchantState3 v-if="$store.state.userCharacter===3&&$store.state.MerchantState === 3"></MerchantState3>
    <MerchantState4 v-if="$store.state.userCharacter===3&&$store.state.MerchantState === 4"></MerchantState4>
    <MerchantState5 v-if="$store.state.userCharacter===3&&$store.state.MerchantState === 5"></MerchantState5>
    <MerchantState6 v-if="$store.state.userCharacter===3&&$store.state.MerchantState === 6"></MerchantState6>
    <MerchantState7 v-if="$store.state.userCharacter===3&&$store.state.MerchantState === 7"></MerchantState7>
    <!-- 机构 -->
     <Organization v-if="$store.state.userCharacter===4"></Organization>
  </div>
</template>
<script>
import VisitorState from './CharacterVisitor/VisitorState'

// import AgentState1 from './CharacterAgent/AgentState1/AgentState1'
import AgentState2 from './CharacterAgent/AgentState2/AgentState2'
import AgentState3 from './CharacterAgent/AgentState3/AgentState3'
import AgentState4 from './CharacterAgent/AgentState4/AgentState4'
import AgentState5 from './CharacterAgent/AgentState5/AgentState5'
import AgentState6 from './CharacterAgent/AgentState6/AgentState6'
import AgentState7 from './CharacterAgent/AgentState7/AgentState7'

import MerchantState1 from './CharacterMerchant/MerchantState1/MerchantState1'
import MerchantState2 from './CharacterMerchant/MerchantState2/MerchantState2'
import MerchantState3 from './CharacterMerchant/MerchantState3/MerchantState3'
import MerchantState4 from './CharacterMerchant/MerchantState4/MerchantState4'
import MerchantState5 from './CharacterMerchant/MerchantState5/MerchantState5'
import MerchantState6 from './CharacterMerchant/MerchantState6/MerchantState6'
import MerchantState7 from './CharacterMerchant/MerchantState7/MerchantState7'

import Organization from './CharacterOrganization/Organization'
import { Toast } from "vant";
import axios from "axios";
export default {
  components: {
    VisitorState,
    // AgentState1,
    AgentState2,
    AgentState3,
    AgentState4,
    AgentState5,
    AgentState6,
    AgentState7,
    MerchantState1,
    MerchantState2,
    MerchantState3,
    MerchantState4,
    MerchantState5,
    MerchantState6,
    MerchantState7,
    Organization
  },
  data() {
    return {
      mainBackground: {
        backgroundImage: "url(" + require("./image/bg_merchant.png") + ")",
        backgroundSize: "100% 100%"
      }
    };
  },
  methods: {
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.mineWrapper {
  width: 100%;
  height: 92.5%;
  // background: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .normalLi {
      padding: 0 5% 0 5%;
      background: #FFFFFF;
      width: 80%;
      height: 60px;
      // border solid 1px black
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        font-size: 15px;
        color: #333333;
      }

      span {
        font-size: 15px;
        color: #999999;
      }
    }
  }
}
</style>


