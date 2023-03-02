import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { hideFullLoading, showFullLoading } from '@/utils/showLoading'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),

    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})
router.beforeEach((to) => {
  // 是否有token
  showFullLoading()
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  if (to.path === '/main') {
    return firstMenu?.url
  }
})
router.afterEach(() => {
  hideFullLoading()
})
export default router
