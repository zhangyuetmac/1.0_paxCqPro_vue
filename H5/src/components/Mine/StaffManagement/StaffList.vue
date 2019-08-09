 <!-- 店长管理 -->
<template>
  <div class="transitionWrapper">
    <div class="headerWrap" ref="head" >
      <StaffHeader   :header='header' ></StaffHeader>
      <div class="searchWrap"  >
        <!-- <van-search placeholder="请输入搜索关键词" v-model="searchSn"  :left-icon="searchIcon" /> -->
        <!-- <img :src="searchIcon" class="icon"> -->
        <van-search  class="searchNum"  placeholder="请输入员工姓名查找" v-model="searchShop" />
        <!-- <input class="search" type="text" placeholder="请输入终端号" v-model="searchSn"> -->
      </div>
      <!-- <div class="searchWrap" v-else>
        <img src="./image/icon_arrowleft2.png">
        <van-search  class="searchNum"  placeholder="请输入订单号/商户号" v-model="searchSn" />

      </div> -->
    </div>
    
    <div class="main" ref="main"> 
      <div class="mainTop" ref="mainTopWrapper">
        <ul class="mainTopUl" v-if="termList=='1'">
          <li class="shopList" v-for="(item,index) in buinourList" :key="index">
            <div class="shopContent">
              <div class="resumeWrap" @click="goDetail(item)">   
                <img src="./../image/img_shop-manager.png"/>
                <div class="info">
                  <span class="name">{{item.name}} <span class="num">(工号{{item.id}})</span></span>
                  <span class="name mt15">{{item.phone}}</span>
                </div>
                <div class="statusWrap" v-if="item.flag=='1'"><div class="status" >店长</div></div>
                
              </div>
              <div class="shopTitle">
               
                
                <div @click="goDelete(item)">删除</div>
                <div @click="goEdit(item)">编辑</div>
                <div @click="resetPwd(item)">重新签到密码</div>
               
              </div> 
              
            </div>
          </li>
          
          
          
          
        </ul>
        <div class="noMain" v-else>
          <div class="imageWrap" v-if="termList=='3'"></div> 
          <div class="info" v-if="termList=='2'">您可以通过点击新增来添加新员工</div>
          <div class="info" v-if="termList=='3'">暂无数据</div>
        </div>
      </div>
    </div>
    <van-popup class="pop" v-model="showDelete">
  
      <div class="info">确定要删除员工{{selDelete.name}}吗？</div>
      <div class="btnWrap">
        <div class="btn btn-cancel" @click="cancelbtn">取消</div>
        <div class="btn btn-comfirm" @click="confirmbtn">确定</div>
      </div>
    </van-popup>
    <van-popup class="pop center" v-model="showReset">
      <img src="./image/icon_success@2x.png" />
      <div class="info1">重置密码为0000</div>
      <div class="info2">请通知该员工尽快修改密码</div>
      <div class="btnWrap">
        <!-- <div class="btn btn-cancel" @click="cancelbtn">取消</div> -->
        <div class="btn btn-comfirm" @click="confirmReset">确定</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import StaffHeader from "./StaffHeader";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      termList: "1", //1.有数据 2.无员工，3查询为空
      showDelete: false,
      showReset: false,
      showHeader: true, //上滑
      header: {
        title: "门店-员工",
        icon: true
      },
      searchShop: "",
      selDelete: {}, //删除对象
      buinourList: [
        {
          id: "01",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "1"
        },
        {
          id: "02",
          shopName: "肯德基五角场分店",
          name: "张一",
          phone: "13121367442",
          flag: "0"
        },
        {
          id: "03",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "0"
        },
        {
          id: "04",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "0"
        },
        {
          id: "05",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "0"
        },
        {
          id: "06",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "0"
        },
        {
          id: "07",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "0"
        },
        {
          id: "08",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "0"
        },
        {
          id: "09",
          shopName: "肯德基五角场分店",
          name: "张三",
          phone: "13121367442",
          flag: "0"
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      if (this.termList == "1") {
        this._initScroll();
      }
    });
  },

  methods: {
    goDelete(item) {
      this.selDelete = item;
      this.showDelete = true;
    },
    goDetail(item) {
      this.$router.push({ name: "StaffDetail", params: { list: item } });
    },
    goEdit(item) {
      // this.$router.push({ path: "/StaffEdit" });
      this.$router.push({ name: "StaffEdit", params: { list: item } });
    },
    resetPwd(item) {
      this.selDelete = item;
      this.showReset = true;
    },

    cancelbtn() {
      console.log("取消");
      this.selDelete = {};
      this.showDelete = false;
    },
    confirmbtn() {
      console.log(this.selDelete);
      console.log("确定");
      // this.showPopup = true;
    },
    confirmReset() {
      console.log(this.selDelete);
      console.log("重置确定");
      this.showReset = false;
    },
    _initScroll() {
      this.mainTopScroll = new BScroll(this.$refs.mainTopWrapper, {
        click: true,
        probeType: 3
      });
      //页面滑动的时候通过代码控制让获取焦点的input框失去焦点
      this.mainTopScroll.on("scroll", pos => {
        // console.log(pos);
        if (pos.y > -50) {
          console.log("下拉距离超过-10");

          // this.mainTopScroll.refresh();
          // this._inputBlur();
        } else if (pos.y < -50) {
          console.log("上拉距离超过10,文本框失去焦点");
          // this._inputBlur();

          // this.mainTopScroll.refresh();
        }
      });
      //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
      /*this.mainTopScroll.on("touchEnd", pos => {
        console.log(pos.y);
        // 下拉动作
        if (pos.y > 50) {
          console.log("下拉刷新成功");
          // this.dropDown = false
        }
        //上拉加载 总高度>下拉的高度+10 触发加载更多
        if (this.scroll.maxScrollY > pos.y + 10) {
          console.log("加载更多");
          //使用refresh 方法 来更新scroll  解决无法滚动的问题
          this.mainTopScroll.refresh();
        }
        console.log(this.scroll.maxScrollY + "总距离----下拉的距离" + pos.y);
      });*/
    },
    chooseTransType(index) {
      console.log(index);
      // this.transTypeData[index].imgSelect = !this.transTypeData[index].imgSelect;
      this.selTransWay = index;
    },
    chooseTransStatus(index) {
      console.log(index);
      this.selTransStatus = index;
    },
    transTypeConfirm() {
      this.header.queryShow = false;
    },
    reset() {
      this.selTransWay = "";
      this.selTransStatus = "";
    }
  },

  components: {
    StaffHeader
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.transitionWrapper{
  width: 100%;
  height: 100%;
  background: #F8F8FA;

  .headerWrap {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &.bg {
      background: #FFFFFF;
    }

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

      .searchNum {
        padding: 0;
        height: 41px;
        line-height: 41px;
        border-radius: 22px;
      }

      /deep/ .van-search__content {
        background: #fff;
        border-radius: 22px;
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

            img {
              max-width: 100%;
            }
          }

          .shopContent {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 8px;

            .shopTitle {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              // margin-bottom: 8px;
              height: 39px;
              // line-height: 39px;
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #999999;
              letter-spacing: 0;
              text-align: center;
              align-items: center;

              div {
                flex: 1;
                height: 21px;
                line-height: 21px;
                border-right: 1px solid #DEDEDE;

                &:last-child {
                  border-right: 1px solid transparent;
                }
              }

              .status {
                color: #306BE6;
                margin-right: 15px;

                &.failure {
                  color: #FD9745;
                }
              }
            }

            .resumeWrap {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #999999;
              letter-spacing: 1px;
              height: 90px;
              padding: 0 0 0 10px;
              align-items: center;
              border-bottom: 1px solid #F0F0F0;

              .info {
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-left: 13px;

                .num {
                  font-size: 13px;
                  color: #999999;
                }

                .name {
                  font-size: 16px;
                  color: #333333;
                }

                .mt15 {
                  margin-top: 15px;
                }
              }

              .statusWrap {
                display: flex;
                height: 100%;
                box-sizing: border-box;
                padding: 8px 0;

                .status {
                  background: rgba(253, 151, 69, 0.1);
                  border-radius: 4px;
                  width: 55px;
                  height: 23px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  color: #FD9745;
                }
              }

              .resume-info {
                display: flex;
                flex-direction: row;
                line-height: 37px;
                height: 37px;

                .info {
                  color: #333;
                  letter-spacing: 0;
                }
              }
            }
          }

          .btn-wrap {
            right: 14px;
            bottom: 40%;
            position: absolute;

            .btn-more {
              // background-image: url('./image/btn_more2.png');
              background-repeat: no-repeat;
              background-position: center;
              width: 13px;
              height: 13px;
            }
          }
        }
      }

      .noMain {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .imageWrap {
          bg-image('./image/img_no-data');
          min-width: 210px;
          min-height: 170px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
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

  .pop {
    box-sizing: border-box;
    width: 279px;
    min-height: 174px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    padding: 20px 27px 20px 27px;

    &.center {
      align-items: center;
    }

    .info {
      margin-bottom: 8px;
      text-align: center;
      margin-top: 40px;
    }

    .info1 {
      font-size: 16px;
      color: #333333;
      margin-top: 12px;
    }

    .info2 {
      font-size: 14px;
      color: #999999;
      margin: 4px 0 16px 0;
    }

    img {
      width: 72px;
      height: 72px;
    }

    .btnWrap {
      display: flex;
      flex: 1;
      justify-items: right;
      justify-content: space-around;
      align-items: flex-end;

      .btn {
        border-radius: 20px;
        width: 105px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 15px;
        border: 1px solid #306BE6;
        box-sizing: border-box;
      }

      .btn-cancel {
        background: #fff;
        color: #306BE6;
      }

      .btn-comfirm {
        background: #306BE6;
        color: #fff;
      }
    }
  }
}
</style>
