import Vue from 'vue'
import Router from 'vue-router'
import Entrance from '@/components/Entrance/Entrance'
import TestSjld from '@/components/TestSjld'
import TestSjld2 from '@/components/TestSjld2'
import EntrancePhone from '@/components/Entrance/EntrancePhone'
import Index from '@/components/Index/Index'
import TestApi from '@/components/TestApi/TestApi'
import IndexDefault from '@/components/IndexDefault/IndexDefault'
import AccountBook from '@/components/AccountBook/AccountBook'
import Mine from '@/components/Mine/Mine'
import MyMerchant from '@/components/Mine/MyMerchant/MyMerchant'
import MyMerchantDetail from '@/components/Mine/MyMerchant/MyMerchantDetail/MyMerchantDetail'
import Through from '@/components/Mine/MyMerchant/Through'
import Ing from '@/components/Mine/MyMerchant/Ing'
import Fail from '@/components/Mine/MyMerchant/Fail'
import Cancel from '@/components/Mine/MyMerchant/Cancel'
import MyAgent from '@/components/Mine/MyAgent/MyAgent'
import MyAgentDetail from '@/components/Mine/MyAgent/MyAgentDetail'
import AgentThrough from '@/components/Mine/MyAgent/AgentThrough'
import AgentIng from '@/components/Mine/MyAgent/AgentIng'
import AgentFail from '@/components/Mine/MyAgent/AgentFail'
import AgentCancel from '@/components/Mine/MyAgent/AgentCancel'
import Setting from '@/components/Mine/Setting/Setting'
import NewUserGuide from '@/components/Mine/NewUserGuide/NewUserGuide'
import ContactService from '@/components/Mine/ContactService/ContactService'
import ModifyPassword from '@/components/Mine/Setting/ModifyPassword'
import ArrivalBroadcast from '@/components/Mine/Setting/ArrivalBroadcast'
import About from '@/components/Mine/Setting/About'
import BaseInfo from '@/components/Mine/BaseInfo'
import AccountSet from '@/components/Mine/AccountSet'
import PhoneChange from '@/components/Mine/PhoneChange'
import PhoneChange2 from '@/components/Mine/PhoneChange2'
import Manager from '@/components/Manager/Manager'
import Register from '@/components/Register/Register'
import ForgetPassword1 from '@/components/ForgetPassword/ForgetPassword1'
import ForgetPassword2 from '@/components/ForgetPassword/ForgetPassword2'
import ForgetPassword3 from '@/components/ForgetPassword/ForgetPassword3'
import MerchantApply1 from '@/components/MerchantApply/MerchantApply1'
import MerchantApply2 from '@/components/MerchantApply/MerchantApply2'
import MerchantApply3 from '@/components/MerchantApply/MerchantApply3'
import MerchantApply4 from '@/components/MerchantApply/MerchantApply4'
import MerchantApply5 from '@/components/MerchantApply/MerchantApply5'
import AgentApply from '@/components/AgentApply/AgentApply'
import AgentApply1 from '@/components/AgentApply/AgentApply1'
import Personal_Two_step2 from '@/components/AgentApply/Personal_Two_step2'
import Province_One_step2 from '@/components/AgentApply/Province_One_step2'
import Province_Two_step2 from '@/components/AgentApply/Province_Two_step2'
import Province_Two_step3 from '@/components/AgentApply/Province_Two_step3'
import PaySetting from '@/components/MerchantApply/PaySetting'
import Settlement from '@/components/MerchantApply/Settlement'
import TerminalManage from '@/components/TerminalManage/TerminalManage1'
import TerminalDetail from '@/components/TerminalManage/TerminalDetail'
import TransactionQuery from '@/components/TransactionQuery/TransactionQuery' //交易查询管理
import TransactionDetail from '@/components/TransactionQuery/TransactionDetail' //交易详情
import ShopManagement from '@/components/ShopManagement/ShopManagement'
import ShopDetail from '@/components/ShopManagement/ShopDetail'
import ShopAdd from '@/components/ShopManagement/ShopAdd'
import ShopCreate1 from '@/components/ShopManagement/ShopCreate1'
import ShopCreate2 from '@/components/ShopManagement/ShopCreate2'
import ShopCreate3 from '@/components/ShopManagement/ShopCreate3'
import ShopCreate4 from '@/components/ShopManagement/ShopCreate4'
import ShopCreate5 from '@/components/ShopManagement/ShopCreate5'
//在线报修--商户
import OnlineRepair from '@/components/Mine/OnlineRepair/OnlineRepair'
//报修管理--机构
import RepairManagement from '@/components/Mine/RepairManagement/RepairManagement'
//员工管理
import StaffManagement from '@/components/Mine/StaffManagement/StaffManagement'
import StaffList from '@/components/Mine/StaffManagement/StaffList'
import StaffEdit from '@/components/Mine/StaffManagement/StaffEdit'
import selShop from '@/components/Mine/StaffManagement/selShop' //编辑员工--选择门店
import StaffDetail from '@/components/Mine/StaffManagement/StaffDetail'
//消息通知
import MessageNotify from '@/components/Mine/MessageNotify/MessageNotify'
//新增员工
import StaffCreate from '@/components/Mine/StaffManagement/StaffCreate'
//店长委任
import BuinourManagement from '@/components/Mine/BuinourManagement/BuinourManagement'
//店长委任
import BuinourAppoint from '@/components/Mine/BuinourManagement/BuinourAppoint'



