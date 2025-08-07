<template>
    <VDialog v-model="isAppointmentModalOpen" max-width="500">
        <VCard style="border-radius: 1rem">
            <!-- Modal Header -->
            <VCardTitle class="d-flex justify-space-between align-center mt-2">
                <div class="d-flex align-center gap-2">
                    <VBtn icon="tabler-calendar" variant="text" size="small" color="black" style="
              border-radius: 50%;
              border: 1px solid #ccc;
              width: 36px;
              height: 36px;
              margin-right: 8px;
            " />
                    <div class="w-full">
                        <h4>Book an Appointment</h4>
                        <div class="text-caption text-grey">
                            Book an appointment with a professional
                        </div>
                    </div>
                </div>
                <VBtn icon="tabler-x" variant="text" size="small" color="black" @click="close" />
            </VCardTitle>
            <hr style="border: none; border-top: 1px solid lightgray; margin-top: 0.5rem;" />

            <!-- Modal Body -->
            <VCardText>
                <!-- Client Type -->
                <div class="mb-4">
                    <label for="selectedClient" class="field-label">Select Client</label>
                    <VRadioGroup v-model="selectedClientType">
                        <div class="d-flex align-center" style="gap: 1rem;">
                            <div>
                                <VRadio label="Existing" value="existing" />
                            </div>
                            <div>
                                <VRadio label="New" value="new" />
                            </div>
                        </div>
                    </VRadioGroup>
                </div>

                <!-- New Fields For Selected New -->
                <div v-if="selectedClientType === 'new'" class="newSection">
                    <div class="d-flex gap-4 fBtn">
                        <!-- First Name -->
                        <div class="flex-1 fBtn mb-4">
                            <label class="field-label mb-2" for="firstName">First Name</label>
                            <input id="firstName" v-model="form.firstName" type="text" placeholder="Enter first name"
                                class="input-field" />
                        </div>

                        <!-- Last Name -->
                        <div class="flex-1 fBtn mb-4">
                            <label class="field-label mb-2" for="lastName">Last Name</label>
                            <input id="lastName" v-model="form.lastName" type="text" placeholder="Enter last name"
                                class="input-field" />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex-1 mb-4">
                        <label class="field-label mb-2" for="email">Email</label>
                        <input id="email" v-model="form.email" type="email" placeholder="example@email.com"
                            class="input-field" />
                    </div>

                    <!-- Phone Number -->
                    <div class="flex-1 mb-4">
                        <label class="field-label mb-2" for="phone">Phone Number</label>
                        <input id="phone" v-model="form.phone" type="tel" placeholder="+920000000001"
                            class="input-field" />
                    </div>

                    <!-- <div class="flex-1 mb-4">
                        <label class="field-label mb-2" for="phone">Phone Number</label>
                        <vue-tel-input-vuetify
                        id="phone"
                        v-model="form.phone"
                        placeholder="Enter phone number"
                        :rules="[v => !!v || 'Phone is required']"
                        class="input-field"
                        />
                    </div> -->
                    <p class="text-sm text-muted d-flex align-center gap-2">
                        <VIcon icon="tabler-info-circle" size="18" />
                        New customer will be saved to your clients list.
                    </p>
                </div>


                <div v-if="selectedClientType === 'existing'" class="mb-4">
                    <!-- Select Client Dropdown -->
                    <VMenu v-model="dropdown.client" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" color="gray" prepend-icon="tabler-user"
                                class="vBtn custom-dropdown-btn">
                                {{ selectedClient || 'Select a client' }}
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
                <div class="mb-4">
                    <label for="service" class="field-label">Services</label>
                    <VMenu v-model="dropdown.service" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-briefcase"
                                class="vBtn custom-dropdown-btn">
                                {{ selectedService || 'Select service' }}
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
                <div class="mb-4">
                    <label for="selectedTeamMember" class="field-label">Select Team Member</label>
                    <VMenu v-model="dropdown.team" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-user"
                                class="vBtn custom-dropdown-btn">
                                {{ selectedTeamMember || 'Select team member' }}
                            </VBtn>
                        </template>
                        <VList>
                            <VListItem v-for="member in teamMembers" :key="member" @click="selectTeamMember(member)">
                                {{ member }}
                            </VListItem>
                        </VList>
                    </VMenu>
                </div>

                <!-- Date and Time Fields -->
                <!-- <div class="field-row">
                    <div class="field">
                        <label for="selectedDate" class="field-label">Select Date</label>
                        <div class="field-input-wrapper">
                            <i class="mdi mdi-calendar field-icon"></i>
                            <input type="date" id="selectedDate" v-model="selectedDate" class="field-input"><i
                                class="mdi mdi-calendar field-icon"></i></input>
                        </div>
                    </div>

                    <div class="field">
                        <label for="selectedTime" class="field-label">Select Time</label>
                        <div class="field-input-wrapper">
                            <i class="mdi mdi-clock-outline field-icon"></i>
                            <input type="time" id="selectedTime" v-model="selectedTime" class="field-input" />
                        </div>
                    </div>
                </div> -->

                <div class="field-row">
                    <!-- Select Date -->
                    <div class="field">
                        <label for="selectedDate" class="field-label">Select Date</label>
                        <VMenu v-model="dropdown.date" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-calendar"
                                    class="vBtn custom-dropdown-btn">
                                    {{ selectedDate || 'Select Date' }}
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
                        <label for="selectedTime" class="field-label">Select Time</label>
                        <VMenu v-model="dropdown.time" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-clock"
                                    class="vBtn custom-dropdown-btn">
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
            <hr style="border: none; border-top: 1px solid lightgray;" />
            <div class="d-flex justify-end gap-4 w-full spacing">
                <!-- Cancel Button -->
                <div class="flex-1 w-full fBtn">
                    <VBtn variant="outlined" color="gray" class="text-grey-darken-1 border-light"
                        style="border-color: #e0e0e0;" block @click="close">
                        Cancel
                    </VBtn>
                </div>

                <!-- Submit Button -->
                <div class="flex-1 w-full fBtn">
                    <VBtn color="primary" class="text-white" block @click="submitAppointment">
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
    font-size: 14px;
    font-weight: 600;
    color: #333;
}

.field-input-wrapper {
    position: relative;
}

.field-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #888;
}

.field-input {
    width: 100%;
    padding: 8px 12px 8px 36px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    height: 38px;
}

.custom-dropdown-btn {
    border-color: #ccc !important;
    color: #555 !important;
    font-weight: 500;
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
}

.input-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    height: 38px;
    outline: none;
    transition: border-color 0.2s;
}

.input-field:focus {
    border-color: #ccc;
    /* blue outline on focus */
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
</style>