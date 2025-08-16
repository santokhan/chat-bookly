<template>
  <Teleport to="body">
    <div v-if="props.modelValue" class="fixed inset-0 h-svh bg-[#020D173D] backdrop-blur-sm z-[30] overflow-y-auto"
      @click="close">
      <div class="min-h-full flex flex-col items-center justify-center py-10">
        <div class="bg-white rounded-[1.25rem] w-md modal-content" :class="{ 'open': props.modelValue }" @click.stop>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function close() {
  isOpen.value = false
}

watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-content {
  background: white;
  border-radius: 1.25rem;
  opacity: 0;
  transform: scale(0.9);
}

/* Keyframes for fade + zoom */
@keyframes fade-zoom-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Apply animation when modal opens */
.modal-content.open {
  animation: fade-zoom-in 0.3s ease-out forwards;
}
</style>
