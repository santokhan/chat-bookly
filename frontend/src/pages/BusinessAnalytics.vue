<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
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
</script>

<template>
  <BusinessLayout>
    <h3>Business Analytics Page</h3>
    <p>Only visible to business users.</p>
  </BusinessLayout>
</template> 
