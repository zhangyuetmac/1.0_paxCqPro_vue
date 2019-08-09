<template>
  <div class="header" @click="goBack">
    <img src="./image/back.png" />
    <!-- <a>添加门店</a> -->
    <a>{{title}}</a>
  </div>
</template>
<script>
export default {
  props: {
    header: {}
  },
  data() {
    return {
      headerCopy: {},
      Rname: "",
      title: "添加门店"
    };
  },
  created() {
    console.log(this.header);
    console.log(localStorage.getItem("shopTitle"));
    if (this.header != undefined) {
      this.headerCopy = Object.assign({}, this.header);
      localStorage.setItem("shopTitle", JSON.stringify(this.headerCopy));
    } else {
      if (localStorage.getItem("shopTitle")) {
        this.headerCopy = JSON.parse(localStorage.getItem("shopTitle"));
      }
    }
    if (this.headerCopy.title != undefined) {
      console.log("111");
      this.title = this.headerCopy.title;
    }
    if (this.headerCopy.routeName != undefined) {
      this.Rname = this.headerCopy.routeName;
    }
  },
  methods: {
    goBack() {
      this.$store.commit("setTransitionName", "slide-left");
      if (this.Rname) {
        this.$router.push({ name: "ShopManagement" });
      } else {
        this.$router.back();
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.header {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;

  img {
    margin-left: 3%;
  }

  a {
    margin-left: 3%;
    font-size: 24px;
    color: #FFFFFF;
  }
}
</style>


