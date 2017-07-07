<template>
  <div class="shopcart">
    <div class="left-wrapper">
      <div class="logo-wrapper">
        <div class="logo">
          <i class="icon-close"></i>
        </div>
      </div>
    </div>
    <div class="right-wrapper">
      <span class="min-price">¥{{minPrice}}起送</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['minPrice']
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
    .left-wrapper {
      background: #141d27;
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
          .icon-close {
            font-size: 24px;
            line-height: 44px;
            color: #80858a;
          }
        }
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
    }
  }
</style>
