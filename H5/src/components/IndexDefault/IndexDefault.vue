<template>
  <div class="indexDefaultWrapper">
    <IndexHeader></IndexHeader>
    <div class="main">
      <div class="content">
        <div class="item" @click="ShopManagement">
          <div class="firstImg">
            <img src="./image/icon_shgl.png" />
          </div>
          <div class="title">
            <a>门店管理</a>
            <span>Shop Management</span>
          </div>
          <img class="next" src="./image/icon_arrowright.png" />
        </div>
        <div class="item" @click="goTerminalManagePage">
          <div class="firstImg">
            <img src="./image/icon_zdgl.png" />
          </div>
          <div class="title">
            <a>终端管理</a>
            <span>Terminal Management</span>
          </div>
          <img class="next" src="./image/icon_arrowright.png" />
        </div>
        <div class="item itemNobottom" @click="goQuery">
          <div class="firstImg">
            <img src="./image/icon_jycx.png" />
          </div>
          <div class="title">
            <a>交易查询</a>
            <span>Transcation Inquiry</span>
          </div>
          <img class="next" src="./image/icon_arrowright.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IndexHeader from "./IndexHeader";
export default {
  data() {
    return {
      merchantState: 0
    };
  },
  methods: {
    manager() {
      console.log("1");
      this.$router.push({ path: "./Manager" });
    },
    goTerminalManagePage() {
      this.$router.push({ path: "./TerminalManage" });
    },
    ShopManagement() {
      this.$router.push({ path: "./ShopManagement" });
    },
    goQuery() {
      this.$router.push({ path: "./TransactionQuery" });
    }
  },
  components: {
    IndexHeader
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.indexDefaultWrapper {
  width: 100%;
  height: 92.5%;
  background: #F5F5F9;

  .main {
    width: 100%;
    height: 60%;
    // background yellow
    display: flex;
    justify-content: center;

    .content {
      background: #FFFFFF;
      width: 89.3%;
      height: 77%;
      margin-top: 5%;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .item {
        width: 90%;
        display: flex;
        flex: 1;
        align-items: center;
        border-bottom: solid 1px #F0F0F0;

        .firstImg {
          width: 20%;
          height: 100%;
          mixinDisplay();

          img {
            width: 38px;
            height: 38px;
          }
        }

        .title {
          display: flex;
          flex-direction: column;
          width: 70%;
          height: 100%;
          justify-content: center;

          a {
            font-size: 20px;
            font-weight: 550;
            color: #333333;
          }

          span {
            font-size: 15px;
            margin-top: 5%;
          }
        }

        .next {
          width: 20px;
          height: 20px;
        }
      }

      .itemNobottom {
        border: none;
      }
    }
  }
}
</style>


