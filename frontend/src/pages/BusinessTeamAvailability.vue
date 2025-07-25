<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

// Sample data - in real app this would come from an API
const teamMembers = ref([
  {
    id: 1,
    name: 'marco Agency',
    avatar: null,
    initials: 'MA',
    role: '52h',
    shifts: {
      monday: [{ start: '09:00', end: '19:00', type: 'primary' }],
      tuesday: [{ start: '09:00', end: '19:00', type: 'primary' }],
      wednesday: [
        { start: '09:00', end: '13:00', type: 'primary' },
        { start: '16:00', end: '20:00', type: 'primary' },
      ],
      thursday: [{ start: '09:00', end: '19:00', type: 'primary' }],
      friday: [{ start: '09:00', end: '19:00', type: 'primary' }],
      saturday: [{ start: '10:00', end: '17:00', type: 'primary' }],
      sunday: [{ start: '10:00', end: '17:00', type: 'primary' }],
    },
  },
  {
    id: 2,
    name: 'Wendy Smith...',
    avatar: '/images/avatars/avatar-2.png',
    initials: 'WS',
    role: '54h',
    shifts: {
      monday: [{ start: '09:00', end: '19:00', type: 'secondary' }],
      tuesday: [{ start: '09:00', end: '19:00', type: 'secondary' }],
      wednesday: [{ start: '09:00', end: '19:00', type: 'secondary' }],
      thursday: [{ start: '09:00', end: '19:00', type: 'secondary' }],
      friday: [{ start: '09:00', end: '19:00', type: 'secondary' }],
      saturday: [{ start: '10:00', end: '17:00', type: 'secondary' }],
      sunday: [{ start: '10:00', end: '17:00', type: 'secondary' }],
    },
  },
])

// Week navigation and date picker
const currentWeek = ref('This week')
const weekRange = ref('21 - 27 Jul, 2025')
const isDatePickerOpen = ref(false)
const selectedDate = ref(new Date())
const dateRange = ref([new Date(), new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)])

// Days of the week with hours
const daysOfWeek = [
  { day: 'Mon', date: '21 Jul', hours: '20h' },
  { day: 'Tue', date: '22 Jul', hours: '20h' },
  { day: 'Wed', date: '23 Jul', hours: '18h' },
  { day: 'Thu', date: '24 Jul', hours: '20h' },
  { day: 'Fri', date: '25 Jul', hours: '20h' },
  { day: 'Sat', date: '26 Jul', hours: '14h' },
  { day: 'Sun', date: '27 Jul', hours: '14h' },
]

const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

// Mobile view state
const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 960)

// Methods
const editTeamMember = member => {
  console.log('Edit team member:', member.name)
}

const previousWeek = () => {
  console.log('Previous week')
}

const nextWeek = () => {
  console.log('Next week')
}

const openOptions = () => {
  console.log('Open options')
}

const addNew = () => {
  console.log('Add new')
}

const getShiftColor = type => {
  return type === 'primary' ? 'primary' : 'warning'
}

const getShiftBgClass = type => {
  return type === 'primary' ? 'bg-primary' : 'bg-warning'
}

const openDatePicker = () => {
  isDatePickerOpen.value = true
}

const updateDateRange = dates => {
  if (dates && dates.length > 0) {
    dateRange.value = dates


    // Update week range display
    const startDate = new Date(dates[0])
    const endDate = dates.length > 1 ? new Date(dates[dates.length - 1]) : startDate
    const options = { day: 'numeric', month: 'short' }

    weekRange.value = `${startDate.toLocaleDateString('en-GB', options)} - ${endDate.toLocaleDateString('en-GB', options)}, ${startDate.getFullYear()}`
  }
  isDatePickerOpen.value = false
}
</script>

