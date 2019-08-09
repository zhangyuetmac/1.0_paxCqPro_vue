<template>
  <div class="transitionWrapper">
    <div class="headerWrap">
      <StaffHeader :header='header'></StaffHeader>
      <!-- <div class="searchWrap">
         
        <img :src="searchIcon" class="icon">
        <input class="search" type="text" placeholder="请输入终端号" v-model="searchSn">
      </div> -->
    </div>
    
    <div class="main"> 
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl" v-if="termList">
          
          <li class="shopList" v-for="(item,index) in staffList" @click="jumpDetail(item)" :key="index">
            
            <div class="shopImage">
              <!-- <div class="status bxz">保修中</div> -->
              <img   src="./image/img_door-header.png"/> 
            </div>       
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">{{item.name}}</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">店长 : {{item.buinour}}</div> 
                <div class="add">员工 : {{item.staff}}</div> 
                <div class="add">总数 : {{item.total}}</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
           
        </ul>
        <div class="noMain" v-else>
          <!-- <div class="imageWrap"></div>  -->
          <div class="info">暂无终端</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StaffHeader from "./StaffHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      termList: true,
      header: {
        title: "员工管理",
        icon: false
      },
      searchSn: "",
      staffList: [
        { name: "门店名称1", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称2", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称3", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称4", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称5", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称6", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称7", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称8", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称9", buinour: 1, staff: 100, total: 101 },
        { name: "门店名称10", buinour: 1, staff: 100, total: 101 }
      ]
      // searchIcon: require("./image/icon_search@2x.png")
    };
  },
  created() {
    this.$nextTick(() => {
      if (this.termList) {
        this._initScroll();
      }
    });
  },
  methods: {
    jumpDetail() {
      this.$router.push({ path: "/StaffList" });
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
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
    }
  },
  components: {
    StaffHeader
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;

  .headerWrap {
    width: 100%;
    height: 10%;

    .header {
      height: 100%;
    }

    .searchWrap {
      width: 90%;
      margin: 0 auto;
      position: relative;

      .icon {
        position: absolute;
        width: 25px;
        height: 25px;
        top: 8px;
        left: 18px;
      }

      .search {
        box-sizing: border-box;
        width: 100%;
        height: 41px;
        line-height: 41px;
        background: #FFFFFF;
        border-radius: 22px;
        // margin-left: 60px;
        padding-left: 60px;
      }
    }
  }

  .main {
    width: 100%;
    height: 90%;

    // margin: 20px 0 0;
    // box-sizing: border-box;
    .mainTop {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      // background: #FFFFFF;
      overflow: hidden;

      .mainTopUl {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .shopList {
          background: #FFFFFF;
          border-radius: 2px;
          width: 100%;
          // margin: 12px 20px 0;
          margin: 6px 0;
          display: flex;
          position: relative;

          .shopImage {
            background: #F7F8F9;
            border-radius: 4px;
            width: 70px;
            height: 70px;
            margin: 14px 11px 14px 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .status {
              position: absolute;
              top: -5px;
              right: -12px;
              font-family: PingFangSC-Medium;
              font-size: 10px;
              color: #FFFFFF;
              text-align: center;
              width: 40px;
              height: 19px;
              line-height: 19px;
              border-radius: 19px;
            }

            .bx {
              background: #F76E6E;
            }

            .bxz {
              background: #FD9745;
            }

            img {
              max-width: 100%;
            }
          }

          .shopContent {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: space-around;
            flex: 1 1 auto;
            margin: 13px 0 14px 0;

            .shopTitle {
              display: flex;
              flex-direction: row;
              margin-bottom: 8px;

              .name {
                font-family: PingFangSC-Medium;
                font-weight: 600;
                font-size: 15px;
                margin-top: 3px;
                color: #333333;
                flex: 1 1 auto;
                margin-top: 12px;
              }
            }

            .address {
              display: flex;
              flex-direction: row;
              margin-bottom: 5px;
              width: 90%;

              .add {
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #666666;
                flex: 1;
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
        }
      }

      .noMain {
        margin-top: 20%;

        .imageWrap {
          // bg-image('./image/pic_zwzd');
          min-width: 210px;
          min-height: 170px;
          background-repeat: no-repeat;
          background-position: center;
          margin: 0 auto;
        }

        .info {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #999999;
          letter-spacing: 0.89px;
          text-align: center;
        }
      }
    }
  }
}
</style>



