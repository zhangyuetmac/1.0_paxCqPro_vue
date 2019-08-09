<template>
  <div class="transitionWrapper">
    <div class="headerWrap">
      <TerminalHeader :header='header'></TerminalHeader>
      <div class="searchWrap">
        <!-- <van-search placeholder="请输入搜索关键词" v-model="searchSn"  :left-icon="searchIcon" /> -->
        <img :src="searchIcon" class="icon">
        <input class="search" type="text" placeholder="请输入终端号" v-model="searchSn">
      </div>
    </div>
    
    <div class="main"> 
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl" v-if="termList">
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <div class="status bx">已报修</div>
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <div class="status bxz">保修中</div>
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
          <li class="shopList" @click="jumpDetail">
            
            <div class="shopImage">
              <img   src="./image/icon_terminal.png"/> 
            </div>
            
            <div class="shopContent">
              <div class="shopTitle">
                <div class="name">门店名称1111</div>
                <!-- <div class="status  failure"></div> -->
              </div>
              <div class="address">
                <div class="add">所属门店 肯德基-大宁店</div> 
    
              </div> 
            </div>
            <div class="btn-wrap">
              <div class="btn-more"></div>
            </div>
          </li>
        </ul>
        <div class="noMain" v-else>
          <div class="imageWrap"></div> 
          <div class="info">暂无终端</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TerminalHeader from "./TerminalHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      termList: true,
      header: {
        title: "终端管理",
        icon: false
      },
      searchSn: "",
      searchIcon: require("./image/icon_search@2x.png")
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
      this.$router.push({ path: "/TerminalDetail" });
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
    TerminalHeader
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;

  .headerWrap {
    width: 100%;
    height: 20%;

    .header {
      height: 50%;
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
    height: 80%;

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

            .btn-more {
              background-image: url('./image/btn_more2.png');
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
          bg-image('./image/pic_zwzd');
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



