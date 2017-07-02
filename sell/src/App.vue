<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div id="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import header from './components/header/header'

export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('api/sell').then(response => {
      this.seller = response.body.data
      console.log(this.seller)
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style>
  #tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  }
  #tab > .tab-item {
    text-align: center;
    flex: 1;
  }

  #tab > .active {
    color: rgb(240, 20, 20)
  }

</style>

