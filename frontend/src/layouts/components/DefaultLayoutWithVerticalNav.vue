<script setup>
import UserProfile from '@/layouts/components/UserProfile.vue'
import { getVerticalNavItems } from '@/navigation/vertical'
import NavBarI18n from '@core/components/I18n.vue'
import { useAuthStore } from '@core/stores/auth'
import { VerticalNav } from '@layouts/components'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { useLayoutConfigStore } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'
import { computed } from 'vue'

const authStore = useAuthStore()
const configStore = useLayoutConfigStore()
const navItems = computed(() => getVerticalNavItems(authStore.role))

// Mobile navigation state
const { width: windowWidth } = useWindowSize()
const isOverlayNavActive = ref(false)
const isLayoutOverlayVisible = ref(false)
const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)

// Sync overlay visibility
syncRef(isOverlayNavActive, isLayoutOverlayVisible)

// Hide overlay if window width increases
watch(windowWidth, () => {
  if (!configStore.isLessThanOverlayNavBreakpoint && isLayoutOverlayVisible.value)
    isLayoutOverlayVisible.value = false
})
</script>

<template>
  <div
    class="layout-wrapper"
    :class="[configStore._layoutClasses, { 'layout-overlay-nav': isOverlayNavActive }]"
  >
    <!-- Full Width Header -->
    <header class="layout-header">
      <div class="header-content">
        <!-- Mobile menu toggle -->
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="d-lg-none me-3"
          @click="toggleIsOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>
        
        <!-- Chatbookly Logo/Branding -->
        <RouterLink
          to="/"
          class="app-logo app-title-wrapper"
        >
          <VNodeRenderer :nodes="themeConfig.app.logo" />
          <h1 class="app-logo-title">
            {{ themeConfig.app.title }}
          </h1>
        </RouterLink>
        
        <!-- Header actions -->
        <div class="header-action pt-1">
          <Component
            :is="themeConfig.app.iconRenderer || 'div'"
            v-show="configStore.isVerticalNavCollapsed"
            class="d-none nav-unpin"
            :class="configStore.isVerticalNavCollapsed && 'd-lg-block'"
            v-bind="themeConfig.icons.verticalNavUnPinned"
            @click="configStore.isVerticalNavCollapsed = !configStore.isVerticalNavCollapsed"
          />
          <Component
            :is="themeConfig.app.iconRenderer || 'div'"
            v-show="!configStore.isVerticalNavCollapsed"
            class="d-none nav-pin"
            :class="!configStore.isVerticalNavCollapsed && 'd-lg-block'"
            v-bind="themeConfig.icons.verticalNavPinned"
            @click="configStore.isVerticalNavCollapsed = !configStore.isVerticalNavCollapsed"
          />
        </div>
        
        <VSpacer />
        
        <!-- Header Right Actions -->
        <div class="header-actions">
          <NavBarI18n
            v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
            :languages="themeConfig.app.i18n.langConfig"
            class="me-2"
          />
          <UserProfile />
        </div>
      </div>
    </header>

    <!-- Main Layout Area -->
    <div class="layout-content">
      <!-- Vertical Navigation Drawer -->
      <div class="nav-drawer-wrapper">
        <VerticalNav
          :is-overlay-nav-active="isOverlayNavActive"
          :toggle-is-overlay-nav-active="toggleIsOverlayNavActive"
          :nav-items="navItems"
          class="nav-drawer"
        >
          <!-- Hide the default nav header -->
          <template #nav-header>
            <div style="display: none;" />
          </template>
        </VerticalNav>
      </div>

      <!-- Main Content Area -->
      <main class="content-area">
        <div class="content-container">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div
      class="mobile-overlay"
      :class="{ 'overlay-visible': isLayoutOverlayVisible }"
      @click="isLayoutOverlayVisible = false"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@configured-variables" as variables;

.layout-wrapper {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  block-size: 100vh;
}

