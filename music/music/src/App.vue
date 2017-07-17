<template>
  <div id="app">
    <mhead></mhead>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Mhead from './components/m-head/m-head'
import Tab from './components/tab/tab'

export default {
  name: 'app',
  components: {
    Mhead,
    Tab
  }
}
</script>

<style lang="scss">
@import './common/css/variable.scss';
#app {
  background: $color-background;
}
</style>
