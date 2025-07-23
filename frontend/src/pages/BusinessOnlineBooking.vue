<script setup>
import DropZone from '@/@core/components/DropZone.vue'
import GoogleMapPicker from '@/components/GoogleMapPicker.vue'
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'
import { computed, ref } from 'vue'

// VDialog is globally available via Vuetify, no need to import

const TOTAL_STEPS = 6
const step = ref(0)

// Consolidated model values
const modelValues = ref({
  displayName: '',
  businessEmail: '',
  locationAddress: '',
  currentLocation: {
    lat: 41.9028,
    lng: 12.4964,
    address: '',
  },
  manualAddress: {
    address: '',
    apt: '',
    district: '',
    city: '',
    county: '',
    postcode: '',
    directions: '',
    country: 'Bangladesh',
  },
  selectedDays: [],
  openingHours: {},
  venueImages: [],
  venueDescription: '',
})

const showManualDialog = ref(false)
const mapRef = ref(null)




const progress = computed(() => ((step.value + 1) / TOTAL_STEPS) * 100)

function nextStep() {
  if (step.value < TOTAL_STEPS - 1) step.value++
}
function prevStep() {
  if (step.value > 0) step.value--
}
function saveAndExit() {
  // Only show save and exit on last step
  if (step.value === TOTAL_STEPS - 1) {
    console.log('All model values:', modelValues.value)

    // Implement save and exit logic here
  }
}
function close() {
  // Implement close logic
}
function openManualDialog() {
  showManualDialog.value = true
}
function closeManualDialog() {
  showManualDialog.value = false
}
function saveManualAddress() {
  // Save manual address logic
  showManualDialog.value = false
}

function handleLocationChanged(location) {
  modelValues.value.currentLocation = location
  modelValues.value.locationAddress = location.address
}

function handleAddressChanged(address) {
  modelValues.value.locationAddress = address
}

const daysOfWeek = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
]

// Initialize selectedDays and openingHours in modelValues
modelValues.value.selectedDays = daysOfWeek.map(d => d.key)
modelValues.value.openingHours = {}

// Ensure openingHours is initialized for all selected days
modelValues.value.selectedDays.forEach(dayKey => {
  if (!modelValues.value.openingHours[dayKey]) {
    modelValues.value.openingHours[dayKey] = [{ from: '10:00', to: '19:00' }]
  }
})

const selectedDayObjects = computed(() => daysOfWeek.filter(day => modelValues.value.selectedDays.includes(day.key)))

function toggleDay(dayKey) {
  if (modelValues.value.selectedDays.includes(dayKey)) {
    modelValues.value.selectedDays = modelValues.value.selectedDays.filter(d => d !== dayKey)
    delete modelValues.value.openingHours[dayKey]
  } else {
    modelValues.value.selectedDays.push(dayKey)
    if (!modelValues.value.openingHours[dayKey]) {
      modelValues.value.openingHours[dayKey] = [{ from: '10:00', to: '19:00' }]
    }
  }
}

function updateSlot(dayKey, slotIndex, field, value) {
  if (!modelValues.value.openingHours[dayKey]) {
    modelValues.value.openingHours[dayKey] = []
  }
  modelValues.value.openingHours[dayKey][slotIndex][field] = value
}

function addSlot(dayKey) {
  if (!modelValues.value.openingHours[dayKey]) {
    modelValues.value.openingHours[dayKey] = []
  }
  modelValues.value.openingHours[dayKey].push({ from: '10:00', to: '19:00' })
}

function removeSlot(dayKey, slotIndex) {
  if (modelValues.value.openingHours[dayKey]) {
    modelValues.value.openingHours[dayKey].splice(slotIndex, 1)
  }
}

