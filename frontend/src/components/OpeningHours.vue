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
        <div class="opening-time">
          {{ hours.open }}
        </div>
        <div class="time-separator">
          -
        </div>
        <div class="closing-time">
          {{ hours.close }}
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
  height: 110px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  justify-content: center;
  align-items: center;
  padding: 16px 12px;
  min-height: 0;
}

.opening-time {
  font-size: 17px;
  font-weight: 500;
  color: #333;
  line-height: 1.2;
  margin-bottom: 1px;
}

.time-separator {
  font-size: 15px;
  color: #666;
  line-height: 1.2;
  margin: 1px 0;
}

.closing-time {
  font-size: 17px;
  font-weight: 500;
  color: #333;
  line-height: 1.2;
  margin-top: 1px;
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
  
  .day-name {
    font-size: 14px;
  }
  
  .opening-time,
  .closing-time {
    font-size: 15px;
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
  
  .day-header {
    padding: 8px 6px;
    min-height: 28px;
  }
  
  .times-section {
    padding: 12px 8px;
  }
  
  .day-name {
    font-size: 13px;
  }
  
  .opening-time,
  .closing-time {
    font-size: 14px;
  }
  
  .time-separator {
    font-size: 13px;
  }
}
</style> 
