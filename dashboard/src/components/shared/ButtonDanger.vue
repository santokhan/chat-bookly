<template>
  <button type="button" @click="$emit('click')" :class="[
    'inline-flex items-center gap-1 px-2 py-2',
    'bg-error border rounded-[8px] border-error',
    'transition-colors duration-200',
    'text-white text-sm font-medium leading-[1.25rem] tracking-[-0.6%]',
  ]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>