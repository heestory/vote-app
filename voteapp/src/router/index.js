import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import PlayGround from '@/components/PlayGround'
import GoIndex from '@/components/GoIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoIndex',
      component: GoIndex
    },
    {
      path: '/create',
      name: 'Index',
      component: Index
    },

    {
      path:'/playground/:teamname/:people/:flag',
      name:'playground',
      component:PlayGround
    }
  ]
})
