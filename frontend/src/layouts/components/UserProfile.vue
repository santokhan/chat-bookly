<script setup>
import { useAuthStore } from '@core/stores/auth'
import avatar1 from '@images/avatars/avatar-1.png'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const user = computed(() => authStore.user)
const role = computed(() => authStore.role)

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user?.email || 'User' }}
            </VListItemTitle>
            <VListItemSubtitle>{{ role }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Admin Options -->
          <template v-if="role === 'admin'">
            <VListItem link>
              <template #prepend>
                <VIcon class="me-2" icon="tabler-user" size="22" />
              </template>
              <VListItemTitle>User</VListItemTitle>
            </VListItem>
            <VListItem link>
              <template #prepend>
                <VIcon class="me-2" icon="tabler-id" size="22" />
              </template>
              <VListItemTitle>Profile</VListItemTitle>
            </VListItem>
          </template>

          <!-- 👉 Business Options -->
          <template v-else-if="role === 'business'">
            <VListItem link>
              <template #prepend>
                <VIcon class="me-2" icon="tabler-settings" size="22" />
              </template>
              <VListItemTitle>Settings</VListItemTitle>
            </VListItem>
            <VListItem link>
              <template #prepend>
                <VIcon class="me-2" icon="tabler-id" size="22" />
              </template>
              <VListItemTitle>Profile</VListItemTitle>
            </VListItem>
          </template>

          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="handleLogout">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>
            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
