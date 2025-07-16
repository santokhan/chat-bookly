<script setup>
import AdminLayout from '@/layouts/components/AdminLayout.vue'
import { getDashboardData } from '@/services/dashboardService'
import { useAuthStore } from '@core/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.isAuthenticated || authStore.role !== 'admin') {
    router.replace('/login')
  }
})

const dashboard = getDashboardData('admin')
</script>

<template>
  <AdminLayout>
    <VCard class="mb-6" :title="dashboard.title">
      <VCardText>
        <div v-for="stat in dashboard.stats" :key="stat.label">
          <strong>{{ stat.label }}:</strong> {{ stat.value }}
        </div>
      </VCardText>
    </VCard>
  </AdminLayout>
</template>
