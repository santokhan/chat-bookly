<script setup>
import { useAuthStore } from '@core/stores/auth'
import avatar1 from '@images/avatars/avatar-2.png'
const authStore = useAuthStore()
function handleLogout() {
  authStore.logout()
  window.location.replace('/login')
}
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>
            <VListItemTitle class="font-weight-semibold">Business User</VListItemTitle>
            <VListItemSubtitle>Business</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />
          <VListItem link><template #prepend><VIcon class="me-2" icon="tabler-user" size="22" /></template><VListItemTitle>Profile</VListItemTitle></VListItem>
          <VListItem link><template #prepend><VIcon class="me-2" icon="tabler-settings" size="22" /></template><VListItemTitle>Settings</VListItemTitle></VListItem>
          <VDivider class="my-2" />
          <VListItem @click="handleLogout"><template #prepend><VIcon class="me-2" icon="tabler-logout" size="22" /></template><VListItemTitle>Logout</VListItemTitle></VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template> 
