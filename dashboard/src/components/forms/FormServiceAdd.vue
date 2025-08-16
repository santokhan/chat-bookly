<template>
  <form @submit.prevent="onCreateService">
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
          d="M16.25 14.75V12.5C16.25 12.3011 16.329 12.1103 16.4697 11.9697C16.6103 11.829 16.8011 11.75 17 11.75H23C23.1989 11.75 23.3897 11.829 23.5303 11.9697C23.671 12.1103 23.75 12.3011 23.75 12.5V14.75H26.75C26.9489 14.75 27.1397 14.829 27.2803 14.9697C27.421 15.1103 27.5 15.3011 27.5 15.5V26C27.5 26.1989 27.421 26.3897 27.2803 26.5303C27.1397 26.671 26.9489 26.75 26.75 26.75H13.25C13.0511 26.75 12.8603 26.671 12.7197 26.5303C12.579 26.3897 12.5 26.1989 12.5 26V15.5C12.5 15.3011 12.579 15.1103 12.7197 14.9697C12.8603 14.829 13.0511 14.75 13.25 14.75H16.25ZM14 23V25.25H26V23H14ZM14 21.5H26V16.25H14V21.5ZM17.75 13.25V14.75H22.25V13.25H17.75ZM19.25 19.25H20.75V20.75H19.25V19.25Z"
          fill="#525866" />
      </svg>
      <div class="grow flex items-start">
        <div class="grow">
          <h2 class="text-sm font-medium text-strong">Add New Service</h2>
          <p class="mt-1 text-xs text-secondary">Add new service for your customer</p>
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
      <!-- Service Name -->
      <div>
        <label class="block text-sm font-medium text-strong mb-1">Service Name<span
            class="text-primary-500">*</span></label>
        <input v-model="form.name" type="text" required placeholder="Add a service name e:g: Mens Haircut"
          class="w-full border border-border-light rounded-[0.625rem] px-3 py-2.5 text-sm focus:outline-none" />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-strong mb-1">Description <span
            class="text-secondary">(Optional)</span></label>
        <textarea v-model="form.description" rows="3"
          class="w-full border border-border-light rounded-[0.625rem] px-3 py-2.5 text-sm focus:outline-none"
          placeholder="Add a short description"></textarea>
      </div>

      <!-- Category -->
      <div class="">
        <div>
          <label class="block text-sm font-medium text-strong mb-1">Category</label>
          <div class="flex items-center gap-2 w-full border border-border-light rounded-[0.625rem] px-3 py-2.5 text-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.75 3.25C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H16.75ZM9.25 10.75H4V15.25H9.25V10.75ZM16 10.75H10.75V15.25H16V10.75ZM9.25 4.75H4V9.25H9.25V4.75ZM16 4.75H10.75V9.25H16V4.75Z"
                fill="#CACFD8" />
            </svg>
            <select v-model="form.category_id" class="w-full focus:outline-none">
              <option disabled value="">Category</option>
              <option v-for="(item, index) in categories" :key="item?.id" :value="item?.id">
                {{ item?.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 7.4V11H8.6V7.4H7.4ZM7.4 5V6.2H8.6V5H7.4Z"
              fill="#99A0AE" />
          </svg>
          <p class="text-xs font-medium text-secondary mt-1">Business category can't changed. If you want to change
            <RouterLink to="/support" class="text-primary-500 underline">contact us</RouterLink>
          </p>
        </div>
      </div>

      <!-- Type (Search/Tag Input) -->
      <SearchTypeInput />

      <!-- Team Member (Select) -->
      <div>
        <label class="block text-sm font-medium text-strong mb-1">Team Members<span
            class="text-primary-500">*</span></label>
        <div class="flex flex-wrap gap-2 border border-light rounded-[0.625rem] px-3 py-2">
          <template v-for="(item, index) in form.team_members" :key="index">
            <div class="inline-flex items-center gap-1 border border-light rounded-md p-0.5">
              <img :src="item.image" :alt="item.first_name" class="size-4 rounded-full" />
              <span class="text-xs whitespace-nowrap">{{ item.first_name }} {{ item.last_name }}</span>
              <button type="button" @click="form.team_members?.splice(index, 1)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.00004 7.15164L10.97 4.18164L11.8184 5.03004L8.84844 8.00004L11.8184 10.97L10.97 11.8184L8.00004 8.84844L5.03004 11.8184L4.18164 10.97L7.15164 8.00004L4.18164 5.03004L5.03004 4.18164L8.00004 7.15164Z"
                    fill="#99A0AE" />
                </svg>
              </button>
            </div>
          </template>
          <SelectTeamMember @select="assignTeamMember" />
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- Price -->
        <div class="basis-1/2 grow">
          <label for="price" class="block text-sm font-medium text-strong mb-1">Price<span
              class="text-primary-500">*</span></label>
          <div class="relative flex items-center gap-2 border border-light rounded-[0.625rem] px-3 py-2.5">
            <label for="price" class="size-5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM8.5375 9.25H12.25V10.75H8.5375C8.60247 11.069 8.74938 11.3656 8.96376 11.6106C9.17815 11.8556 9.45263 12.0405 9.76019 12.1472C10.0677 12.2539 10.3978 12.2787 10.7178 12.2191C11.0379 12.1596 11.3369 12.0177 11.5855 11.8075L12.8605 12.6573C12.4224 13.1342 11.8563 13.475 11.2298 13.639C10.6033 13.8031 9.94278 13.7834 9.32716 13.5823C8.71153 13.3812 8.16676 13.0073 7.75784 12.5051C7.34892 12.0029 7.09314 11.3936 7.021 10.75H6.25V9.25H7.02025C7.09214 8.60608 7.34786 7.99646 7.75687 7.49395C8.16588 6.99145 8.71089 6.61729 9.32681 6.41618C9.94273 6.21506 10.6035 6.19549 11.2303 6.35979C11.857 6.5241 12.4232 6.86533 12.8612 7.34275L11.5855 8.1925C11.3369 7.98229 11.0379 7.84042 10.7178 7.78086C10.3978 7.72129 10.0677 7.74608 9.76019 7.85279C9.45263 7.9595 9.17815 8.14445 8.96376 8.38943C8.74938 8.63442 8.60247 8.931 8.5375 9.25Z"
                  fill="#525866" />
              </svg>
            </label>
            <input v-model.number="form.price" type="number" id="price" min="0"
              class="w-full text-sm focus:outline-none" required />
          </div>
        </div>

        <!-- Duration -->
        <div class="basis-1/2 grow">
          <label class="block text-sm font-medium text-strong mb-1">Duration<span
              class="text-primary-500">*</span></label>

          <div class="relative flex items-center gap-2 border border-light rounded-[0.625rem] px-3 py-2.5">
            <label for="duration" class="size-5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM10.75 10H13.75V11.5H9.25V6.25H10.75V10Z"
                  fill="#525866" />
              </svg>
            </label>

            <select v-model="form.duration" class="w-full text-sm focus:outline-none" id="duration" required>
              <option disabled value="">Select duration</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">1 h</option>
              <option value="120">2 h</option>
              <option value="180">3 h</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-border-light flex justify-end gap-3 px-5 py-4">
      <ButtonOutlineGray type="button" @click="emit('close')" class="w-full justify-center">
        Cancel
      </ButtonOutlineGray>
      <ButtonPrimary type="submit" class="w-full justify-center">
        Add Service
      </ButtonPrimary>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { type TeamMember } from '@/stores/team-members'
import ButtonOutlineGray from '../shared/ButtonOutlineGray.vue'
import ButtonPrimary from '../shared/ButtonPrimary.vue'
import SelectTeamMember from '../shared/SelectTeamMember.vue';
import { type Service } from '@/stores/services';
import { categories } from '@/stores/category';
import SearchTypeInput from './SearchTypeInput.vue';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', value: Service): void
}>()

const form = reactive<Service>({
  name: '',
  description: '',
  category_id: '',
  category: '',
  types: [],
  team_members: [],
  price: 0,
  duration: 0
})

function assignTeamMember(member: TeamMember) {
  if (Array.isArray(form.team_members)) {
    if (form.team_members.find(m => m.id === member.id)) {
      return
    }
    form.team_members.push(member)
  }
}

const onCreateService = () => {
  emit('save', { ...form })
}
</script>