function copyToAllDays() {
  const lastEditedDayKey = lastEditedDay.value
  if (!lastEditedDayKey) return

  const lastEditedDaySlots = modelValues.value.openingHours[lastEditedDayKey]
  if (!lastEditedDaySlots || lastEditedDaySlots.length === 0) return

  modelValues.value.selectedDays.forEach(dayKey => {
    modelValues.value.openingHours[dayKey] = lastEditedDaySlots.map(slot => ({ ...slot }))
  })
  showCopyPrompt.value = false
}

const showCopyPrompt = ref(false)
const lastEditedDay = ref(null)

function updateLastEditedDay(dayKey) {
  lastEditedDay.value = dayKey
  showCopyPrompt.value = true
}

function getSlotsForDay(dayKey) {
  return modelValues.value.openingHours[dayKey] || []
}

const timeOptions = Array.from({ length: 24 * 12 }, (_, i) => {
  const h = String(Math.floor(i / 12)).padStart(2, '0')
  const m = String((i % 12) * 5).padStart(2, '0')
  
  return `${h}:${m}`
})

function getAvailableToOptions(dayKey, idx) {
  // For the second slot, exclude the 'from' time of the first slot
  if (idx === 1 && modelValues.value.openingHours[dayKey] && modelValues.value.openingHours[dayKey][0]) {
    return timeOptions.filter(t => t !== modelValues.value.openingHours[dayKey][0].from)
  }
  
  return timeOptions
}

const venueDescriptionMax = 600
const venueDescriptionMin = 200
</script>

