<template>
  <div>
    <label class="block text-sm font-medium text-strong mb-1">
      Select Types<span class="text-primary-500">*</span>
    </label>
    <div class="flex flex-wrap items-center gap-1.5 w-full border border-border-light rounded-[0.625rem] px-3 py-2 text-sm">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.75 3.25H16.75C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H6.25V1.75H7.75V3.25H12.25V1.75H13.75V3.25ZM12.25 4.75H7.75V6.25H6.25V4.75H4V7.75H16V4.75H13.75V6.25H12.25V4.75ZM16 9.25H4V15.25H16V9.25Z"
          fill="#99A0AE" />
      </svg>
      <!-- Display added tags -->
      <div class="flex flex-wrap gap-1.5">
        <span v-for="(tag, index) in tags" :key="index"
          class="border text-xs border-light px-1 py-1 rounded-md inline-flex">
          <span class="whitespace-nowrap px-1">{{ tag }}</span>
          <button type="button" @click="tags.splice(index, 1)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.00004 7.15164L10.97 4.18164L11.8184 5.03004L8.84844 8.00004L11.8184 10.97L10.97 11.8184L8.00004 8.84844L5.03004 11.8184L4.18164 10.97L7.15164 8.00004L4.18164 5.03004L5.03004 4.18164L8.00004 7.15164Z"
                fill="#99A0AE" />
            </svg>
          </button>
        </span>
      </div>
      <input v-model="typeInput" type="text" placeholder="Search or add tags" class="grow focus:outline-none text-sm"
        @keydown.enter.prevent="addType" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const typeInput = ref<string>('');
const tags = ref<string[]>([]);

function addType() {
  const value = typeInput.value.trim();
  if (value && !tags.value.includes(value)) {
    tags.value.push(value);
  }
  typeInput.value = '';
}
</script>