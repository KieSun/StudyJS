<template>
  <div class="food" v-show="isShow" ref="food">
    <div>
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
        <div class="add-wrapper" v-show="!selectFood.count" @click="addFood">加入购物车</div>
        <carcontroller :food="selectFood" class="carcontroller" v-show="selectFood.count>0" ref="carcontroller"></carcontroller>
      </div>
      <div class="product-wrapper">
        <h1 class="title">商品介绍</h1>
        <p class="detail">{{selectFood.info}}</p>
      </div>
      <div class="rating-wrapper">
        <h1 class="title">商品评价</h1>
        <div class="nav-wrapper" v-show="selectFood">
          <div class="all-wrapper" @click="allAction">
            <span class="text" :class="{highlight:index==1}">全部</span>
            <span class="count" :class="{highlight:index==1}">{{selectFood.ratings.length}}</span>
          </div>
          <div class="good-wrapper" @click="goodAction">
            <span class="text" :class="{highlight:index==2}">推荐</span>
            <span class="count" :class="{highlight:index==2}">{{goodCount}}</span>
          </div>
          <div class="bad-wrapper" @click="badAction">
            <span class="text" :class="{highlight:index==3}">吐槽</span>
            <span class="count" :class="{highlight:index==3}">{{badCount}}</span>
          </div>
        </div>
        <div class="full-wrapper" @click="filterAction">
          <i class="icon-keyboard_arrow_right" :class="{highlight:isFilter}"></i>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-list-wrapper">
        <ul class="rating-list">
          <li v-for="(rating, index) in ratings" :key="index" class="ratingItem" is="ratingItem" :rating="rating">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import carcontroller from '../cartControll/cartControll'
import BScroll from 'better-scroll'
import ratingItem from '../ratingItem/ratingItem'

export default {
  props: ['selectFood'],
  data() {
    return {
      isShow: false,
      index: 1,
      isFilter: false,
      ratings: []
    }
  },
  methods: {
    show() {
      this.isShow = true
      this.ratings = this.selectFood.ratings
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.isShow = false
    },
    addFood() {
      this.$refs.carcontroller.addAction()
    },
    allAction() {
      this.index = 1
      this.ratings = this.selectFood.ratings
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    badAction() {
      this.index = 3
      let array = []
      this.selectFood.ratings.forEach((rating) => {
        if (rating.rateType === 1) {
          array.push(rating)
        }
      })
      this.ratings = array
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    goodAction() {
      this.index = 2
      let array = []
      this.selectFood.ratings.forEach((rating) => {
        if (rating.rateType === 0) {
          array.push(rating)
        }
      })
      this.ratings = array
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    filterAction() {
      this.isFilter = !this.isFilter
      let array = []
      if (this.isFilter) {
        this.selectFood.ratings.forEach((rating) => {
          if (rating.text) {
            array.push(rating)
          }
        })
        this.ratings = array
      } else {
        this.ratings = this.selectFood.ratings
      }
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  components: {
    carcontroller,
    ratingItem
  },
  computed: {
    goodCount() {
      let count = 0
      if (!this.selectFood.ratings) {
        return
      }
      this.selectFood.ratings.forEach((rating) => {
        if (rating.rateType === 0) {
          count += 1
        }
      })
      return count
    },
    badCount() {
      let count = 0
      if (!this.selectFood.ratings) {
        return
      }
      this.selectFood.ratings.forEach((rating) => {
        if (rating.rateType === 1) {
          count += 1
        }
      })
      return count
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
  background: #f3f5f7;
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
    .carcontroller {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
  }
  .product-wrapper {
    margin: 16px 0;
    padding: 18px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #fff;
    .title {
      line-height: 14px;
      font-size: 14px;
    }
    .detail {
      padding: 6px 8px 0 8px;
      font-size: 12px;
      line-height: 24px;
      color: rgb(77, 85, 93);
    }
  }
  .rating-wrapper {
    background: #fff;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding: 18px;
    .title {
      line-height: 14px;
      font-size: 14px;
    }
    .nav-wrapper {
      font-size: 0;
      margin-top: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .count {
        font-size: 8px;
        color: rgb(77, 85, 93);
        margin-left: 4px;
      }
      .text {
        font-size: 12px;
        color: rgb(77, 85, 93);
        line-height: 14px;
      }
      .all-wrapper {
        height: 30px;
        width: 60px;
        display: inline-block;
        background: rgb(0, 160, 220);
        box-sizing: border-box;
        padding: 8px 12px;
        text-align: center;
        vertical-align: top;
      }
      .good-wrapper {
        height: 30px;
        width: 60px;
        display: inline-block;
        margin-left: 8px;
        background: rgba(0, 160, 220, 0.2);
        box-sizing: border-box;
        padding: 8px 12px;
        vertical-align: top;
      }
      .bad-wrapper {
        height: 30px;
        width: 60px;
        display: inline-block;
        margin-left: 8px;
        background: rgba(77, 85, 93, 0.2);
        box-sizing: border-box;
        padding: 8px 12px;
        vertical-align: top;
      }
      .highlight {
        color: #fff;
      }
    }
    .full-wrapper {
      color: rgb(147, 153, 159);
      height: 50px;
      font-size: 0;
      .icon-keyboard_arrow_right {
        font-size: 24px;
        line-height: 50px;
        vertical-align: middle;
        &.highlight {
          color: rgb(0, 160, 220);
        }
      }
      .text {
        margin-left: 4px;
        font-size: 12px;
        line-height: 50px;
        vertical-align: middle;
      }
    }
  }
  .rating-list-wrapper {
    padding: 0 18px;
    border-top: 2px solid rgba(7, 17, 27, 0.1);
    background: #fff;
    .rating-list {
      .ratingItem {
        height: 65px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        padding-top: 16px;
      }
    }
  }
}
</style>
