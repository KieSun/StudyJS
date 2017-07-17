<template>
  <div class="suggest">
    <div class="slider-wrapper" v-if="recommends.length">
      <slider>
        <div v-for="(item, index) in recommends" :key="index">
          <a href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
  
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data() {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  methods: {
    getData() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss">

</style>

