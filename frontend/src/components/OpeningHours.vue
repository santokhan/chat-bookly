<script setup>
defineProps({
  openingHours: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <div
      v-for="(hours, index) in openingHours"
      :key="index"
      class="day-card"
    >
      <!-- Day Header -->
      <div class="day-header">
        <span class="day-name">{{ hours.day }}</span>
      </div>
      
      <!-- Times Section -->
      <div class="times-section">
        <div 
          v-for="(timeSlot, slotIndex) in hours.timeSlots || [{ start: hours.open, end: hours.close }]" 
          :key="slotIndex"
          class="time-slot"
        >
          <div class="time-display">
            {{ timeSlot.start }} {{ timeSlot.end }}
          </div>
          <div 
            v-if="slotIndex < (hours.timeSlots || [{ start: hours.open, end: hours.close }]).length - 1"
            class="time-separator-line"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.day-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 120px;
  height: 150px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.day-header {
  background-color: #f8f7ff;
  padding: 10px 6px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  flex: 0 0 auto;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-name {
  color: #6a5acd;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
}

.times-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 6px;
  min-height: 0;
  overflow-y: auto;
  max-height: 78px; /* Fixed height: 110px - 32px header */
}

.time-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2px;
}

.time-display {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  line-height: 1.1;
  text-align: center;
}

.time-separator-line {
  width: 80%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 2px 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .d-flex.flex-wrap {
    justify-content: center;
  }
  
  .day-card {
    width: 100px;
    height: 100px;
  }
  
  .times-section {
    max-height: 68px; /* Fixed height: 100px - 32px header */
  }
  
  .day-name {
    font-size: 14px;
  }
  
  .time-display {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .d-flex.flex-wrap {
    gap: 8px !important;
  }
  
  .day-card {
    width: 90px;
    height: 90px;
  }
  
  .times-section {
    max-height: 58px; /* Fixed height: 90px - 32px header */
  }
  
  .day-header {
    padding: 8px 6px;
    min-height: 28px;
  }
  
  .times-section {
    padding: 6px 4px;
  }
  
  .day-name {
    font-size: 13px;
  }
  
  .time-display {
    font-size: 13px;
  }
  
  .time-separator-line {
    margin: 1px 0;
  }
}
</style> 
