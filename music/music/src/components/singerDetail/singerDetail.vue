<template>
  <transition name="slide">
    <div class="singer-detail-wrapper">
  
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
  }
}
</script>

<style lang="scss">
@import '~common/css/variable';
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.singer-detail-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background: $color-background;
}
</style>

