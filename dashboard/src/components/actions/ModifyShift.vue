<template>
  <button type="button" @click="$emit('click')"
    class="size-8 transition-all text-primary-500 flex items-center justify-center gap-1 text-xs invisible group-hover:visible mx-auto">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="size-4 shrink-0">
      <path
        d="M7.40078 7.3998V3.7998H8.60078V7.3998H12.2008V8.5998H8.60078V12.1998H7.40078V8.5998H3.80078V7.3998H7.40078Z"
        fill="#335CFF" />
    </svg>
    <span class="whitespace-nowrap">Add shift</span>
  </button>
</template>


<script setup lang="ts">
defineEmits(['click'])
</script>