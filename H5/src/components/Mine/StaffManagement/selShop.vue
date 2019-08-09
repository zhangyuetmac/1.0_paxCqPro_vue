<!--店长委任-->
<template>
  <div class="transitionWrapper">
    <div class="head">
      <div class="header" @click="back">
          <img src="./../image/btn_back.png">
          <div>编辑</div>     
      </div>
    
    </div>
    <div class="main">
      <div class="title" >请选择门店</div>
      
      <div class="mainTop" ref="mainTopWrapperBuinour" > 
        <ul class="mainTopUl"  >   
          
          <li class="shopList" v-for="(item,index) in shopList" :key="index">
            <div class="shopContent" @click="jump(item.name)">
              <div>{{item.name}}</div>
              <div class="btn-wrap">
                <div class="btn-more"></div>
              </div>
            </div>             
          </li>
           
           
          
          
         
           
          
        </ul> 
       
      </div>
     
    </div>
   
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from "vant";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      haveFill: "1",
      selBuinour: "",
      selShop: "",
      flag: "2", //1.可委任门店 2.无员工 3.无需店长
      // 门店列表
      shopList: [
        { name: "门店1" },
        { name: "门店2" },
        { name: "门店3" },
        { name: "门店4" },
        { name: "门店5" },
        { name: "门店6" },
        { name: "门店7" },
        { name: "门店8" },
        { name: "门店9" },
        { name: "门店10" },
        { name: "门店11" },
        { name: "门店12" }
      ],
      buinourList: [
        {
          id: "01",
          name: "张三"
        },
        {
          id: "02",
          name: "张三"
        },
        {
          id: "03",
          name: "张三"
        },
        {
          id: "04",
          name: "张三"
        },
        {
          id: "05",
          name: "张三"
        },

        {
          id: "06",
          name: "张三"
        },
        {
          id: "07",
          name: "张三"
        }
      ],
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

      max: 45,
      current: 0,
      dataFlag: true
    };
  },

  components: {},
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },

  computed: {
    clickFlag1() {
      if (this.selBuinour == "") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {},

  methods: {
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapperBuinour, {
        click: true,
        probeType: 3
      });
      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScroll.on("scroll", pos => {
        if (pos.y > 10) {
          // console.log('下拉距离超过10,文本框失去焦点')
          // this._inputBlur();
        } else if (pos.y < -10) {
          // console.log('上拉距离超过10,文本框失去焦点')
          // this._inputBlur();
        }
      });
    },
    add() {
      this.$router.push({ path: "/StaffCreate" });
    },
    jump(id) {
      this.selShop = id;
      this.$store.commit("setTransitionName", "slide-left");
      this.$router.push({ name: "StaffEdit", params: { shopName: id } });
    },
    change(id) {
      this.selBuinour = id;
    },
    goStep2() {
      let rePhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      let regPhone = new RegExp(rePhone);
      if (regPhone.test(this.phone)) {
        this.haveFill = "2";
      } else {
        Toast("手机号格式不正确");
      }
    },
    goStep3() {
      let rePhone = /^[\u4e00-\u9fa5]{2,}$/;
      let regPhone = new RegExp(rePhone);
      if (regPhone.test(this.name)) {
        this.haveFill = "3";
      } else {
        Toast("请至少输入两个汉字");
      }
    },
    send() {
      console.log(this.selShop);
      console.log(this.selBuinour);

      alert("提交");
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
      this.$router.push({ path: "/StaffEdit" });
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

    .stepWrap {
      display: flex;
      height: 50%;
      justify-content: center;
      background: #fff;
      flex-direction: column;
      align-items: center;

      .step {
        width: 80%;
        height: 50%;
        // background yellow
        display: flex;
        align-items: center;

        // justify-content: center;
        .itemOpacity {
          opacity: 0.4;
          // width 25%
          height: 100%;
        }

        .item {
          // border solid 1px black
          // width 25%
          flex: 1;
          height: 100%;
          mixinDisplay();
          flex-direction: column;
          background: #fff;
          position: relative;
          align-items: flex-end;

          &.itemLf {
            align-items: flex-start;
          }

          .number {
            width: 20px;
            height: 20px;
            mixinDisplay();
            border-radius: 50%;
            color: #FFFFFF;
            font-size: 13px;
            position: relative;
            // opacity: 0.8;
            border: 1px solid #306BE6;
            background: #fff;
            color: #306BE6;

            &.active {
              background-image: linear-gradient(-90deg, #68A6FC 0%, #1D6AE1 100%);
              background-image: linear-gradient(-90deg, #173CDD 0%, #4399F1 100%);
              background: #306BE6;
              color: #FFFFFF;
            }
          }

          span {
            margin-top: 10%;
            font-size: 14px;
            color: #306BE6;
            position: absolute;
            bottom: 15px;
          }
        }

        .dashed {
          // &.first-child {
          // opacity: 0.4;
          // }

          // position: absolute;
          width: 35%;
          border-bottom: 1px dashed #306BE6;
          height: 0;
          left: 25px;
          margin: 0 10px;
          // opacity: 0.4;
          // top: 50%;
        }

        .solided {
          // position: absolute;
          width: 35%;
          border-bottom: 1px solid #306BE6;
          height: 0;
          margin: 0 10px;
          // left: 25px;
          opacity: 1;
          // top: 50%;
        }
      }

      .stepTitle {
        height: 30%;
        width: 80%;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        align-items: center;
        margin-top: 5px;

        div {
          height: 20px;
          line-height: 20px;
          color: #306BE6;
          opacity: 0.8;
          flex: 1;
          text-align: center;

          &.active {
            color: #306BE6;
            opacity: 1;
          }
        }
      }
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
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #666666;
      letter-spacing: 0;
      margin-bottom: 10px;
      padding: 12px 20px 0;
      width: 100%;
      box-sizing: border-box;
    }

    .mainTop {
      width: 100%;
      height: 90%;
      // height 450px;
      overflow: hidden;

      // background: #fff;
      .mainTopUl {
        width: 100%;
        box-sizing: border-box;

        li {
          margin: 0 20px;
          box-sizing: border-box;
          background: #fff;
          height: 57px;
          line-height: 57px;
          display: flex;
          padding: 0 16px;
          font-family: PingFangSC-Medium;
          font-size: 15px;
          color: #333333;

          &.shopList {
            background: #FFFFFF;
            border-radius: 2px;
            display: flex;
            position: relative;

            .shopContent {
              width: 100%;
              position: relative;
              border-bottom: 1px solid #f5f5f5;
              display: flex;
              align-items: center;

              .shopTitle {
                display: flex;
                flex-direction: row;
              }
            }
          }

          .btn-wrap {
            right: 14px;
            bottom: 40%;
            position: absolute;

            .btn-more {
              background-image: url('./../image/btn_more2.png');
              background-repeat: no-repeat;
              background-position: center;
              width: 13px;
              height: 13px;
            }
          }

          &:last-child {
            // margin: 12px 20px 12px;
          }

          /deep/ .van-field__control {
            text-align: right;
          }
        }

        /deep/ .mint-cell-wrapper {
          padding: 2px 16px;
          width: 95%;
        }

        /deep/ .mint-cell:first-child .mint-cell-wrapper {
          background-size: 120% 0;
        }

        /deep/ .mint-cell-allow-right::after {
          border: solid 1px #c8c8cd;
          border-bottom-width: 0;
          border-left-width: 0;
          content: ' ';
          top: 50%;
          right: 20px;
          position: absolute;
          width: 5px;
          height: 5px;
          -webkit-transform: translateY(-50%) rotate(45deg);
          transform: translateY(-50%) rotate(45deg);
        }
      }
    }
  }
}
</style>