<template>
  <form @submit.prevent="handleSubmit">
    <!-- Header -->
    <div class="flex items-center p-5 gap-3.5">
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
          <h2 class="text-sm font-medium text-strong">Assign Team Member</h2>
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
    <div class="border-t border-border-light p-5 space-y-3">
      <div v-for="(item, index) in db_team_members" :key="index">
        <label class="flex gap-3.5 border border-border-light rounded-xl p-4">
          <figure class="size-10">
            <img :src="item.image" :alt="item.first_name" class="object-cover rounded-full">
          </figure>
          <div class="grow">
            <h5 class="text-sm font-medium text-strong">{{ item.first_name }} {{ item.last_name }}</h5>
            <p class="text-xs text-secondary font-medium">{{ item.first_name }} {{ item.last_name }}</p>
          </div>
          <div class="">
            <input type="checkbox" v-model="formState" :value="item"
              class="appearance-none+ border border-border-light size-4 rounded-sm accent-accent-blue"
              :class="{ 'bg-accent-blue': formState.includes(item) }">
          </div>
        </label>
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
import { db_team_members, type TeamMember } from '@/stores/team-members';
import { reactive } from 'vue'
import ButtonOutlineGray from '../shared/ButtonOutlineGray.vue';
import ButtonPrimary from '../shared/ButtonPrimary.vue';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', value: TeamMember[]): void
}>()

const formState = reactive<TeamMember[]>([])

const handleSubmit = () => {
  emit('save', [...formState])
}
</script>
