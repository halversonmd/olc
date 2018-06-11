import Vue from 'vue'
import Router from 'vue-router'
import olcMap from '@/components/olc_map'
import olcOverview from '@/components/olc_overview'
import plotPoi from '@/components/plot_poi'
import draw from '@/components/draw'

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
    },
    {
      path: '/convert',
      name: 'plot_poi',
      component: plotPoi
    },
    {
      path: '/draw',
      name: 'draw',
      component: draw
    }
  ]
})
