<script setup>
import AdminLayout from '@/layouts/components/AdminLayout.vue'
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
</script>

<template>
  <AdminLayout>
    <h3>Admin Reports Page</h3>
    <p>Only visible to admin users.</p>
  </AdminLayout>
</template> 
