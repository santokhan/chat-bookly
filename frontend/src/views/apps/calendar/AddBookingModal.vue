<template>
    <VDialog v-model="isAppointmentModalOpen" max-width="500">
        <VCard style="border-radius: 1rem">
            <!-- Modal Header -->
            <VCardTitle class="d-flex justify-space-between align-start mt-2">
                <div class="d-flex align-center gap-2">
                    <VBtn variant="text" size="medium" color="black" style="
              border-radius: 50%;
              border: 1px solid #ccc;
              width: 42px;
              height: 42px;
              margin-right: 8px;
  ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M13.75 3.25H16.75C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H6.25V1.75H7.75V3.25H12.25V1.75H13.75V3.25ZM12.25 4.75H7.75V6.25H6.25V4.75H4V7.75H16V4.75H13.75V6.25H12.25V4.75ZM16 9.25H4V15.25H16V9.25Z"
                                fill="#525866" />
                        </svg>
                    </VBtn>

                    <div class="w-full">
                        <h4>Book an Appointment</h4>
                        <div class="text-caption text-wrap m-none">
                            Book an appointment with a professional
                        </div>
                    </div>
                </div>
                <VBtn variant="text" size="small" color="black" @click="close"
                    style="display: flex;align-items: center;justify-content: center;width: 32px;height: 32px;padding: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M10.0001 8.93949L13.7126 5.22699L14.7731 6.28749L11.0606 9.99999L14.7731 13.7125L13.7126 14.773L10.0001 11.0605L6.28755 14.773L5.22705 13.7125L8.93955 9.99999L5.22705 6.28749L6.28755 5.22699L10.0001 8.93949Z"
                            fill="#525866" />
                    </svg>
                </VBtn>

            </VCardTitle>
            <hr style="border: none; border-top: 2px solid #e7e7e7; margin-top: 0.5rem;" />

            <!-- Modal Body -->
            <VCardText>
                <!-- Client Type -->
                <div class="mb-3">
                    <label for="selectedClient" class="field-label">Select Client</label>
                    <VRadioGroup v-model="selectedClientType" class="-m-2">
                        <div class="d-flex align-center start" style="gap: 0.4rem;">
                            <div class="start">
                                <VRadio class="start" label="Existing" value="existing"
                                    style="letter-spacing: 0px; font-size: 14px;" />
                            </div>
                            <div>
                                <VRadio label="New" value="new" style="letter-spacing: 0px; font-size: 14px;" />
                            </div>
                        </div>
                    </VRadioGroup>
                </div>

                <!-- New Fields For Selected New -->
                <div v-if="selectedClientType === 'new'" class="newSection">
                    <div class="d-flex gap-4 fBtn">
                        <!-- First Name -->
                        <div class="flex-1 fBtn mb-3">
                            <label class="field-label mb-2" for="firstName">First Name<span class="star"
                                    color="primary">*</span></label>
                            <input id="firstName" v-model="form.firstName" type="text" placeholder="Jhon"
                                class="input-field" />
                        </div>

                        <!-- Last Name -->
                        <div class="flex-1 fBtn mb-3">
                            <label class="field-label mb-2" for="lastName">Last Name<span class="star"
                                    color="primary">*</span></label>
                            <input id="lastName" v-model="form.lastName" type="text" placeholder="Smith"
                                class="input-field" />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex-1 mb-3">
                        <label class="field-label mb-2" for="email">Email<span class="star"
                                color="primary">*</span></label>
                        <input id="email" v-model="form.email" type="email" placeholder="hello@brand.com"
                            class="input-field" />
                    </div>

                    <div class="flex-1 mb-3">
                        <label class="field-label mb-2" for="phone">Phone<span class="star"
                                color="primary">*</span></label>
                        <vue-tel-input id="phone" v-model="form.phone"
                            :input-options="{ placeholder: '(555) 000 0000' }" default-country="US"
                            :rules="[v => !!v || 'Phone is required']" class="input-field m-0" />
                    </div>
                    <p class="text-sm text-muted d-flex align-center gap-2 mb-0">
                        <VIcon icon="tabler-info-circle" size="18" />
                        New customer will save your clients list.
                    </p>
                </div>


                <div v-if="selectedClientType === 'existing'" class="mb-3">
                    <!-- Select Client Dropdown -->
                    <VMenu v-model="dropdown.client" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" color="gray" prepend-icon="tabler-user"
                                append-icon="tabler-chevron-down"
                                style="height: 41px;border-radius: 8px;letter-spacing: 0px;padding-left: 15px; font-size: 14px;"
                                class="vBtn custom-dropdown-btn">
                                <template #prepend>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                        fill="none">
                                        <path
                                            d="M9.99991 13.75C12.7464 13.75 15.1487 14.9312 16.4552 16.6937L15.0737 17.347C14.0102 16.087 12.1352 15.25 9.99991 15.25C7.86466 15.25 5.98966 16.087 4.92616 17.347L3.54541 16.693C4.85191 14.9305 7.25341 13.75 9.99991 13.75ZM9.99991 2.5C10.9945 2.5 11.9483 2.89509 12.6516 3.59835C13.3548 4.30161 13.7499 5.25544 13.7499 6.25V8.5C13.7499 9.46635 13.3768 10.3954 12.7084 11.0933C12.0401 11.7913 11.1281 12.2043 10.1627 12.2463L9.99991 12.25C9.00535 12.25 8.05152 11.8549 7.34826 11.1517C6.645 10.4484 6.24991 9.49456 6.24991 8.5V6.25C6.24997 5.28365 6.62307 4.35463 7.2914 3.65667C7.95974 2.95871 8.87172 2.54569 9.83716 2.50375L9.99991 2.5ZM9.99991 4C9.426 3.99997 8.87377 4.21924 8.45621 4.61296C8.03865 5.00668 7.78733 5.54508 7.75366 6.118L7.74991 6.25V8.5C7.74935 9.08568 7.97717 9.6485 8.38499 10.0689C8.7928 10.4892 9.34846 10.734 9.93388 10.7512C10.5193 10.7684 11.0884 10.5566 11.5201 10.1609C11.9519 9.76519 12.2124 9.2167 12.2462 8.632L12.2499 8.5V6.25C12.2499 5.65326 12.0129 5.08097 11.5909 4.65901C11.1689 4.23705 10.5966 4 9.99991 4Z"
                                            fill="#99A0AE" />
                                    </svg>
                                </template>
                                <span class="btn-label">{{ selectedClient || 'Select a client' }}</span>
                            </VBtn>
                        </template>
                        <VList>
                            <VListItem v-for="client in clientOptions" :key="client" @click="selectClient(client)">
                                {{ client }}
                            </VListItem>
                        </VList>
                    </VMenu>
                </div>


                <!-- Services Dropdown -->
                <div class="field mb-3">
                    <label for="selectedTeamMember" class="field-label">Services</label>
                    <VMenu v-model="dropdown.service" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" append-icon="tabler-chevron-down"
                                style="height: 41px;border-radius: 8px;padding-left: 15px;letter-spacing: 0px;font-size: 14px;"
                                class="vBtn custom-dropdown-btn">
                                <template #prepend>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                        fill="none">
                                        <path
                                            d="M6.25 4.75V2.5C6.25 2.30109 6.32902 2.11032 6.46967 1.96967C6.61032 1.82902 6.80109 1.75 7 1.75H13C13.1989 1.75 13.3897 1.82902 13.5303 1.96967C13.671 2.11032 13.75 2.30109 13.75 2.5V4.75H16.75C16.9489 4.75 17.1397 4.82902 17.2803 4.96967C17.421 5.11032 17.5 5.30109 17.5 5.5V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V5.5C2.5 5.30109 2.57902 5.11032 2.71967 4.96967C2.86032 4.82902 3.05109 4.75 3.25 4.75H6.25ZM4 13V15.25H16V13H4ZM4 11.5H16V6.25H4V11.5ZM7.75 3.25V4.75H12.25V3.25H7.75ZM9.25 9.25H10.75V10.75H9.25V9.25Z"
                                            fill="#99A0AE" />
                                    </svg>
                                </template>
                                <span class="btn-label">{{ selectedService || 'Select service' }}</span>
                            </VBtn>
                        </template>
                        <VList>
                            <VListItem v-for="service in serviceOptions" :key="service" @click="selectService(service)">
                                {{ service }}
                            </VListItem>
                        </VList>
                    </VMenu>
                </div>

                <!-- Team Member Dropdown -->
                <div class="field mb-3">
                    <label for="selectedTeamMember" class="field-label">Select Team Member</label>
                    <VMenu v-model="dropdown.team" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined"
                                style="height: 41px; border-radius: 8px;font-size: 14px;padding-left: 15px;"
                                append-icon="tabler-chevron-down" class="vBtn custom-dropdown-btn">
                                <template #prepend>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                        fill="none">
                                        <path
                                            d="M9.99991 13.75C12.7464 13.75 15.1487 14.9312 16.4552 16.6937L15.0737 17.347C14.0102 16.087 12.1352 15.25 9.99991 15.25C7.86466 15.25 5.98966 16.087 4.92616 17.347L3.54541 16.693C4.85191 14.9305 7.25341 13.75 9.99991 13.75ZM9.99991 2.5C10.9945 2.5 11.9483 2.89509 12.6516 3.59835C13.3548 4.30161 13.7499 5.25544 13.7499 6.25V8.5C13.7499 9.46635 13.3768 10.3954 12.7084 11.0933C12.0401 11.7913 11.1281 12.2043 10.1627 12.2463L9.99991 12.25C9.00535 12.25 8.05152 11.8549 7.34826 11.1517C6.645 10.4484 6.24991 9.49456 6.24991 8.5V6.25C6.24997 5.28365 6.62307 4.35463 7.2914 3.65667C7.95974 2.95871 8.87172 2.54569 9.83716 2.50375L9.99991 2.5ZM9.99991 4C9.426 3.99997 8.87377 4.21924 8.45621 4.61296C8.03865 5.00668 7.78733 5.54508 7.75366 6.118L7.74991 6.25V8.5C7.74935 9.08568 7.97717 9.6485 8.38499 10.0689C8.7928 10.4892 9.34846 10.734 9.93388 10.7512C10.5193 10.7684 11.0884 10.5566 11.5201 10.1609C11.9519 9.76519 12.2124 9.2167 12.2462 8.632L12.2499 8.5V6.25C12.2499 5.65326 12.0129 5.08097 11.5909 4.65901C11.1689 4.23705 10.5966 4 9.99991 4Z"
                                            fill="#99A0AE" />
                                    </svg>
                                </template>
                                <span class="btn-label">{{ selectedTeamMember || 'Any Team Member' }}</span>
                            </VBtn>
                        </template>
                        <VList>
                            <VListItem v-for="member in teamMembers" :key="member" @click="selectTeamMember(member)">
                                {{ member }}
                            </VListItem>
                        </VList>
                    </VMenu>
                </div>

                <div class="field-row mb-0">
                    <!-- Select Date -->
                    <div class="field">
                        <label for="selectedDate" class="field-label">Date</label>
                        <VMenu v-model="dropdown.date" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" append-icon="tabler-chevron-down"
                                    style="height: 41px;border-radius: 8px;padding-left: 15px;letter-spacing: 0px;font-size: 14px;"
                                    class="vBtn custom-dropdown-btn">
                                    <template #prepend>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M13.75 3.25H16.75C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H6.25V1.75H7.75V3.25H12.25V1.75H13.75V3.25ZM12.25 4.75H7.75V6.25H6.25V4.75H4V7.75H16V4.75H13.75V6.25H12.25V4.75ZM16 9.25H4V15.25H16V9.25Z"
                                                fill="#525866" />
                                        </svg>
                                    </template>
                                    <span class="btn-label">{{ selectedDate || 'Select Date' }}</span>
                                </VBtn>
                            </template>
                            <VList>
                                <VListItem v-for="date in dateOptions" :key="date" @click="selectDate(date)">
                                    {{ date }}
                                </VListItem>
                            </VList>
                        </VMenu>
                    </div>

                    <!-- Select Time -->
                    <div class="field">
                        <label for="selectedTime" class="field-label">Start Time</label>
                        <VMenu v-model="dropdown.time" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" append-icon="tabler-chevron-down"
                                    style="height: 41px;border-radius: 8px;padding-left: 15px;letter-spacing: 0px;font-size: 14px;"
                                    class="vBtn custom-dropdown-btn">
                                    <template #prepend>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                            viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM10.75 10H13.75V11.5H9.25V6.25H10.75V10Z"
                                                fill="#525866" />
                                        </svg>
                                    </template>
                                    <span class="btn-label">{{ selectedTime || 'Select Time' }}</span>
                                </VBtn>
                            </template>
                            <VList>
                                <VListItem v-for="time in timeOptions" :key="time" @click="selectTime(time)">
                                    {{ time }}
                                </VListItem>
                            </VList>
                        </VMenu>
                    </div>
                </div>
            </VCardText>

            <!-- Footer -->
            <hr style="border: none; border-top: 2px solid #e7e7e7;" />
            <div class="d-flex mx-2 justify-end gap-4 w-full spacing">
                <!-- Cancel Button -->
                <div class="flex-1 w-full fBtn">
                    <VBtn variant="outlined" color="gray" class="text-grey-darken-1 border-light"
                        style="border-color: #cccccc; font-size: 14px; border-radius: 8px; letter-spacing: 0px;" block
                        @click="close">
                        Cancel
                    </VBtn>
                </div>

                <!-- Submit Button -->
                <div class="flex-1 w-full fBtn">
                    <VBtn color="primary" class="text-white"
                        style="font-size: 14px; border-radius: 8px; letter-spacing: 0px;" block
                        @click="submitAppointment">
                        Book Appointment
                    </VBtn>
                </div>
            </div>

        </VCard>
    </VDialog>
