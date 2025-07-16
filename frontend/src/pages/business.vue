<script setup>
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
  <VCard class="mb-6" title="Dashboard">
    <VCardText>
      <div>Dashboard of the application</div>
    </VCardText>
  </VCard>
</template>
