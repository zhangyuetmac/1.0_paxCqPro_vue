<template>
  <div id="app">
    <!-- 　　　　动态绑定路由动画，根据路由状态的不同绑定不同的路由动画分别为 ：‘slide-left' 和 'slide-right'   　　　　 -->
    <transition :name="this.$store.state.transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      console.log(this.$store.state.transitionName);
      // let isBack = this.$store.state.isBack; // 监听路由变化时的状态为前进还是后退
      // if (isBack) {
      //   this.transitionName = "slide-right";
      // } else {
      //   this.transitionName = "slide-left";
      // }
      setTimeout(() => {
        this.$store.commit("setTransitionName", "slide-right");
        console.log(this.$store.state.transitionName);
      }, 500);
    }
  }
};
</script>

<style lang="stylus">
html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}

.transitionWrapper {
  position: absolute;
  width: 100%;
  transition: all 0.8s ease;
  // top: 40px;
  // position: absolute;
  // transition: all 0.3s;
}

.slide-right-enter {
  transform: translate3d(100%, 0, 0);
}

.slide-right-leave-to {
  /* transform: translate3d(-20%, 0, 0); */
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.4s ease;
}

.slide-left-enter {
  /* transform: translate3d(-20%, 0, 0); */
}

.slide-left-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.4s ease;
}

.slide-left-leave-active {
  z-index: 2;
}
</style>
