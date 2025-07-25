<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
import OpeningHours from '@/components/OpeningHours.vue'
import EditOpeningHours from '@/components/EditOpeningHours.vue'
import { ref } from 'vue'

// Opening hours data
const openingHours = ref([
  { day: 'Monday', open: '09:00', close: '19:00' },
  { day: 'Tuesday', open: '09:00', close: '19:00' },
  { day: 'Wednesday', open: '09:00', close: '19:00' },
  { day: 'Thursday', open: '09:00', close: '19:00' },
  { day: 'Friday', open: '09:00', close: '19:00' },
  { day: 'Saturday', open: '10:00', close: '17:00' },
  { day: 'Sunday', open: '10:00', close: '17:00' },
])

// Edit mode state
const editMode = ref(false)

const goToSettings = () => {
  // Navigate to settings page
  console.log('Navigate to settings')
}

const toggleEditMode = () => {
  editMode.value = !editMode.value
}

const handleSave = updatedHours => {
  openingHours.value = updatedHours
  editMode.value = false
}

const handleCancel = () => {
  editMode.value = false
}
</script>

<template>
  <BusinessLayout>
    <!-- View Mode - Always Visible -->
    <VCard class="opening-hours-container mb-6">
      <VCardText class="pa-6">
        <!-- Main Heading -->
        <div class="d-flex justify-space-between align-center mb-3">
          <h2 class="text-h4 font-weight-bold">
            Opening hours
          </h2>
          <VBtn
            color="primary"
            variant="outlined"
            @click="toggleEditMode"
          >
            Edit
          </VBtn>
        </div>
        
        <!-- Description Text -->
        <p class="text-body-1 text-medium-emphasis mb-6">
          Opening hours for these locations are default working hours for your team and will be visible to your clients. 
          You can amend business closed periods for events like Bank Holidays in 
          <a 
            href="#" 
            class="text-primary text-decoration-underline"
            @click.prevent="goToSettings"
          >
            Settings
          </a>.
        </p>

        <!-- Opening Hours Component -->
        <OpeningHours :opening-hours="openingHours" />
      </VCardText>
    </VCard>

    <!-- Edit Mode - Shows below when active -->
    <EditOpeningHours
      v-if="editMode"
      :opening-hours="openingHours"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </BusinessLayout>
</template>

<style scoped>
.opening-hours-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

