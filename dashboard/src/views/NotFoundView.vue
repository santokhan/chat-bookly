<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>

            <h1 class="title-h4 text-text-strong mb-4">Page Not Found</h1>
            <p class="paragraph-lg text-text-secondary mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>

            <div class="space-y-4">
                <router-link to="/"
                    class="block w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-button-primary-hover transition-colors duration-200">
                    Go Home
                </router-link>
                <button @click="goBack"
                    class="block w-full px-6 py-3 border border-border-light text-text-secondary rounded-lg hover:bg-soft transition-colors duration-200">
                    Go Back
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    if (window.history.length > 1) {
        router.go(-1)
    } else {
        router.push('/')
    }
}
</script>