<template>
  <BusinessLayout>
    <div class="booking-intro-wrapper">
      <div class="booking-progress-bar">
        <div class="progress-track">
          <div
            class="progress-fill"
            :style="{ width: progress + '%' }"
          />
        </div>
      </div>
      <div class="booking-intro-header">
        <VBtn
          v-if="step > 0"
          icon
          variant="text"
          class="back-arrow-btn"
          @click="prevStep"
        >
          <VIcon icon="tabler-arrow-left" />
        </VBtn>
        <div class="flex-grow-1" />
        <VBtn
          v-if="step === TOTAL_STEPS - 1"
          variant="outlined"
          @click="saveAndExit"
        >
          Save and exit
        </VBtn>
        <VBtn
          v-if="step < TOTAL_STEPS - 1"
          color="black"
          class="continue-btn"
          append-icon="tabler-arrow-right"
          @click="nextStep"
        >
          Continue
        </VBtn>
      </div>
      <VCard
        flat
        class="booking-intro-card"
      >
        <template v-if="step === 0">
          <!-- Intro Step -->
          <VRow class="intro-row">
            <VCol
              cols="12"
              md="6"
              class="d-flex align-center justify-center"
            >
              <div class="intro-content">
                <h1 class="booking-intro-title">
                  Get published on the chatbookly marketplace to grow your business
                </h1>
              </div>
            </VCol>
            <VCol
              cols="12"
              md="6"
              class="d-flex align-center"
            >
              <div class="booking-steps">
                <div class="booking-step">
                  <div class="step-index">
                    1
                  </div>
                  <div class="step-content">
                    <div class="step-title">
                      Tell us about your business
                    </div>
                    <div class="step-desc">
                      Share some basic info, like your venue name, location and opening hours
                    </div>
                  </div>
                  <img
                    src="/images/svg/gift.svg"
                    alt="Shop Icon"
                    class="step-icon"
                  >
                </div>
                <VDivider class="my-4" />
                <div class="booking-step">
                  <div class="step-index">
                    2
                  </div>
                  <div class="step-content">
                    <div class="step-title">
                      Stand out online
                    </div>
                    <div class="step-desc">
                      Add images of your location, select some venue highlights and craft a compelling description to make your profile pop
                    </div>
                  </div>
                  <img
                    src="/images/svg/rocket.svg"
                    alt="Rocket Icon"
                    class="step-icon"
                  >
                </div>
                <VDivider class="my-4" />
                <div class="booking-step">
                  <div class="step-index">
                    3
                  </div>
                  <div class="step-content">
                    <div class="step-title">
                      Accept online bookings
                    </div>
                    <div class="step-desc">
                      With a complete profile you're ready to start taking online bookings directly and on the marketplace
                    </div>
                  </div>
                  <img
                    src="/images/svg/laptop.svg"
                    alt="Calendar Icon"
                    class="step-icon"
                  >
                </div>
              </div>
            </VCol>
          </VRow>
        </template>
        <template v-else-if="step === 1">
          <!-- Venue Essentials Step -->
          <div class="venue-essentials-form">
            <h1 class="venue-title">
              Venue essentials
            </h1>
            <div class="venue-desc">
              Add the display name you'd like to be known by and how clients can get in touch with you
            </div>
            <VForm class="venue-form-fields">
              <div class="venue-field">
                <label class="venue-label">Display name</label>
                <VTextField
                  v-model="modelValues.displayName"
                  placeholder="e.g. Asif Barbershop"
                  variant="outlined"
                  hide-details
                />
              </div>
              <div class="venue-field">
                <label class="venue-label">Business email</label>
                <div class="venue-field-desc">
                  Choose where clients replies are sent when they respond to appointment emails
                </div>
                <VTextField
                  v-model="modelValues.businessEmail"
                  placeholder="e.g. mcbbbook@gmail.com"
                  variant="outlined"
                  hide-details
                />
              </div>
            </VForm>
          </div>
        </template>
        <template v-else-if="step === 2">
          <!-- Location Step -->
          <div class="venue-essentials-form">
            <h1 class="venue-title">
              Where is your business located
            </h1>
            <div class="venue-desc">
              Where can clients find you? Make sure you adjust the pin to the correct location
            </div>
            <div class="venue-field">
              <label class="venue-label">Location address</label>
              <!--
                <VTextField
                v-model="modelValues.locationAddress"
                placeholder="Search address..."
                variant="outlined"
                /> 
              -->
            </div>
            <div class="map-section">
              <GoogleMapPicker
                ref="mapRef"
                :initial-address="modelValues.locationAddress"
                :initial-lat="modelValues.currentLocation.lat"
                :initial-lng="modelValues.currentLocation.lng"
                @location-changed="handleLocationChanged"
                @address-changed="handleAddressChanged"
              >
                <template #actions>
                  <VBtn
                    size="small"
                    variant="outlined"
                    style="margin-left: 0.5rem;"
                    @click="openManualDialog"
                  >
                    Edit
                  </VBtn>
                </template>
              </GoogleMapPicker>
              <div class="map-instructions">
                Drag the map to adjust the pin position
              </div>
            </div>
            <div class="venue-field mt-6">
              <div class="venue-label">
                Getting there <span class="optional">(Optional)</span>
              </div>
              <div class="venue-field-desc">
                Provide additional instructions to help your clients easily locate your venue entrance e.g. there is free parking behind the blue bakery, the access code to parking is 1234 etc
              </div>
              <VBtn
                variant="outlined"
                prepend-icon="tabler-plus"
              >
                Add instructions
              </VBtn>
            </div>
          </div>
          <VDialog
            v-model="showManualDialog"
            max-width="600"
          >
            <VCard>
              <VCardTitle class="pb-0">
                Enter address manually
              </VCardTitle>
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VTextField
                      v-model="modelValues.manualAddress.address"
                      label="Address"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VTextField
                      v-model="modelValues.manualAddress.apt"
                      label="Apt./Suite etc"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VTextField
                      v-model="modelValues.manualAddress.district"
                      label="District"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VTextField
                      v-model="modelValues.manualAddress.city"
                      label="City"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VTextField
                      v-model="modelValues.manualAddress.county"
                      label="County"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VTextField
                      v-model="modelValues.manualAddress.postcode"
                      label="Postcode"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="modelValues.manualAddress.directions"
                      label="Directions"
                      variant="outlined"
                      counter="100"
                      maxlength="100"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="modelValues.manualAddress.country"
                      label="Country"
                      variant="outlined"
                      disabled
                    />
                  </VCol>
                </VRow>
              </VCardText>
              <VCardActions class="justify-end">
                <VBtn
                  variant="outlined"
                  @click="closeManualDialog"
                >
                  Cancel
                </VBtn>
                <VBtn
                  color="black"
                  @click="saveManualAddress"
                >
                  Save
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </template>
        <template v-else-if="step === 3">
          <!-- Opening Hours Step -->
          <div class="venue-essentials-form opening-hours-form text-center">
            <h1 class="venue-title">
              Add your opening hours
            </h1>
            <div class="venue-desc">
              Let clients know your standard opening hours. These will be displayed on your profile but do not affect your scheduled shifts.
            </div>
            <div class="day-selector">
              <button
                v-for="day in daysOfWeek"
                :key="day.key"
                class="day-circle"
                :class="[modelValues.selectedDays.includes(day.key) ? 'selected' : '']"
                type="button"
                @click="toggleDay(day.key)"
              >
                {{ day.label }}
              </button>
            </div>
            <div class="opening-hours-list">
              <div
                v-for="day in selectedDayObjects"
                :key="day.key"
                class="day-row"
              >
                <div class="day-label">
                  <span class="day-name">{{ day.label }}</span>
                  <span class="open-label">Open</span>
                </div>
                <div class="slots">
                  <div
                    v-for="(slot, idx) in getSlotsForDay(day.key)"
                    :key="idx"
                    class="slot-row"
                  >
                    <select
                      v-model="slot.from"
                      class="time-select"
                      @change="e => updateSlot(day.key, idx, 'from', e.target.value)"
                    >
                      <option
                        v-for="t in timeOptions"
                        :key="t"
                        :value="t"
                      >
                        {{ t }}
                      </option>
                    </select>
                    <span class="to-label">To</span>
                    <select
                      v-model="slot.to"
                      class="time-select"
                      @change="e => updateSlot(day.key, idx, 'to', e.target.value)"
                    >
                      <option
                        v-for="t in getAvailableToOptions(day.key, idx)"
                        :key="t"
                        :value="t"
                      >
                        {{ t }}
                      </option>
                    </select>
                    <VBtn
                      v-if="getSlotsForDay(day.key).length > 1"
                      icon
                      variant="text"
                      color="error"
                      @click="removeSlot(day.key, idx)"
                    >
                      <VIcon icon="tabler-x" />
                    </VBtn>
                    <VBtn
                      v-if="getSlotsForDay(day.key).length < 2 && idx === getSlotsForDay(day.key).length - 1"
                      icon
                      variant="text"
                      color="primary"
                      @click="addSlot(day.key)"
                    >
                      <VIcon icon="tabler-plus" />
                    </VBtn>
                  </div>
                </div>
                <div
                  v-if="showCopyPrompt && lastEditedDay === day.key"
                  class="copy-prompt"
                >
                  <span>Copy these working hours to all other days?</span>
                  <VBtn
                    size="small"
                    color="primary"
                    variant="tonal"
                    @click="copyToAllDays"
                  >
                    Yes, copy
                  </VBtn>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="step === 4">
          <div class="venue-images-form">
            <h1 class="venue-title">
              Update venue images
            </h1>
            <div class="venue-desc">
              Add at least 3 images of your location to your profile. You can add more or make changes later. Drag and drop to change the order of the images.
            </div>
            <DropZone v-model="modelValues.venueImages" />
            <div class="file-requirements">
              File type .jpg, .png · minimum dimensions 916 x 500 pixels · max size 10 MB
            </div>
          </div>
        </template>
        <template v-else-if="step === 5">
          <div class="venue-description-form">
            <h1 class="venue-title">
              Tell us a bit about this venue
            </h1>
            <div class="venue-desc">
              The most effective descriptions showcase key details about your business and highlight what makes your venue stand out, helping to attract and engage clients
            </div>
            <div class="venue-description-section">
              <div class="d-flex justify-space-between align-center mb-1">
                <label class="venue-label">Venue description</label>
                <span class="desc-count">{{ modelValues.venueDescription.length }}/{{ venueDescriptionMax }}</span>
              </div>
              <textarea
                v-model="modelValues.venueDescription"
                :maxlength="venueDescriptionMax"
                class="venue-description-textarea"
                rows="6"
                placeholder="Describe your venue..."
              />
              <div class="desc-minimum">
                A minimum of {{ venueDescriptionMin }} characters is required
              </div>
            </div>
          </div>
        </template>
      </VCard>
    </div>
  </BusinessLayout>