// import store from './../store'
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'Entrance',
      component: Entrance,

    },
    {
      path: '/EntrancePhone',
      name: 'EntrancePhone',
      component: EntrancePhone
    },
    {
      path: '/TestSjld',
      name: 'TestSjld',
      component: TestSjld
    },
    {
      path: '/TestSjld2',
      name: 'TestSjld2',
      component: TestSjld2
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: true
      },
      children: [ //这里就是二级路由的配置
        {
          path: '/',
          name: 'IndexDefault',
          component: IndexDefault,
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/AccountBook',
          name: 'AccountBook',
          component: AccountBook,
          meta: {
            requireAuth: true
          },
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/Mine',
          name: 'Mine',
          component: Mine,
          meta: {
            // requireAuth: true
          },
        }
      ]
    },
    {
      path: '/MyMerchant',
      name: 'MyMerchant',
      component: MyMerchant,
      children: [{
          path: '/',
          name: 'Through',
          component: Through
        },
        {
          path: '/Ing',
          name: 'Ing',
          component: Ing,
        },
        {
          path: '/Fail',
          name: 'Fail',
          component: Fail,
        },
        {
          path: '/Cancel',
          name: 'Cancel',
          component: Cancel,
        }
      ]
    },
    {
      path: '/MyMerchantDetail',
      name: 'MyMerchantDetail',
      component: MyMerchantDetail,
    },
    {
      path: '/MyAgent',
      name: 'MyAgent',
      component: MyAgent,
      children: [{
          path: '/',
          name: 'AgentThrough',
          component: AgentThrough
        },
        {
          path: '/AgentIng',
          name: 'AgentIng',
          component: AgentIng,
        },
        {
          path: '/AgentFail',
          name: 'AgentFail',
          component: AgentFail,
        },
        {
          path: '/AgentCancel',
          name: 'AgentCancel',
          component: AgentCancel,
        }
      ]
    },
    {
      path: '/MyAgentDetail',
      name: 'MyAgentDetail',
      component: MyAgentDetail,
    },
    
    {
      path: '/BaseInfo',
      name: 'BaseInfo',
      component: BaseInfo,
    },
    {
      path: '/AccountSet',
      name: 'AccountSet',
      component: AccountSet,
    },
    {
      path: '/PhoneChange',
      name: 'PhoneChange',
      component: PhoneChange,
    },
    {
      path: '/PhoneChange2',
      name: 'PhoneChange2',
      component: PhoneChange2,
    },
    {
      path: '/TestApi',
      name: 'TestApi',
      component: TestApi,
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/ForgetPassword1',
      name: 'ForgetPassword1',
      component: ForgetPassword1
    },
    {
      path: '/ForgetPassword2',
      name: 'ForgetPassword2',
      component: ForgetPassword2
    },
    {
      path: '/ForgetPassword3',
      name: 'ForgetPassword3',
      component: ForgetPassword3
    },
    {
      path: '/MerchantApply1',
      name: 'MerchantApply1',
      component: MerchantApply1,
      meta: {
        keepAlive: true,
        requireAuth: true
      }
    },
    {
      path: '/MerchantApply2',
      name: 'MerchantApply2',
      component: MerchantApply2,
      meta: {
        keepAlive: true,
        requireAuth: true
      }
    },
    {
      path: '/MerchantApply3',
      name: 'MerchantApply3',
      component: MerchantApply3,
      meta: {
        keepAlive: true,
        requireAuth: true
      }
    },
    {
      path: '/MerchantApply4',
      name: 'MerchantApply4',
      component: MerchantApply4,
      meta: {
        keepAlive: true,
        requireAuth: true
      }
    },
    {
      path: '/MerchantApply5',
      name: 'MerchantApply5',
      component: MerchantApply5,
      meta: {
        keepAlive: true,
        requireAuth: true
      }
    },
    {
      path: '/AgentApply',
      name: 'AgentApply',
      component: AgentApply,
    },
    {
      path: '/AgentApply1',
      name: 'AgentApply1',
      component: AgentApply1,
    },
    {
      path: '/Personal_Two_step2',
      name: 'Personal_Two_step2',
      component: Personal_Two_step2,
    },
    {
      path: '/Province_One_step2',
      name: 'Province_One_step2',
      component: Province_One_step2,
    },
    {
      path: '/Province_Two_step2',
      name: 'Province_Two_step2',
      component: Province_Two_step2,
    },
    {
      path: '/Province_Two_step3',
      name: 'Province_Two_step3',
      component: Province_Two_step3,
    },
    {
      path: '/PaySetting',
      name: 'PaySetting',
      component: PaySetting,
    },
    {
      path: '/Settlement',
      name: 'Settlement',
      component: Settlement,
    },
    {
      path: '/TerminalManage',
      name: 'TerminalManage',
      component: TerminalManage
    }, {
      path: '/TerminalDetail',
      name: 'TerminalDetail',
      component: TerminalDetail
    }, {
      path: '/TransactionQuery',
      name: 'TransactionQuery',
      component: TransactionQuery

    },
    {
      path: '/TransactionDetail',
      name: 'TransactionDetail',
      component: TransactionDetail,

    },
    {
      path: '/ShopManagement',
      name: 'ShopManagement',
      component: ShopManagement

    },
    {
      path: '/ShopDetail',
      name: 'ShopDetail',
      component: ShopDetail
    },
    {
      path: '/ShopAdd',
      name: 'ShopAdd',
      component: ShopAdd
    },
    {
      path: '/ShopCreate1',
      name: 'ShopCreate1',
      component: ShopCreate1
    },
    {
      path: '/ShopCreate2',
      name: 'ShopCreate2',
      component: ShopCreate2
    },
    {
      path: '/ShopCreate3',
      name: 'ShopCreate3',
      component: ShopCreate3
    },
    {
      path: '/ShopCreate4',
      name: 'ShopCreate4',
      component: ShopCreate4
    },
    {
      path: '/ShopCreate5',
      name: 'ShopCreate5',
      component: ShopCreate5
    },
    //在线报修
    {
      path: '/OnlineRepair',
      name: 'OnlineRepair',
      component: OnlineRepair
    },
    //报修管理
    {
      path: '/RepairManagement',
      name: 'RepairManagement',
      component: RepairManagement
    },
    //员工管理
    {
      path: '/StaffManagement',
      name: 'StaffManagement',
      component: StaffManagement
    },
    //员工列表
    {
      path: '/StaffList',
      name: 'StaffList',
      component: StaffList
    },
    {
      path: '/StaffEdit',
      name: 'StaffEdit',
      component: StaffEdit
    },
    //编辑员工--选择门店
    {
      path: '/selShop',
      name: 'selShop',
      component: selShop
    },
    //消息通知
    {
      path: '/MessageNotify',
      name: 'MessageNotify',
      component: MessageNotify
    },
    {
      path: '/StaffDetail',
      name: 'StaffDetail',
      component: StaffDetail
    },
    //新增员工
    {
      path: '/StaffCreate',
      name: 'StaffCreate',
      component: StaffCreate
    },
    //店长管理Management
    {
      path: '/BuinourManagement',
      name: 'BuinourManagement',
      component: BuinourManagement
    },
    //委任店长
    {
      path: '/BuinourAppoint',
      name: 'BuinourAppoint',
      component: BuinourAppoint
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/NewUserGuide',
      name: 'NewUserGuide',
      component: NewUserGuide
    },
    {
      path: '/ContactService',
      name: 'ContactService',
      component: ContactService
    },
    {
      path: '/ModifyPassword',
      name: 'ModifyPassword',
      component: ModifyPassword
    },
    {
      path: '/ArrivalBroadcast',
      name: 'ArrivalBroadcast',
      component: ArrivalBroadcast
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})

// 判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.meta.requireAuth) {// 判断是否需要登录权限
//     console.log(store.state.loginMessage.isLogin)
//     if (store.state.loginMessage.isLogin) {// 判断是否登录
//       next()
//     } else {// 没登录则跳转到登录界面
//       next({
//         path: '/',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
