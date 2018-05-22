import Vue from 'vue'
import Router from 'vue-router'
import olcMap from '@/components/olc_map'
import olcOverview from '@/components/olc_overview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/demo',
      name: 'olcMap',
      component: olcMap
    },
    {
      path: '/overview',
      name: 'overview',
      component: olcOverview
    }
  ]
})
