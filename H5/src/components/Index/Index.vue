<template>
  <div class="transitionWrapper">
    <router-view></router-view>
    <!-- <div class="footer">
      <div :key="index" v-for="(item,index) in tabList" class="tab-item"  @click="clickTab(index)" >
        <div class="imgDiv" :style="activeIndex == index?item.styleLight:item.styleDark" ></div>
        <a :class="{'aIsActive':activeIndex == index}">{{item.name}}</a>
      </div>
    </div>-->
    <div class="footer">
      <div class="tab-item" @click="switchTo('/Index')">
        <img
          :src="'/Index' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal"
          alt="首页"
        />
        <a :class="{'aIsActive': '/Index' === $route.path}">首页</a>
      </div>
      <div class="tab-item" @click="switchTo('/AccountBook')">
        <img
          :src="'/AccountBook' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal"
          alt="账本"
        />
        <a :class="{'aIsActive': '/AccountBook' === $route.path}">账本</a>
      </div>
      <div class="tab-item" @click="switchTo('/Mine')">
        <img
          :src="'/Mine' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal"
          alt="我的"
        />
        <a :class="{'aIsActive': '/Mine' === $route.path}">我的</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabList: [
        {
          path: "/Index",
          name: "首页",
          styleLight: {
            backgroundImage:
              "url(" + require("./image/icon_homepage_sel.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          styleDark: {
            backgroundImage:
              "url(" + require("./image/icon_homepage_def.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }
        },
        {
          path: "/AccountBook",
          name: "账本",
          styleLight: {
            backgroundImage:
              "url(" + require("./image/icon_account_sel.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          styleDark: {
            backgroundImage:
              "url(" + require("./image/icon_account_def.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }
        },
        {
          path: "/Mine",
          name: "我的",
          styleLight: {
            backgroundImage:
              "url(" + require("./image/icon_mine_sel.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          styleDark: {
            backgroundImage:
              "url(" + require("./image/icon_mine_def.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }
        }
      ],
      activeIndex: 0,
      tabBarImgArr: [
        //图片切换'./image/icon_mine_sel.png'
        {
          normal: require("./image/icon_homepage_def.png"),
          selected: require("./image/icon_homepage_sel.png")
        },
        {
          normal: require("./image/icon_account_def.png"),
          selected: require("./image/icon_account_sel.png")
        },
        {
          normal: require("./image/icon_mine_def.png"),
          selected: require("./image/icon_mine_sel.png")
        }
      ]
    };
  },
  methods: {
    clickTab(index) {
      this.activeIndex = index;
      this.$router.push({
        path: this.tabList[index].path
      });
      console.log(index);
    },
    switchTo(path) {
      // console.log(this.$router)
      this.$router.push(path);
    }
  }
};
</script>
<style lang="stylus" scoped>
.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F5F5F9;

  .footer {
    width: 100%;
    height: 7.5%;
    display: flex;
    align-items: center;
    
    .tab-item {
      height: 100%;
      background: #FFFFFF;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .imgDiv {
        width: 28px;
        height: 28px;
      }

      a {
        font-size: 14px;
        color: #CCCCCC;
        text-decoration: none;
        display: block;
        margin-top: 2px;
      }

      .aIsActive {
        color: #333333;
        font-weight: bold;
      }
    }
  }
}
</style>


