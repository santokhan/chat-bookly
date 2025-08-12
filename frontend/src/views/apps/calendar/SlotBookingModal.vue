<template>
    <VDialog v-model="isAppointmentModalOpen" max-width="500">
        <VCard style="border-radius: 1.2rem">
            <!-- Modal Header -->
            <VCardTitle class="d-flex justify-space-start mt-2">
                <div class="d-flex align-center gap-2 mx-2">
                    <VBtn variant="text" size="medium" color="black"
                        style="border-radius: 50%;border: 1px solid #ccc;width: 42px;height: 42px;margin-right: 8px; ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M8.25 4.5V3H6.75V4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V17.25C3 17.6642 3.33579 18 3.75 18H17.25C17.6642 18 18 17.6642 18 17.25V5.25C18 4.83579 17.6642 4.5 17.25 4.5H14.25V3H12.75V4.5H8.25ZM4.5 9.75H16.5V16.5H4.5V9.75ZM4.5 6H6.75V6.75H8.25V6H12.75V6.75H14.25V6H16.5V8.25H4.5V6ZM8.90897 10.4733L10.5 12.0644L12.0909 10.4733L13.1516 11.5339L11.5606 13.1251L13.1516 14.7159L12.091 15.7766L10.5 14.1857L8.90891 15.7766L7.84832 14.7158L9.43927 13.1251L7.84827 11.5339L8.90897 10.4733Z"
                                fill="#525866" />
                        </svg>
                    </VBtn>
                    <div>
                        <h4 class="heading">Blocked a time slot</h4>
                        <!-- <div class="text-caption text-wrap">Blocks times when you & your team are unavailable.
                        </div> -->
                        <h6 class="sub-heading">
                            Blocks times when you & your team are unavailable.
                        </h6>
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

            <hr class="divider" />

            <!-- Modal Body -->
            <VCardText>
                <!-- Title -->
                <div class="field mb-3">
                    <label for="firstName" class="field-label">Title</label>
                    <input id="firstName" v-model="form.firstName" type="text" placeholder="e.g; Launch Time"
                        style="height: 41px;border-radius: 8px; padding-left: 10px; letter-spacing: 0px;font-size: 14px;"
                        class="input-field" />
                </div>

                <!-- Select Date -->
                <div class="field mb-3">
                    <label for="selectedDate" class="field-label">Date</label>

                    <!-- Button to open dialog -->
                    <VBtn block variant="outlined"
                        style="height: 41px; border-radius: 8px; padding-left: 15px; letter-spacing: 0; font-size: 14px;"
                        class="vBtn custom-dropdown-btn" @click="dialogDate = true">
                        <template #prepend>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                fill="none">
                                <path
                                    d="M13.75 3.25H16.75C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H6.25V1.75H7.75V3.25H12.25V1.75H13.75V3.25ZM12.25 4.75H7.75V6.25H6.25V4.75H4V7.75H16V4.75H13.75V6.25H12.25V4.75ZM16 9.25H4V15.25H16V9.25Z"
                                    fill="#525866" />
                            </svg>
                        </template>
                        <span class="btn-label">{{ formattedDate || 'Select Date' }}</span>
                        <!-- <v-icon right>tabler-chevron-down</v-icon> -->
                    </VBtn>

                    <!-- Dialog with VDatePicker -->
                    <VDialog v-model="dialogDate" width="320">
                        <VCard>
                            <VDatePicker v-model="selectedDate" />
                            <VCardActions>
                                <VSpacer />
                                <VBtn text @click="dialogDate = false">Cancel</VBtn>
                                <VBtn text @click="saveDate">OK</VBtn>
                            </VCardActions>
                        </VCard>
                    </VDialog>
                </div>

                <!-- Select Time Range -->
                <div class="field-row mb-3">
                    <!-- FROM -->
                    <div class="field">
                        <label class="field-label">From</label>
                        <VMenu v-model="dropdown.timeFrom" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" class="custom-dropdown-btn"
                                    append-icon="tabler-chevron-down"
                                    style="height: 41px; border-radius: 8px; letter-spacing: 0;padding-left: 10px; font-size: 14px;">
                                    <!-- SVG icon before label -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                        fill="none" class="mr-2" style="vertical-align: middle;">
                                        <path
                                            d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM10.75 10H13.75V11.5H9.25V6.25H10.75V10Z"
                                            fill="#525866" />
                                    </svg>
                                    <span class="btn-label">
                                        {{ selectedTimeFrom || 'Select Time' }}
                                    </span>
                                </VBtn>
                            </template>

                            <VList>
                                <VListItem v-for="time in timeOptions" :key="time" @click="selectTimeFrom(time)"
                                    style="cursor: pointer">
                                    {{ time }}
                                </VListItem>
                            </VList>
                        </VMenu>
                    </div>

                    <!-- TO -->
                    <div class="field">
                        <label class="field-label">To</label>
                        <VMenu v-model="dropdown.timeTo" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <VBtn v-bind="props" block variant="outlined" class="custom-dropdown-btn"
                                    append-icon="tabler-chevron-down"
                                    style="height: 41px; border-radius: 8px; letter-spacing: 0; padding-left: 10px; font-size: 14px;">
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                        fill="none" class="mr-2" style="vertical-align: middle;">
                                        <path
                                            d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM10.75 10H13.75V11.5H9.25V6.25H10.75V10Z"
                                            fill="#525866" />
                                    </svg> -->
                                    <span class="btn-label">
                                        {{ selectedTimeTo || 'Select Hours' }}
                                    </span>
                                </VBtn>
                            </template>

                            <VList>
                                <VListItem v-for="time in hoursOptions" :key="time" @click="selectTimeTo(time)"
                                    style="cursor: pointer">
                                    {{ time }}
                                </VListItem>
                            </VList>
                        </VMenu>
                    </div>
                </div>

                <div class="field mb-3">
                    <label class="field-label">Select Team Member</label>
                    <VMenu v-model="dropdown.team" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" class="custom-dropdown-btn"
                                append-icon="tabler-chevron-down"
                                style="justify-content: flex-start; height: 41px; padding-left: 10px; border-radius: 8px; letter-spacing: 0px; font-size: 14px;">
                                <!-- Show avatar if exists -->
                                <VAvatar v-if="selectedTeamMember?.avatar" :image="selectedTeamMember.avatar" size="24"
                                    class="mr-2" />

                                <!-- Show SVG icon if no avatar -->
                                <template v-else>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                        class="mr-2" fill="none">
                                        <path
                                            d="M9.99991 13.75C12.7464 13.75 15.1487 14.9312 16.4552 16.6937L15.0737 17.347C14.0102 16.087 12.1352 15.25 9.99991 15.25C7.86466 15.25 5.98966 16.087 4.92616 17.347L3.54541 16.693C4.85191 14.9305 7.25341 13.75 9.99991 13.75ZM9.99991 2.5C10.9945 2.5 11.9483 2.89509 12.6516 3.59835C13.3548 4.30161 13.7499 5.25544 13.7499 6.25V8.5C13.7499 9.46635 13.3768 10.3954 12.7084 11.0933C12.0401 11.7913 11.1281 12.2043 10.1627 12.2463L9.99991 12.25C9.00535 12.25 8.05152 11.8549 7.34826 11.1517C6.645 10.4484 6.24991 9.49456 6.24991 8.5V6.25C6.24997 5.28365 6.62307 4.35463 7.2914 3.65667C7.95974 2.95871 8.87172 2.54569 9.83716 2.50375L9.99991 2.5ZM9.99991 4C9.426 3.99997 8.87377 4.21924 8.45621 4.61296C8.03865 5.00668 7.78733 5.54508 7.75366 6.118L7.74991 6.25V8.5C7.74935 9.08568 7.97717 9.6485 8.38499 10.0689C8.7928 10.4892 9.34846 10.734 9.93388 10.7512C10.5193 10.7684 11.0884 10.5566 11.5201 10.1609C11.9519 9.76519 12.2124 9.2167 12.2462 8.632L12.2499 8.5V6.25C12.2499 5.65326 12.0129 5.08097 11.5909 4.65901C11.1689 4.23705 10.5966 4 9.99991 4Z"
                                            fill="#99A0AE" />
                                    </svg>
                                </template>

                                <span class="btn-label">
                                    {{ selectedTeamMember?.title || 'Select Team Member' }}
                                </span>
                            </VBtn>
                        </template>

                        <VList>
                            <VListItem v-for="member in teamMembers" :key="member.value"
                                @click="selectTeamMember(member)" class="d-flex align-center">
                                <VAvatar :image="member.avatar" size="24" />
                                <span class="ml-2">{{ member.title }}</span>
                            </VListItem>
                        </VList>
                    </VMenu>
                </div>

                <!-- Select Frequency -->
                <div class="field">
                    <label class="field-label">Select Frequency</label>
                    <VMenu v-model="dropdown.frequency" :close-on-content-click="false">
                        <template #activator="{ props }">
                            <VBtn v-bind="props" block variant="outlined" append-icon="tabler-chevron-down"
                                style="height: 41px;border-radius: 8px; padding-left: 15px; letter-spacing: 0px;font-size: 14px;"
                                class="custom-dropdown-btn">
                                <!-- <template #prepend>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"
                                        fill="none">
                                        <path
                                            d="M13.75 3.25H16.75C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H6.25V1.75H7.75V3.25H12.25V1.75H13.75V3.25ZM12.25 4.75H7.75V6.25H6.25V4.75H4V7.75H16V4.75H13.75V6.25H12.25V4.75ZM16 9.25H4V15.25H16V9.25Z"
                                            fill="#525866" />
                                    </svg>
                                </template> -->
                                <span class="btn-label">{{ selectedFrequency || 'Select Frequency' }}</span>

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
            <div class="d-flex gap-4 mx-2 w-full spacing">
                <!-- Cancel Button -->
                <div class="flex-1 w-full fBtn">
                    <VBtn variant="outlined" color="gray" class="text-grey-darken-1 border-light"
                        style="border-color: rgb(var(--v-theme-border-light)); font-size: 14px; border-radius: 8px; letter-spacing: 0px;"
                        block @click="close">
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
        title: "Any Team Member",
        value: "Any Team Member",
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
const dialogDate = ref(false)
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
const formattedDate = computed(() => {
    if (!selectedDate.value) return ''
    const dateObj = new Date(selectedDate.value)
    return dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
})

