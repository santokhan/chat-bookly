import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard-alt',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'connect',
          name: 'connect',
          component: () => import('../views/ConnectView.vue'),
        },
        {
          path: 'whatsapp-analytics',
          name: 'whatsapp-analytics',
          component: () => import('../views/WhatsappAnalyticsView.vue'),
        },
        // {
        //   path: 'chat',
        //   name: 'chat',
        //   component: () => import('../views/ChatView.vue'),
        // },
        // {
        //   path: 'appointments',
        //   name: 'appointments',
        //   component: () => import('../views/AppointmentsView.vue'),
        // },
        // {
        //   path: 'clients',
        //   name: 'clients',
        //   component: () => import('../views/ClientsView.vue'),
        // },
        // {
        //   path: 'marketing',
        //   name: 'marketing',
        //   component: () => import('../views/MarketingView.vue'),
        // },
        {
          path: 'business/settings/hours',
          name: 'business-settings-hours',
          component: () => import('../views/business/settings/OpeningHoursView.vue'),
        },
        {
          path: 'business/settings/team',
          name: 'business-settings-team',
          component: () => import('../views/business/settings/TeamMembersView.vue'),
        },
        {
          path: 'business/settings/shifts',
          name: 'business-settings-shifts',
          component: () => import('../views/business/settings/ScheduledShiftsView.vue'),
        },
        {
          path: 'business/settings/services',
          name: 'business-settings-services',
          component: () => import('../views/business/settings/ServicesView.vue'),
        },
        // {
        //   path: 'marketing/team',
        //   name: 'marketing-team',
        //   component: () => import('../views/marketing/TeamMembersView.vue'),
        // },
        // {
        //   path: 'marketing/services',
        //   name: 'marketing-services',
        //   component: () => import('../views/marketing/ServicesView.vue'),
        // },
        // {
        //   path: 'marketing/shifts',
        //   name: 'marketing-shifts',
        //   component: () => import('../views/marketing/ScheduledShiftsView.vue'),
        // },
        // {
        //   path: 'business-settings',
        //   name: 'business-settings',
        //   component: () => import('../views/BusinessSettingsView.vue'),
        // },
        // {
        //   path: 'business-settings/general',
        //   name: 'business-general',
        //   component: () => import('../views/business-settings/GeneralSettingsView.vue'),
        // },
        // {
        //   path: 'business-settings/team',
        //   name: 'business-team',
        //   component: () => import('../views/business-settings/TeamManagementView.vue'),
        // },
        // {
        //   path: 'business-settings/permissions',
        //   name: 'business-permissions',
        //   component: () => import('../views/business-settings/PermissionsView.vue'),
        // },
        // {
        //   path: 'business-settings/integrations',
        //   name: 'business-integrations',
        //   component: () => import('../views/business-settings/IntegrationsView.vue'),
        // },
        // {
        //   path: 'plan',
        //   name: 'plan',
        //   component: () => import('../views/PlanView.vue'),
        // },
        // {
        //   path: 'plan/current',
        //   name: 'plan-current',
        //   component: () => import('../views/plan/CurrentPlanView.vue'),
        // },
        {
          path: 'plan/upgrade',
          name: 'plan-upgrade',
          component: () => import('../views/plan/UpgradePlanView.vue'),
        },
        {
          path: 'plan/billing',
          name: 'plan-billing',
          component: () => import('../views/plan/BillingHistoryView.vue'),
        },
        // {
        //   path: 'plan/usage',
        //   name: 'plan-usage',
        //   component: () => import('../views/plan/UsageStatsView.vue'),
        // },
        // {
        //   path: 'support',
        //   name: 'support',
        //   component: () => import('../views/SupportView.vue'),
        // },
        // {
        //   path: 'marketplace-settings',
        //   name: 'marketplace-settings',
        //   component: () => import('../views/MarketplaceSettingsView.vue'),
        // },
        // {
        //   path: 'about',
        //   name: 'about',
        //   component: () => import('../views/AboutView.vue'),
        // },
      ],
    },
    // Catch-all route for 404 pages
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
