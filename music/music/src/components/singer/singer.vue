<template>
  <div class="singer-wrapper">
    <scroll :data="singerList" @scroll="scroll" class="singer-scroll-wrapper" ref="scroll">
      <ul ref="scrollList">
        <li v-for="(items, indexs) in singerList" :key="indexs" class="singer-group" ref="singerGroup">
          <h2 class="head">{{items.title}}</h2>
          <ul>
            <li v-for="(item, index) in items.item" :key="index" class="group-item" @click="selectItem(item)">
              <img v-lazy="item.avatar" class="avatar" width="50" height="50">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="right-wrapper">
      <ul>
        <li v-for="(items, index) in singerList" :key="index" @click.stop.prevent="clickMenu(index)">
          <p class="name" :class="{highlight:currentIndex===index}">{{items.title}}</p>
        </li>
      </ul>
    </div>
    <div class="filx-head" v-show="fixHidden">
      <h2 class="title">{{filxTitle}}</h2>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import Scroll from 'base/scroll/scroll'
import Load from 'base/load/load'
import { mapMutations } from 'vuex'
// import * as types from 'store/mutation-types'

export default {
  data() {
    return {
      singerList: [],
      currentIndex: 0,
      heightArray: [],
      scrollY: 0,
      filxTitle: '',
      fixHidden: true
    }
  },
  created() {
    getSingerList().then((res) => {
      if (res.code === ERR_OK) {
        this._initData(res.data.list)
      }
    })
  },
  methods: {
    _initData(list) {
      let map = {
        hot: {
          title: '热',
          item: []
        }
      }
      list.forEach((ele, index) => {
        if (index < 10) {
          map.hot.item.push(new Singer({
            id: ele.Fsinger_mid,
            name: ele.Fother_name
          }))
        } else {
          let key = ele.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              item: [new Singer({
                id: ele.Fsinger_mid,
                name: ele.Fother_name
              })]
            }
          } else {
            map[key].item.push(new Singer({
              id: ele.Fsinger_mid,
              name: ele.Fsinger_name
            }))
          }
        }
      })
      let hot = []
      let res = []
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          if (key === 'hot') {
            hot.push(map[key])
          } else if (key.match(/[a-zA-Z]/)) {
            res.push(map[key])
          }
        }
      }
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      this.singerList = hot.concat(res)
      this.filxTitle = this.singerList[0].title
      this.$nextTick(() => {
        this.getHeight()
      })
    },
    clickMenu(index) {
      this.currentIndex = index
      let ele = this.$refs.singerGroup[index]
      this.$refs.scroll.goToElement(ele, 200)
      let title = this.singerList[index].title
      this.filxTitle = title
    },
    getHeight() {
      let eles = this.$refs.singerGroup
      let height = 0
      this.heightArray.push(height)
      for (var index = 0; index < eles.length; index++) {
        var element = eles[index]
        height += element.clientHeight
        this.heightArray.push(height)
      }
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    selectItem(item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Scroll,
    Load
  },
  watch: {
    scrollY() {
      this.heightArray.forEach((height, index) => {
        if (Math.abs(Math.floor(this.scrollY)) > height && Math.abs(Math.floor(this.scrollY)) < this.heightArray[index + 1]) {
          this.currentIndex = index
          let title = this.singerList[index].title
          this.filxTitle = title
          console.log(height)
          if (this.scrollY >= 0) {
            this.fixHidden = false
          } else {
            this.fixHidden = true
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~common/css/variable.scss';
.singer-wrapper {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .singer-scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .singer-group {
      .head {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        color: $color-text-l;
        font-size: $font-size-small;
        background: $color-highlight-background;
      }
      .group-item {
        height: 70px;
        padding: 20px 0 0 30px;
        font-size: 0;
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
          flex: 0 0 50px;
        }
        .name {
          margin-left: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
          flex: 1;
        }
      }
    }
  }
  .right-wrapper {
    position: fixed;
    top: 50%;
    width: 20px;
    transform: translateY(-45%);
    right: 0;
    background: $color-background-d;
    text-align: center;
    padding: 20px 0;
    border-radius: 10px;
    .name {
      padding: 3px;
      font-size: $font-size-small;
      color: $color-text-l;
      &.highlight {
        color: $color-theme;
      }
    }
  }
  .filx-head {
    position: fixed;
    width: 100%;
    top: 88px;
    z-index: 10;
    height: 30px;
    line-height: 30px;
    .title {
      padding-left: 20px;
      color: $color-text-l;
      font-size: $font-size-small;
      background: $color-highlight-background;
    }
  }
}
</style>

