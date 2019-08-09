<!--新增员工-->
<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header" @click="back">
          <img src="./image/btn_back.png">
          <div>编辑</div>     
      </div>
       
      
    </div>
    <div class="main">
      <div class="mainTop" ref="mainTopWrapperShop" > 
        <ul class="mainTopUl"> 
           <li class="title">手机号 {{staffEdit.phone}}</li>
           <li class="inputLi">  
            
            <a>所属门店</a>
            <div @click="chooseShop">
              <span>{{staffEdit.shopName}}</span>
              <img src="./../image/btn_more2.png">
            </div> 
          </li>  
          <li class="inputLi">
            <a>工号</a>
            <input type="text" placeholder="工号为两位数，如01" v-model="staffEdit.id"/> 
          </li>
           <li class="bg"></li>
           <li class="inputLi">
            <a>姓名</a>
            <input type="text" placeholder="请输入姓名"   v-model="staffEdit.name"/>  
          </li>
          <!-- <li > 
            
         
            
            <van-field v-model="num" label="工号"  clearable  placeholder="工号为两位数，如01" />
          </li> -->
          
         
           <!-- <li  > 
           
            <van-field v-model="name" label="姓名"  placeholder="请输入姓名" />
          </li>    -->
        </ul> 
      </div>
      <div class="bottomBtn"  >
      
        <button type=button :class="[clickFlag1?'btn':'btnLight']"    :disabled='clickFlag1'  @click="send">保存</button>
      </div>
    </div>
   
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from "vant";
export default {
  data() {
    return {
      // phone: "", //手机号
      // name: "",
      // num: "",
      // myShop: "请选择",
      staffEdit: {},
      options: {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          // threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        },
        pullDownRefresh: true,

        pullUpLoad: true,
        //pullDownRefresh: false, //关闭下拉
        //pullUpLoad: false, // 关闭上拉
        click: true,
        probeType: 3,
        startY: 0,
        scrollbar: true
      },
      pulldownMsg: "下拉刷新",
      pullupMsg: "加载更多",
      alertHook: "none",
      selected: "0",

      merflag: "1", //商户是否存在 1--有商户---显示门店列表  0--无商户---去申请
      shopList: [],
      max: 45,
      current: 0,
      dataFlag: true
    };
  },

  components: {},
  created() {
    console.log(this.$route.params.list);
    if (this.$route.params.list != undefined) {
      this.staffEdit = Object.assign({}, this.$route.params.list);
      localStorage.setItem(
        "staffEdit",
        JSON.stringify(this.$route.params.list)
      );
    } else {
      console.log(this.$route.params.shopName);
      if (localStorage.getItem("staffEdit") != undefined) {
        this.staffEdit = JSON.parse(localStorage.getItem("staffEdit"));
      }
      if (this.$route.params.shopName != undefined) {
        this.staffEdit.shopName = this.$route.params.shopName;
      }
    }

    console.log(this.staffEdit);
  },

  computed: {
    clickFlag1() {
      if (this.staffEdit.shopName == "请选择") {
        return true;
      } else if (this.staffEdit.id == "") {
        return true;
      } else if (this.staffEdit.name == "") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {},

  methods: {
    chooseShop() {
      console.log("选择门店");
      this.$router.push({ path: "/selShop" });
    },
    send() {
      console.log(this.staffEdit);

      let rePhone = /^[0-9]{2}$/;
      let regPhone = new RegExp(rePhone);
      if (regPhone.test(this.staffEdit.id)) {
        alert("提交");
      } else {
        Toast("请输入两位工号数字");
      }
    },
    getData() {
      return new Promise(resolve => {
        //模拟数据请求
        setTimeout(() => {
          const arr = [];
          for (let i = 1; i <= 10; i++) {
            let o = i + this.current * 10;
            if (o <= this.max) {
              let data = {
                name: "门店名称" + o,
                address: "上海市长宁区延安西路500号嘉宁国际大厦22楼" + o
              };
              arr.push(data);
              if (i == 10) {
                ++this.current;
              }
            } else {
              this.dataFlag = false;
              break;
            }
          }
          resolve(arr);
        }, 1000);
      });
    },

    back() {
      this.$store.commit("setTransitionName", "slide-left");
      // this.$router.back();
      this.$router.push({ path: "/StaffList" });
    }
  }
};
</script>
<style>
#app {
  /* min-height: 100%; */
  background: #f8f8fa;
}
</style>

<style lang='stylus' scoped>
@import '../../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .head {
    width: 100%;
    height: 10%;
    line-height: 5%;
    background: #F8F8FA;
    display: flex;
    flex-direction: column;

    .header {
      height: 100%;
      display: flex;
      align-items: center;
      flex: 1 1 auto;

      img {
        margin-left: 3%;
      }

      div {
        margin-left: 3%;
        font-size: 24px;
        color: #333;
        font-family: PingFangSC-Medium;
      }
    }

    .addShop {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #306BE6;
      margin: auto;
      margin-right: 20px;
    }
  }

  .tabHeader {
    width: 100%;
    height: 7%;

    .tab {
      width: 90%;
    }

    /deep/ .mint-navbar .mint-tab-item.is-selected {
      font-family: PingFangSC-Medium;
      border-bottom: 3px solid #306BE6;

      .mint-tab-item-label {
        color: #306BE6;
      }
    }

    /deep/ .mint-tab-item-label {
      font-size: 14px;
      color: #BBBBBB;
    }
  }

  .main {
    height: 90%;
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .mainTop {
      width: 100%;
      height: 40%;
      overflow: hidden;

      .mainTopUl {
        width: 100%;
        box-sizing: border-box;
        background: #fff;

        li {
          margin: 0 20px;
          box-sizing: border-box;
          border: 1px solid transparent;

          &.title {
            padding: 0 0 12px 20px;
            background: #f8f8f8;
            color: #666666;
            margin: 0;
          }

          &:last-child {
            // margin: 0 20px;
          }

          &.bg {
            margin: 0;
            height: 12px;
            background: #f8f8f8;
          }

          /deep/ .van-field__control {
            text-align: right;
          }
        }

        .inputLi {
          width: 90%;
          height: 50px;
          line-height: 50px;
          border-bottom: solid 1px #F7F7F7;
          background: #FFFFFF;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          a {
            font-size: 15px;
            color: #333;
            display: block;
            width: 35%;
          }

          input {
            display: block;
            width: 65%;
            height: 80%;
            border: none;
            outline: medium;
            text-align: right;
          }

          span {
            font-size: 15px;
          }
        }
      }
    }

    .bottomBtn {
      width: 100%;
      height: 20%;
      mixinDisplay();

      .btn {
        width: 80%;
        height: 45px;
        line-height: 45px;
        border: none;
        border-radius: 20px;
        background: #DDDDDD;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }

      .btnLight {
        width: 80%;
        height: 45px;
        line-height: 45px;
        border: none;
        border-radius: 20px;
        background: #306BE6;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }
    }
  }

  .shopList {
    background: #FFFFFF;
    border-radius: 2px;
    display: flex;
    position: relative;

    .shopImage {
      width: 70px;
      height: 70px;
      margin: 14px 11px 14px 12px;
    }

    .shopContent {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      flex: 1 1 auto;
      margin: 13px 0 14px 0;

      .shopTitle {
        display: flex;
        flex-direction: row;

        .name {
          font-family: PingFangSC-Medium;
          font-weight: 600;
          font-size: 15px;
          margin-top: 3px;
          color: #333333;
          flex: 1 1 auto;
          margin-top: 12px;
        }

        .status {
          width: 59px;
          height: 23px;
          margin: 0 18px 0 0;
          background-repeat: no-repeat;
          background-position: center;
        }
      }

      .address {
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;

        .add {
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: #666666;
          width: 80%;
        }
      }
    }

    .btn-wrap {
      right: 14px;
      bottom: 40%;
      position: absolute;
    }
  }
}
</style>