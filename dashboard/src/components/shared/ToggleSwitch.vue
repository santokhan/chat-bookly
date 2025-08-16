<template>
  <Switch v-model="off" :class="!off ? 'bg-blue-600' : 'bg-gray-200'"
    class="relative inline-flex h-4 w-7 items-center rounded-full">
    <span class="sr-only">Enable notifications</span>
    <span :class="!off ? 'translate-x-3.5' : 'translate-x-0.5'"
      class="inline-block h-[0.7rem] w-[0.7rem] transform rounded-full bg-white transition" />
  </Switch>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

const props = defineProps({
  isDayOff: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isDayOff'])

const off = ref(props.isDayOff)

// Keep local state in sync if prop changes
watch(() => props.isDayOff, (newValue) => {
  off.value = newValue
})

// Emit updated value when changed
const emitState = () => {
  emit('update:isDayOff', off.value)
}
</script>
