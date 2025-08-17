<template>
  <div class="border border-light pl-2.5 pr-5 py-5 text-start flex items-center gap-2.5 rounded-2xl bg-white">
    <button type="button" class="hover:text-primary" @mousedown="startDrag">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.5 11C13.3284 11 14 10.3284 14 9.5C14 8.67157 13.3284 8 12.5 8C11.6716 8 11 8.67157 11 9.5C11 10.3284 11.6716 11 12.5 11ZM12.5 17.5C13.3284 17.5 14 16.8284 14 16C14 15.1716 13.3284 14.5 12.5 14.5C11.6716 14.5 11 15.1716 11 16C11 16.8284 11.6716 17.5 12.5 17.5ZM14 22.5C14 23.3284 13.3284 24 12.5 24C11.6716 24 11 23.3284 11 22.5C11 21.6716 11.6716 21 12.5 21C13.3284 21 14 21.6716 14 22.5ZM19.5 11C20.3284 11 21 10.3284 21 9.5C21 8.67157 20.3284 8 19.5 8C18.6716 8 18 8.67157 18 9.5C18 10.3284 18.6716 11 19.5 11ZM21 16C21 16.8284 20.3284 17.5 19.5 17.5C18.6716 17.5 18 16.8284 18 16C18 15.1716 18.6716 14.5 19.5 14.5C20.3284 14.5 21 15.1716 21 16ZM19.5 24C20.3284 24 21 23.3284 21 22.5C21 21.6716 20.3284 21 19.5 21C18.6716 21 18 21.6716 18 22.5C18 23.3284 18.6716 24 19.5 24Z"
          fill="currentColor" />
      </svg>
    </button>
    <div class="grow">
      <div class="flex items-center gap-4">
        <div class="grow">
          <h4 class="font-medium text-strong">{{ data?.name }}</h4>
        </div>
        <!-- Types -->
        <div class="flex items-center gap-3" v-if="Array.isArray(data?.types)">
          <template v-for="(type, tIndex) in data?.types">
            <span class="text-xs font-medium px-2 py-1 border border-light rounded-md text-neutral-500">
              {{ type?.name }}
            </span>
          </template>
        </div>
        <template v-if="data?.status">
          <Status :data="data" />
        </template>
      </div>
      <p class="text-sm text-secondary font-normal mt-2">{{ data?.description }}</p>
      <div class="flex items-center gap-4">
        <div class="grow flex items-center gap-4 mt-6">
          <div class="flex items-center gap-1 text-sm text-secondary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM8.5375 9.25H12.25V10.75H8.5375C8.60247 11.069 8.74938 11.3656 8.96376 11.6106C9.17815 11.8556 9.45263 12.0405 9.76019 12.1472C10.0677 12.2539 10.3978 12.2787 10.7178 12.2191C11.0379 12.1596 11.3369 12.0177 11.5855 11.8075L12.8605 12.6573C12.4224 13.1342 11.8563 13.475 11.2298 13.639C10.6033 13.8031 9.94278 13.7834 9.32716 13.5823C8.71153 13.3812 8.16676 13.0073 7.75784 12.5051C7.34892 12.0029 7.09314 11.3936 7.021 10.75H6.25V9.25H7.02025C7.09214 8.60608 7.34786 7.99646 7.75687 7.49395C8.16588 6.99145 8.71089 6.61729 9.32681 6.41618C9.94273 6.21506 10.6035 6.19549 11.2303 6.35979C11.857 6.5241 12.4232 6.86533 12.8612 7.34275L11.5855 8.1925C11.3369 7.98229 11.0379 7.84042 10.7178 7.78086C10.3978 7.72129 10.0677 7.74608 9.76019 7.85279C9.45263 7.9595 9.17815 8.14445 8.96376 8.38943C8.74938 8.63442 8.60247 8.931 8.5375 9.25Z"
                fill="#525866" />
            </svg>
            €{{ data?.price }}
          </div>
          <div class="flex items-center gap-1 text-sm text-secondary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM10.75 10H13.75V11.5H9.25V6.25H10.75V10Z"
                fill="#525866" />
            </svg>
            €{{ data?.duration }}
          </div>
          <div class="w-3"></div>
          <template v-if="Array.isArray(data?.team_members)" v-for="(mItem, mIndex) in data?.team_members">
            <div class="flex items-center gap-1 text-sm text-secondary">
              <img :src="mItem.image" :alt="mItem.image" class="size-5 rounded-full">
              <p class="text-sm font-medium text-secondary">
                {{ mItem.first_name }} {{ mItem.last_name }}
              </p>
            </div>
          </template>
        </div>
        <div class="w-3"></div>
        <div class="flex items-center gap-2 mt-auto">
          <button type="button" @click="$emit('edit')">
            <svg width="24" height="24" class="size-6" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.97299 15.6001L16.1008 6.47228L14.8282 5.19968L5.70039 14.3275V15.6001H6.97299ZM7.71909 17.4001H3.90039V13.5814L14.1919 3.28988C14.3607 3.12115 14.5895 3.02637 14.8282 3.02637C15.0668 3.02637 15.2957 3.12115 15.4645 3.28988L18.0106 5.83598C18.1793 6.00475 18.2741 6.23363 18.2741 6.47228C18.2741 6.71092 18.1793 6.9398 18.0106 7.10858L7.71909 17.4001ZM3.90039 19.2001H20.1004V21.0001H3.90039V19.2001Z"
                fill="#525866" />
            </svg>
          </button>
          <template v-if="data?.status">
            <ActiveInactive :data="data" @make-active="data.status = 'active'"
              @make-inactive="data.status = 'inactive'" />
          </template>
          <DeleteService @remove="$emit('delete')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { type Service } from '@/stores/services'
import DeleteService from '../actions/DeleteService.vue';
import Status from './Status.vue';
import ActiveInactive from '../actions/ActiveInactive.vue';

const props = defineProps<{
  service: Service
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const data = ref<Service | null>(props.service)

const draggableEl = ref<HTMLElement | null>(null)

let isDragging = false
let offsetX = 0
let offsetY = 0

const startDrag = (e: MouseEvent) => {
  if (!draggableEl.value) return
  isDragging = true
  const rect = draggableEl.value.getBoundingClientRect()
  offsetX = e.clientX - rect.left
  offsetY = e.clientY - rect.top
  document.addEventListener("mousemove", onDrag)
  document.addEventListener("mouseup", stopDrag)
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging || !draggableEl.value) return
  draggableEl.value.style.position = "absolute"
  draggableEl.value.style.left = e.clientX - offsetX + "px"
  draggableEl.value.style.top = e.clientY - offsetY + "px"
  draggableEl.value.style.zIndex = "999"
}

const stopDrag = () => {
  isDragging = false
  document.removeEventListener("mousemove", onDrag)
  document.removeEventListener("mouseup", stopDrag)
}

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", onDrag)
  document.removeEventListener("mouseup", stopDrag)
})
</script>