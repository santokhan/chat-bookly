<template>
    <div class="bg-neutral-50 w-full relative h-full overflow-y-auto">
        <div class="container mx-auto h-full relative z-10"> <!-- step1 -->
            <div v-if="currentStep === 1" class="flex justify-center gap-14 items-center h-full">
                <div
                    class="w-[500px] bg-neutral-white h-[384px] shadow-shadow-regular rounded-[12px] p-[24px] border border-neutral-100">
                    <h4
                        class="font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-neutral-500 font-inter mb-2">
                        Good Evening
                        👋</h4>
                    <h1
                        class="font-medium text-[20px] leading-[28px] tracking-[-0.015em] text-neutral-950 font-inter mb-6 ">
                        Welcome Marco! you can select what type is your
                        business?
                    </h1>

                    <!-- Categories Dropdown -->
                    <div class="mb-4">
                        <label
                            class="font-medium text-[14px] leading-[20px] tracking-[-0.006em] text-neutral-950 font-inter block mb-2">Categories
                            <span class="text-red-500">*</span></label>
                        <div class="relative" data-dropdown="categories">
                            <button @click="toggleCategoriesDropdown"
                                class="w-full flex items-center 
                                border border-neutral-100 px-[12px] py-[10px] rounded-[8px]
                                h-[40px]
                                shadow-regular justify-between  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 "
                                :class="{ 'border-primary': isCategoriesDropdownOpen }">
                                <span
                                    :class="selectedCategory ? ' font-normal text-[14px] leading-[20px] tracking-[-0.006em] font-inter text-neutral-500' : 'text-neutral-500 font-normal text-[14px] leading-[20px] tracking-[-0.006em] font-inter'">
                                    {{ selectedCategory || 'Select category' }}
                                </span>
                                <svg class="w-4 h-4 text-text-secondary transition-transform duration-200"
                                    :class="{ 'rotate-180': isCategoriesDropdownOpen }" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <!-- Categories Dropdown Menu -->
                            <transition enter-active-class="transition ease-out duration-200"
                                enter-from-class="opacity-0 scale-95 translate-y-1"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-active-class="transition ease-in duration-150"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 translate-y-1">
                                <div v-if="isCategoriesDropdownOpen"
                                    class="absolute top-full left-0 right-0 mt-2 border border-[#E1E4EA] bg-neutral-white rounded-[16px] shadow-[0px_16px_32px_-12px_#0E121B1A]  py-2 z-50 max-h-60 overflow-y-auto p-[8px]">
                                    <button v-for="category in categories" :key="category"
                                        @click="selectCategory(category)"
                                        class="w-full flex items-center px-4 py-2 hover:bg-[#F5F7FA] transition-colors duration-150 text-left paragraph-sm text-text-strong rounded-[8px]"
                                        :class="{ 'bg-soft': selectedCategory === category }">
                                        {{ category }}
                                    </button>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <!-- Type Dropdown -->
                    <div class="mb-6">
                        <label class="label-sm text-text-strong block mb-2">Type <span
                                class="text-red-500">*</span></label>
                        <div class="relative" data-dropdown="type">
                            <!-- Selected Types Display -->
                            <div @click="selectedCategory ? toggleTypeDropdown() : null"
                                class="w-full flex items-center" :class="[
                                    'border border-neutral-100 px-[12px] h-[40px] py-[10px] rounded-[8px] shadow-regular justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200',
                                    { 'border-primary': isTypeDropdownOpen },
                                    selectedCategory ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                                ]">

                                <!-- Tags Display or Placeholder -->
                                <div class="flex items-center gap-2 flex-1 overflow-hidden w-full">
                                    <!-- Selected Types Tags -->
                                    <div v-if="selectedTypes.length > 0"
                                        class="flex items-center gap-2 overflow-hidden flex-1">
                                        <div v-for="type in selectedTypes" :key="type"
                                            class="inline-flex items-center ps-2 py-[4px] pr-[4px] justify-center rounded-[6px] border border-neutral-100 bg-neutral-white flex-shrink-0">
                                            <span
                                                class="font-medium text-[12px] leading-[16px] font-inter text-neutral-500 whitespace-nowrap">{{
                                                    type
                                                }}</span>
                                            <button @click.stop="removeType(type)"
                                                class="w-4 h-4 flex items-center justify-center text-text-secondary hover:text-text-strong transition-colors duration-150 relative cursor-pointer focus:outline-none focus-visible:outline-none focus-within:outline-none focus-within:border-0">
                                                <img src="/icons/close.svg" alt="">
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Placeholder Text -->
                                    <span v-else-if="selectedCategory"
                                        class="text-neutral-500 font-normal text-[14px] leading-[20px] tracking-[-0.006em] font-inter">
                                        Select
                                    </span>
                                    <span v-else
                                        class="text-neutral-200 font-normal text-[14px] leading-[20px] tracking-[-0.006em] font-inter">
                                        Select category first
                                    </span>
                                </div>

                                <!-- Dropdown Arrow -->
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-text-secondary transition-transform duration-200"
                                        :class="{ 'rotate-180': isTypeDropdownOpen }" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <!-- Type Dropdown Menu -->
                            <transition enter-active-class="transition ease-out duration-200"
                                enter-from-class="opacity-0 scale-95 translate-y-1"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-active-class="transition ease-in duration-150"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 translate-y-1">
                                <div v-if="isTypeDropdownOpen && selectedCategory"
                                    class="absolute top-full left-0 right-0 mt-2 border border-[#E1E4EA] bg-neutral-white rounded-[16px] shadow-[0px_16px_32px_-12px_#0E121B1A]  py-2 z-50 max-h-60 overflow-y-auto p-[8px]">
                                    <button v-for="type in getAvailableTypes()" :key="type" @click="selectType(type)"
                                        class="w-full flex items-center justify-between px-4 py-2 hover:bg-soft transition-colors duration-150 text-left paragraph-sm text-text-strong"
                                        :class="{ 'bg-soft': selectedTypes.includes(type) }">
                                        <span>{{ type }}</span>
                                        <svg v-if="selectedTypes.includes(type)" class="w-4 h-4 text-primary"
                                            fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <!-- Save Button -->
                    <button @click="saveAndConnect" :disabled="!selectedCategory || selectedTypes.length === 0"
                        :class="(!selectedCategory || selectedTypes.length === 0)
                            ? 'w-[173px] h-[40px] opacity-100 rounded-[10px] p-[10px] gap-[4px] bg-neutral-50 text-neutral-200 font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle font-inter flex items-center justify-center cursor-not-allowed'
                            : 'w-[173px] h-[40px] opacity-100 rounded-[10px] px-[10px] py-[10px] gap-[4px] flex items-center justify-center font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle text-white bg-brand-primary font-inter hover:bg-brand-primary-hover transition-colors duration-200'">
                        Save & Go to Connect
                    </button>
                </div>
                <div class="w-[650px] flex justify-end items-center h-full">
                    <img src="/connect/1.png" alt="" class="w-full h-auto">
                </div>
            </div>

            <!-- step 2 -->
            <div v-if="currentStep === 2" class="flex items-center justify-center h-full">
                <div
                    class="w-[540px]  border border-neutral-100 opacity-100 rounded-[12px] p-[24px] gap-[24px] bg-white space-y-5">
                    <div class="">
                        <button @click="goBackToStep1" type="button"
                            class="flex items-center space-x-3 hover:opacity-70 transition-opacity duration-200">
                            <img src="/icons/back.svg" alt="" class="w-auto h-auto">
                            <span
                                class="font-medium text-[14px] leading-[20px] tracking-[-0.006em] text-neutral-500 font-inter">Back</span>
                        </button>

                    </div>
                    <div class=" flex items-center">
                        <img src="/icons/brand.png" alt="Brand" class="w-[40px] h-[40px]">
                        <div class="w-[35px] h-[1px] border-t border-dashed border-neutral-100"></div>
                        <img src="/icons/whastapp.png" alt="Brand" class="w-[40px] h-[40px]">
                    </div>
                    <div>
                        <h2
                            class="font-medium text-[20px] leading-[28px] tracking-[-0.015em] font-inter text-neutral-950">
                            Connect your business with WhatsApp
                        </h2>
                        <p
                            class="font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-neutral-500 font-inter">
                            Easily reach your customers and manage conversations</p>
                    </div>

                    <p class="font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-neutral-500 font-inter">
                        Integrate your business with WhatsApp to streamline communication and provide instant support to
                        your clients. <br> <br> Connecting your business enables you to send updates, receive inquiries,
                        and build stronger relationships with your customers.</p>
                    <button @click="connectWhatsApp"
                        class="w-[214px] h-[40px] opacity-100 rounded-[10px] px-[10px] py-[10px] gap-[4px] flex items-center justify-center font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle text-white bg-brand-primary font-inter hover:bg-brand-primary-hover transition-colors duration-200">
                        Connect With Whatsapp
                        <img src="/icons/what.svg" alt="" class="ms-1">
                    </button>
                </div>
            </div>
        </div>
        <div class="absolute top-0 right-0">
            <img src="/effects/1.png" alt="">
        </div>

        <!-- Success Dialog -->
        <Dialog :isOpen="showSuccessDialog" title="WhatsApp Connected Successfully!"
            message="Congratulations! Your WhatsApp has been successfully connected to ChatBookly." cancelText='Close'
            confirmText="Go to Whatsapp Analytics" :showCancelButton="false" @close="handleDialogClose"
            @confirm="handleGoToDashboard" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import Dialog from '../components/Dialog.vue'
import { useConnect } from '../composables/useConnect'

// Use the composable for all functionality
const {
    // State
    businessData,
    currentStep,
    isCategoriesDropdownOpen,
    isTypeDropdownOpen,
    showSuccessDialog,
    categories,
    businessTypes,
    isLoading,
    error,

    // Methods
    selectCategory,
    selectType,
    removeType,
    saveAndConnect,
    connectWhatsApp,
    goBackToStep1,
    handleDialogClose,
    handleGoToDashboard,
    handleClickOutside,
    handleKeyDown,
    getTypesForCategory,
    getAvailableTypes,
    toggleCategoriesDropdown,
    toggleTypeDropdown,
    cleanup
} = useConnect()

// Computed properties for template compatibility
const selectedCategory = computed(() => businessData.category)
const selectedTypes = computed(() => businessData.types)

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeyDown)
    cleanup()
})
</script>

<style scoped>
/* Custom scrollbar for dropdowns */
.max-h-60::-webkit-scrollbar {
    width: 6px;
}

.max-h-60::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.max-h-60::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
    transition: background 0.2s ease;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

/* Smooth transitions */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus ring offset */
button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
</style>