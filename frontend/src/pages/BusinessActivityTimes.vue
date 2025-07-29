<script setup>
import EditOpeningHours from '@/components/EditOpeningHours.vue'
import OpeningHours from '@/components/OpeningHours.vue'
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
import { ref } from 'vue'

// Opening hours data
const openingHours = ref([
  { 
    day: 'Monday', 
    timeSlots: [
      { start: '08:00', end: '12:00' },
      { start: '15:00', end: '20:30' },
    ],
  },
  { 
    day: 'Tuesday', 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Wednesday', 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Thursday', 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Friday', 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Saturday', 
    timeSlots: [
      { start: '10:00', end: '17:00' },
    ],
  },
  { 
    day: 'Sunday', 
    timeSlots: [
      { start: '10:00', end: '17:00' },
    ],
  },
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
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h3 font-weight-bold">
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
        <p class="text-lg text-medium-emphasis mb-6">
          Opening hours for these locations are default working hours for your team and will be visible to your clients.
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

<style lang="scss" scoped>
.opening-hours-container {
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 10%);
}

// Increase button font size
:deep(.v-btn) {
  font-size: 17px;
  font-weight: 500;
}

// Responsive font sizes
@media (max-width: 768px) {
  :deep(.text-h3) {
    font-size: 1.875rem !important;
  }

  :deep(.text-lg) {
    font-size: 1.1875rem !important;
  }

  :deep(.v-btn) {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  :deep(.text-h3) {
    font-size: 1.625rem !important;
  }

  :deep(.text-lg) {
    font-size: 1.0625rem !important;
  }

  :deep(.v-btn) {
    font-size: 14px;
  }
}
</style>

