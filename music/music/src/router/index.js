import Vue from 'vue'
import Router from 'vue-router'
import rank from '../components/rank/rank.vue'
import search from '../components/search/search.vue'
import singer from '../components/singer/singer.vue'
import suggest from '../components/suggest/suggest.vue'
import singerDetail from '../components/singerDetail/singerDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/suggest'
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerDetail,
          name: 'singerDetail'
        }
      ]
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: suggest
    }
  ]
})
