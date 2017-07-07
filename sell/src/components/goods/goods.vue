<template>
    <div class="goods">
        <div class="nav-warp" ref="menu">
            <ul class="nav-list">
                <li v-for="(item, index) in goods" :key="index" class="nav-item" :class="{'current':currentIndex===index}" @click="menuClick(index)">
                    <span class="text">
                        <span class="icon" v-show="item.type>0" :class="activeMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="content-warp" ref="food">
            <ul>
                <li class="food-list" v-for="(foods, index) in goods" :key="index">
                    <h1 class="food-head">
                        {{foods.name}}
                    </h1>
                    <ul>
                        <li v-for="(food, index) in foods.foods" :key="index" class="food-item">
                            <div class="icon-wrap">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content-warp">
                                <div class="title">
                                    <h2>
                                        {{food.name}}
                                    </h2>
                                </div>
                                <div class="desc">
                                    <p>
                                        {{food.description}}
                                    </p>
                                </div>
                                <div class="sell">
                                    <span>
                                        月售{{food.sellCount}}份
                                    </span>
                                    <span class="rating">
                                        好评率{{food.rating}}%
                                    </span>
                                </div>
                                <div class="price-wrap">
                                    <span class="price-symbol">
                                        ¥
                                    </span>
                                    <span class="price">
                                        {{food.price}}
                                    </span>
                                    <span v-show="food.oldPrice" class="old-price">
                                        ¥{{food.oldPrice}}
                                    </span>
                                </div>
    
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :minPrice="seller.minPrice"></shopcart>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'

export default {
  props: ['seller'],
  data() {
    return {
      goods: [],
      heightArray: [],
      scroolY: 0
    }
  },
  created() {
    this.$http.get('api/goods').then(response => {
      this.goods = response.body.data
      this.$nextTick(() => {
        this.initScroll()
        this.computerHeight()
      })
    })
    this.activeMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.food, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scroolY = Math.abs(Math.round(pos.y))
      })
    },
    computerHeight() {
      this.heightArray.push(0)
      let height = 0
      let lists = this.$refs.food.getElementsByClassName('food-list')
      for (let i = 0; i < lists.length; i++) {
        height += lists[i].clientHeight
        this.heightArray.push(height)
      }
    },
    menuClick(index) {
      this.scroolY = this.heightArray[index]
      let ele = this.$refs.food.getElementsByClassName('food-list')[index]
      this.foodScroll.scrollToElement(ele, 300)
    }
  },
  computed: {
    currentIndex() {
      for (let index = 0; index < this.heightArray.length; index++) {
        let height = this.heightArray[index]
        let height1 = this.heightArray[index + 1]
        if (!height1 || (this.scroolY >= height && this.scroolY < height1)) {
          return index
        }
      }
    }
  },
  components: {
    shopcart
  }
}

</script>

<style lang='scss'>
$backgroundColor: #f3f5f7;
.goods {
    position: absolute;
    top: 171px;
    bottom: 46px;
    width: 100%;
    display: flex;
    overflow: hidden;
    .nav-warp {
        flex: 0 0 80px;
        background: #f3f5f7;
        width: 80px;
        .nav-list {
            .nav-item {
                display: table;
                width: 56px;
                height: 54px;
                line-height: 14px;
                color: rgb(75, 85, 93);
                padding: 0 12px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                &.current {
                    background: #fff;
                    margin-top: -1px;
                    border: none;
                }
                .icon {
                    display: inline-block;
                    width: 12px;
                    vertical-align: top;
                    height: 12px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    margin-right: 4px;
                }
                .decrease {
                    background-image: url('decrease_3@2x.png');
                }

                .discount {
                    background-image: url('discount_3@2x.png');
                }

                .guarantee {
                    background-image: url('guarantee_3@2x.png');
                }

                .invoice {
                    background-image: url('invoice_3@2x.png');
                }

                .special {
                    background-image: url('special_2@2x.png');
                }
                .text {
                    display: table-cell;
                    font-size: 12px;
                    vertical-align: middle;
                }
            }
        }
    }
    .content-warp {
        flex: 1;
        .food-list {
            .food-head {
                height: 26px;
                background: $backgroundColor;
                font-size: 12px;
                color: rgb(147, 153, 159);
                line-height: 26px;
                padding-left: 14px;
                border-left: 2px #d9dde1 solid;
            }
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;

                .icon-wrap {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content-warp {
                    flex: 1;
                    .title {
                        font-size: 14px;
                        line-height: 14px;
                        color: rgb(7, 17, 27);
                        margin-bottom: 8px;
                    }
                    .desc,
                    .sell {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 10px;
                        margin-bottom: 8px;
                        .rating {
                            margin-left: 12px;
                        }
                    }
                    .price-wrap {
                        font-size: 0;
                        vertical-align: middle;
                        .price-symbol {
                            font-size: 10px;
                            color: rgb(240, 20, 20);
                        }
                        .price {
                            font-size: 14px;
                            font-weight: 700px;
                            color: rgb(240, 20, 20);
                        }
                        .old-price {
                            margin-left: 8px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                            font-weight: 700px;
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
    }
}
</style>

