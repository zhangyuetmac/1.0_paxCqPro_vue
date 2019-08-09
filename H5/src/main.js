// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import store from './store'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import './common/stylus/index.styl'
import axios from 'axios'
import App from './App'
// import *as axios from './common/js/axios.js'
Vue.use(Mint)
Vue.use(Vant)
// Vue.use(YDUI)
Vue.config.productionTip = false
// Vue.prototype._Axios = axios;

//路由跳转前做判断
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log('000')
  // console.log('是否需要判断路由守卫='+to.meta.requireAuth)
  // console.log('本地存储取到的登录状态isLogin=='+JSON.parse(localStorage.getItem('isLogin')))
  // console.log('vuex取到的登录状态isLogin=='+store.state.loginMessage.isLogin)  
  // let hasLogin = JSON.parse(localStorage.getItem('isLogin'))
  let hasLogin = false
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (hasLogin) {
      console.log('111')
      next({
        path: '/index'
      })
    } else {
      console.log('222')
      next()
    }
  } else {
    next()
  }
})

// // document.addEventListener('deviceready', function() {
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })
// //   window.navigator.splashscreen.hide()
// // }, false)
let startApp = function () {
  axios.get('/static/config.json').then((res) => {
    console.log(res.data)
    console.log(res.data.BASE_URL)
    // 基础地址
    Vue.prototype.BASE_URL = res.data.BASE_URL;
    // document.addEventListener('deviceready', function() {
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
    //   window.navigator.splashscreen.hide()
    // }, false)
  })
}
startApp()