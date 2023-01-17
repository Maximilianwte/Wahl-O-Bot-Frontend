import Vue from 'vue'
import Router from 'vue-router'
import front from './views/front.vue'
import imprint from './views/imprint.vue'
import methodik from './views/methodik.vue'
import contribute from './views/contribute.vue'
import privacy from './views/privacy.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      props: true,
      component: front
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: imprint
    },
    {
      path: '/methodik',
      name: 'methodik',
      component: methodik
    },
    {
      path: '/contribute',
      name: 'contribute',
      props: true,
      component: contribute
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: privacy
    }
  ]
})