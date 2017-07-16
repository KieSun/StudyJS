<template>
    <div class="tab">
        <router-link class="suggest item" to="/suggest" tag="div">
            <span class="tag">推荐</span>
        </router-link>
        <router-link class="singer item" to="/singer" tag="div">
            <span class="tag">歌手</span>
        </router-link>
        <router-link class="rank item" to="/rank" tag="div">
            <span class="tag">排行</span>
        </router-link>
        <router-link class="search item" to="/search" tag="div">
            <span class="tag">搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~common/css/variable.scss';
.tab {
    height: 44px;
    color: $color-text-l;
    display: flex;
    font-size: 0;
    text-align: center;
    .item {
        flex: 1;
        display: inline-block;
        font-size: $font-size-medium;
        line-height: 44px;
        vertical-align: top;
        padding-bottom: 5px;
        &.router-link-active {
            .tag {
                color: $color-theme;
                border-bottom: 2px solid $color-theme;
            }
        }
    }
}
</style>