</template>


<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
})

const props = defineProps({
    modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const isAppointmentModalOpen = ref(false)
watch(() => props.modelValue, val => isAppointmentModalOpen.value = val)
watch(isAppointmentModalOpen, val => emit('update:modelValue', val))

const selectedClientType = ref('existing')
const selectedClient = ref('')
const selectedService = ref('')
const selectedTeamMember = ref('')
const selectedDate = ref('')
const selectedTime = ref('')

const clientOptions = ['Ali', 'John', 'Sara']
const serviceOptions = ['Consultation', 'Development', 'Design']
const teamMembers = ['Umer', 'Hassan', 'Zoya']

const dateOptions = ['07/08/2025', '08/08/2025', '09/08/2025']
const timeOptions = ['10:00 AM', '12:00 PM', '03:00 PM']


const dropdown = ref({
    client: false,
    service: false,
    team: false,
    date: false,
    time: false,
})

const selectClient = (client) => {
    selectedClient.value = client
    dropdown.value.client = false
}
const selectService = (service) => {
    selectedService.value = service
    dropdown.value.service = false
}
const selectTeamMember = (member) => {
    selectedTeamMember.value = member
    dropdown.value.team = false
}

const selectDate = (date) => {
    selectedDate.value = date
    dropdown.value.date = false
}
const selectTime = (time) => {
    selectedTime.value = time
    dropdown.value.time = false
}

const close = () => emit('update:modelValue', false)

const submitAppointment = () => {
    console.log('Appointment Booked:', {
        selectedClientType: selectedClientType.value,
        selectedClient: selectedClient.value,
        selectedService: selectedService.value,
        selectedTeamMember: selectedTeamMember.value,
        selectedDate: selectedDate.value,
        selectedTime: selectedTime.value,
        form: form.value
    })
    close()
}
</script>

<style scoped>
.vBtn {
    justify-content: start;
    text-transform: none;
}

.field-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    /* Gap between date and time fields */
    margin-bottom: 1rem;
}

.field {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.field-label {
    margin-bottom: 6px;
    font-size: 15px;
    font-weight: 600;
    color: #242424;
}

.field-input-wrapper {
    position: relative;
}

.field-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 50px;
    color: #888;
}

.field-input {
    width: 100%;
    padding: 8px 150px 8px 0px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    height: 40px;
}

.custom-dropdown-btn {
    border-color: #ccc !important;
    color: var(--v-theme-text-secondary) !important;
    font-weight: 500;
    font-size: 16px;
}

.spacing {
    padding: 16px;
}

.fBtn {
    width: 100%;
}

.newSection {
    padding: 14px;
    border-radius: 8px;
    background-color: #F5F7FA;
    margin-bottom: 10px;
}

.input-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    height: 40px;
    outline: none;
    transition: border-color 0.2s;
    box-shadow: 1px 1px 1px rgba(var(--v-theme-text-disabled), 0.5);
    background-color: white;
}

