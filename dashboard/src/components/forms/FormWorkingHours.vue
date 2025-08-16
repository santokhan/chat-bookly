<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex items-center px-5 py-4 gap-3.5">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-10">
        <path
          d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z"
          fill="white" />
        <path
          d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z"
          stroke="#E1E4EA" />
        <path
          d="M20 27.5C15.8578 27.5 12.5 24.1423 12.5 20C12.5 15.8578 15.8578 12.5 20 12.5C24.1423 12.5 27.5 15.8578 27.5 20C27.5 24.1423 24.1423 27.5 20 27.5ZM20 26C21.5913 26 23.1174 25.3679 24.2426 24.2426C25.3679 23.1174 26 21.5913 26 20C26 18.4087 25.3679 16.8826 24.2426 15.7574C23.1174 14.6321 21.5913 14 20 14C18.4087 14 16.8826 14.6321 15.7574 15.7574C14.6321 16.8826 14 18.4087 14 20C14 21.5913 14.6321 23.1174 15.7574 24.2426C16.8826 25.3679 18.4087 26 20 26ZM20.75 20H23.75V21.5H19.25V16.25H20.75V20Z"
          fill="#525866" />
      </svg>
      <div class="grow flex items-start">
        <div class="grow">
          <h2 class="text-sm font-medium text-strong">Edit time for <span class="capitalize">{{ day }}</span></h2>
          <p class="mt-1 text-xs text-secondary">Edit your business opening-closing hours</p>
        </div>
        <button type="button" @click="emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.0001 10.9396L15.7126 7.22705L16.7731 8.28755L13.0606 12.0001L16.7731 15.7126L15.7126 16.7731L12.0001 13.0606L8.28755 16.7731L7.22705 15.7126L10.9396 12.0001L7.22705 8.28755L8.28755 7.22705L12.0001 10.9396Z"
              fill="#525866" />
          </svg>
        </button>
      </div>
    </div>

    <div class="border-t border-border-light p-5 space-y-5">
      <div v-for="(item, index) in formState.hours" :key="index">
        <div class="flex items-center gap-4 justify-between">
          <h5 class="text-sm font-medium text-strong">Shift - {{ index + 1 }}</h5>
          <!-- Remove Button -->
          <button type="button" v-if="formState.hours.length > 1" @click="removeShift(index)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.375 5.95H16.75V7.3H15.4V16.075C15.4 16.254 15.3289 16.4257 15.2023 16.5523C15.0757 16.6789 14.904 16.75 14.725 16.75H5.275C5.09598 16.75 4.92429 16.6789 4.7977 16.5523C4.67112 16.4257 4.6 16.254 4.6 16.075V7.3H3.25V5.95H6.625V3.925C6.625 3.74598 6.69612 3.57429 6.8227 3.4477C6.94929 3.32112 7.12098 3.25 7.3 3.25H12.7C12.879 3.25 13.0507 3.32112 13.1773 3.4477C13.3039 3.57429 13.375 3.74598 13.375 3.925V5.95ZM14.05 7.3H5.95V15.4H14.05V7.3ZM7.975 9.325H9.325V13.375H7.975V9.325ZM10.675 9.325H12.025V13.375H10.675V9.325ZM7.975 4.6V5.95H12.025V4.6H7.975Z"
                fill="#FB3748" />
            </svg>
          </button>
        </div>

        <div class="flex gap-3 mt-3">
          <div class="grow">
            <h5 class="text-sm font-medium text-strong">From</h5>
            <input type="time" v-model="item.start"
              class="text-sm mt-1 w-full px-3 py-2.5 border border-border-light rounded-[0.625rem]">
          </div>
          <div class="grow">
            <h5 class="text-sm font-medium text-strong">To</h5>
            <input type="time" v-model="item.end" class="text-sm mt-1 w-full p-2 border border-border-light rounded-[0.625rem]">
          </div>
        </div>
      </div>

      <div>
        <button type="button" @click="addShift"
          class="flex items-center gap-0.5 font-medium text-primary border border-primary px-1.5 py-1 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z" fill="#335CFF" />
          </svg>
          <span class="px-1 text-sm">Add Shift</span>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="copyAll" id="copyAll">
        <label for="copyAll" class="text-sm font-medium text-strong">Copy these opening hours to all days</label>
      </div>
    </div>

    <div class="border-t border-border-light flex justify-end gap-3 px-5 py-4">
      <button type="button" @click="emit('close')"
        class="font-medium text-sm p-2 rounded-[0.625rem] w-full border border-border-light bg-white text-secondary hover:brightness-95">
        Cancel
      </button>
      <button type="submit"
        class="font-medium text-sm p-2 rounded-[0.625rem] w-full bg-primary text-white hover:brightness-95 text-center">
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { OpeningHours, Shift } from '@/stores/opening-hours';
import { reactive, ref } from 'vue'

const props = defineProps<OpeningHours>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', value: { day: string; hours: Shift[], copyAll: boolean }): void
}>()

// Local state copy
const formState = reactive({
  day: props.day,
  hours: JSON.parse(JSON.stringify(props.hours)) // deep clone to avoid prop mutation
})

const copyAll = ref(false)

const addShift = () => {
  formState.hours.push({ start: '09:00', end: '17:00' })
}

const removeShift = (index: number) => {
  formState.hours.splice(index, 1)
}

const handleSubmit = () => {
  emit('save', {
    day: formState.day,
    hours: formState.hours,
    copyAll: copyAll.value
  })
}
</script>
