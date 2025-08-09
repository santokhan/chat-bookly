<template>
    <div class="p-8">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-3 mb-6">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h1 class="title-h3 text-text-strong">Dashboard</h1>
            </div>

            <!-- Icon Examples Section -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h2 class="label-lg text-text-strong mb-4">Features Overview</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-6 h-6 bg-blue-500 rounded"></div>
                        <span class="paragraph-xs text-text-secondary">Connect</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-6 h-6 bg-green-500 rounded"></div>
                        <span class="paragraph-xs text-text-secondary">Chat</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-6 h-6 bg-purple-500 rounded"></div>
                        <span class="paragraph-xs text-text-secondary">Dashboard</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-6 h-6 bg-yellow-500 rounded"></div>
                        <span class="paragraph-xs text-text-secondary">Calendar</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-6 h-6 bg-red-500 rounded"></div>
                        <span class="paragraph-xs text-text-secondary">Settings</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-6 h-6 bg-gray-500 rounded"></div>
                        <span class="paragraph-xs text-text-secondary">Menu</span>
                    </div>
                </div>
            </div>
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 rounded-md bg-blue-100">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Chats</p>
                            <p class="text-2xl font-semibold text-gray-900">1,234</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 rounded-md bg-green-100">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Active Clients</p>
                            <p class="text-2xl font-semibold text-gray-900">567</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 rounded-md bg-yellow-100">
                            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Appointments</p>
                            <p class="text-2xl font-semibold text-gray-900">89</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-2 rounded-md bg-purple-100">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 3.055A9.001 9.001 0 1020.945 9H11V3.055z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Marketing</p>
                            <p class="text-2xl font-semibold text-gray-900">12</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                <div class="p-6">
                    <div class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-900">New chat from Sarah Johnson</p>
                                <p class="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-900">Appointment scheduled with Mike Chen</p>
                                <p class="text-xs text-gray-500">15 minutes ago</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-900">Marketing campaign launched</p>
                                <p class="text-xs text-gray-500">1 hour ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Dashboard logic here
</script>
