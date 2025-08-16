<template>
    <section class="max-w-4xl mx-auto px-4 py-10 space-y-[1.875rem]">
        <div class="space-y-1.5">
            <h1 class="text-2xl font-medium">Billing</h1>
            <p class="text-sm text-secondary">Manage your billing and payment details</p>
        </div>

        <!-- Active Plan -->
        <div class="space-y-3">
            <h5 class="font-medium text-secondary">Active Plan</h5>
            <!-- Table -->
            <div class="border border-soft-200 rounded-[0.625rem] bg-white flex items-center gap-4 py-5">
                <div class="overflow-x-auto grow">
                    <div class="min-w-full inline-block align-middle">
                        <table class="min-w-full whitespace-nowrap">
                            <thead class="text-secondary text-sm">
                                <tr>
                                    <th class="px-5 text-start py-1 font-medium">PLAN NAME</th>
                                    <th class="px-5 text-start py-1 font-medium">PLAN</th>
                                    <th class="px-5 text-start py-1 font-medium">COST</th>
                                    <th class="px-5 text-start py-1 font-medium">PURCHASE DATE</th>
                                    <th class="px-5 text-start py-1 font-medium">EXPIRY DATE</th>
                                </tr>
                            </thead>
                            <tbody class="font-medium text-strong">
                                <tr>
                                    <td class="px-5 py-1">Business</td>
                                    <td class="px-5 py-1">Yearly</td>
                                    <td class="px-5 py-1">$198.00</td>
                                    <td class="px-5 py-1">10 Aug 2025</td>
                                    <td class="px-5 py-1">10 Aug 2026</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="px-5">
                    <a href="/plan" v-if="canceled"
                        class="bg-primary-500 text-white font-medium border rounded-[0.625rem] px-3.25 py-2.5 whitespace-nowrap flex items-center gap-2">
                        <svg width="20" height="20" class="size-5" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.25 2.5C12.7767 2.49994 13.2942 2.63855 13.7503 2.9019C14.2065 3.16525 14.5852 3.54406 14.8486 4.00022C15.1119 4.45639 15.2505 4.97385 15.2504 5.50056C15.2503 6.02728 15.1115 6.54468 14.848 7.00075L18.25 7V8.5H16.75V16C16.75 16.1989 16.671 16.3897 16.5303 16.5303C16.3897 16.671 16.1989 16.75 16 16.75H4C3.80109 16.75 3.61032 16.671 3.46967 16.5303C3.32902 16.3897 3.25 16.1989 3.25 16V8.5H1.75V7L5.152 7.00075C4.7799 6.35642 4.66052 5.5968 4.81704 4.86938C4.97356 4.14197 5.39481 3.49868 5.999 3.06442C6.60319 2.63016 7.3472 2.43592 8.08656 2.51941C8.82592 2.60291 9.50787 2.95819 10 3.51625C10.2809 3.19629 10.627 2.94008 11.0151 2.76481C11.4032 2.58954 11.8242 2.49925 12.25 2.5ZM9.25 8.5H4.75V15.25H9.25V8.5ZM15.25 8.5H10.75V15.25H15.25V8.5ZM7.75 4C7.36076 3.99826 6.98609 4.14789 6.70514 4.41729C6.42418 4.68668 6.25895 5.05474 6.24434 5.44371C6.22974 5.83268 6.36691 6.21209 6.62687 6.50179C6.88683 6.7915 7.24923 6.9688 7.6375 6.99625L7.75 7H9.25V5.5C9.25002 5.14155 9.12167 4.79494 8.88819 4.52295C8.65472 4.25095 8.33157 4.07156 7.97725 4.01725L7.86175 4.00375L7.75 4ZM12.25 4C11.8716 3.99988 11.5071 4.14281 11.2296 4.40013C10.9521 4.65744 10.7821 5.01014 10.7537 5.3875L10.75 5.5V7H12.25C12.6284 7.00012 12.9929 6.8572 13.2704 6.59988C13.5479 6.34256 13.7179 5.98987 13.7463 5.6125L13.75 5.5C13.75 5.10218 13.592 4.72065 13.3107 4.43934C13.0294 4.15804 12.6478 4 12.25 4Z"
                                fill="white" />
                        </svg>
                        Upgrade Plan
                    </a>
                    <a href="/plan" v-else
                        class="text-primary-500 font-medium border border-primary-500 rounded-[0.625rem] px-3.25 py-2.5 whitespace-nowrap flex">
                        Change Plan
                    </a>
                </div>
            </div>
        </div>

        <!-- Purchase History -->
        <div class="space-y-3">
            <h5 class="font-medium text-secondary">Purchase History</h5>
            <!-- Table -->
            <div class="border border-soft-200 bg-white flex gap-4 rounded-[0.625rem] overflow-x-auto">
                <div class="min-w-full inline-block align-middle p-5">
                    <table class="min-w-full whitespace-nowrap">
                        <thead class="text-secondary font-medium text-sm">
                            <tr class="rounded-lg">
                                <th class="text-start px-5 py-4 font-medium bg-soft rounded-l-[0.625rem]">PLAN NAME</th>
                                <th class="text-start px-5 py-4 font-medium bg-soft">PLAN</th>
                                <th class="text-start px-5 py-4 font-medium bg-soft">COST</th>
                                <th class="text-start px-5 py-4 font-medium bg-soft">PURCHASE DATE</th>
                                <th class="text-start px-5 py-4 font-medium bg-soft">EXPIRY DATE</th>
                                <th class="text-start px-5 py-4 font-medium bg-soft rounded-r-[0.625rem]">STATUS</th>
                            </tr>
                        </thead>
                        <tbody class="font-medium text-sm divide-y divide-border-light">
                            <tr>
                                <td class="px-5 py-4 text-strong">Business</td>
                                <td class="px-5 py-4 text-secondary">Yearly</td>
                                <td class="px-5 py-4 text-strong">$198.00</td>
                                <td class="px-5 py-4 text-secondary">10 Aug 2025</td>
                                <td class="px-5 py-4 text-secondary">10 Aug 2026</td>
                                <td class="px-5 py-4">
                                    <span class="text-accent-success">Active</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-5 py-4 text-strong">Business</td>
                                <td class="px-5 py-4 text-secondary">Starter</td>
                                <td class="px-5 py-4 text-strong">$198.00</td>
                                <td class="px-5 py-4 text-secondary">27 Dec 2022</td>
                                <td class="px-5 py-4 text-secondary">27 Dec 2022</td>
                                <td class="px-5 py-4">
                                    <span class="text-error">Expired</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-5 py-4 text-strong">Business</td>
                                <td class="px-5 py-4 text-secondary">Monthly</td>
                                <td class="px-5 py-4 text-strong">$198.00</td>
                                <td class="px-5 py-4 text-secondary">27 Dec 2022</td>
                                <td class="px-5 py-4 text-secondary">27 Dec 2022</td>
                                <td class="px-5 py-4">
                                    <span class="text-error">Expired</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Next Billing Date -->
        <div class="space-y-3">
            <div class="border border-soft-200 bg-white flex gap-4 rounded-[0.625rem] justify-between items-center p-5">
                <div class="font-medium text-secondary flex gap-4 items-center">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="size-7">
                        <path
                            d="M20.9987 23.3331V3.49978C20.9985 3.2954 20.9447 3.09465 20.8426 2.91762C20.7404 2.7406 20.5936 2.59351 20.4167 2.49108C20.2399 2.38865 20.0392 2.33448 19.8348 2.33399C19.6305 2.3335 19.4295 2.3867 19.2522 2.48828L15.7487 4.49494L12.2452 2.48828C12.0687 2.38717 11.8688 2.33398 11.6654 2.33398C11.4619 2.33398 11.2621 2.38717 11.0855 2.48828L7.58203 4.49494L4.07853 2.48828C3.90118 2.3867 3.70026 2.3335 3.49589 2.33399C3.29151 2.33448 3.09085 2.38865 2.914 2.49108C2.73714 2.59351 2.59029 2.7406 2.48816 2.91762C2.38602 3.09465 2.33218 3.2954 2.33203 3.49978V23.3331C2.33203 23.952 2.57786 24.5454 3.01545 24.983C3.45303 25.4206 4.04653 25.6664 4.66536 25.6664H23.332C22.7132 25.6664 22.1197 25.4206 21.6821 24.983C21.2445 24.5454 20.9987 23.952 20.9987 23.3331Z"
                            fill="#9A9AF4" />
                        <path
                            d="M25.6655 16.3335V23.3335C25.6655 23.9523 25.4197 24.5458 24.9821 24.9834C24.5445 25.421 23.951 25.6668 23.3322 25.6668C22.7133 25.6668 22.1198 25.421 21.6823 24.9834C21.2447 24.5458 20.9988 23.9523 20.9988 23.3335V14.0002H23.3322C23.951 14.0002 24.5445 14.246 24.9821 14.6836C25.4197 15.1212 25.6655 15.7147 25.6655 16.3335ZM14 11.6668H9.33333C9.02391 11.6668 8.72717 11.5439 8.50838 11.3251C8.28958 11.1063 8.16667 10.8096 8.16667 10.5002C8.16667 10.1907 8.28958 9.894 8.50838 9.67521C8.72717 9.45641 9.02391 9.3335 9.33333 9.3335H14C14.3094 9.3335 14.6062 9.45641 14.825 9.67521C15.0437 9.894 15.1667 10.1907 15.1667 10.5002C15.1667 10.8096 15.0437 11.1063 14.825 11.3251C14.6062 11.5439 14.3094 11.6668 14 11.6668ZM10.5 16.3335H8.16667C7.85725 16.3335 7.5605 16.2106 7.34171 15.9918C7.12292 15.773 7 15.4762 7 15.1668C7 14.8574 7.12292 14.5607 7.34171 14.3419C7.5605 14.1231 7.85725 14.0002 8.16667 14.0002H10.5C10.8094 14.0002 11.1062 14.1231 11.325 14.3419C11.5437 14.5607 11.6667 14.8574 11.6667 15.1668C11.6667 15.4762 11.5437 15.773 11.325 15.9918C11.1062 16.2106 10.8094 16.3335 10.5 16.3335ZM10.5 21.0002H8.16667C7.85725 21.0002 7.5605 20.8772 7.34171 20.6585C7.12292 20.4397 7 20.1429 7 19.8335C7 19.5241 7.12292 19.2273 7.34171 19.0085C7.5605 18.7897 7.85725 18.6668 8.16667 18.6668H10.5C10.8094 18.6668 11.1062 18.7897 11.325 19.0085C11.5437 19.2273 11.6667 19.5241 11.6667 19.8335C11.6667 20.1429 11.5437 20.4397 11.325 20.6585C11.1062 20.8772 10.8094 21.0002 10.5 21.0002ZM15.1667 16.3335C14.9745 16.3355 14.785 16.2894 14.6151 16.1996C14.4452 16.1099 14.3005 15.9791 14.1939 15.8192C14.0873 15.6594 14.0223 15.4754 14.0047 15.2841C13.9872 15.0928 14.0176 14.9001 14.0933 14.7235C14.1622 14.544 14.2752 14.3847 14.4219 14.2604C14.5686 14.1361 14.7443 14.0508 14.9327 14.0124C15.1211 13.974 15.3162 13.9838 15.4998 14.0408C15.6835 14.0978 15.8498 14.2002 15.9833 14.3385C16.0962 14.4464 16.1838 14.5779 16.24 14.7235C16.2998 14.8638 16.3315 15.0144 16.3333 15.1668C16.3287 15.8085 15.8083 16.3288 15.1667 16.3335ZM15.1667 21.0002C15.0142 20.9983 14.8636 20.9666 14.7233 20.9068C14.5819 20.8478 14.4517 20.7649 14.3383 20.6618C14.2324 20.5484 14.1456 20.4183 14.0817 20.2768C14.0256 20.1359 13.9978 19.9852 14 19.8335C14.0035 19.5243 14.1248 19.2292 14.3383 19.0052C14.5022 18.843 14.7106 18.7332 14.937 18.6895C15.1634 18.6459 15.3976 18.6705 15.61 18.7602C15.6845 18.7854 15.7551 18.8207 15.82 18.8652C15.8807 18.9083 15.939 18.955 15.995 19.0052C16.2085 19.2292 16.3287 19.5243 16.3333 19.8335C16.3346 19.9871 16.3054 20.1394 16.2473 20.2816C16.1892 20.4238 16.1034 20.553 15.995 20.6618C15.8815 20.7647 15.7513 20.8475 15.61 20.9068C15.4697 20.9666 15.3191 20.9983 15.1667 21.0002Z"
                            fill="#335CFF" />
                    </svg>
                    <span>
                        Next billing on <span class="font-medium text-primary">10 Aug 2026</span>
                    </span>
                </div>
                <div class="">
                    <button v-if="!canceled" type="button" @click="modal = true" class="font-medium text-sm text-error">
                        Cancel Subscription
                    </button>
                    <div v-else class="font-medium text-sm text-neutral-300">
                        Subscription canceled
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Modal v-model="modal">
        <div v-if="canceled">
            <div class="flex flex-col items-center p-5 fade-in" data-aos="zoom-in" data-aos-duration="500">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
                        fill="#E0FAEC" />
                    <path
                        d="M20 29C15.0293 29 11 24.9707 11 20C11 15.0293 15.0293 11 20 11C24.9707 11 29 15.0293 29 20C29 24.9707 24.9707 29 20 29ZM19.1027 23.6L25.4657 17.2361L24.1931 15.9635L19.1027 21.0548L16.5566 18.5087L15.284 19.7813L19.1027 23.6Z"
                        fill="#1FC16B" />
                </svg>
                <h2 class="font-medium text-center mt-4 text-strong">Your subscription has been canceled</h2>
                <p class="text-center mt-2 text-secondary">Your plan is active until Aug 10, 2026. You may continue to
                    use the Chatbookly pro until your subscription expired.</p>
            </div>
            <div class="border-t border-border-light flex justify-end gap-3 px-5 py-4">
                <button type="button" @click="modal = false"
                    class="font-medium text-sm p-2 rounded-[0.625rem] w-full border border-border-light bg-white text-secondary hover:brightness-95">
                    Close
                </button>
                <RouterLink to="/" @click="() => {
                    canceled = false
                    modal = false
                }"
                    class="font-medium text-sm p-2 rounded-[0.625rem] w-full bg-primary text-white hover:brightness-95 text-center">
                    Go to dashboard
                </RouterLink>
            </div>
        </div>
        <div v-else>
            <div class="flex flex-col items-center p-5">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="size-10">
                    <path
                        d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
                        fill="#FFF1EB" />
                    <path
                        d="M20.7405 11.9324L28.8854 26.2027C28.9605 26.3342 29 26.4833 29 26.6351C29 26.7869 28.9605 26.9361 28.8855 27.0676C28.8104 27.199 28.7025 27.3082 28.5725 27.3841C28.4425 27.46 28.2951 27.5 28.145 27.5H11.855C11.7049 27.5 11.5575 27.46 11.4275 27.3841C11.2975 27.3082 11.1896 27.199 11.1145 27.0676C11.0395 26.9361 11 26.7869 11 26.6351C11 26.4833 11.0395 26.3342 11.1146 26.2027L19.2595 11.9324C19.3346 11.8009 19.4425 11.6918 19.5725 11.6159C19.7025 11.54 19.8499 11.5 20 11.5C20.1501 11.5 20.2975 11.54 20.4275 11.6159C20.5575 11.6918 20.6654 11.8009 20.7405 11.9324ZM19.145 23.1757V24.9054H20.855V23.1757H19.145ZM19.145 17.1216V21.4459H20.855V17.1216H19.145Z"
                        fill="#FF8447" />
                </svg>
                <h2 class="font-medium text-center mt-4 text-strong">Your subscription has been canceled</h2>
                <p class="text-center mt-2 text-secondary">Your plan is active until Aug 10, 2026. You may continue to
                    use the Chatbookly pro until your subscription expired.</p>
            </div>
            <div class="border-t border-border-light flex justify-end gap-3 px-5 py-4">
                <button type="button" @click="modal = false"
                    class="font-medium text-sm p-2 rounded-[0.625rem] w-full border border-border-light bg-white text-secondary hover:brightness-95">
                    No, go back!
                </button>
                <button type="button" @click="cancelSubscription"
                    class="font-medium text-sm p-2 rounded-[0.625rem] w-full bg-error text-white hover:brightness-95">
                    Yes, Cancel!
                </button>
            </div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const modal = ref(false)
const canceled = ref(false)

async function cancelSubscription() {
    canceled.value = true
}
</script>
