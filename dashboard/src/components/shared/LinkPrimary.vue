<template>
  <RouterLink to="/plan/billing" :class="[
    'inline-flex items-center gap-1 px-2 py-2',
    'bg-primary border rounded-[8px] border-border-primary2',
    'transition-colors duration-200',
    'text-neutral-white text-sm font-medium leading-[1.25rem] tracking-[-0.6%]',
    'hover:bg-primary-600'
  ]">
    <slot></slot>
  </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router';
</script>