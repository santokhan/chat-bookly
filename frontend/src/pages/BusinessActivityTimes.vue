<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
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

const goToSettings = () => {
  // Navigate to settings page
  console.log('Navigate to settings')
}
</script>

<template>
  <BusinessLayout>
    <VCard class="opening-hours-container">
      <VCardText class="pa-6">
        <!-- Main Heading -->
        <h2 class="text-h4 font-weight-bold mb-3">
          Opening hours
        </h2>
        
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

        <!-- Daily Hours Cards -->
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
  font-size: 14px;
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
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.2;
  margin-bottom: 1px;
}

.time-separator {
  font-size: 14px;
  color: #666;
  line-height: 1.2;
  margin: 1px 0;
}

.closing-time {
  font-size: 16px;
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
    font-size: 13px;
  }
  
  .opening-time,
  .closing-time {
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
  
  .day-header {
    padding: 8px 6px;
    min-height: 28px;
  }
  
  .times-section {
    padding: 12px 8px;
  }
  
  .day-name {
    font-size: 12px;
  }
  
  .opening-time,
  .closing-time {
    font-size: 13px;
  }
  
  .time-separator {
    font-size: 12px;
  }
}
</style>
