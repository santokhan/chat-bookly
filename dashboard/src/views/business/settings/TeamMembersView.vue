<template>
    <div class="p-5">
        <div class="mx-auto px-5 py-5 bg-white border border-border-light rounded-xl">
            <div class="flex items-center gap-3">
                <h1 class="text-xl font-medium flex items-center gap-2">
                    Team Members
                    <span
                        class="inline-flex justify-center items-center rounded-full p-1 text-xs bg-info-lighter text-primary-500 size-5">
                        0
                    </span>
                </h1>
                <div class="grow"></div>
                <!-- Search Field -->
                <div class="">
                    <form class="border border-border-light flex items-center gap-2 p-2 rounded-lg">
                        <label for="search">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532Z"
                                    fill="#99A0AE" />
                            </svg>
                        </label>
                        <input type="search" name="search" id="search"
                            class="bg-transparent text-sm block w-full focus:border-none focus:outline-none"
                            placeholder="Search team members">
                    </form>
                </div>
                <div class="">
                    <ButtonPrimary @click="modalAddTeam = true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                                fill="white" />
                        </svg>
                        <span class="px-1 hidden lg:block">Add Team Member</span>
                    </ButtonPrimary>
                </div>
            </div>

            <div class="mt-4 space-y-3.5 overflow-x-auto">
                <!-- Team Table -->
                <div class="" v-if="teamMembers.length === 0">
                    <table class="min-w-full whitespace-nowrap">
                        <thead class="text-secondary font-medium text-sm">
                            <tr>
                                <th class="text-start px-3 py-2 font-medium bg-soft rounded-l-lg">Member Name</th>
                                <th class="text-start px-3 py-2 font-medium bg-soft">Contact</th>
                                <th class="text-start px-3 py-2 font-medium bg-soft">Rating</th>
                                <th class="text-start px-3 py-2 font-medium bg-soft rounded-r-lg">Actions</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="flex flex-col items-center pt-15 pb-10">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="47" height="47" rx="11.5" fill="#F5F7FA" />
                            <rect x="0.5" y="0.5" width="47" height="47" rx="11.5" stroke="#E1E4EA" />
                            <path
                                d="M32.4001 34.5002H30.3001V32.4002C30.3001 31.5648 29.9682 30.7635 29.3775 30.1728C28.7867 29.5821 27.9855 29.2502 27.1501 29.2502H20.8501C20.0147 29.2502 19.2135 29.5821 18.6227 30.1728C18.032 30.7635 17.7001 31.5648 17.7001 32.4002V34.5002H15.6001V32.4002C15.6001 31.0078 16.1532 29.6724 17.1378 28.6879C18.1224 27.7033 19.4577 27.1502 20.8501 27.1502H27.1501C28.5425 27.1502 29.8778 27.7033 30.8624 28.6879C31.847 29.6724 32.4001 31.0078 32.4001 32.4002V34.5002ZM24.0001 25.0502C23.1728 25.0502 22.3535 24.8872 21.5892 24.5706C20.8248 24.254 20.1303 23.79 19.5453 23.205C18.9603 22.62 18.4963 21.9255 18.1797 21.1611C17.8631 20.3967 17.7001 19.5775 17.7001 18.7502C17.7001 17.9229 17.8631 17.1036 18.1797 16.3393C18.4963 15.5749 18.9603 14.8804 19.5453 14.2954C20.1303 13.7104 20.8248 13.2464 21.5892 12.9298C22.3535 12.6131 23.1728 12.4502 24.0001 12.4502C25.671 12.4502 27.2734 13.1139 28.4549 14.2954C29.6364 15.4769 30.3001 17.0793 30.3001 18.7502C30.3001 20.4211 29.6364 22.0235 28.4549 23.205C27.2734 24.3864 25.671 25.0502 24.0001 25.0502ZM24.0001 22.9502C25.114 22.9502 26.1823 22.5077 26.9699 21.72C27.7576 20.9324 28.2001 19.8641 28.2001 18.7502C28.2001 17.6363 27.7576 16.568 26.9699 15.7803C26.1823 14.9927 25.114 14.5502 24.0001 14.5502C22.8862 14.5502 21.8179 14.9927 21.0302 15.7803C20.2426 16.568 19.8001 17.6363 19.8001 18.7502C19.8001 19.8641 20.2426 20.9324 21.0302 21.72C21.8179 22.5077 22.8862 22.9502 24.0001 22.9502Z"
                                fill="#335CFF" />
                        </svg>
                        <h4 class="text-xl font-medium text-strong mt-4 text-center">You have no team members yet</h4>
                        <p class="text-sm text-secondary mt-1 text-center">Add you team members</p>
                        <div class="mt-5">
                            <ButtonPrimary @click="modalAddTeam = true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                                        fill="white" />
                                </svg>
                                <span class="px-1 hidden lg:block">Add Team Member</span>
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
                <div v-else class="min-w-full inline-block align-middle">
                    <table class="min-w-full whitespace-nowrap">
                        <thead class="text-secondary font-medium text-sm">
                            <tr>
                                <th class="text-start px-3 py-2 font-medium bg-soft rounded-l-lg">Member Name</th>
                                <th class="text-start px-3 py-2 font-medium bg-soft">Contact</th>
                                <th class="text-start px-3 py-2 font-medium bg-soft">Rating</th>
                                <th class="text-start px-3 py-2 font-medium bg-soft rounded-r-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="font-medium text-sm divide-y divide-border-light">
                            <tr v-for="(member, index) in teamMembers" :key="index">
                                <td class="p-3 text-strong">
                                    <div class="flex items-center gap-3">
                                        <figure class="size-10 shrink0">
                                            <img class="size-10 rounded-full" :src="member.image" alt="profile" />
                                        </figure>
                                        <div class="">
                                            <h5 class="text-sm">{{ member.first_name }} {{ member.last_name }}</h5>
                                            <p class="text-xs text-secondary font-normal mt-0.5">{{ member.role }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="p-3 text-secondary">
                                    <div class="">
                                        <a class="text-sm text-primary font-normal" :href="`mailto:${member.email}`">
                                            {{ member.email }}
                                        </a>
                                    </div>
                                    <div class="mt-0.5">
                                        <a class="text-sm text-secondary font-normal" :href="`tel:${member.phone}`">
                                            {{ member.phone }}
                                        </a>
                                    </div>
                                </td>
                                <td class="p-3 text-strong">
                                    <StarRating :rating="member.rating" />
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center gap-2">
                                        <ActionDeleteTeam @remove="teamMembers.splice(index, 1)" />
                                        <button type="button" @click="modalEditTeam = true"
                                            class="size-8 transition-all text-neutral-500 hover:text-primary">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12.796 8.26456L11.7355 7.20406L4.75 14.1896V15.2501H5.8105L12.796 8.26456ZM13.8565 7.20406L14.917 6.14356L13.8565 5.08306L12.796 6.14356L13.8565 7.20406ZM6.4315 16.7501H3.25V13.5678L13.3263 3.49156C13.4669 3.35096 13.6576 3.27197 13.8565 3.27197C14.0554 3.27197 14.2461 3.35096 14.3868 3.49156L16.5085 5.61331C16.6491 5.75396 16.7281 5.94469 16.7281 6.14356C16.7281 6.34244 16.6491 6.53317 16.5085 6.67381L6.43225 16.7501H6.4315Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <Modal v-model="modalAddTeam">
        <FormAddTeam @close="modalAddTeam = false" @save="onSave" />
    </Modal>

    <Modal v-model="modalEditTeam">
        <FormEditTeam @close="modalEditTeam = false" @save="onUpdate" />
    </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { reactive, ref } from 'vue'
import ButtonPrimary from '@/components/shared/ButtonPrimary.vue'
import { db_team_members } from '@/stores/team-members'
import StarRating from '@/components/shared/StarRating.vue'
import FormAddTeam from '@/components/forms/FormAddTeam.vue'
import ActionDeleteTeam from '@/components/actions/DeleteTeam.vue'
import FormEditTeam from '@/components/forms/FormEditTeam.vue'

const modalAddTeam = ref(false)
const modalEditTeam = ref(false)
const teamMembers = reactive(db_team_members)
// const teamMembers = reactive<TeamMember[]>([])

async function onSave() {
    modalAddTeam.value = false
}

async function onUpdate() {
    modalEditTeam.value = false
}
</script>
