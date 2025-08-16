<template>
  <button type="button" @click="modal = true" class="size-8 transition-all text-neutral-500 hover:text-error">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.75 5.5H17.5V7H16V16.75C16 16.9489 15.921 17.1397 15.7803 17.2803C15.6397 17.421 15.4489 17.5 15.25 17.5H4.75C4.55109 17.5 4.36032 17.421 4.21967 17.2803C4.07902 17.1397 4 16.9489 4 16.75V7H2.5V5.5H6.25V3.25C6.25 3.05109 6.32902 2.86032 6.46967 2.71967C6.61032 2.57902 6.80109 2.5 7 2.5H13C13.1989 2.5 13.3897 2.57902 13.5303 2.71967C13.671 2.86032 13.75 3.05109 13.75 3.25V5.5ZM14.5 7H5.5V16H14.5V7ZM7.75 9.25H9.25V13.75H7.75V9.25ZM10.75 9.25H12.25V13.75H10.75V9.25ZM7.75 4V5.5H12.25V4H7.75Z"
        fill="currentColor" />
    </svg>
  </button>

  <Modal v-model="modal">
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
        <ButtonOutlineGray type="button" @click="modal = false" class="w-full justify-center">
          Close
        </ButtonOutlineGray>
        <ButtonDanger to="/" @click="()=>{
          $emit('remove')
          modal = false
        }" class="w-full justify-center">
          Yes, delete
        </ButtonDanger>
      </div>
    </div>
  </Modal>
</template>


<script setup lang="ts">
import Modal from '../Modal.vue';
import ButtonOutlineGray from '../shared/ButtonOutlineGray.vue';
import ButtonDanger from '../shared/ButtonDanger.vue';
import { ref } from 'vue';

const modal = ref(false)

defineEmits(['remove'])
</script>