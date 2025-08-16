<template>
  <form @submit.prevent="handleSubmit">
    <!-- Header -->
    <div class="flex items-center px-5 py-4 gap-3.5">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z"
          fill="white" />
        <path
          d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z"
          stroke="#E1E4EA" />
        <path
          d="M26 27.5H24.5V26C24.5 25.4033 24.2629 24.831 23.841 24.409C23.419 23.9871 22.8467 23.75 22.25 23.75H17.75C17.1533 23.75 16.581 23.9871 16.159 24.409C15.7371 24.831 15.5 25.4033 15.5 26V27.5H14V26C14 25.0054 14.3951 24.0516 15.0983 23.3483C15.8016 22.6451 16.7554 22.25 17.75 22.25H22.25C23.2446 22.25 24.1984 22.6451 24.9017 23.3483C25.6049 24.0516 26 25.0054 26 26V27.5ZM20 20.75C19.4091 20.75 18.8239 20.6336 18.2779 20.4075C17.732 20.1813 17.2359 19.8498 16.818 19.432C16.4002 19.0141 16.0687 18.518 15.8425 17.9721C15.6164 17.4261 15.5 16.8409 15.5 16.25C15.5 15.6591 15.6164 15.0739 15.8425 14.5279C16.0687 13.982 16.4002 13.4859 16.818 13.068C17.2359 12.6502 17.732 12.3187 18.2779 12.0925C18.8239 11.8664 19.4091 11.75 20 11.75C21.1935 11.75 22.3381 12.2241 23.182 13.068C24.0259 13.9119 24.5 15.0565 24.5 16.25C24.5 17.4435 24.0259 18.5881 23.182 19.432C22.3381 20.2759 21.1935 20.75 20 20.75ZM20 19.25C20.7956 19.25 21.5587 18.9339 22.1213 18.3713C22.6839 17.8087 23 17.0456 23 16.25C23 15.4544 22.6839 14.6913 22.1213 14.1287C21.5587 13.5661 20.7956 13.25 20 13.25C19.2044 13.25 18.4413 13.5661 17.8787 14.1287C17.3161 14.6913 17 15.4544 17 16.25C17 17.0456 17.3161 17.8087 17.8787 18.3713C18.4413 18.9339 19.2044 19.25 20 19.25Z"
          fill="#525866" />
      </svg>
      <div class="grow flex items-start">
        <div class="grow">
          <h2 class="text-sm font-medium text-strong">Add Team Member</h2>
          <p class="mt-1 text-xs text-secondary">Fill in the details to add a new team member</p>
        </div>
        <button type="button" @click="emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 10.94L15.71 7.23L16.77 8.29L13.06 12L16.77 15.71L15.71 16.77L12 13.06L8.29 16.77L7.23 15.71L10.94 12L7.23 8.29L8.29 7.23L12 10.94Z"
              fill="#525866" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Form Fields -->
    <div class="border-t border-border-light p-5 space-y-4">
      <!-- Profile Upload -->
      <ProfileUpload />

      <div class="flex items-center gap-3">
        <div>
          <label class="block text-sm font-medium text-strong">First Name<span>*</span></label>
          <input type="text" v-model="formState.first_name" required
            class="mt-1 w-full px-3 py-2.5 text-sm border border-border-light rounded-[0.625rem]" placeholder="John">
        </div>

        <div>
          <label class="block text-sm font-medium text-strong">Last Name<span>*</span></label>
          <input type="text" v-model="formState.last_name" required
            class="mt-1 w-full px-3 py-2.5 text-sm border border-border-light rounded-[0.625rem]" placeholder="Smith">
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-strong">
          Email
          <span class="text-secondary">(Optional)</span>
        </label>
        <input type="email" v-model="formState.email" required
          class="mt-1 w-full px-3 py-2.5 text-sm border border-border-light rounded-[0.625rem]"
          placeholder="hello@brand.com">
      </div>

      <div>
        <label class="block text-sm font-medium text-strong">
          Phone
          <span class="text-secondary">(Optional)</span>
        </label>
        <div class="flex items-end">
          <div class="">
            <button type="button"
              class="flex items-center gap-2 text-sm text-secondary focus:outline-2 -outline-offset-2 px-2.5 py-2.5 rounded-l-[0.625rem] border border-border-light border-r-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1252_7727)">
                  <path
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                    fill="#F0F0F0" />
                  <path d="M9.56543 9.99982H20.0002C20.0002 9.09725 19.8799 8.22287 19.6557 7.39111H9.56543V9.99982Z"
                    fill="#D80027" />
                  <path d="M9.56543 4.78254H18.5325C17.9203 3.78363 17.1376 2.9007 16.225 2.17383H9.56543V4.78254Z"
                    fill="#D80027" />
                  <path
                    d="M10.0002 20.0001C12.3537 20.0001 14.5169 19.1866 16.2251 17.8262H3.77539C5.48359 19.1866 7.64676 20.0001 10.0002 20.0001Z"
                    fill="#D80027" />
                  <path
                    d="M1.46797 15.2171H18.5325C19.0239 14.4152 19.4051 13.5386 19.6557 12.6084H0.344727C0.595391 13.5386 0.976523 14.4152 1.46797 15.2171Z"
                    fill="#D80027" />
                  <path
                    d="M4.63219 1.56164H5.54348L4.69582 2.17746L5.01961 3.17391L4.17199 2.55809L3.32437 3.17391L3.60406 2.31309C2.85773 2.93477 2.20359 3.66313 1.66453 4.47469H1.95652L1.41695 4.86668C1.33289 5.00691 1.25227 5.14937 1.175 5.29395L1.43266 6.08695L0.951953 5.7377C0.832461 5.99086 0.723164 6.24973 0.624922 6.51398L0.908789 7.38773H1.95652L1.10887 8.00356L1.43266 9L0.585039 8.38418L0.0773047 8.75309C0.0264844 9.1616 0 9.57769 0 10H10C10 4.47719 10 3.82609 10 0C8.02453 0 6.18301 0.573047 4.63219 1.56164ZM5.01961 9L4.17199 8.38418L3.32437 9L3.64816 8.00356L2.80051 7.38773H3.84824L4.17199 6.39129L4.49574 7.38773H5.54348L4.69582 8.00356L5.01961 9ZM4.69582 5.09051L5.01961 6.08695L4.17199 5.47113L3.32437 6.08695L3.64816 5.09051L2.80051 4.47469H3.84824L4.17199 3.47824L4.49574 4.47469H5.54348L4.69582 5.09051ZM8.60656 9L7.75895 8.38418L6.91133 9L7.23512 8.00356L6.38746 7.38773H7.4352L7.75895 6.39129L8.0827 7.38773H9.13043L8.28277 8.00356L8.60656 9ZM8.28277 5.09051L8.60656 6.08695L7.75895 5.47113L6.91133 6.08695L7.23512 5.09051L6.38746 4.47469H7.4352L7.75895 3.47824L8.0827 4.47469H9.13043L8.28277 5.09051ZM8.28277 2.17746L8.60656 3.17391L7.75895 2.55809L6.91133 3.17391L7.23512 2.17746L6.38746 1.56164H7.4352L7.75895 0.565195L8.0827 1.56164H9.13043L8.28277 2.17746Z"
                    fill="#0052B4" />
                </g>
                <defs>
                  <clipPath id="clip0_1252_7727">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>+1</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.99956 10.879L13.7121 7.1665L14.7726 8.227L9.99956 13L5.22656 8.227L6.28706 7.1665L9.99956 10.879Z"
                  fill="currentColor" />
              </svg>
            </button>
          </div>
          <input type="tel" v-model="formState.phone"
            class="mt-1 w-full px-3 py-2.5 text-sm border border-border-light rounded-l-none rounded-r-[0.625rem]"
            placeholder="(555) 000-0000">
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-strong">
          Date of Birth
          <span class="text-secondary">(Optional)</span>
        </label>
        <input type="date" v-model="formState.dob"
          class="mt-1 w-full px-3 py-2.5 text-sm border border-border-light rounded-[0.625rem]">
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-border-light flex justify-end gap-3 px-5 py-4">
      <ButtonOutlineGray type="button" @click="emit('close')" class="w-full justify-center">
        Cancel
      </ButtonOutlineGray>
      <ButtonPrimary type="submit" class="w-full justify-center">
        Add Team Member
      </ButtonPrimary>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { TeamMember } from '@/stores/team-members';
import { reactive } from 'vue'
import ButtonOutlineGray from '../shared/ButtonOutlineGray.vue';
import ButtonPrimary from '../shared/ButtonPrimary.vue';
import ProfileUpload from '../ProfileUpload.vue';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', value: TeamMember): void
}>()

const formState = reactive<TeamMember>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  role: '',
  image: '',
  rating: 0,
  dob: '',
})

const handleSubmit = () => {
  emit('save', { ...formState })
}
</script>
