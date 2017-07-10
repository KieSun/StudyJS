<template>
  <div>
    <div class="shopcart" @click="toggleAction">
      <div class="left-wrapper">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totolPrice>minPrice}">
            <i class="icon-close" :class="{'highlight': totolPrice>minPrice}"></i>
          </div>
          <div class="count" v-show="totolCount>0">{{totolCount}}</div>
        </div>
        <div class="price-wrapper">
          <span class="price">¥{{totolPrice}}</span>
        </div>
        <div class="desc-wrapper">
          <span class="price">另需配送费¥{{deliveryPrice}}元</span>
        </div>
      </div>
      <div class="right-wrapper" :class="{'pay':totolPrice>minPrice}">
        <span class="min-price">{{goPrice}}</span>
      </div>

    </div>
    <div class="list-wrapper" v-show="fold&&totolPrice">
      <div class="head-wrapper">
        <span class="left">购物车</span>
        <span class="empty" @click="emptyAction">清空</span>
      </div>
      <div class="food-list"  ref="list">
        <ul >
        <li class="food" v-for="(food, index) in selectedFood" :key="index">
          <span class="name">{{food.name}}</span>
          <span class="price">¥{{food.price*food.count}}</span>
          <cartcontroll :food="food" class="cartcontroll"></cartcontroll>
        </li>
      </ul>
      </div>
      
    </div>
    <div class="background" v-show="fold&&totolPrice" @click="hideAction"></div>
  </div>

</template>

<script>
  import cartcontroll from '../cartControll/cartControll.vue'
  import BScroll from 'better-scroll'
  export default {
    props: ['minPrice', 'deliveryPrice', 'selectedFood'],
    components: {
      cartcontroll
    },
    data() {
      return {
        fold: false
      }
    },
    watch: {
      selectedFood() {
        console.log(this.selectedFood.length)
        if (this.scroll && this.selectedFood.length) {
          console.log(111)
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        }
      }
    },
    methods: {
      toggleAction() {
        if (!this.totolPrice) {
          return
        }
        this.fold = !this.fold
        if (this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.list, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      },
      hideAction() {
        this.fold = false
      },
      emptyAction() {
        this.selectedFood.forEach((food) => {
          food.count = 0
        })
      }
    },
    computed: {
      totolPrice() {
        let price = 0
        this.selectedFood.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },
      goPrice() {
        let string = ''
        if (this.totolPrice === 0) {
          string = `¥${this.minPrice}起送`
        } else if (this.totolPrice < this.minPrice) {
          string = `还差¥${this.minPrice - this.totolPrice}起送`
        } else {
          string = '结算'
        }
        return string
      },
      totolCount() {
        let count = 0
        this.selectedFood.forEach((food) => {
          count += food.count
        })
        return count
      }
    }
  }

</script>

<style lang="scss">
  @import '../../common/style/icon.css';
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    display: flex;
    z-index: 50;
    .left-wrapper {
      background: #141d27;
      font-size: 0;
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        padding: 6px;
        margin: 0 12px;
        height: 58px;
        width: 58px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          background: #2b343c;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          &.highlight {
            background: rgb(0, 160, 220);
          }
          .icon-close {
            font-size: 24px;
            line-height: 44px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .count {
          position: absolute;
          right: 0;
          top: 0;
          width: 24px;
          height: 16px;
          background: red;
          color: #fff;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 700;
          line-height: 16px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          text-align: center;
        }
      }
      .price-wrapper {
        display: inline-block;
        font-size: 16px;
        margin-top: 12px;
        font-weight: 700;
        line-height: 24px;
        color: #fff;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        vertical-align: top;
      }
      .desc-wrapper {
        display: inline-block;
        margin-left: 12px;
        font-size: 12px;
        line-height: 48px;
        font-weight: 700;
        color: #fff;
        vertical-align: top;
      }
    }
    .right-wrapper {
      flex: 0 0 105px;
      height: 100%;
      text-align: center;
      background: #2b333b;
      .min-price {
        line-height: 48px;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
      }
      &.pay {
        background: rgb(0, 160, 220);
        color: #fff;
      }
    }
  }

  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    background: #f3f5f7;
    .head-wrapper {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      .left {
        font-size: 14px;
        color: rgb(7, 17, 27);
        float: left;
      }
      .empty {
        font-size: 12px;
        color: rgb(0, 160, 220);
        float: right;
      }
    }
    .food-list {
      max-height: 210px;
      background: #fff;
      overflow: hidden;
      .food {
        border-bottom: 1px solid rgba(0, 17, 27, 0.1);
        position: relative;
        height: 48px;
        .name {
          font-size: 14px;
          line-height: 48px;
          margin-left: 18px;
        }
        .price {
          font-size: 14px;
          position: absolute;
          font-weight: 700;
          line-height: 24px;
          top: 12px;
          right: 115px;
          color: rgb(240, 20, 20);
        }
        .cartcontroll {
          position: absolute;
          right: 18px;
          top: 6px;
        }
      }
    }
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(7, 17, 27, 0.6);
    filter: blur(10px);
    width: 100%;
    height: 100%;
    opacity: 1;
  }

</style>
