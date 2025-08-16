<template>
  <div class="relative grow">
    <!-- Selected button -->
    <input type="search" name="team_member" id="teamMember" v-model="search" class="focus:outline-none w-full px-0.5 text-sm" placeholder="Select team member">

    <!-- Dropdown options -->
    <div v-if="search"
      class="absolute z-20 mt-1 w-full bg-white border border-light rounded-lg shadow-lg max-h-60 overflow-y-auto">
      <template v-for="member in db_team_members.filter(filterFunc)" :key="member.id">
        <button type="button" @click="selectMember(member)"
          class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 w-full">
          <img :src="member.image" alt="" class="size-5 rounded-full" />
          <span>{{ member.first_name }} {{ member.last_name }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
/**
 * Will search the Team member and send to parent nothing else.
 */
import { db_team_members } from '@/stores/team-members'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['select'])

const search = ref('')
const dropdownOpen = ref(false)

// Close dropdown if clicked outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) dropdownOpen.value = false
  })
})

const selectMember = (member) => {
  dropdownOpen.value = false
  emit('select', member)
  search.value = ''
}

const filterFunc = (m) => {
  const needle = search.value?.toLowerCase()
  let name = ""
  if (m?.first_name) name += m.first_name.toLowerCase()
  if (m?.last_name) name += m.last_name.toLowerCase()
  return name?.includes(needle)
}
</script>