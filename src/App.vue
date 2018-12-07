<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    console.log(this.$store.state.USER_TOKEN)
  }
}
</script>

<style lang="less">
@import url('assets/less/reset.less');
@import url('assets/less/common.less');
#app {
  height: 100vh;
}
</style>
