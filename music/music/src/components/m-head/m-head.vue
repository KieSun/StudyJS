<template>
  <div class="m-head">
      <i class="icon"></i>
      <span class="title">Chicken Music</span>
      <router-link class="icon-mine" to="mine" tag="div"></router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
    @import '~common/css/mixin.scss';
    @import '~common/css/variable.scss';

    .m-head {
        height: 44px;
        font-size: 0;
        text-align: center;
        color: $color-theme;
        .icon {
            display: inline-block;
            vertical-align: top;
            width: 32px;
            height: 30px;
            background-size: 32px 30px;
            @include bg-image('logo');
            margin-top: 6px;
            margin-right: 9px;
        }
        .title {
            font-size: $font-size-large;
            line-height: 44px;
            vertical-align: top;
        }
        .icon-mine {
            float: right;
            font-size: 20px;
            padding: 12px;
        }
    }
</style>

