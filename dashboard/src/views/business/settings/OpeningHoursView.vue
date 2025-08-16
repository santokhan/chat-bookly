<template>
    <div class="p-5">
        <div class="mx-auto px-5 py-4 bg-white border border-border-light rounded-xl">
            <div class="space-y-1.5">
                <h1 class="text-2xl font-medium">Opening Hours</h1>
                <p class="text-sm text-secondary">This is your business hours for opening to close.</p>
            </div>

            <div class="mt-5 space-y-3.5">
                <template v-for="item, key in weeklyOpeningHours" :key="key">
                    <div class="border border-border-light rounded-xl bg-white flex gap-4">
                        <div
                            class="basis-41 shrink-0 p-4 min-h-full text-sm font-medium flex gap-2.5 items-center uppercase border-r border-border-light text-strong bg-soft">
                            <ToggleSwitch :isDayOff="item?.status == 'closed'" />
                            {{ item?.day }}
                        </div>
                        <div class="grow flex items-center gap-15">
                            <p v-if="item?.status === 'closed'" class="text-sm font-medium text-secondary">Day Off</p>
                            <template v-else v-for="hItem, hKey in item?.hours" :key="key">
                                <div class="p-3.5 space-y-1.5 whitespace-nowrap">
                                    <h5 class="text-sm font-medium text-secondary">Shift - {{ hKey + 1 }}</h5>
                                    <p class="text-sm text-strong font-medium">{{ hItem?.start }} - {{ hItem?.end }}</p>
                                </div>
                            </template>
                        </div>
                        <div class="px-5 flex items-center">
                            <button type="button" @click="() => {
                                selectedDayHours.value = item
                                modal = true
                            }" class="text-sm text-primary-500 font-medium flex items-center gap-1">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" class="size-5">
                                    <path
                                        d="M5.8105 13.0001L13.417 5.39356L12.3565 4.33306L4.75 11.9396V13.0001H5.8105ZM6.43225 14.5001H3.25V11.3178L11.8263 2.74156C11.9669 2.60096 12.1576 2.52197 12.3565 2.52197C12.5554 2.52197 12.7461 2.60096 12.8868 2.74156L15.0085 4.86331C15.1491 5.00396 15.2281 5.19469 15.2281 5.39356C15.2281 5.59244 15.1491 5.78317 15.0085 5.92381L6.43225 14.5001ZM3.25 16.0001H16.75V17.5001H3.25V16.0001Z"
                                        fill="#335CFF" />
                                </svg>
                                Edit
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <Modal v-model="modal">
        <template v-if="!isCancelConfirmationVisible">
            <FormWorkingHours :day="selectedDayHours.value?.day" :hours="selectedDayHours.value?.hours"
                @close="modal = false" @save="onSave" />
        </template>
    </Modal>
</template>

<script setup lang="ts">
import FormWorkingHours from '@/components/forms/FormWorkingHours.vue'
import Modal from '@/components/Modal.vue'
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'
import { openingHours, type Shift } from '@/stores/opening-hours'
import { reactive, ref } from 'vue'

const modal = ref(false)
const selectedDayHours = reactive<{ value: Record<string, any> | null }>({ value: null })
const isCancelConfirmationVisible = ref(false)
const weeklyOpeningHours = reactive(openingHours)

function onSave(dayHours: { day: string; hours: Shift[], copyAll: boolean }) {
    if (!dayHours) return

    weeklyOpeningHours.forEach(item => {
        if (item.day === dayHours.day) {
            item.hours = dayHours.hours
        }
    })

    if (dayHours.copyAll) {
        weeklyOpeningHours.splice(0, weeklyOpeningHours.length, ...weeklyOpeningHours.map(item => ({
            ...item,
            hours: dayHours.hours
        })))
    }

    modal.value = false
}
</script>

<style scoped>
.monday {
    background-color: #FFF9E9;
}

.tuesday {
    background-color: #FFF6FF;
}

.wednesday {
    background-color: #F5F9F3;
}

.thursday {
    background-color: #FFE4F0;
}

.friday {
    background-color: #E4EEFE;
}

.saturday {
    background-color: #F8E8FE;
}

.sunday {
    background-color: #FEE5E5;
}
</style>