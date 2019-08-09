<template>
  <div class="header">
    <div class="left">
      <img src="./image/icon_arrowleft2.png">
      <a>{{header.title}}</a>
    </div>
    <div class="right" v-if="header.icon">
      <img src="./image/icon_repair.png">
      <a>报修</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    header: {}
  },
  methods: {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

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
    width: 25%;
    height: 50%;
    background: #EEEFF2;
    display: flex;
    align-items: center;
    margin-right: 3%;
    justify-content: center;
    border-radius: 20px;

    img {
      width: 25px;
    }
  }
}
</style>



