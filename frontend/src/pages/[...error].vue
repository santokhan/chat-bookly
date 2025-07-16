<script setup>
import { useAuthStore } from '@core/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (authStore.isAuthenticated) {
    if (authStore.role === 'admin') {
      router.replace('/admin')
    } else if (authStore.role === 'business') {
      router.replace('/business')
    }
  } else {
    router.replace('/login')
  }
})
</script>

<template>
  <div />
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
