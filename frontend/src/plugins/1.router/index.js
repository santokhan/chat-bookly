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
  history: createWebHistory(import.meta.env.BASE_URL | '/'),
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
    { path: '/business/connect', component: () => import('@/pages/BusinessConnect.vue'), name: 'BusinessConnect' },
    { path: '/business/chat', component: () => import('@/pages/chat.vue'), name: 'BusinessChat' },
    { path: '/business/appointments/calendar', component: () => import('@/pages/BusinessAppointmentsCalendar.vue'), name: 'BusinessAppointmentsCalendar' },
    { path: '/business/appointments/settings', component: () => import('@/pages/BusinessAppointmentsSettings.vue'), name: 'BusinessAppointmentsSettings' },
    { path: '/business/activity/times', component: () => import('@/pages/BusinessActivityTimes.vue'), name: 'BusinessActivityTimes' },
    { path: '/business/activity/team-members', component: () => import('@/pages/BusinessTeamMembers.vue'), name: 'BusinessTeamMembers' },
    { path: '/business/activity/services', component: () => import('@/pages/BusinessServicesOffered.vue'), name: 'BusinessServicesOffered' },
    { path: '/business/activity/team-availability', component: () => import('@/pages/BusinessTeamAvailability.vue'), name: 'BusinessTeamAvailability' },
    { path: '/business/customers/list', component: () => import('@/pages/BusinessCustomersList.vue'), name: 'BusinessCustomersList' },
    { path: '/business/customers/top', component: () => import('@/pages/BusinessTopCustomers.vue'), name: 'BusinessTopCustomers' },
    { path: '/business/marketing/qr', component: () => import('@/pages/BusinessMarketingQR.vue'), name: 'BusinessMarketingQR' },
    { path: '/business/marketing/sms', component: () => import('@/pages/BusinessMarketingSMS.vue'), name: 'BusinessMarketingSMS' },
    { path: '/business/marketing/reminders', component: () => import('@/pages/BusinessMarketingReminders.vue'), name: 'BusinessMarketingReminders' },
    { path: '/business/plan/monthly', component: () => import('@/pages/BusinessPlanMonthly.vue'), name: 'BusinessPlanMonthly' },
    { path: '/business/plan/invoices', component: () => import('@/pages/BusinessPlanInvoices.vue'), name: 'BusinessPlanInvoices' },
    { path: '/business/support/chat', component: () => import('@/pages/BusinessSupportChat.vue'), name: 'BusinessSupportChat' },
    { path: '/business/support/whatsapp', component: () => import('@/pages/BusinessSupportWhatsapp.vue'), name: 'BusinessSupportWhatsapp' },
    { path: '/business/online-booking', component: () => import('@/pages/BusinessOnlineBooking.vue'), name: 'BusinessOnlineBooking' },
    { path: '/signup', component: () => import('@/pages/auth/Signup.vue'), name: 'signup' },
    { path: '/verification', component: () => import('@/pages/auth/Verification.vue'), name: 'verification' },
    { path: '/password-reset', component: () => import('@/pages/auth/PasswordReset.vue'), name: 'PasswordReset' },
    { path: '/update-password', component: () => import('@/pages/auth/UpdatePassword.vue'), name: 'UpdatePassword' },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuthenticated
  const role = authStore.role

  // If logged in and trying to access /login, redirect to dashboard
  if ((to.path === '/login' || to.path === '/signup' || to.path === '/verification' || to.path === '/password-reset' || to.path === '/update-password') && isLoggedIn) {
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
  const knownRoutes = ['/login', '/signup', '/verification', '/password-reset', '/update-password', '/admin', '/business']
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
