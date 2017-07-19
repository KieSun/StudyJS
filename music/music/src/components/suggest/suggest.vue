<template>
  <div class="suggest-wrapper">
    <scroll :data="singList" ref="scroll" class="scroll-wrapper">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <div class="sing-list-warpper">
          <h1 class="head">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in singList" :key="index" class="sing-item">
              <div class="img-wrapper">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="content-wrapper">
                <h2 class="title">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
        <load v-show="!singList.length" class="loading"></load>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import { getRecommend, getSingList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Load from 'base/load/load'

export default {
  data() {
    return {
      recommends: [],
      singList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Load
  },
  methods: {
    getData() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
      getSingList().then((res) => {
        if (res.code === ERR_OK) {
          this.singList = res.data.list
        }
      })
    },
    loadImage() {
      if (!this.checkLoadImage) {
        this.checkLoadImage = true
        this.$refs.scroll.refresh()
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss">
@import '~common/css/variable.scss';
.suggest-wrapper {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .sing-list-warpper {
      .head {
        height: 65px;
        line-height: 65px;
        color: $color-theme;
        font-size: $font-size-medium;
        text-align: center;
      }
      .sing-item {
        height: 90px;
        padding: 0 20px;
        display: flex;
        .img-wrapper {
          padding-right: 20px;
          flex: 0 0 80px;
          width: 80px;
          box-sizing: border-box;
        }
        .content-wrapper {
          flex: 1;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          .title {
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 20px;
          }
          .desc {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.3);
            line-height: 20px;
          }
        }
      }
    }
    .loading {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
  }
}
</style>

