<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dot-wrapper">
      <span class="dot" v-for="(item, index) in dotArray" :key="index" :class="{active: currentIndex===index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'api/dom'

export default {
  data() {
    return {
      dotArray: [],
      currentIndex: 0
    }
  },
  activated() {
    this.play()
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  mounted() {
    setTimeout(() => {
      this.setSliderWidth()
      this.initScroll()
    }, 20)
    console.log(111)
  },
  methods: {
    setSliderWidth() {
      let slider = this.$refs.sliderGroup
      let children = slider.children
      this.getDotArray(children.length)
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth

      for (let index = 0; index < children.length; index++) {
        let ele = children[index]
        addClass(ele, 'slider-item')
        ele.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      width += sliderWidth * 2
      slider.style.width = width + 'px'
    },
    initScroll() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        snapLoop: true,
        snapSpeed: 400,
        momentum: false,
        snap: true
      })

      this.slider.on('scrollEnd', () => {
        this.currentIndex = this.slider.getCurrentPage().pageX - 1
        clearTimeout(this.timer)
        this.play()
      })

      this.play()
    },
    getDotArray(length) {
      this.dotArray = new Array(length)
    },
    play() {
      let pageIndx = this.currentIndex + 2
      console.log(pageIndx)
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndx, 0, 400)
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
@import '~common/css/variable';

.slider {
  min-height: 1px;
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        text-decoration: none;
        width: 100%;
        overflow: hidden;
        display: block;
      }
      img {
        width: 100%;
        display: block;
      }
    }
  }
  .dot-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12px;
    text-align: center;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
