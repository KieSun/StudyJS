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
    <div class="detail" v-show="isShow"></div>
  </div>

</template>

<script>
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
      }
    },
    created() {
      this.activeMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../common/style/icon.css';

  #header {
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
    }
  }

</style>
