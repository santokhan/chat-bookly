<template>
  <button type="button" v-if="status == 'active'"
    class="text-xs font-medium p-1 pr-2 border border-light rounded-md text-success capitalize flex items-center gap-0.5">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
    {{ status }}
  </button>
  <button type="button"  v-else-if="status == 'inactive'"
    class="text-xs font-medium p-1 pr-2 border border-light rounded-md text-error capitalize flex items-center gap-0.5">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
    {{ status }}
  </button>
</template>

<script setup lang="ts">
import type { Service } from '@/stores/services';
import { computed } from 'vue';

const props = defineProps<{ data: Service | null }>()
const status = computed(() => props.data?.status)
</script>