<template>
    <div class="p-5">
        <div class="mx-auto px-5 py-5 bg-white border border-border-light rounded-xl">
            <div class="flex items-center gap-3">
                <h1 class="text-xl font-medium flex items-center gap-2">Schedule Shifts</h1>
                <div class="grow"></div>
                <!-- Search Field -->
                <div class="">
                    <div class="border border-border-light flex items-center rounded-lg">
                        <div class="px-3 py-2 border-r border-border-light text-sm font-medium text-secondary">Week
                        </div>
                        <div class="flex items-center gap-1 p-2 text-sm font-medium text-secondary">
                            <span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.20498 9.99907L12.9175 13.7116L11.857 14.7721L7.08398 9.99907L11.857 5.22607L12.9175 6.28657L9.20498 9.99907Z"
                                        fill="#99A0AE" />
                                </svg>
                            </span>
                            <span class="px-1">
                                <span>{{ formatToMonthDay(nextDate.next().value) }}</span> - <span>{{
                                    formatToMonthDay(nextDate.next().value) }}</span>,
                                <span>2025</span>
                            </span>
                            <span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.7965 9.99907L7.08398 6.28657L8.14448 5.22607L12.9175 9.99907L8.14448 14.7721L7.08398 13.7116L10.7965 9.99907Z"
                                        fill="#99A0AE" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="">
                    <ButtonPrimary @click="modalAssignMember = true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                                fill="currentColor" />
                        </svg>
                        <span class="px-1 hidden lg:block">Assign Team Member</span>
                    </ButtonPrimary>
                </div>
            </div>

            <div class="mt-4 space-y-3.5 overflow-x-auto">
                <!-- Team Table -->
                <div class="border border-light rounded-lg" v-if="team_member_shifts.length === 0">
                    <table class="min-w-full whitespace-nowrap">
                        <thead class="text-secondary font-medium text-sm">
                            <tr>
                                <th
                                    class="border border-border-light border-t-0 text-start px-5 py-4.5 font-medium rounded-l-lg">
                                    <div class="flex items-center text-base uppercase text-strong">Team member</div>
                                </th>
                                <th v-for="(item, index) in reportDates" :key="index"
                                    class="border border-border-light border-t-0 text-start px-4 py-2.5 font-medium">
                                    <h4 class="text-sm font-medium text-strong text-center">
                                        {{ formatToMonthDay(item) }}
                                    </h4>
                                    <p class="text-sm text-neutral-300 mt-1 text-center font-normal">
                                        {{ "4h" }}
                                    </p>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div class="flex flex-col items-center pt-15 pb-10">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="47" height="47" rx="11.5" fill="#F5F7FA" />
                            <rect x="0.5" y="0.5" width="47" height="47" rx="11.5" stroke="#E1E4EA" />
                            <path
                                d="M32.4001 34.5002H30.3001V32.4002C30.3001 31.5648 29.9682 30.7635 29.3775 30.1728C28.7867 29.5821 27.9855 29.2502 27.1501 29.2502H20.8501C20.0147 29.2502 19.2135 29.5821 18.6227 30.1728C18.032 30.7635 17.7001 31.5648 17.7001 32.4002V34.5002H15.6001V32.4002C15.6001 31.0078 16.1532 29.6724 17.1378 28.6879C18.1224 27.7033 19.4577 27.1502 20.8501 27.1502H27.1501C28.5425 27.1502 29.8778 27.7033 30.8624 28.6879C31.847 29.6724 32.4001 31.0078 32.4001 32.4002V34.5002ZM24.0001 25.0502C23.1728 25.0502 22.3535 24.8872 21.5892 24.5706C20.8248 24.254 20.1303 23.79 19.5453 23.205C18.9603 22.62 18.4963 21.9255 18.1797 21.1611C17.8631 20.3967 17.7001 19.5775 17.7001 18.7502C17.7001 17.9229 17.8631 17.1036 18.1797 16.3393C18.4963 15.5749 18.9603 14.8804 19.5453 14.2954C20.1303 13.7104 20.8248 13.2464 21.5892 12.9298C22.3535 12.6131 23.1728 12.4502 24.0001 12.4502C25.671 12.4502 27.2734 13.1139 28.4549 14.2954C29.6364 15.4769 30.3001 17.0793 30.3001 18.7502C30.3001 20.4211 29.6364 22.0235 28.4549 23.205C27.2734 24.3864 25.671 25.0502 24.0001 25.0502ZM24.0001 22.9502C25.114 22.9502 26.1823 22.5077 26.9699 21.72C27.7576 20.9324 28.2001 19.8641 28.2001 18.7502C28.2001 17.6363 27.7576 16.568 26.9699 15.7803C26.1823 14.9927 25.114 14.5502 24.0001 14.5502C22.8862 14.5502 21.8179 14.9927 21.0302 15.7803C20.2426 16.568 19.8001 17.6363 19.8001 18.7502C19.8001 19.8641 20.2426 20.9324 21.0302 21.72C21.8179 22.5077 22.8862 22.9502 24.0001 22.9502Z"
                                fill="#335CFF" />
                        </svg>
                        <h4 class="text-xl font-medium text-strong mt-4 text-center">No team member assigned to schedule
                            shifts</h4>
                        <p class="text-sm text-secondary mt-1 text-center">Assign team members and set their working
                            hours.</p>
                        <div class="mt-5">
                            <ButtonPrimary @click="modalAssignMember = true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                                        fill="white" />
                                </svg>
                                <span class="px-1 hidden lg:block">Assign Team Member</span>
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
                <div v-else class="min-w-full inline-block align-middle">
                    <div class="border-t border-light rounded-lg">
                        <table class="min-w-full whitespace-nowrap">
                            <thead class="text-secondary font-medium text-sm">
                                <tr>
                                    <th
                                        class="border border-border-light border-t-0 text-start px-5 py-4.5 font-medium rounded-l-lg">
                                        <div class="flex items-center text-base uppercase text-strong">Team member</div>
                                    </th>
                                    <th v-for="(item, index) in reportDates" :key="index"
                                        class="border border-border-light border-t-0 text-start px-4 py-2.5 font-medium">
                                        <h4 class="text-sm font-medium text-strong text-center">
                                            {{ formatToMonthDay(item) }}
                                        </h4>
                                        <p class="text-sm text-neutral-300 mt-1 text-center font-normal">
                                            {{ "4h" }}
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="font-medium text-sm divide-y divide-border-light">
                                <tr v-for="(item, index) in team_member_shifts" :key="index">
                                    <td class="border border-border-light border-t-0 p-3 text-start">
                                        <div class="flex items-center gap-3">
                                            <figure
                                                class="size-10 rounded-full bg-border-light flex items-center justify-center">
                                                <img :src="item.team_member.image" alt="profile" class="rounded-full">
                                            </figure>
                                            <div class="flex flex-col">
                                                <h4 class="text-sm font-medium text-strong">
                                                    {{ item.team_member?.first_name }} {{ item.team_member?.last_name }}
                                                </h4>
                                                <p class="text-xs text-secondary font-normal mt-0.5">56h</p>
                                            </div>
                                        </div>
                                    </td>

                                    <template v-for="dItem in reportDates">
                                        <td
                                            class="border border-border-light border-t-0 p-2 text-start group space-y-1.5">
                                            <template v-if="isSameDate(item.date, dItem)" v-for="(h, i) in item.hours">
                                                <button
                                                    class="text-xs text-strong font-medium px-2.5 py-1.5 border border-light flex rounded-lg text-center mx-auto"
                                                    type="button" @click="() => { editShift(item) }">
                                                    {{ h.start }} - {{ h.end }}
                                                </button>
                                            </template>
                                            <ModifyShift @click="() => { editShift(item) }" />
                                        </td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal v-model="modalAssignMember">
        <FormAssignTeamMember @close="modalAssignMember = false" @save="onSave" />
    </Modal>

    <Modal v-model="modalEditShift" v-if="selectedShift.value">
        <FormEditShift @close="modalEditShift = false" @save="onSave" :shift="selectedShift.value" />
    </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { reactive, ref } from 'vue'
import ButtonPrimary from '@/components/shared/ButtonPrimary.vue'
import { dateGenerator, formatToMonthDay, isSameDate, reportDates } from '@/utils/date'
import FormAssignTeamMember from '@/components/forms/FormAssignTeamMember.vue'
import { useTeamMemberStore, type TeamMemberShift } from '@/stores/shifts'
import ModifyShift from '@/components/actions/ModifyShift.vue'
import FormEditShift from '@/components/forms/FormEditShift.vue'

const { team_member_shifts } = useTeamMemberStore()
const modalAssignMember = ref(false)
const modalEditShift = ref(false)
const nextDate = dateGenerator(new Date())
const selectedShift = reactive<{ value: TeamMemberShift | null }>({ value: null })

/**
 * Both Shift button and Add Shift button will open the same modal
 * @param shift 
 */
async function editShift(shift: TeamMemberShift) {
    selectedShift.value = shift
    modalEditShift.value = true
}

async function onSave() {
    modalAssignMember.value = false
}
</script>
