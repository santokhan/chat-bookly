<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
import OpeningHours from '@/components/OpeningHours.vue'
import { ref, computed } from 'vue'

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

// Generate time options in 24-hour format at 5-minute intervals
const timeOptions = computed(() => {
  const options = []

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

      options.push({
        title: timeString,
        value: timeString,
      })
    }
  }

  return options
})

// Edit mode data
const editMode = ref(false)

const editHours = ref([
  { 
    day: 'Monday', 
    enabled: true, 
    timeSlots: [
      { start: '09:00', end: '13:00' },
      { start: '15:00', end: '20:00' },
    ],
  },
  { 
    day: 'Tuesday', 
    enabled: true, 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Wednesday', 
    enabled: true, 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Thursday', 
    enabled: true, 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Friday', 
    enabled: true, 
    timeSlots: [
      { start: '09:00', end: '19:00' },
    ],
  },
  { 
    day: 'Saturday', 
    enabled: true, 
    timeSlots: [
      { start: '10:00', end: '17:00' },
    ],
  },
  { 
    day: 'Sunday', 
    enabled: true, 
    timeSlots: [
      { start: '10:00', end: '17:00' },
    ],
  },
])

const goToSettings = () => {
  // Navigate to settings page
  console.log('Navigate to settings')
}

const toggleEditMode = () => {
  editMode.value = !editMode.value
}

const addTimeSlot = dayIndex => {
  editHours.value[dayIndex].timeSlots.push({ start: '09:00', end: '17:00' })
}

const removeTimeSlot = (dayIndex, slotIndex) => {
  if (editHours.value[dayIndex].timeSlots.length > 1) {
    editHours.value[dayIndex].timeSlots.splice(slotIndex, 1)
  }
}

const copyToAllDays = () => {
  const mondaySlots = [...editHours.value[0].timeSlots]

  editHours.value.forEach((day, index) => {
    if (index > 0) {
      day.timeSlots = mondaySlots.map(slot => ({ ...slot }))
    }
  })
}

const saveChanges = () => {
  // Update the display hours from edit hours
  openingHours.value = editHours.value.map(day => {
    const firstSlot = day.timeSlots[0]
    
    return {
      day: day.day,
      open: firstSlot.start,
      close: firstSlot.end,
    }
  })
  editMode.value = false
}

const cancelEdit = () => {
  editMode.value = false

  // Reset edit hours to current display hours
  editHours.value = openingHours.value.map(day => ({
    day: day.day,
    enabled: true,
    timeSlots: [{ start: day.open, end: day.close }],
  }))
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
    <VCard
      v-if="editMode"
      class="edit-opening-hours-container"
    >
      <VCardText class="pa-6">
        <!-- Edit Header -->
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h4 font-weight-bold">
            Edit opening hours
          </h2>
          <div class="d-flex gap-2">
            <VBtn
              variant="outlined"
              @click="cancelEdit"
            >
              Cancel
            </VBtn>
            <VBtn
              color="primary"
              @click="saveChanges"
            >
              Save
            </VBtn>
          </div>
        </div>

        <!-- Edit Form -->
        <div class="edit-form">
          <div
            v-for="(day, dayIndex) in editHours"
            :key="dayIndex"
            class="day-edit-section mb-6"
          >
            <!-- Day Header with Checkbox -->
            <div class="day-edit-header mb-3">
              <VCheckbox
                v-model="day.enabled"
                color="primary"
                hide-details
                class="me-3"
              />
              <span class="text-h6 font-weight-medium">{{ day.day }}</span>
            </div>

            <!-- Time Slots -->
            <div class="time-slots-container">
              <div
                v-for="(slot, slotIndex) in day.timeSlots"
                :key="slotIndex"
                class="time-slot-row mb-2"
              >
                <VSelect
                  v-model="slot.start"
                  :items="timeOptions"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="time-input me-2"
                  style="width: 120px"
                  item-title="title"
                  item-value="value"
                />
                <span class="time-separator-text mx-2">-</span>
                <VSelect
                  v-model="slot.end"
                  :items="timeOptions"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="time-input me-2"
                  style="width: 120px"
                  item-title="title"
                  item-value="value"
                />
                <VBtn
                  v-if="day.timeSlots.length > 1"
                  icon
                  variant="text"
                  color="error"
                  size="small"
                  class="remove-btn"
                  @click="removeTimeSlot(dayIndex, slotIndex)"
                >
                  <VIcon icon="tabler-x" />
                </VBtn>
                <VBtn
                  v-if="slotIndex === day.timeSlots.length - 1"
                  icon
                  variant="text"
                  color="primary"
                  size="small"
                  class="add-btn"
                  @click="addTimeSlot(dayIndex)"
                >
                  <VIcon icon="tabler-plus" />
                </VBtn>
              </div>
            </div>

            <!-- Copy to all days (only for Monday) -->
            <div
              v-if="dayIndex === 0"
              class="copy-section mt-4"
            >
              <VCard
                class="copy-card"
                variant="outlined"
                color="primary"
              >
                <VCardText class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <VIcon
                      icon="mdi-information"
                      color="primary"
                      class="me-2"
                      size="20"
                    />
                    <span class="text-body-2">Copy these opening hours to all days?</span>
                  </div>
                  <VBtn
                    variant="outlined"
                    color="primary"
                    size="small"
                    @click="copyToAllDays"
                  >
                    Yes, copy
                  </VBtn>
                </VCardText>
              </VCard>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>
  </BusinessLayout>
</template>

<style scoped>
.opening-hours-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-opening-hours-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.day-edit-header {
  display: flex;
  align-items: center;
}

.time-slots-container {
  margin-left: 40px;
}

.time-slot-row {
  display: flex;
  align-items: center;
}

.time-separator-text {
  color: #666;
  font-weight: 500;
}

.copy-card {
  background-color: rgb(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary), 0.2);
}

.remove-btn {
  min-width: 32px;
  height: 32px;
  margin-left: 8px;
}

.add-btn {
  min-width: 32px;
  height: 32px;
  margin-left: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
  .time-slots-container {
    margin-left: 20px;
  }
  
  .time-input {
    width: 100px !important;
  }
}

@media (max-width: 480px) {
  .time-slots-container {
    margin-left: 10px;
  }
  
  .time-input {
    width: 80px !important;
  }
}
</style>

