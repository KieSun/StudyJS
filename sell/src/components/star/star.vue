<template>
    <div class="star">
        <span v-for="item in items" :class="item" class="star-item"></span>
    </div>
</template>

<script>
    const STAR_ON = 'on'
    const STAR_OFF = 'off'
    const STAR_HALF = 'half'

    export default {
      props: ['score'],
      computed: {
        items() {
          let result = []
          let score = Math.floor(this.score * 2) / 2
          let hasHalf = score % 1 !== 0

          for (let i = 0; i < score; i++) {
            result.push(STAR_ON)
          }

          if (hasHalf) {
            result.push(STAR_HALF)
          }

          while (result.length < 5) {
            result.push(STAR_OFF)
          }
          return result
        }
      }
    }
</script>

<style lang="scss" scoped>
  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      margin-right: 22px;
      background-repeat: no-repeat;
      background-size: 20px 20px;
      width: 20px;
      height: 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background-image: url("star48_on@2x.png");
      }
      &.off {
        background-image: url("star48_off@3x.png");
      }
      &.half {
        background-image: url("star48_off@3x.png");
      }
    }
  }

</style>
