<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  openingHours: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['save', 'cancel'])

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
const editHours = ref(props.openingHours.map(day => ({
  day: day.day,
  enabled: true,
  timeSlots: [{ start: day.open, end: day.close }],
})))

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
  const updatedHours = editHours.value.map(day => {
    const firstSlot = day.timeSlots[0]

    return {
      day: day.day,
      open: firstSlot.start,
      close: firstSlot.end,
    }
  })

  emit('save', updatedHours)
}

const cancelEdit = () => {
  // Reset edit hours to current display hours
  editHours.value = props.openingHours.map(day => ({
    day: day.day,
    enabled: true,
    timeSlots: [{ start: day.open, end: day.close }],
  }))
  emit('cancel')
}
</script>

<template>
  <VCard class="edit-opening-hours-container">
    <VCardText class="pa-6">
      <!-- Edit Header -->
      <div class="d-flex justify-space-between align-center mb-6">
        <h2 class="text-h4 font-weight-bold">
          Edit opening hours
        </h2>
        <div class="d-flex gap-2">
          <VBtn
            variant="outlined"
            color="#000000"
            @click="cancelEdit"
          >
            Close
          </VBtn>
          <VBtn
            color="#000000"
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
                style="inline-size: 120px;"
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
                style="inline-size: 120px;"
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
</template>

<style scoped>
.edit-opening-hours-container {
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 10%);
}

.day-edit-header {
  display: flex;
  align-items: center;
}

.time-slots-container {
  margin-inline-start: 40px;
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
  border-color: rgb(var(--v-theme-primary), 0.2);
  background-color: rgb(var(--v-theme-primary), 0.05);
}

.remove-btn {
  block-size: 32px;
  margin-inline-start: 8px;
  min-inline-size: 32px;
}

.add-btn {
  block-size: 32px;
  margin-inline-start: 8px;
  min-inline-size: 32px;
}

/* Responsive design */
@media (max-width: 768px) {
  .time-slots-container {
    margin-inline-start: 20px;
  }

  .time-input {
    inline-size: 100px !important;
  }
}

@media (max-width: 480px) {
  .time-slots-container {
    margin-inline-start: 10px;
  }

  .time-input {
    inline-size: 80px !important;
  }
}
</style> 
