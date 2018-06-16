import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/about'
import Home from '@/components/Home'
import Contact from '@/components/contact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'olcHome',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})
