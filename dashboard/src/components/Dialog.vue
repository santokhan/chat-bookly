<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-bg-overlay/25 transition-opacity backdrop-blur-[10px]" @click="closeDialog"></div>

        <!-- Dialog -->
        <div class="relative bg-neutral-white rounded-[16px]  w-[440px] mx-4 ">
            <div class="p-6 border-b border-neutral-100">
                <div class="flex justify-center mb-4">
                    <img src="/icons/suc.png" alt="" class="w-[40px] h-auto">
                </div>

                <!-- Title -->
                <h3
                    class="font-medium text-[16px] leading-[24px] tracking-[-0.011em] text-center text-neutral-950 font-inter mb-2">
                    {{ title }}
                </h3>

                <!-- Message -->
                <p
                    class="font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-center text-neutral-500 font-inter mb-6">
                    {{ message }}
                </p>
            </div>
            <!-- Icon -->

            <div class=""></div>
            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-4 p-4">
                <button @click="onCancel"
                    class="w-full h-[36px] border border-neutral-100 bg-white shadow-[0px_1px_2px_0px_#0A0D1408] opacity-100 rounded-[8px] p-[8px] gap-[4px] font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle text-neutral-500 font-inter flex items-center justify-center">
                    {{ cancelText }}
                </button>

                <button @click="onConfirm" class="w-[194px] h-[36px] rounded-[8px] px-2 py-2 gap-1 bg-brand-primary text-white 
         font-medium text-[14px] leading-[20px] tracking-[-0.006em] align-middle justify-center">
                    {{ confirmText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

interface Props {
    isOpen: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    showCancelButton?: boolean
    type?: 'success' | 'error' | 'warning' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancelButton: true,
    type: 'success'
})

const emit = defineEmits<{
    close: []
    confirm: []
    cancel: []
}>()

const closeDialog = () => {
    emit('close')
}

const onConfirm = () => {
    emit('confirm')
    closeDialog()
}

const onCancel = () => {
    emit('cancel')
    closeDialog()
}

// Prevent body scroll when dialog is open
watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})
</script>

<style scoped>
/* Smooth backdrop animation */
.fixed.inset-0.bg-black {
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Dialog slide animation */
.relative.bg-white {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>