<template>
  <BusinessLayout>
    <VCard class="mb-6">
      <!-- Header Section -->
      <VCardItem class="pb-0">
        <VRow
          align="center"
          no-gutters
        >
          <VCol
            cols="12"
            md="6"
          >
            <VCardTitle class="text-h5 pa-0 font-weight-bold">
              Scheduled shifts
            </VCardTitle>
          </VCol>
          <VCol
            cols="12"
            md="6"
            class="text-end"
          >
            <VBtn
              variant="outlined"
              color="primary"
              class="me-2"
              @click="openOptions"
            >
              Options
              <VIcon
                end
                icon="tabler-chevron-down"
              />
            </VBtn>
            <VBtn
              color="primary"
              @click="addNew"
            >
              Add
              <VIcon
                end
                icon="tabler-chevron-down"
              />
            </VBtn>
          </VCol>
        </VRow>
      </VCardItem>

      <!-- Week Navigation -->
      <VCardText class="pb-0">
        <VRow
          align="center"
          justify="center"
          class="mb-4"
        >
          <VCol cols="auto">
            <VBtn
              icon
              variant="text"
              size="small"
              color="primary"
              @click="previousWeek"
            >
              <VIcon icon="tabler-chevron-left" />
            </VBtn>
          </VCol>
          <VCol
            cols="auto"
            class="text-center"
          >
            <VBtn
              variant="text"
              color="primary"
              class="d-flex flex-column align-center pa-2"
              style="height: auto;"
              @click="openDatePicker"
            >
              <div class="text-body-1 font-weight-medium">
                {{ currentWeek }}
              </div>
              <div class="text-body-2 text-medium-emphasis">
                {{ weekRange }}
              </div>
            </VBtn>
            
            <!-- Date Picker Dialog -->
            <VDialog
              v-model="isDatePickerOpen"
              max-width="400px"
            >
              <VCard>
                <VCardTitle class="text-h6 font-weight-bold">
                  Select Date Range
                </VCardTitle>
                <VCardText>
                  <AppDateTimePicker
                    v-model="dateRange"
                    range
                    label="Select week or date range"
                    @update:model-value="updateDateRange"
                  />
                </VCardText>
                <VCardActions>
                  <VSpacer />
                  <VBtn
                    variant="text"
                    color="primary"
                    @click="isDatePickerOpen = false"
                  >
                    Cancel
                  </VBtn>
                  <VBtn
                    color="primary"
                    @click="updateDateRange(dateRange)"
                  >
                    Apply
                  </VBtn>
                </VCardActions>
              </VCard>
            </VDialog>
          </VCol>
          <VCol cols="auto">
            <VBtn
              icon
              variant="text"
              size="small"
              color="primary"
              @click="nextWeek"
            >
              <VIcon icon="tabler-chevron-right" />
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>

      <!-- Desktop Schedule Grid -->
      <VCardText
        v-if="!isMobile"
        class="pa-0"
      >
        <VContainer
          fluid
          class="pa-4"
        >
          <!-- Header Row -->
          <VRow
            no-gutters
            class="schedule-header mb-3"
          >
            <VCol
              cols="2"
              class="pe-2"
            >
              <div class="text-body-2 font-weight-bold text-medium-emphasis pa-2">
                Team member 
                <VBtn
                  variant="text"
                  size="x-small"
                  color="primary"
                >
                  Change
                </VBtn>
              </div>
            </VCol>
            <VCol 
              v-for="(day, dayIndex) in daysOfWeek" 
              :key="dayIndex"
              class="text-center px-1"
            >
              <div class="day-header pa-2">
                <div class="text-body-2 font-weight-bold">
                  {{ day.day }}, {{ day.date }}
                </div>
                <div class="text-caption text-medium-emphasis">
                  {{ day.hours }}
                </div>
              </div>
            </VCol>
          </VRow>

          <!-- Team Member Rows -->
          <VRow 
            v-for="member in teamMembers" 
            :key="member.id"
            no-gutters 
            class="schedule-row mb-2"
          >
            <!-- Team Member Info -->
            <VCol
              cols="2"
              class="pe-2"
            >
              <div class="d-flex align-center pa-2 h-100">
                <VAvatar
                  size="32"
                  class="me-3"
                  :color="!member.avatar ? 'primary' : undefined"
                  :image="member.avatar"
                >
                  <span
                    v-if="!member.avatar"
                    class="text-caption"
                  >{{ member.initials }}</span>
                </VAvatar>
                <div class="flex-grow-1 me-2">
                  <div class="text-body-2 font-weight-bold text-truncate">
                    {{ member.name }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ member.role }}
                  </div>
                </div>
                <VBtn
                  icon
                  variant="text"
                  size="x-small"
                  color="primary"
                  @click="editTeamMember(member)"
                >
                  <VIcon
                    icon="tabler-edit"
                    size="16"
                  />
                </VBtn>
              </div>
            </VCol>

            <!-- Schedule Days -->
            <VCol 
              v-for="dayKey in dayKeys" 
              :key="dayKey"
              class="px-1"
            >
              <div class="day-column pa-1 h-100">
                <div
                  v-for="(shift, shiftIndex) in member.shifts[dayKey]"
                  :key="shiftIndex"
                  class="shift-block mb-1"
                  :class="[
                    getShiftBgClass(shift.type),
                    shift.type === 'primary' ? 'text-on-primary' : 'text-on-warning'
                  ]"
                >
                  <div class="text-caption font-weight-medium">
                    {{ shift.start }} - {{ shift.end }}
                  </div>
                </div>
              </div>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>

      <!-- Mobile Schedule List -->
      <VCardText
        v-else
        class="pa-0"
      >
        <VContainer
          fluid
          class="pa-4"
        >
          <VRow>
            <VCol cols="12">
              <VExpansionPanels multiple>
                <VExpansionPanel
                  v-for="member in teamMembers"
                  :key="member.id"
                  class="mb-2"
                >
                  <VExpansionPanelTitle>
                    <div class="d-flex align-center w-100">
                      <VAvatar
                        size="32"
                        class="me-3"
                        :color="!member.avatar ? 'primary' : undefined"
                        :image="member.avatar"
                      >
                        <span
                          v-if="!member.avatar"
                          class="text-caption"
                        >{{ member.initials }}</span>
                      </VAvatar>
                      <div>
                        <div class="text-body-2 font-weight-bold">
                          {{ member.name }}
                        </div>
                        <div class="text-caption text-medium-emphasis">
                          {{ member.role }}
                        </div>
                      </div>
                    </div>
                  </VExpansionPanelTitle>
                  
                  <VExpansionPanelText>
                    <VRow>
                      <VCol 
                        v-for="(day, index) in daysOfWeek" 
                        :key="index"
                        cols="12"
                        class="py-2"
                      >
                        <div class="d-flex justify-space-between align-center mb-2">
                          <div>
                            <div class="text-body-2 font-weight-bold">
                              {{ day.day }}, {{ day.date }}
                            </div>
                            <div class="text-caption text-medium-emphasis">
                              {{ day.hours }}
                            </div>
                          </div>
                        </div>
                        <div class="d-flex flex-wrap gap-1">
                          <VChip
                            v-for="(shift, shiftIndex) in member.shifts[dayKeys[index]]"
                            :key="shiftIndex"
                            :color="getShiftColor(shift.type)"
                            size="small"
                            class="me-1"
                          >
                            {{ shift.start }} - {{ shift.end }}
                          </VChip>
                        </div>
                        <VDivider
                          v-if="index !== daysOfWeek.length - 1"
                          class="mt-3"
                        />
                      </VCol>
                    </VRow>
                  </VExpansionPanelText>
                </VExpansionPanel>
              </VExpansionPanels>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
    </VCard>
  </BusinessLayout>
