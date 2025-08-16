<template>
  <div>
    <div class="flex flex-col items-center p-5 fade-in" data-aos="zoom-in" data-aos-duration="500">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
          fill="#FFF1EB" />
        <path
          d="M20.7405 11.9324L28.8854 26.2027C28.9605 26.3342 29 26.4833 29 26.6351C29 26.7869 28.9605 26.9361 28.8855 27.0676C28.8104 27.199 28.7025 27.3082 28.5725 27.3841C28.4425 27.46 28.2951 27.5 28.145 27.5H11.855C11.7049 27.5 11.5575 27.46 11.4275 27.3841C11.2975 27.3082 11.1896 27.199 11.1145 27.0676C11.0395 26.9361 11 26.7869 11 26.6351C11 26.4833 11.0395 26.3342 11.1146 26.2027L19.2595 11.9324C19.3346 11.8009 19.4425 11.6918 19.5725 11.6159C19.7025 11.54 19.8499 11.5 20 11.5C20.1501 11.5 20.2975 11.54 20.4275 11.6159C20.5575 11.6918 20.6654 11.8009 20.7405 11.9324ZM19.145 23.1757V24.9054H20.855V23.1757H19.145ZM19.145 17.1216V21.4459H20.855V17.1216H19.145Z"
          fill="#FF8447" />
      </svg>
      <h2 class="font-medium text-center mt-4 text-strong">Delete Team Member</h2>
      <p class="text-center mt-2 text-secondary">Are you sure you want to delete this team member?</p>
    </div>
    <div class="border-t border-border-light flex gap-3 px-5 py-4">
      <ButtonOutlineGray type="button" @click="$emit('close')" class="w-full justify-center">
        Close
      </ButtonOutlineGray>
      <ButtonDanger to="/" @click="$emit('remove')" class="w-full justify-center">
        Yes, delete
      </ButtonDanger>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonDanger from '../shared/ButtonDanger.vue';
import ButtonOutlineGray from '../shared/ButtonOutlineGray.vue';

defineEmits(['close', 'remove'])
</script>