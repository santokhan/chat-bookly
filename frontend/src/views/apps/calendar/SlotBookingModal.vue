<template>
    <VDialog v-model="isAppointmentModalOpen" max-width="500">
        <VCard style="border-radius: 1rem">
            <!-- Modal Header -->
            <VCardTitle class="d-flex justify-space-between mt-2">
                <div class="d-flex align-center gap-2">
                    <VBtn icon="tabler-calendar-x" variant="text" size="small" color="black" class="circle-btn" />
                    <div>
                        <h4>Blocked a time slot</h4>
                        <div class="text-caption text-wrap text-grey">Blocks times when you & your team are unavailable.
                        </div>
                    </div>
                </div>
                <VBtn icon="tabler-x" variant="text" size="small" color="black" @click="close" />
            </VCardTitle>

            <hr class="divider" />

            <!-- Modal Body -->
            <VCardText>
                <!-- Title -->
                <div class="field mb-4">
                    <label for="firstName" class="field-label">Title<span class="start">*</span></label>
                    <input id="firstName" v-model="form.firstName" type="text" placeholder="e.g; Launch Time"
                        class="input-field" />
                </div>

                <!-- Select Date -->
                <div class="field mb-4">
                    <label class="field-label">Select Date</label>
                    <VMenu v-model="dropdown.date" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-calendar"
                                class="custom-dropdown-btn">
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

                <!-- Team Member Dropdown -->
                <!-- <div class="field mb-4">
                    <label class="field-label">Select Team Member</label>
                    <VMenu v-model="dropdown.team" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-user"
                                class="custom-dropdown-btn">
                                {{ selectedTeamMember || 'Select team member' }}
                            </VBtn>
                        </template>
                        <VList>
                            <VListItem v-for="member in teamMembers" :key="member" @click="selectTeamMember(member)">
                                {{ member }}
                            </VListItem>
                        </VList>
                    </VMenu>
                </div> -->
                <div class="field mb-4">
                    <label class="field-label">Select Team Member</label>
                    <VMenu v-model="dropdown.team" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined"
                                :prepend-icon="selectedTeamMember.avatar ? '' : 'tabler-user'"
                                class="custom-dropdown-btn" style="justify-content: flex-start;">
                                <VAvatar v-if="selectedTeamMember.avatar" :image="selectedTeamMember.avatar" size="24"
                                    class="mr-2" />
                                <span>{{ selectedTeamMember.title || 'Select team member' }}</span>
                            </VBtn>
                        </template>
                        <VList>
                            <VListItem v-for="member in teamMembers" :key="member.value"
                                @click="selectTeamMember(member)" class="d-flex align-center">
                                <!-- <VAvatar size="32" class="mr-3">
                                    <img :src="member.avatar" class="avatar" alt="avatar" />
                                </VAvatar> -->
                                <VAvatar :image="member.avatar" size="24" />
                                <span class="ml-2">{{ member.title }}</span>
                            </VListItem>
                        </VList>
                    </VMenu>

                </div>


                <!-- Select Time Range -->
                <div class="field-row mb-4">
                    <div class="field">
                        <label class="field-label">From</label>
                        <VMenu v-model="dropdown.timeFrom" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-clock"
                                    class="custom-dropdown-btn">
                                    {{ selectedTimeFrom || 'Select Time' }}
                                </VBtn>
                            </template>
                            <VList>
                                <VListItem v-for="time in timeOptions" :key="time" @click="selectTimeFrom(time)">
                                    {{ time }}
                                </VListItem>
                            </VList>
                        </VMenu>
                    </div>

                    <div class="field">
                        <label class="field-label">To</label>
                        <VMenu v-model="dropdown.timeTo" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-clock"
                                    class="custom-dropdown-btn">
                                    {{ selectedTimeTo || 'Select Hours' }}
                                </VBtn>
                            </template>
                            <VList>
                                <VListItem v-for="time in hoursOptions" :key="time" @click="selectTimeTo(time)">
                                    {{ time }}
                                </VListItem>
                            </VList>
                        </VMenu>
                    </div>
                </div>

                <!-- Select Frequency -->
                <div class="field">
                    <label class="field-label">Select Frequency</label>
                    <VMenu v-model="dropdown.frequency" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" prepend-icon="tabler-calendar"
                                class="custom-dropdown-btn">
                                {{ selectedFrequency || 'Select Frequency' }}
                            </VBtn>
                        </template>
                        <VList>
                            <VListItem v-for="freq in frequencyOptions" :key="freq" @click="selectFrequency(freq)">
                                {{ freq }}
                            </VListItem>
                        </VList>
                    </VMenu>
                </div>
            </VCardText>

            <hr class="divider" />

            <!-- Footer -->
            <!-- <div class="d-flex justify-end gap-4 w-full spacing">
        <VBtn variant="outlined" color="gray" class="cancel-btn" block @click="close">
          Cancel
        </VBtn>

        <VBtn color="primary" class="text-white" block @click="submitAppointment">
          Book Appointment
        </VBtn>
      </div> -->
            <div class="d-flex gap-4 w-full spacing">
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
                        Save
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
})