</template>

<style scoped>
.schedule-header {
  border-bottom: 1px solid #e7e7e7;
}

.schedule-row {
  border-bottom: 1px solid #f5f5f5;
  min-height: 80px;
}

.schedule-row:last-child {
  border-bottom: none;
}

.day-header {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #f5f5f5;
}

.day-column {
  min-height: 80px;
  background-color: rgba(var(--v-theme-surface), 0.3);
  border-radius: 4px;
  position: relative;
  border-right: 1px solid #f5f5f5;
}

.shift-block {
  padding: 6px 8px;
  border-radius: 4px;
  text-align: center;
  position: relative;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}


.text-on-primary {
  color: #5a52d5 !important;
}

.text-on-warning {
  color: #b8860b !important;
}



/* .bg-primary,
.bg-warning {
  color: #000 !important;
} */

/* Responsive adjustments */
@media (max-width: 959px) {
  .schedule-grid {
    display: none;
  }
}

@media (min-width: 960px) {
  .mobile-schedule {
    display: none;
  }
}

/* Custom scrollbar for horizontal scroll on mobile */
.day-column::-webkit-scrollbar {
  height: 4px;
}

.day-column::-webkit-scrollbar-track {
  background: rgba(var(--v-theme-surface-variant), 0.1);
  border-radius: 2px;
}

.day-column::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.3);
  border-radius: 2px;
}

.day-column::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.5);
}
</style>