const saveDate = () => {
    dialogDate.value = false
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
    border: 1px solid rgb(var(--v-theme-border-light));
    width: 36px;
    height: 36px;
    margin-right: 8px;
}

.divider {
    border: none;
    border-top: 2px solid rgb(var(--v-theme-border-light));
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
    font-size: 15px;
    font-weight: 600;
    color: rgb(var(--v-theme-text-strong))
}

.input-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid rgb(var(--v-theme-border-light));
    border-radius: 6px;
    font-size: 14px;
    height: 38px;
    outline: none;
    background-color: white;
    transition: border-color 0.2s;
}

.input-field:focus {
    border-color: rgb(var(--v-theme-border-light));
}

.custom-dropdown-btn {
    border-color: rgb(var(--v-theme-border-light)) !important;
    color: rgb(var(--v-theme-text-secondary)) !important;
    font-weight: 500;
    justify-content: flex-start !important;
    padding-right: 2.5rem;
}

.text-caption {
    letter-spacing: normal !important;
    color: rgb(var(--v-theme-text-secondary)) !important;
    font-weight: 600 !important;
    font-size: 14px !important;
}

.spacing {
    padding: 16px;
}

.cancel-btn {
    border-color: rgb(var(--v-theme-border-light));
    color: rgb(var(--v-theme-text-secondary));
}

.fBtn {
    width: 100%;
}

.v-btn:not(.v-btn--icon).v-btn--size-default .v-btn__content .v-icon {
    --v-icon-size-multiplier: 0.7113;
    block-size: 1rem;
    font-size: 1rem;
    inline-size: 1rem;
    position: absolute;
    right: 15px;
}

.heading{
    color: rgb(var(--v-theme-text-strong)) !important;
}

.sub-heading{
    font-size: 14px !important;
    line-height: 18px !important;
    color: rgb(var(--v-theme-text-secondary)) !important;
    font-weight: 400 !important;
}
</style>