const props = defineProps({
    modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const isAppointmentModalOpen = ref(false)
watch(() => props.modelValue, (val) => (isAppointmentModalOpen.value = val))
watch(isAppointmentModalOpen, (val) => emit('update:modelValue', val))

const selectedTeamMember = ref('')
const selectedDate = ref('')
const selectedTimeFrom = ref('')
const selectedTimeTo = ref('')
const selectedFrequency = ref('')

const teamMembers = [
    {
        title: "John Doe",
        value: "john doe",
        avatar: "/images/avatars/avatar-1.png",
    },
    {
        title: "Jane Smith",
        value: "jane smith",
        avatar: "/images/avatars/avatar-2.png",
    },
    {
        title: "Mike Johnson",
        value: "mike johnson",
        avatar: "/images/avatars/avatar-1.png",
    },
    {
        title: "Sarah Wilson",
        value: "sarah wilson",
        avatar: "/images/avatars/avatar-2.png",
    },
    {
        title: "David Brown",
        value: "david brown",
        avatar: "/images/avatars/avatar-1.png",
    },
];
const dateOptions = ['07/08/2025', '08/08/2025', '09/08/2025']
const timeOptions = ['10:00 AM', '12:00 PM', '03:00 PM']
const hoursOptions = ['1 Hour', '2 Hour', '3 Hour']
const frequencyOptions = ['Does not repeat', 'Once', 'Daily', 'Weekly', 'Monthly']

const dropdown = ref({
    team: false,
    date: false,
    timeFrom: false,
    timeTo: false,
    frequency: false,
})

const selectTeamMember = (member) => {
    selectedTeamMember.value = member
    dropdown.value.team = false
}
const selectDate = (date) => {
    selectedDate.value = date
    dropdown.value.date = false
}
const selectTimeFrom = (time) => {
    selectedTimeFrom.value = time
    dropdown.value.timeFrom = false
}
const selectTimeTo = (time) => {
    selectedTimeTo.value = time
    dropdown.value.timeTo = false
}
const selectFrequency = (freq) => {
    selectedFrequency.value = freq
    dropdown.value.frequency = false
}

const close = () => emit('update:modelValue', false)

const submitAppointment = () => {
    console.log('Appointment Booked:', {
        form: form.value,
        selectedTeamMember: selectedTeamMember.value,
        selectedDate: selectedDate.value,
        selectedTimeFrom: selectedTimeFrom.value,
        selectedTimeTo: selectedTimeTo.value,
        selectedFrequency: selectedFrequency.value,
    })
    close()
}
</script>

<style scoped>
.circle-btn {
    border-radius: 50%;
    border: 1px solid #ccc;
    width: 36px;
    height: 36px;
    margin-right: 8px;
}

.divider {
    border: none;
    border-top: 1px solid lightgray;
    margin-top: 5px;
}

.field-row {
    display: flex;
    gap: 1rem;
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

.input-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    height: 38px;
    outline: none;
    background-color: white;
    transition: border-color 0.2s;
}

.input-field:focus {
    border-color: #ccc;
}

.custom-dropdown-btn {
    border-color: #ccc !important;
    color: #555 !important;
    font-weight: 500;
    justify-content: flex-start !important;
    padding-right: 2.5rem;
}

.text-caption {
    letter-spacing: normal !important;
    color: #666;
}

.spacing {
    padding: 16px;
}

.cancel-btn {
    border-color: #e0e0e0;
    color: #666;
}

.fBtn {
    width: 100%;
}
</style>
