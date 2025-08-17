<template>
  <!-- Selected Members -->
  <div v-for="member in selectedMembers" :key="member.id"
    class="p-1 text-sm border border-light flex gap-1 rounded-md whitespace-nowrap mb-1">
    <img :src="member.image" alt="" class="size-5 rounded-full" />
    <span class="px-1">{{ member.first_name }} {{ member.last_name }}</span>
    <button type="button" @click.stop="removeOption(member)">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8.00004 7.15164L10.97 4.18164L11.8184 5.03004L8.84844 8.00004L11.8184 10.97L10.97 11.8184L8.00004 8.84844L5.03004 11.8184L4.18164 10.97L7.15164 8.00004L4.18164 5.03004L5.03004 4.18164L8.00004 7.15164Z"
          fill="#99A0AE" />
      </svg>
    </button>
  </div>

  <!-- Dropdown container -->
  <div ref="dropdownRef" class="relative">

    <!-- Dropdown button -->
    <button @click.stop="open = !open"
      class="border border-border-light pl-3 pr-8 py-2 text-sm rounded-lg appearance-none w-full flex justify-between items-center whitespace-nowrap text-neutral-500">
      {{ selectedMembers.length === 0 ? 'All Team Members' : "Custom" }}
      <svg width="20" height="20" class="absolute right-2 z-[1]" viewBox="0 0 20 20" fill="none">
        <path
          d="M9.99956 10.8785L13.7121 7.16602L14.7726 8.22652L9.99956 12.9995L5.22656 8.22652L6.28706 7.16602L9.99956 10.8785Z"
          fill="#525866" />
      </svg>
    </button>

    <!-- Dropdown list -->
    <transition name="fade-slide">
      <ul v-if="open"
        class="absolute top-full right-0 w-52 mt-1 bg-white border border-border-light rounded-xl shadow-lg z-10 overflow-hidden p-2">
        <!-- All Team Members -->
        <button type="button" @click.stop="selectAll"
          class="px-2.5 py-2 text-sm hover:bg-neutral-50 flex gap-2 rounded-md whitespace-nowrap w-full">
          <input type="checkbox" :checked="selectedMembers.length === 0" readonly />
          All Team Members
        </button>

        <!-- Individual members -->
        <button type="button" v-for="member in db_team_members" :key="member.id" @click.stop="toggleMember(member)"
          class="px-2.5 py-2 text-sm hover:bg-neutral-50 flex gap-2 rounded-md whitespace-nowrap w-full">
          <input type="checkbox" :checked="isSelected(member)" readonly />
          <img :src="member.image" alt="" class="size-5 rounded-full" />
          {{ member.first_name }} {{ member.last_name }}
        </button>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { db_team_members, type TeamMember } from '@/stores/team-members'

const open = ref(false)
const selectedMembers = ref<TeamMember[]>([])
const dropdownRef = ref<HTMLElement | null>(null)

// Toggle selection of a single member
function toggleMember(member: TeamMember) {
  const index = selectedMembers.value.findIndex(m => m.id === member.id)
  if (index === -1) selectedMembers.value.push(member)
  else selectedMembers.value.splice(index, 1)
}

// Check if a member is selected
function isSelected(member: TeamMember) {
  return selectedMembers.value.some(m => m.id === member.id)
}

// Remove member from selected list
function removeOption(member: TeamMember) {
  const index = selectedMembers.value.findIndex(m => m.id === member.id)
  if (index > -1) selectedMembers.value.splice(index, 1)
}

// Select "All Team Members" (empty selection)
function selectAll() {
  selectedMembers.value = []
}

// Close dropdown on click outside
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false
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