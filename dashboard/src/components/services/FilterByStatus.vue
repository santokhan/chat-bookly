<template>
  <div ref="statusDropdownRef" class="relative">
    <!-- Dropdown Button -->
    <button @click.stop="statusOpen = !statusOpen"
      class="border border-border-light pl-3 pr-8 py-2 text-sm rounded-lg appearance-none w-full flex justify-between items-center text-neutral-500">
      Status
      <svg width="20" height="20" class="absolute right-2 z-[1]" viewBox="0 0 20 20" fill="none">
        <path
          d="M9.99956 10.8785L13.7121 7.16602L14.7726 8.22652L9.99956 12.9995L5.22656 8.22652L6.28706 7.16602L9.99956 10.8785Z"
          fill="#525866" />
      </svg>
    </button>

    <!-- Dropdown List -->
    <transition name="fade-slide">
      <ul v-if="statusOpen"
        class="absolute top-full right-0 w-36 mt-1 bg-white border border-border-light rounded-xl shadow-lg z-10 overflow-hidden p-2">
        <button v-for="status in statuses" :key="status" type="button" @click.stop="toggleStatus(status)"
          class="px-2.5 py-2 text-sm hover:bg-neutral-50 flex gap-2 rounded-md w-full">
          <input type="checkbox" :checked="selectedStatus.includes(status)" readonly />
          {{ status }}
        </button>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Status options
const statuses = ['Pending', 'In Progress', 'Completed']
const statusOpen = ref(false)
const selectedStatus = ref<string[]>([])
const statusDropdownRef = ref<HTMLElement | null>(null)

// Toggle status selection
function toggleStatus(status: string) {
  const index = selectedStatus.value.indexOf(status)
  if (index === -1) selectedStatus.value.push(status)
  else selectedStatus.value.splice(index, 1)
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  if (statusDropdownRef.value && !statusDropdownRef.value.contains(event.target as Node)) {
    statusOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>