<template>
  <div class="controller">
    <div class="left-wrapper" v-show="food.count>0" @click="reduceAction">
      <span class="icon-shopping_cart"></span>
    </div>
    <div class="number-wrapper" v-show="food.count">{{food.count}}</div>
    <div class="right-wrapper icon-thumb_down" @click="addAction">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: ['food'],
    methods: {
      reduceAction() {
        this.food.count -= 1
      },
      addAction() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count += 1
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../common/style/icon.css';
  .controller {
    font-size: 0;
    .left-wrapper {
      display: inline-block;
      padding: 6px;
      vertical-align: top;
      span {
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
      }
    }
    .number-wrapper {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .right-wrapper {
      vertical-align: top;
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
      padding: 6px;
    }
  }
</style>
