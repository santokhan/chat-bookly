<script setup>
import { ref, reactive, watch } from 'vue'
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
import DemoCheckboxModelAsArray from '@/views/demos/forms/form-elements/checkbox/DemoCheckboxModelAsArray.vue'
import DemoDateTimePickerTimePicker from '@/views/demos/forms/form-elements/date-time-picker/DemoDateTimePickerTimePicker.vue'
import DemoDateTimePickerRange from '@/views/demos/forms/form-elements/date-time-picker/DemoDateTimePickerRange.vue'
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'

const daysOfWeek = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
]

const selectedDays = ref([])
const dayConfigs = reactive({})
const timeSlots = Array.from({ length: 12 }, (_, i) => (i + 1) * 5)

function ensureDayConfig(day) {
  if (!dayConfigs[day]) {
    dayConfigs[day] = {
      from: '',
      to: '',
      slot: 30,
    }
  }
}
function removeDayConfig(day) {
  delete dayConfigs[day]
}
watch(selectedDays, (newVal, oldVal) => {
  newVal.forEach(day => ensureDayConfig(day))
  oldVal.forEach(day => {
    if (!newVal.includes(day)) removeDayConfig(day)
  })
})

const unavailability = ref([
  { range: '' },
])
function addUnavailability() {
  unavailability.value.push({ range: '' })
}
function removeUnavailability(idx) {
  if (unavailability.value.length > 1) {
    unavailability.value.splice(idx, 1)
  }
}

// For DemoCheckboxModelAsArray
const checkboxOptions = daysOfWeek.map(d => ({ label: d.label, value: d.value }))
</script>

<template>
  <BusinessLayout>
    <VCard class="mb-6" title="Appointments - Settings">
      <VCardText>
        <!-- Day Selection -->
        <div class="mb-6">
          <label class="block font-semibold mb-2">Select Available Days:</label>
          <DemoCheckboxModelAsArray
            v-model="selectedDays"
            :options="checkboxOptions"
          />
        </div>

        <!-- Dynamic Day Configuration -->
        <div v-for="day in selectedDays" :key="day" class="mb-4 border rounded p-4 bg-gray-50">
          <div class="font-semibold mb-2">{{ daysOfWeek.find(d => d.value === day)?.label }} Settings</div>
          <div class="flex flex-col md:flex-row gap-4 items-center">
            <div>
              <label class="block text-sm font-medium mb-1">From</label>
              <DemoDateTimePickerTimePicker
                v-model="dayConfigs[day].from"
                label="From Time"
                :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">To</label>
              <DemoDateTimePickerTimePicker
                v-model="dayConfigs[day].to"
                label="To Time"
                :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Time Slot (minutes)</label>
              <AppSelect
                v-model="dayConfigs[day].slot"
                :items="timeSlots"
                label="Time Slot"
                placeholder="Select Slot Interval"
              />
            </div>
          </div>
        </div>

        <!-- Unavailability Dates -->
        <div class="mt-8">
          <div class="flex items-center justify-between mb-2">
            <label class="block font-semibold">Business Unavailability</label>
            <button @click="addUnavailability" class="text-blue-600 hover:underline text-sm">+ Add</button>
          </div>
          <div v-for="(entry, idx) in unavailability" :key="idx" class="flex flex-col md:flex-row gap-4 items-center mb-2">
            <DemoDateTimePickerRange
              v-model="entry.range"
              label="Unavailability Range"
              :config="{ mode: 'range' }"
            />
            <button
              v-if="unavailability.length > 1"
              @click="removeUnavailability(idx)"
              class="text-red-500 hover:underline text-xs mt-2 md:mt-6"
            >Remove</button>
          </div>
        </div>
      </VCardText>
    </VCard>
  </BusinessLayout>
</template>

<style scoped>
.max-w-2xl { max-width: 42rem; }
.bg-gray-50 { background-color: #f9fafb; }
</style>
