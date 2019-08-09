<template>
  <div class="header">
    <div class="left">
      <img src="./image/icon_arrowleft2.png" @click="back" />
      <a>{{header.title}}</a>
    </div>
    <div class="right" v-if="header.icon" @click="goAdd">
      <!-- <img src="./image/icon_repair.png"> -->
      <a>新增</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    header: {}
  },
  methods: {
    back() {
      console.log(JSON.stringify(this.header));

      this.$store.commit("setTransitionName", "slide-left");
      // this.$router.back();  this.$router.push({ path: "/StaffList" });
      if (this.header.title == "员工管理") {
        this.$router.push({ path: "/Mine" });
      } else if (this.header.title == "员工详情") {
        this.$router.push({ path: "/StaffList" });
      } else {
        this.$router.push({ path: "/StaffManagement" });
      }
    },
    goAdd() {
      this.$router.push({ path: "/StaffCreate" });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.header {
  width: 100%;
  height: 13%;
  background: #F8F8FA;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    margin-left: 3%;

    a {
      font-size: 24px;
    }
  }

  .right {
    width: 20%;
    height: 50%;
    // background: #EEEFF2;
    display: flex;
    align-items: center;
    margin-right: 3%;
    justify-content: center;
    border-radius: 20px;

    a {
      margin-left: 5px;
      font-size: 15px;
    }
  }
}
</style>



