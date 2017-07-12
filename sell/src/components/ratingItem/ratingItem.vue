<template>
  <div class="item">
    <div class="rating-head-wrapper">
      <span class="date">{{date}}</span>
      <span class="name">{{rating.username}}</span>
      <img class="avatar" :src="rating.avatar">
    </div>
    <div class="rating-content-wrapper">
      <i :class="{'icon-arrow_lift':rating.rateType===0, 'icon-check_circle':rating.rateType===1}"></i>
      <span class="text">{{rating.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rating'],
  computed: {
    date() {
      let date = new Date(this.rating.rateTime)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style lang="scss">
.item {
  .rating-head-wrapper {
    position: relative;
    font-size: 0;
    color: rgb(147, 153, 159);
    .date {
      font-size: 10px;
      line-height: 12px;
    }
    .name {
      position: absolute;
      right: 18px;
      top: 0;
      font-size: 10px;
      line-height: 12px;
    }
    .avatar {
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
      height: 12px;
      width: 12px;
      border-radius: 50%;
    }
  }
  .rating-content-wrapper {
    margin-top: 6px;
    font-size: 0;
    .icon-arrow_lift,
    .icon-check_circle {
      font-size: 12px;
      line-height: 24px;
    }
    .icon-arrow_lift {
      color: rgb(0, 160, 220);
    }
    .icon-check_circle {
      color: rgb(147, 153, 159);
    }
    .text {
      margin-left: 4px;
      font-size: 12px;
      color: rgb(7, 17, 27);
      line-height: 16px;
    }
  }
}
</style>

