import { useAuthStore } from '@core/stores/auth'
import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'

function recursiveLayouts(route) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])
    return route
  }
  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 60 }
    return { top: 0 }
  },
  extendRoutes: pages => [
    ...[...pages].map(route => recursiveLayouts(route)),
    // Add explicit admin and business pages
    { path: '/admin/users', component: () => import('@/pages/AdminUsers.vue'), name: 'AdminUsers' },
    { path: '/admin/reports', component: () => import('@/pages/AdminReports.vue'), name: 'AdminReports' },
    { path: '/business/orders', component: () => import('@/pages/BusinessOrders.vue'), name: 'BusinessOrders' },
    { path: '/business/analytics', component: () => import('@/pages/BusinessAnalytics.vue'), name: 'BusinessAnalytics' },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuthenticated
  const role = authStore.role

  // If logged in and trying to access /login, redirect to dashboard
  if (to.path === '/login' && isLoggedIn) {
    if (role === 'admin') return next('/admin')
    if (role === 'business') return next('/business')
  }

  // Strict role isolation for dashboards and new pages
  if (to.path.startsWith('/admin')) {
    if (!isLoggedIn) return next('/login')
    if (role !== 'admin') return next('/business')
  } else if (to.path.startsWith('/business')) {
    if (!isLoggedIn) return next('/login')
    if (role !== 'business') return next('/admin')
  }

  // Prevent access to login for authenticated users
  if (to.path === '/login' && isLoggedIn) {
    return next(role === 'admin' ? '/admin' : '/business')
  }

  // Unknown route handling
  const knownRoutes = ['/login', '/admin', '/business']
  if (!knownRoutes.some(r => to.path.startsWith(r))) {
    if (isLoggedIn) {
      if (role === 'admin') return next('/admin')
      if (role === 'business') return next('/business')
    } else {
      return next('/login')
    }
  }

  next()
})

export { router }
export default function (app) {
  app.use(router)
}