.input-field:focus {
    border-color: #ccc;
    background-color: white;
    /* blue outline on focus */
}

.input-field::placeholder {
    color: rgb(var(--v-theme-text-tertiary)) !important;
    /* Your desired placeholder color */
    font-weight: 500;
    /* Your desired font weight (e.g., 400, 600, 700) */
    font-style: normal;
    /* Optional: if you want normal style */
}

.custom-dropdown-btn {
    position: relative;
    justify-content: flex-start !important;
    /* Align label and prepend icon to the left */
    padding-right: 2.5rem;
    /* Reserve space on the right for the append icon */
}

.custom-dropdown-btn .v-icon--append {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
}

.star {
    color: #435CFF;
    margin-left: 2px;
}

.text-caption {
    letter-spacing: normal !important;
    color: rgb(var(--v-theme-text-secondary)) !important;
    font-weight: 600 !important;
    font-size: 14px !important;
}

.start {
    margin-left: -2px;
}


/* For flag */
::v-deep(.vti__flag) {
    margin: 0 !important;
    padding: 0 !important;
    margin-right: 5px !important;
}

/* For dropdown arrow wrapper */
::v-deep(.vti__dropdown) {
    margin: 0 !important;
    padding: 0 !important;
    margin-right: 5px !important;
}

/* For dropdown arrow icon */
::v-deep(.vti__dropdown-arrow) {
    margin: 0 !important;
    padding: 0 !important;
}

/* Optionally, reduce input padding if needed */
::v-deep(.vti__input) {
    padding-left: 0 !important;
    /* or adjust as needed */
}

/* If you want to target all inputs inside vue-tel-input */
.vue-tel-input input::placeholder {
    color: #afafaf;
    /* your desired placeholder color */
    opacity: 1;
    /* optional, to ensure full color */
}

/* Or if you gave your component a custom class */
.input-field input::placeholder {
    color: #afafaf;
}
</style>