<template>
  <div id="header">
    <div class="content-wrap">
      <div class="avatar">
        <img width="60" height="60" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="active" v-if="seller.supports">
          <i class="icon" :class="activeMap[seller.supports[0].type]"></i>
          <span class="active-content">{{seller.supports[0].description}}</span>
        </div>
        <div class="active-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-thumb_up count-icon"></i>
        </div>
      </div>
    </div>
    <div class="notice-wrap" @click="showDetail">
      <span class="notice-icon"></span><span class="notice-text">{{seller.bulletin}}</span>
      <i class="icon-thumb_up"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar">
    </div>
    <div class="detail" v-show="isShow">
      <div class="detail-warp clearfix">
        <div class="detail-main">
          <p class="main-name">{{seller.name}}</p>
          <star :score="seller.score"></star>
          <div class="title">
            <div class="line"></div>
            <div class="name">优惠信息</div>
            <div class="line"></div>
          </div>
          <div class="info-wrap" v-if="seller.supports">
            <div class="info-item" v-for="item in seller.supports" >
              <span class="item-icon"></span>
              <span class="item-text">{{item.description}}</span>
            </div>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="name">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="description-wrap">
            <p class="description">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-footer" @click="hideDetail">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </div>
  </div>

</template>

<script>
  import star from '../star/star.vue'

  export default {
    props: ['seller'],
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      showDetail() {
        this.isShow = true
      },
      hideDetail() {
        this.isShow = false
      }
    },
    components: {
      star
    },
    created() {
      this.activeMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../common/style/common.scss';
  @import '../../common/style/icon.css';

  #header {
    color: white;
    position: relative;
    overflow: hidden;
    .content-wrap {
      padding: 24px 12px 18px 24px;
      font-size: 0;
      color: white;
      background-color: rgba(7, 17, 27, 0.5);
      position: relative;
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        line-height: 1;
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          background-image: url('brand@2x.png');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
        }
        .description {
          margin-top: 8px;
          margin-bottom: 10px;
          font-size: 12px;
        }
        .active {
          font-size: 10px;
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
            background-image: url('decrease_1@2x.png');
          }

          .discount {
            background-image: url('discount_1@2x.png');
          }

          .guarantee {
            background-image: url('guarantee_1@2x.png');
          }

          .invoice {
            background-image: url('invoice_1@2x.png');
          }

          .special {
            background-image: url('special_3@2x.png');
          }
        }
        .active-count {
          font-size: 10px;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 14px;
          right: 12px;
          bottom: 14px;
          padding: 0 8px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          .count {
            vertical-align: top;
          }
          .count-icon {
            line-height: 24px;
          }
        }
      }
    }
    .notice-wrap {
      position: relative;
      height: 28px;
      line-height: 28px;
      font-size: 10px;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 22px 0 12px;
      background-color: rgba(7, 17, 27, 0.2);
      .notice-icon {
        display: inline-block;
        width: 22px;
        height: 12px;
        background-image: url('bulletin@2x.png');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        margin-right: 4px;
        margin-top: 8px;
        vertical-align: top;
      }
      .icon-thumb_up {
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
      }
    }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      background-color: rgba(7, 17, 27, 0.8);
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: auto;
      z-index: 100;
      .detail-warp {
        width: 100%;
        min-height: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .main-name {
            font-weight: 700;
            line-height: 16px;
            font-size: 16px;
            text-align: center;
          }
          .star {
            margin: 16px auto 28px;
            text-align: center;
          }
          .title {
            width: 80%;
            display: flex;
            margin: 0 auto 24px;
            .line {
              flex: 1;
              position: relative;
              top: 7px;
              height: 2px;
              background-color: rgba(255, 255, 255, 0.2);
            }
            .name {
              padding: 0 12px;
              font-weight: 700;
              font-size: 16px;
            }
          }
          .info-wrap {
            width: 80%;
            margin: 0 auto 24px;
            font-size: 0;
            .info-item {
              padding: 0 12px;
              margin-bottom: 12px;
              .item-icon {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url("discount_1@2x.png");
                background-size: 12px 12px;
                background-repeat: no-repeat;
                vertical-align: top;
              }
              .item-text {
                margin-left: 6px;
                font-size: 12px;
                line-height: 12px;
              }
            }
          }
          .description-wrap {
            width: 80%;
            font-size: 12px;
            margin: 0 auto 24px;
          }
          .description {
            line-height: 24px;
            padding: 0 12px;
          }
        }
      }
      .detail-footer {
        position: relative;
        width: 32px;
        height: 32px;
        font-size: 32px;
        clear: both;
        margin: -64px auto 0 auto;
      }
    }
  }

</style>
