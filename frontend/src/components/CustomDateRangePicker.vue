<template>
  <div class="custom-date-range-picker">
    <div class="calendar-container">
      <!-- First Calendar -->
      <div class="calendar-section">
        <div class="calendar-header">
          <VBtn
            icon="tabler-chevron-left"
            variant="text"
            size="small"
            @click="previousMonth"
          />
          <span class="calendar-title">{{ currentMonthYear }}</span>
          <VBtn
            icon="tabler-chevron-right"
            variant="text"
            size="small"
            @click="nextMonth"
          />
        </div>
        <div class="calendar-grid">
          <div class="calendar-weekdays">
            <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
          </div>
          <div class="calendar-days">
            <div
              v-for="date in calendarDays"
              :key="date.date"
              class="calendar-day"
              :class="{
                'other-month': !date.currentMonth,
                'selected': isDateSelected(date.date),
                'in-range': isDateInRange(date.date),
                'start-date': isStartDate(date.date),
                'end-date': isEndDate(date.date)
              }"
              @click="selectDate(date.date)"
            >
              {{ date.day }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Second Calendar -->
      <div class="calendar-section">
        <div class="calendar-header">
          <VBtn
            icon="tabler-chevron-left"
            variant="text"
            size="small"
            @click="previousMonth2"
          />
          <span class="calendar-title">{{ currentMonthYear2 }}</span>
          <VBtn
            icon="tabler-chevron-right"
            variant="text"
            size="small"
            @click="nextMonth2"
          />
        </div>
        <div class="calendar-grid">
          <div class="calendar-weekdays">
            <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
          </div>
          <div class="calendar-days">
            <div
              v-for="date in calendarDays2"
              :key="date.date"
              class="calendar-day"
              :class="{
                'other-month': !date.currentMonth,
                'selected': isDateSelected(date.date),
                'in-range': isDateInRange(date.date),
                'start-date': isStartDate(date.date),
                'end-date': isEndDate(date.date)
              }"
              @click="selectDate(date.date)"
            >
              {{ date.day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

// Week days
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Date selection state
const selectedStartDate = ref(null)
const selectedEndDate = ref(null)

// Month navigation
const currentMonth = ref(new Date())
const currentMonth2 = ref(new Date(new Date().setMonth(new Date().getMonth() + 1)))

// Computed properties for calendar
const currentMonthYear = computed(() => {
  return currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const currentMonthYear2 = computed(() => {
  return currentMonth2.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  return generateCalendarDays(currentMonth.value)
})

const calendarDays2 = computed(() => {
  return generateCalendarDays(currentMonth2.value)
})

// Generate calendar days
const generateCalendarDays = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    days.push({
      date: currentDate.toISOString().split('T')[0],
      day: currentDate.getDate(),
      currentMonth: currentDate.getMonth() === month
    })
  }
  return days
}

// Date selection logic
const selectDate = (date) => {
  if (!selectedStartDate.value || (selectedStartDate.value && selectedEndDate.value)) {
    // First click or reset
    selectedStartDate.value = date
    selectedEndDate.value = null
  } else {
    // Second click
    selectedEndDate.value = date
    // Ensure start is before end
    if (new Date(selectedStartDate.value) > new Date(selectedEndDate.value)) {
      const temp = selectedStartDate.value
      selectedStartDate.value = selectedEndDate.value
      selectedEndDate.value = temp
    }
  }
  
  // Emit the range
  if (selectedStartDate.value && selectedEndDate.value) {
    emit('update:modelValue', [selectedStartDate.value, selectedEndDate.value])
  } else if (selectedStartDate.value) {
    emit('update:modelValue', [selectedStartDate.value])
  } else {
    emit('update:modelValue', [])
  }
}

const isDateSelected = (date) => {
  return selectedStartDate.value === date || selectedEndDate.value === date
}

const isDateInRange = (date) => {
  if (!selectedStartDate.value || !selectedEndDate.value) return false
  const currentDate = new Date(date)
  const startDate = new Date(selectedStartDate.value)
  const endDate = new Date(selectedEndDate.value)
  return currentDate > startDate && currentDate < endDate
}

const isStartDate = (date) => {
  return selectedStartDate.value === date
}

const isEndDate = (date) => {
  return selectedEndDate.value === date
}

// Month navigation
const previousMonth = () => {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() - 1))
}

const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() + 1))
}

const previousMonth2 = () => {
  currentMonth2.value = new Date(currentMonth2.value.setMonth(currentMonth2.value.getMonth() - 1))
}

const nextMonth2 = () => {
  currentMonth2.value = new Date(currentMonth2.value.setMonth(currentMonth2.value.getMonth() + 1))
}

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  if (newVal && newVal.length >= 2) {
    selectedStartDate.value = newVal[0]
    selectedEndDate.value = newVal[1]
  } else {
    selectedStartDate.value = null
    selectedEndDate.value = null
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.custom-date-range-picker {
  .calendar-container {
    display: flex;
    gap: 16px;
    
    .calendar-section {
      flex: 1;
    }
  }

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    
    .calendar-title {
      font-weight: 600;
      font-size: 14px;
    }
  }

  .calendar-grid {
    padding: 8px;
    
    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
      
      .weekday {
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #666;
        padding: 8px 4px;
      }
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      
      .calendar-day {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
        
        &:hover {
          background-color: rgba(var(--v-theme-primary), 0.1);
        }
        
        &.other-month {
          color: #ccc;
        }
        
        &.selected {
          background-color: rgb(var(--v-theme-primary));
          color: white;
          font-weight: 600;
        }
        
        &.in-range {
          background-color: rgba(var(--v-theme-primary), 0.1);
          color: rgb(var(--v-theme-primary));
          font-weight: 500;
        }
        
        &.start-date {
          background-color: rgb(var(--v-theme-primary));
          color: white;
          font-weight: 600;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        
        &.end-date {
          background-color: rgb(var(--v-theme-primary));
          color: white;
          font-weight: 600;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
}
</style> 