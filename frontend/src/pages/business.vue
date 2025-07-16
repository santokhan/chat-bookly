<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
import { getDashboardData } from '@/services/dashboardService'
import { useAuthStore } from '@core/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
  <BusinessLayout>
    <VCard class="mb-6" :title="dashboard.title">
      <VCardText>
        <div v-for="stat in dashboard.stats" :key="stat.label">
          <strong>{{ stat.label }}:</strong> {{ stat.value }}
        </div>
      </VCardText>
    </VCard>
  </BusinessLayout>
</template>