</template>

<style scoped>
.booking-intro-wrapper {
  padding: 2rem ;
}
.booking-progress-bar {
  margin-bottom: 0.5rem;
}
.progress-track {
  width: 100%;
  height: 4px;
  background: #f3f3f3;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.progress-fill {
  height: 100%;
  background: #8B5CF6;
  border-radius: 2px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.booking-intro-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}
.back-arrow-btn {
  margin-right: 0.5rem;
}
.flex-grow-1 {
  flex-grow: 1;
}
.booking-intro-card {
  padding: 2.5rem 2rem;
  background: transparent;
  box-shadow: none;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.intro-row {
  width: 100%;
  align-items: center;
}

.intro-content {
  text-align: center;
}
.booking-intro-title {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0;
  color: black;
}
.highlight {
  color: #8B5CF6;
}
.booking-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: black !important;
}
.booking-step {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.step-index {
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 0.5rem;
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 1.1rem;
  font-weight: 600;
}
.step-desc {
  font-size: 1rem;
}
.step-icon {
  width: 48px;
  height: 48px;
}
.continue-btn {
  font-weight: 600;
  color: black;
}
.venue-essentials-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem 0;
  color: black !important;
}
.venue-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.venue-desc {
  margin-bottom: 2rem;
}
.venue-form-fields {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.venue-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.venue-label {
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.venue-field-desc {
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}
.optional {
  font-weight: 400;
  font-size: 0.95rem;
}
.map-section {
  margin-top: 2rem;
}
.map-instructions {
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
.opening-hours-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}
.day-selector {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.day-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #8B5CF6;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.day-circle.selected {
  background: #8B5CF6;
  color: #fff;
  box-shadow: 0 0 0 2px #8B5CF6;
}
.day-circle:not(.selected) {
  background: #f3f3f3;
  color: #8B5CF6;
}
.opening-hours-list {
  max-width: 600px;
  margin: 0 auto;
}
.day-row {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1.5rem;
  justify-content: center;
}
.day-label {
  min-width: 90px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}
.day-name {
  margin-bottom: 0.2rem;
}
.open-label {
  color: #22c55e;
  font-size: 0.95rem;
  font-weight: 500;
}
.slots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.slot-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.to-label {
  margin: 0 0.5rem;
  font-weight: 500;
}
.copy-prompt {
  background: #f5f3ff;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
}
.time-select {
  width: 90px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  padding: 0 1.2rem;
  background: #fff;
  appearance: none;
  outline: none;
  transition: border 0.2s;
  margin-right: 0.5rem;
}
.time-select:focus {
  border: 1.5px solid #8B5CF6;
}
.to-label {
  font-size: 1.1rem;
  margin: 0 1rem;
  font-weight: 500;
}
.slot-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.remove-btn {
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
}
.venue-images-form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 0;
}
.file-requirements {
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
.venue-description-form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 0;
}
.venue-description-section {
  margin-top: 2rem;
}
.venue-description-textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-size: 1.1rem;
  padding: 1rem;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: border 0.2s;
}
.venue-description-textarea:focus {
  border: 1.5px solid #8B5CF6;
}
.desc-count {
  font-size: 1rem;
}
.desc-minimum {
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
@media (max-width: 960px) {
  .booking-intro-title {
    font-size: 1.5rem;
  }
  .booking-intro-card {
    padding: 1.5rem 0.5rem;
  }
}
</style> 

