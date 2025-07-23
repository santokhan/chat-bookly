<template>
  <div class="daterangepicker-container">
    <div class="daterangepicker">
      <div class="drp-calendar left">
        <div class="calendar-table">
          <div class="calendar-nav">
            <div class="calendar-nav-btn prev" @click="previousMonth">
              <span class="calendar-nav-arrow"></span>
            </div>
            <div class="calendar-nav-btn next" @click="nextMonth">
              <span class="calendar-nav-arrow"></span>
            </div>
            <div class="calendar-nav-title">
              {{ currentMonthYear }}
            </div>
          </div>
          <div class="calendar-table">
            <table class="calendar-table">
              <thead>
                <tr>
                  <th v-for="day in weekDays" :key="day" class="weekday">{{ day }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="week in calendarWeeks" :key="week[0].date">
                  <td 
                    v-for="date in week" 
                    :key="date.date"
                    class="available"
                    :class="{
                      'off': !date.currentMonth,
                      'in-range': isDateInRange(date.date),
                      'active': isDateSelected(date.date),
                      'start-date': isStartDate(date.date),
                      'end-date': isEndDate(date.date)
                    }"
                    @click="selectDate(date.date)"
                  >
                    {{ date.day }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="drp-calendar right">
        <div class="calendar-table">
          <div class="calendar-nav">
            <div class="calendar-nav-btn prev" @click="previousMonth2">
              <span class="calendar-nav-arrow"></span>
            </div>
            <div class="calendar-nav-btn next" @click="nextMonth2">
              <span class="calendar-nav-arrow"></span>
            </div>
            <div class="calendar-nav-title">
              {{ currentMonthYear2 }}
            </div>
          </div>
          <div class="calendar-table">
            <table class="calendar-table">
              <thead>
                <tr>
                  <th v-for="day in weekDays" :key="day" class="weekday">{{ day }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="week in calendarWeeks2" :key="week[0].date">
                  <td 
                    v-for="date in week" 
                    :key="date.date"
                    class="available"
                    :class="{
                      'off': !date.currentMonth,
                      'in-range': isDateInRange(date.date),
                      'active': isDateSelected(date.date),
                      'start-date': isStartDate(date.date),
                      'end-date': isEndDate(date.date)
                    }"
                    @click="selectDate(date.date)"
                  >
                    {{ date.day }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="drp-buttons">
        <span class="drp-selected">{{ selectedRangeText }}</span>
        <button class="cancelBtn btn btn-sm btn-default" @click="$emit('cancel')">Cancel</button>
        <button class="applyBtn btn btn-sm btn-success" @click="applyRange">Apply</button>
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

const emit = defineEmits(['update:modelValue', 'apply', 'cancel'])

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

const calendarWeeks = computed(() => {
  return generateCalendarWeeks(currentMonth.value)
})

const calendarWeeks2 = computed(() => {
  return generateCalendarWeeks(currentMonth2.value)
})

// Generate calendar weeks
const generateCalendarWeeks = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const weeks = []
  for (let week = 0; week < 6; week++) {
    const weekDays = []
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + (week * 7) + day)
      
      weekDays.push({
        date: currentDate.toISOString().split('T')[0],
        day: currentDate.getDate(),
        currentMonth: currentDate.getMonth() === month
      })
    }
    weeks.push(weekDays)
  }
  return weeks
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

const selectedRangeText = computed(() => {
  if (selectedStartDate.value && selectedEndDate.value) {
    const start = new Date(selectedStartDate.value)
    const end = new Date(selectedEndDate.value)
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  }
  return 'Select a date range'
})

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

const applyRange = () => {
  if (selectedStartDate.value && selectedEndDate.value) {
    emit('apply', [selectedStartDate.value, selectedEndDate.value])
  }
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
.daterangepicker-container {
  position: relative;
}

.daterangepicker {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  
  .drp-calendar {
    display: inline-block;
    vertical-align: top;
    width: 280px;
    max-width: none;
    
    &.left {
      border-right: 1px solid #ccc;
    }
    
    .calendar-table {
      border: none;
      border-radius: 0;
      background: #fff;
      
      .calendar-nav {
        position: relative;
        min-height: 30px;
        text-align: center;
        margin: 0;
        border-bottom: 1px solid #eee;
        
        .calendar-nav-btn {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 30px;
          cursor: pointer;
          border: 0;
          background: transparent;
          
          &.prev {
            left: 0;
          }
          
          &.next {
            right: 0;
          }
          
          .calendar-nav-arrow {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            transform: translate(-50%, -50%);
          }
          
          &.prev .calendar-nav-arrow {
            border-right-color: #666;
            margin-left: -2px;
          }
          
          &.next .calendar-nav-arrow {
            border-left-color: #666;
            margin-left: 2px;
          }
        }
        
        .calendar-nav-title {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          line-height: 30px;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
        }
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        
        thead {
          th {
            padding: 8px 0;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            color: #666;
            border: none;
            text-align: center;
          }
        }
        
        tbody {
          td {
            padding: 0;
            border: none;
            text-align: center;
            cursor: pointer;
            font-size: 13px;
            line-height: 28px;
            width: 40px;
            height: 28px;
            
            &.available {
              border-radius: 0;
              
              &:hover {
                background: #f0f0f0;
              }
            }
            
            &.off {
              color: #ccc;
              cursor: not-allowed;
            }
            
            &.in-range {
              background: #ebf4f8;
              color: #000;
              border-radius: 0;
            }
            
            &.active {
              background: #357ebd;
              color: #fff;
              border-radius: 0;
            }
            
            &.start-date {
              border-radius: 4px 0 0 4px;
            }
            
            &.end-date {
              border-radius: 0 4px 4px 0;
            }
            
            &.start-date.end-date {
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
  
  .drp-buttons {
    clear: both;
    text-align: left;
    padding: 8px;
    border-top: 1px solid #ccc;
    background: #f9f9f9;
    
    .drp-selected {
      float: left;
      font-size: 12px;
      line-height: 30px;
      color: #555;
      margin-right: 10px;
    }
    
    button {
      float: right;
      margin-left: 5px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.4;
      border-radius: 3px;
      cursor: pointer;
      border: 1px solid #ccc;
      padding: 4px 8px;
      
      &.cancelBtn {
        background: #fff;
        color: #333;
        
        &:hover {
          background: #f0f0f0;
        }
      }
      
      &.applyBtn {
        background: #357ebd;
        color: #fff;
        border-color: #357ebd;
        
        &:hover {
          background: #2e6da4;
        }
      }
    }
  }
}
</style> 