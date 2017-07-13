<template>
    <div class="rating-wrapper">
        <div class="rating-content">
            <div class="rating-head">
                <div class="rating-left">
                    <p class="score">{{seller.score}}</p>
                    <p class="desc">综合评分</p>
                    <p class="level">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="rating-right">
                    <div class="wrapper">
                        <span class="desc">服务态度</span>
                        <span class="score">{{seller.score}}</span>
                    </div>
                    <div class="wrapper">
                        <span class="desc">食物品质</span>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="wrapper">
                        <span class="desc">送达时间</span>
                        <span class="score">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <div class="rating-list">
                <ul>
                    <li v-for="(rating, index) in ratings" :key="index" class="rating-item">
                        <div class="head">
                            <img class="avatar" :src="rating.avatar">
                            <span class="name">{{rating.username}}</span>
                            <span class="date">{{date(rating)}}</span>
                        </div>
                        <div class="content">
                            {{rating.text}}
                        </div>
                        <div class="tag-wrapper">
                            <i :class="{'icon-arrow_lift':rating.rateType===0, 'icon-check_circle':rating.rateType===1}"></i>
                            <span v-for="(tag, index) in rating.recommend" :key="index" class="tag">{{tag}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star'

export default {
  props: ['seller'],
  components: {
    star
  },
  data() {
    return {
      ratings: {}
    }
  },
  created() {
    this.$http.get('api/ratings').then(response => {
      this.ratings = response.body.data
      this.$nextTick(() => {

      })
    })
  },
  methods: {
    date(rating) {
      let date = new Date(rating.rateTime)
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

<style lang='scss'>
.rating-wrapper {
    background: rgb(243, 245, 247);
    .rating-head {
        display: flex;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        background: #fff;
        .rating-left {
            flex: 0 0 135px;
            width: 135px;
            margin: 18px 0;
            padding: 6px 0;
            text-align: center;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            .score {
                font-size: 24px;
                line-height: 28px;
                color: rgb(255, 153, 0);
            }
            .desc {
                font-size: 12px;
                color: rgb(7, 17, 27);
                line-height: 12px;
                margin: 6px 0 8px 0;
            }
            .level {
                font-size: 10px;
                line-height: 10px;
                color: rgb(7, 17, 27);
            }
        }
        .rating-right {
            flex: 1;
            margin: 18px 0;
            padding: 6px 24px;
            font-size: 0;
            .wrapper {
                margin-bottom: 8px;
                &:last-child {
                    margin-bottom: 0;
                }
                .desc {
                    display: inline-block;
                    vertical-align: top;
                    font-size: 12px;
                    line-height: 18px;
                    color: rgb(7, 17, 27);
                }
                .score {
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 12px;
                    font-size: 12px;
                    line-height: 18px;
                    color: rgb(255, 153, 0);
                }
            }
        }
    }
    .rating-list {
        margin-top: 15px;
        padding: 18px;
        background: #fff;
        .rating-item {
            margin-bottom: 18px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
        .head {
            font-size: 0;
            .avatar {
                display: inline-block;
                width: 28px;
                height: 28px;
                border-radius: 50%;
            }
            .name {
                vertical-align: top;
                font-size: 10px;
                color: rgb(7, 17, 27);
                line-height: 12px;
                margin-left: 12px;
            }
            .date {
                float: right;
                font-size: 10px;
                line-height: 12px;
                color: rgb(147, 153, 159);
            }
        }
        .content {
            margin-top: 6px;
            margin-left: 40px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
        }
        .tag-wrapper {
            margin-top: 8px;
            margin-left: 40px;
            .icon-arrow_lift {
                font-size: 12px;
                color: rgb(0, 160, 220);
                line-height: 16px;
            }
            .icon-check_circle {
                font-size: 12px;
                color: rgb(183, 187, 191);
                line-height: 16px;
            }
            .tag {
                font-size: 9px;
                color: rgb(147, 153, 159);
                line-height: 16px;
                margin-left: 8px;
                margin-bottom: 4px;
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px;
                padding: 0 6px;
            }
        }
    }
}
</style>

