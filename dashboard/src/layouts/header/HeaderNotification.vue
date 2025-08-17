<template>
  <div class="relative" ref="dropdownRef">
    <!-- Notification Button -->
    <button type="button" @click="toggleDropdown"
      class="flex items-center justify-center gap-2 w-9 h-9 border rounded-lg border-light text-primary-500 relative">
      <span v-if="hasUnread" class="w-[5px] h-[5px] bg-primary-500 rounded-full absolute top-1 right-1"></span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 13.75H17.5V15.25H2.5V13.75H4V8.5C4 6.9087 4.63214 5.38258 5.75736 4.25736C6.88258 3.13214 8.4087 2.5 10 2.5C11.5913 2.5 13.1174 3.13214 14.2426 4.25736C15.3679 5.38258 16 6.9087 16 8.5V13.75ZM14.5 13.75V8.5C14.5 7.30653 14.0259 6.16193 13.182 5.31802C12.3381 4.47411 11.1935 4 10 4C8.80653 4 7.66193 4.47411 6.81802 5.31802C5.97411 6.16193 5.5 7.30653 5.5 8.5V13.75H14.5ZM7.75 16.75H12.25V18.25H7.75V16.75Z"
          fill="currentColor" />
      </svg>
    </button>

    <!-- Dropdown -->
    <transition name="fade">
      <div v-if="isOpen"
        class="absolute right-0 mt-2 w-[24.5rem] bg-white border border-light rounded-[1.25rem] shadow-lg overflow-hidden z-50">
        <div class="px-5 py-4 border-b border-light flex gap-4 items-center justify-between">
          <div class="font-medium text-strong">Notifications</div>
          <button type="button" class="text-primary-500 text-sm">
            Mark all as read
          </button>
        </div>
        <ul class="divide-y divide-light max-h-80 overflow-y-auto px-2 py-1">
          <li v-for="(notification, index) in store.notifications" :key="index" class="py-1">
            <RouterLink to="#" class="flex gap-3 p-3 hover:bg-gray-100 rounded-xl">
              <!-- Optional avatar -->
              <img v-if="notification.user.avatar" :src="notification.user.avatar" alt="avatar"
                class="size-10 rounded-full object-cover">
              <div class="flex-1">
                <p class="text-sm text-secondary" v-html="notification.content"></p>
                <p class="text-xs text-secondary mt-0.5">
                  {{ timeAgo(notification.created_at) }}
                </p>
              </div>
            </RouterLink>
          </li>
          <li v-if="store.notifications.length == 0" class="px-3 py-2 text-secondary text-sm text-center">
            No notifications
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications'
import timeAgo from '@/utils/timeAgo'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

// Dropdown state
const isOpen = ref(false)
const hasUnread = ref(true)
const store = useNotificationsStore()

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) hasUnread.value = false
}

// Reference for the dropdown wrapper
const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>