// Header Styles
.layout-header {
  position: fixed;
  z-index: 1010;
  background: white;
  block-size: 64px;
  border-block-end: 1px solid rgba(0, 0, 0, 0.1);
  inset-block-start: 0;
  inset-inline: 0;
  
  .header-content {
    display: flex;
    align-items: center;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 1.5rem;
    
    .app-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-inline-end: auto;
      text-decoration: none;
      
      :deep(svg) {
        block-size: 32px;
        color: rgb(var(--v-global-theme-primary));
        inline-size: 32px;
      }
      
      .app-logo-title {
        margin: 0;
        color: #333333;
        font-size: 1.375rem;
        font-weight: 700;
        letter-spacing: 0.25px;
        line-height: 1.5rem;
        padding-inline-end: 0.75rem;
        text-transform: capitalize;
      }
    }
    
    .header-action {
      cursor: pointer;
      
      .nav-pin,
      .nav-unpin {
        color: #666666;
        
        &:hover {
          color: #333333;
        }
      }
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      // Style the user profile to match the design
      :deep(.v-avatar) {
        border: 2px solid rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
        
        &:hover {
          border-color: rgba(0, 0, 0, 0.3);
        }
      }
      
      // Style the badge dot
      :deep(.v-badge__badge) {
        border: 2px solid white;
      }
      
      // Style other header elements for light theme
      :deep(.v-btn) {
        color: #666666;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #333333;
        }
      }
    }
  }
}

// Main Layout Content
.layout-content {
  display: flex;
  block-size: calc(100vh - 64px);
  margin-block-start: 64px;
}

// Navigation Drawer
.nav-drawer-wrapper {
  flex-shrink: 0;
  block-size: 100%;
  inline-size: variables.$layout-vertical-nav-width;

  // Mobile responsive
  @media (max-width: 1279px) {
    position: fixed;
    z-index: 1005;
    block-size: calc(100vh - 64px);
    inset-block-start: 64px;
    inset-inline-start: 0;
    transform: translateX(-100%);
    transition: transform 0.25s ease-in-out;

    .layout-overlay-nav & {
      transform: translateX(0);
    }
  }

  // Navigation styling
  :deep(.nav-drawer) {
    position: relative;
    background-color: #161616 !important;
    block-size: 100%;
    color: white;

    // Hide the nav header completely
    .nav-header {
      display: none !important;
    }

    // Style nav items
    .nav-items {
      block-size: 100%;
      padding-block-start: 1rem;
    }

    // Style nav links
    .nav-link a {
      color: rgba(255, 255, 255, 70%);
      transition: all 0.15s ease;

      &:hover,
      &.router-link-active {
        background-color: rgba(255, 255, 255, 10%);
        color: white;
      }
    }

    // Style nav item icons
    .nav-item-icon {
      color: rgba(255, 255, 255, 70%);
    }

    // Style nav item titles
    .nav-item-title {
      color: rgba(255, 255, 255, 70%);
    }

    // Active nav item styling
    .nav-link a.router-link-active {
      .nav-item-icon,
      .nav-item-title {
        color: white;
      }
    }
  }
}

// Content Area
.content-area {
  overflow: auto;
  flex: 1;
  block-size: 100%;

  .content-container {
    padding: 1.5rem;
    min-block-size: 100%;
  }

  // Mobile full width
  @media (max-width: 1279px) {
    inline-size: 100%;
  }
}

// Mobile Overlay
.mobile-overlay {
  position: fixed;
  z-index: 1004;
  background: rgba(0, 0, 0, 50%);
  inset-block: 64px 0;
  inset-inline: 0;
  opacity: 0;
  transition: opacity 0.25s ease, visibility 0.25s ease;
  visibility: hidden;

  &.overlay-visible {
    opacity: 1;
    visibility: visible;
  }
}

// Collapsed nav styling
.layout-vertical-nav-collapsed {
  .nav-drawer-wrapper {
    inline-size: variables.$layout-vertical-nav-collapsed-width;
  }
}
</style>
