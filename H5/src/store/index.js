import Vue from 'vue'
import Vuex from 'vuex'
// import { defaults } from '../common/js/utils'
// import MerchantApplyData from '../components/MerchantApply/MerchantApplyData';
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    transitionName: 'slide-right', //页面切换效果
    //登录的时候保存的首页角色的类型,1表示游客,2表示代理商，3表示商户，4表示机构
    userCharacter: 3,
    //首页的状态,2表示审核中，3表示申请异常，4表示审核异常，5表示今日交易总额
    indexState: 3,
    //我的里面的账号的类型，对应设计图里面的我的,AgentState表示代理商，MerchantState表示商户
    //1表示未设置账号,2表示审核中，3表示去修改，4表示一级代理商
    //5表示一级代理商异常,6表示一级代理商包含多个2级代理商，7表示二级代理商
    AgentState: 1,
    MerchantState: 6,
    //代理商类型
    agentType: 'person',
    //代理商等级
    agentRank: 1,
    //找回密码保存的手机号
    mobileNumber: '',
    //找回密码保存的验证码
    smsCode: '',
    merchantApplyEntitity: {},
    shopCreateEntitity: {},
    //选择的证件类型
    photoType: '',
    //选择设置的交易类型
    paySettingType: '',
    //登录信息
    loginMessage: {
      isLogin: false,
      uesr_name: '',
      access_token: '',
      refresh_token: ''
    },
    merchantApplyEntitity: {}
  },
  mutations: {
    //设置页面切换效果
    setTransitionName(state, newVal) {
      state.transitionName = newVal
    },
    //设置用户的角色
    setUserCharacter(state, newVal) {
      state.userCharacter = newVal
    },
    //设置我的  里面的账号的类型
    setAgentState(state, newVal) {
      state.AgentState = newVal
    },
    setMerchantState(state, newVal) {
      state.MerchantState = newVal
    },
    //设置代理商类型
    setAgentType(state, newVal) {
      state.agentType = newVal
    },
    //设置代理商等级
    setAgentRank(state, newVal) {
      state.agentRank = newVal
    },
    setMobileNumber(state, newVal) {
      state.mobileNumber = newVal
    },
    setSmsCode(state, newVal) {
      state.smsCode = newVal
    },
    setPhotoType(state, newVal) {
      state.photoType = newVal
    },
    setPaySettingType(state, newVal) {
      state.paySettingType = newVal
    },
    //设置首页的状态
    setIndexState(state, newVal) {
      state.indexState = newVal
    },
    setMerchantApplyEntitity(state, obj) {
      state.merchantApplyEntitity = obj
    },
    setShopCreateEntitity(state, obj) {
      state.shopCreateEntitity = obj
    },
    //设置登录状态是否已经登录
    setLoginMessage(state, newVal) {
      state.loginMessage = newVal
      //设置登录状态到本地存储
      let isLogin = JSON.parse(newVal.isLogin);
      console.log('vuex中的isLogin==' + newVal)
      localStorage.setItem('isLogin', JSON.stringify(isLogin));
    },
  },
  getters: {}
})




export default store
