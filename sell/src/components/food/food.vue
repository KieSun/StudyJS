<template>
  <div class="food" v-show="isShow">
    <div class="head-wrapper">
      <img :src="selectFood.image" class="image">
      <div class="back" @click="hide">
        <i class="icon-add_circle"></i>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="name">{{selectFood.name}}</div>
      <div class="count-wrapper">
        <span class="count">月售{{selectFood.sellCount}}份</span>
        <span class="rating">好评率{{selectFood.rating}}%</span>
      </div>
      <div class="price-wrapper">
        <span class="price">¥{{selectFood.price}}</span>
        <span class="oldPrice" v-show="selectFood.oldPrice">¥{{selectFood.oldPrice}}</span>
      </div>
      <div class="add-wrapper">加入购物车</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectFood'],
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss">
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  .head-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    .image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 20px;
      left: 0;
      .icon-add_circle {
        font-size: 20px;
        padding: 10px;
        color: #fff;
      }
    }
  }
  .content-wrapper {
    position: relative;
    padding: 18px;
    background: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .name {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }
    .count-wrapper {
      margin: 8px 0 18px 0;
      font-size: 0;
      .count {
        display: inline-block;
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
      }
      .rating {
        display: inline-block;
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
        margin-left: 12px;
      }
    }
    .price-wrapper {
      .price {
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        vertical-align: middle;
      }
      .oldPrice {
        margin-left: 8px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        font-weight: 700px;
        text-decoration: line-through;
        vertical-align: middle;
      }
    }
    .add-wrapper {
      position: absolute;
      right: 18px;
      bottom: 18px;
      width: 74px;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      background: rgb(26, 161, 216);
      font-size: 10px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>

