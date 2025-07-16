<script setup>
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import UserProfileAdmin from '@/layouts/components/UserProfileAdmin.vue'
import UserProfileBusiness from '@/layouts/components/UserProfileBusiness.vue'
import navItems from '@/navigation/horizontal'
import NavBarI18n from '@core/components/I18n.vue'
import { useAuthStore } from '@core/stores/auth'
import { HorizontalNavLayout } from '@layouts'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const authStore = useAuthStore()

const profileComponent = computed(() => {
  if (authStore.role === 'admin') return UserProfileAdmin
  if (authStore.role === 'business') return UserProfileBusiness
  return UserProfile
})
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <template #navbar>
      <RouterLink
        to="/"
        class="app-logo d-flex align-center gap-x-3"
      >
        <VNodeRenderer :nodes="themeConfig.app.logo" />
        <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          {{ themeConfig.app.title }}
        </h1>
      </RouterLink>
      <VSpacer />
      <NavBarI18n
        v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
        :languages="themeConfig.app.i18n.langConfig"
      />
      <NavbarThemeSwitcher class="me-2" />
      <component :is="profileComponent" />
    </template>
    <slot />
    <template #footer>
      <Footer />
    </template>
    <!-- <TheCustomizer /> -->
  </HorizontalNavLayout>
</template>
