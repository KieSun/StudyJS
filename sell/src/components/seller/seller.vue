<template>
    <div class="seller-wrapper">
        <div class="seller-image">
            <h1 class="text">商家实景</h1>
            <div ref="menu">
                <ul class="content">
                    <li v-for="(image, index) in seller.pics" :key="index" class="item">
                        <img class="image" :src="image">
                    </li>
                </ul>
            </div>
    
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: ['seller'],
  created() {
    this.$nextTick(() => {
      this.imageScroll = new BScroll(this.$refs.menu, {
        scrollX: true,
        eventPassthrough: 'vertical'
      })
    })
  }
}

</script>

<style lang='scss'>
.seller-wrapper {
    .seller-image {
        padding: 18px;
        font-size: 0;
        .content {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .text {
                font-size: 14px;
                color: rgb(7, 17, 27);
                line-height: 14px;
            }
            .item {
                display: inline-block;
                margin: 12px 6px 0 0;
            }
            .image {
                display: inline-block;
                width: 120px;
                height: 90px;
            }
        }
    }
}
</style>

