<template>
  <button v-if="status === 'active'" type="button" @click="modalMakeInactive = true">
    <svg width="24" height="24" class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0008 3.8999C16.8536 3.8999 20.891 7.3919 21.7379 11.9999C20.8919 16.6079 16.8536 20.0999 12.0008 20.0999C7.14797 20.0999 3.11057 16.6079 2.26367 11.9999C3.10967 7.3919 7.14797 3.8999 12.0008 3.8999ZM12.0008 18.2999C13.8363 18.2995 15.6173 17.676 17.0523 16.5316C18.4874 15.3871 19.4914 13.7893 19.9001 11.9999C19.4899 10.2119 18.4852 8.61591 17.0503 7.47293C15.6155 6.32995 13.8352 5.70758 12.0008 5.70758C10.1663 5.70758 8.38609 6.32995 6.95121 7.47293C5.51633 8.61591 4.51166 10.2119 4.10147 11.9999C4.51016 13.7893 5.51418 15.3871 6.9492 16.5316C8.38423 17.676 10.1653 18.2995 12.0008 18.2999ZM12.0008 16.0499C10.9266 16.0499 9.89651 15.6232 9.13699 14.8637C8.37747 14.1042 7.95077 13.074 7.95077 11.9999C7.95077 10.9258 8.37747 9.89564 9.13699 9.13612C9.89651 8.3766 10.9266 7.9499 12.0008 7.9499C13.0749 7.9499 14.105 8.3766 14.8646 9.13612C15.6241 9.89564 16.0508 10.9258 16.0508 11.9999C16.0508 13.074 15.6241 14.1042 14.8646 14.8637C14.105 15.6232 13.0749 16.0499 12.0008 16.0499ZM12.0008 14.2499C12.5975 14.2499 13.1698 14.0128 13.5918 13.5909C14.0137 13.1689 14.2508 12.5966 14.2508 11.9999C14.2508 11.4032 14.0137 10.8309 13.5918 10.4089C13.1698 9.98696 12.5975 9.7499 12.0008 9.7499C11.404 9.7499 10.8317 9.98696 10.4098 10.4089C9.98783 10.8309 9.75077 11.4032 9.75077 11.9999C9.75077 12.5966 9.98783 13.1689 10.4098 13.5909C10.8317 14.0128 11.404 14.2499 12.0008 14.2499Z"
        fill="#525866" />
    </svg>
  </button>
  <button v-if="status === 'inactive'" type="button" @click="modalMakeActive = true">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.2946 18.5677C15.7117 19.5717 13.8752 20.1034 12.0008 20.1004C7.14797 20.1004 3.11057 16.6084 2.26367 12.0004C2.6507 9.90405 3.70514 7.98901 5.26967 6.541L2.45357 3.7276L3.72707 2.4541L21.5462 20.2741L20.2727 21.5467L17.2937 18.5677H17.2946ZM6.54227 7.8154C5.31918 8.92743 4.46716 10.3883 4.10147 12.0004C4.38254 13.2302 4.94681 14.3774 5.74937 15.3507C6.55194 16.324 7.57064 17.0966 8.72437 17.6068C9.8781 18.117 11.135 18.3509 12.3951 18.2897C13.6551 18.2286 14.8835 17.8741 15.9824 17.2546L14.1572 15.4294C13.3802 15.9188 12.46 16.1297 11.5474 16.0274C10.6348 15.9251 9.78411 15.5157 9.13479 14.8664C8.48546 14.2171 8.07608 13.3664 7.97378 12.4538C7.87148 11.5412 8.08234 10.621 8.57177 9.844L6.54227 7.8154ZM12.8234 14.0956L9.90557 11.1778C9.74543 11.5854 9.70774 12.031 9.79713 12.4597C9.88651 12.8885 10.0991 13.2818 10.4088 13.5915C10.7185 13.9012 11.1118 14.1138 11.5406 14.2031C11.9693 14.2925 12.4148 14.2548 12.8225 14.0947L12.8234 14.0956ZM19.9271 16.1332L18.6392 14.8462C19.2408 13.9888 19.6691 13.0221 19.9001 12.0004C19.6555 10.9292 19.1956 9.91883 18.5484 9.03085C17.9012 8.14286 17.0802 7.39576 16.1353 6.83495C15.1903 6.27413 14.1412 5.91133 13.0517 5.76859C11.9622 5.62585 10.8551 5.70614 9.79757 6.0046L8.37737 4.5844C9.49967 4.1434 10.7228 3.9004 12.0008 3.9004C16.8536 3.9004 20.891 7.3924 21.7379 12.0004C21.4621 13.4995 20.8422 14.9142 19.9271 16.1332ZM11.7515 7.9576C12.3243 7.9222 12.8982 8.00896 13.435 8.21214C13.9717 8.41531 14.4592 8.73026 14.8651 9.13611C15.2709 9.54195 15.5859 10.0294 15.789 10.5662C15.9922 11.103 16.079 11.6768 16.0436 12.2497L11.7506 7.9576H11.7515Z"
        fill="#525866" />
    </svg>
  </button>

  <Modal v-model="modalMakeActive">
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
        <h2 class="font-medium text-center mt-4 text-strong">Do you want to Active your service</h2>
        <p class="text-center mt-2 text-secondary">
          Are you sure you want to Active this service? Your service will be visible into the chatbookly chatbot again.
        </p>
      </div>
      <div class="border-t border-border-light flex gap-3 px-5 py-4">
        <ButtonOutlineGray type="button" @click="modalMakeActive = false" class="w-full justify-center">
          Cancel
        </ButtonOutlineGray>
        <ButtonPrimary to="/" @click="() => {
          $emit('makeActive')
          modalMakeActive = false
        }" class="w-full justify-center">
          Yes, Active
        </ButtonPrimary>
      </div>
    </div>
  </Modal>

  <Modal v-model="modalMakeInactive">
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
        <h2 class="font-medium text-center mt-4 text-strong">Do you want to Inactive your service</h2>
        <p class="text-center mt-2 text-secondary">Are you sure you want to Inactive this service? Your service won't
          visible into the chatbookly chatbot.</p>
      </div>
      <div class="border-t border-border-light flex gap-3 px-5 py-4">
        <ButtonOutlineGray type="button" @click="modalMakeInactive = false" class="w-full justify-center">
          Cancel
        </ButtonOutlineGray>
        <ButtonDanger to="/" @click="() => {
          $emit('makeInactive')
          modalMakeInactive = false
        }" class="w-full justify-center">
          Yes, Inactive
        </ButtonDanger>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { Service } from '@/stores/services';
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import ButtonOutlineGray from '../shared/ButtonOutlineGray.vue';
import ButtonDanger from '../shared/ButtonDanger.vue';
import ButtonPrimary from '../shared/ButtonPrimary.vue';

const props = defineProps<{ data: Service | null }>()
const status = computed(() => props.data?.status)

const emit = defineEmits<{
  (e: 'makeActive'): void
  (e: 'makeInactive'): void
}>()

const modalMakeActive = ref(false)
const modalMakeInactive = ref(false)
</script>