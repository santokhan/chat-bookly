<script setup>
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import { getVerticalNavItems } from '@/navigation/vertical'
import NavBarI18n from '@core/components/I18n.vue'
import { useAuthStore } from '@core/stores/auth'
import { VerticalNavLayout } from '@layouts'
import { themeConfig } from '@themeConfig'
import { computed } from 'vue'

const authStore = useAuthStore()

const navItems = computed(() => getVerticalNavItems(authStore.role))
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>
        <NavbarThemeSwitcher />
        <VSpacer />
        <NavBarI18n
          v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
          :languages="themeConfig.app.i18n.langConfig"
        />
        <UserProfile />
      </div>
    </template> -->


    <template #navbar="{ toggleVerticalOverlayNavActive }">
  <div class="d-flex h-100 align-center justify-end w-100 gap-3">
    <IconBtn
      id="vertical-nav-toggle-btn"
      class="ms-n3 d-lg-none"
      @click="toggleVerticalOverlayNavActive(true)"
    >
      <VIcon
        size="26"
        icon="tabler-menu-2"
      />
    </IconBtn>

    <!-- Right-aligned items with spacing -->
    <!-- <NavbarThemeSwitcher /> -->
    <NavBarI18n
      v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
      :languages="themeConfig.app.i18n.langConfig"
    />
    <UserProfile />
  </div>
</template>


    <slot />
    <template #footer>
      <Footer />
    </template>
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
