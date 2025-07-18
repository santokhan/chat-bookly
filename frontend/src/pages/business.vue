<script setup>
import { getDashboardData } from '@/services/dashboardService'
import { useAuthStore } from '@core/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import AnalyticsAverageDailySales from '@/views/dashboards/analytics/AnalyticsAverageDailySales.vue'
import AnalyticsEarningReportsWeeklyOverview from '@/views/dashboards/analytics/AnalyticsEarningReportsWeeklyOverview.vue'
import AnalyticsMonthlyCampaignState from '@/views/dashboards/analytics/AnalyticsMonthlyCampaignState.vue'
import AnalyticsProjectTable from '@/views/dashboards/analytics/AnalyticsProjectTable.vue'
import AnalyticsSalesByCountries from '@/views/dashboards/analytics/AnalyticsSalesByCountries.vue'
import AnalyticsSalesOverview from '@/views/dashboards/analytics/AnalyticsSalesOverview.vue'
import AnalyticsSourceVisits from '@/views/dashboards/analytics/AnalyticsSourceVisits.vue'
import AnalyticsSupportTracker from '@/views/dashboards/analytics/AnalyticsSupportTracker.vue'
import AnalyticsTotalEarning from '@/views/dashboards/analytics/AnalyticsTotalEarning.vue'
import AnalyticsWebsiteAnalytics from '@/views/dashboards/analytics/AnalyticsWebsiteAnalytics.vue'
import ApexChartBalance from '@/views/charts/apex-chart/ApexChartBalance.vue'
import ApexChartDataScience from '@/views/charts/apex-chart/ApexChartDataScience.vue'
import SimpleTable from './tables/simple-table.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.isAuthenticated || authStore.role !== 'business') {
    router.replace('/login')
  }
})

const dashboard = getDashboardData('business')
</script>

<template>
  <!-- <VCard class="mb-6" title="Dashboard">
    <VCardText>
      <div>Dashboard of the application</div>
    </VCardText>
  </VCard> -->

  <VRow class="match-height">

    <VCol cols="6">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Statistics</VCardTitle>
          <VCardSubtitle>Last 7 days</VCardSubtitle>
          <br>
          <h2 class="text-h2 me-3">
            $221,267
          </h2>
          <div class="d-flex align-center">
            <span class="me-2">Appointments:</span>
            <h6 class="text-h6 m-0">12</h6>
          </div>

          <div class="d-flex align-center">
            <span class="me-2">Appointments value:</span>
            <h6 class="text-h6 m-0">$221,267</h6>
          </div>
          <template #append>
            <div class="d-flex align-center">
              <VChip
                label
                color="success"
              >
                <VIcon
                  start
                  icon="tabler-arrow-up"
                  size="15"
                />
                <span>22%</span>
              </VChip>
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartBalance />
        </VCardText>
      </VCard>
    </VCol>


    <VCol cols="6">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Upcoming appointments</VCardTitle>
          <VCardSubtitle>Next 7 days</VCardSubtitle>
          <br>
          <h2 class="text-h2 me-3">
            12 booked
          </h2>
          <div class="d-flex align-center">
            <span class="me-2">Confirmed:</span>
            <h6 class="text-h6 m-0">12</h6>
          </div>

          <div class="d-flex align-center">
            <span class="me-2">Cancelled:</span>
            <h6 class="text-h6 m-0">0</h6>
          </div>

          <!-- <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="tabler-calendar"
                placeholder="Select Date"
                :config="$vuetify.display.smAndDown ? { position: 'auto center' } : { position: 'auto right' }"
              />
            </div>
          </template> -->
        </VCardItem>

        <VCardText>
          <ApexChartDataScience />
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="6"
      sm="6"
      lg="6"
    >
      <SimpleTable 
        title="Top services"
        :headers="[
          { text: 'Service', value: 'service' },
          { text: 'This Month', value: 'this_month' },
          { text: 'Last Month', value: 'last_month' }
        ]"
        :items="[
          { service: 'Laundry', this_month: 120, last_month: 95 },
          { service: 'Dry Cleaning', this_month: 85, last_month: 90 },
          { service: 'Ironing', this_month: 60, last_month: 55 }
        ]"
      />
    </VCol>

    <VCol
      cols="6"
      sm="6"
      lg="6"
    >
      <SimpleTable
        title="Top team member"
        :headers="[
          { text: 'Team Member', value: 'member' },
          { text: 'This Month', value: 'this_month' },
          { text: 'Last Month', value: 'last_month' }
        ]"
        :items="[
          { member: 'Alice', this_month: 45, last_month: 30 },
          { member: 'Bob', this_month: 38, last_month: 42 },
          { member: 'Charlie', this_month: 32, last_month: 28 }
        ]"
      />
    </VCol>


    <VCol
      cols="6"
      sm="6"
      lg="6"
    >
      <AnalyticsSalesByCountries />
    </VCol>

    <!-- 👉 Website analytics -->
    <!-- <VCol
      cols="12"
      md="6"
    >
      <AnalyticsWebsiteAnalytics />
    </VCol> -->

    <!-- 👉 Average Daily Sales -->
    <!-- <VCol
      cols="6"
      md="6"
      sm="6"
    >
      <AnalyticsAverageDailySales />
    </VCol> -->

    <!-- 👉 Sales Overview -->
    <!-- <VCol
      cols="12"
      md="3"
      sm="6"
    >
      <AnalyticsSalesOverview />
    </VCol> -->

    <!-- 👉 Earning Reports Weekly Overview -->
    <!-- <VCol
      cols="12"
      md="6"
    >
      <AnalyticsEarningReportsWeeklyOverview />
    </VCol> -->

    <!-- 👉 Support Tracker -->
    <!-- <VCol
      cols="12"
      md="6"
    >
      <AnalyticsSupportTracker />
    </VCol> -->

    <!-- 👉 Sales by Countries -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsSalesByCountries />
    </VCol> -->

    <!-- 👉 Total Earning -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsTotalEarning />
    </VCol> -->

    <!-- 👉 Monthly Campaign State -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsMonthlyCampaignState />
    </VCol> -->

    <!-- 👉 Source Visits -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsSourceVisits />
    </VCol> -->

    <!-- 👉 Project Table -->
    <!-- <VCol
      cols="12"
      lg="8"
    >
      <AnalyticsProjectTable />
    </VCol> -->
  </VRow>
</template>
