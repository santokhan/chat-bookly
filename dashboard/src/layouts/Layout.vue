<template>
    <div class="min-h-screen bg-gray-50 flex">
        <!-- Sidebar -->
        <div :class="[
            'bg-dark text-neutral-white transition-all duration-300 ease-in-out flex flex-col h-screen overflow-y-auto sidebar fixed left-0 top-0 z-30',
            isExpanded ? 'w-[272px]' : 'w-[88px]'
        ]">
            <!-- Header -->
            <div class="p-4 relative">
                <div class="flex items-center justify-between">
                    <router-link to="/">
                        <img :src="isExpanded ? '/logo.png' : '/logoExpand.png'" alt="ChatBookly"
                            :class="isExpanded ? 'w-[144px]' : 'w-[40px]'">
                    </router-link>
                    <div class="absolute top-0 right-2 flex items-center h-full">
                        <button @click="toggleSidebar"
                            class="bg-menu border border-border-dark h-[22px] w-[22px] rounded-full flex items-center justify-center">
                            <img src="/icons/arrowLeft.svg" alt="" :class="isExpanded ? '' : 'rotate-180'">
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-[80%] mx-auto h-[1px] bg-border-dark"></div>

            <!-- Navigation -->
            <nav class="flex-1 p-[20px] space-y-2">
                <div
                    class="text-[12px] font-inter font-medium leading-[16px] tracking-[4%] uppercase mb-4 text-[#99A0AE]">
                    MAIN
                </div>

                <!-- Main Navigation -->
                <div class="space-y-1">
                    <template v-for="item in mainNavItems" :key="item.name">
                        <div>
                            <SidebarItem :icon="item.icon" :activeIcon="item.activeIcon" :label="item.label"
                                :isExpanded="isExpanded" :isActive="activeItem === item.name"
                                :hasSubmenu="item.hasSubmenu" :isSubmenuExpanded="expandedMenus.includes(item.name)"
                                @click="handleItemClick(item)" />

                            <!-- Sub-menu items -->
                            <transition enter-active-class="transition-all duration-300 ease-out"
                                enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-screen"
                                leave-active-class="transition-all duration-300 ease-in"
                                leave-from-class="opacity-100 max-h-screen" leave-to-class="opacity-0 max-h-0">
                                <div v-if="item.hasSubmenu && expandedMenus.includes(item.name) && isExpanded"
                                    class="mt-1 space-y-1 overflow-hidden">
                                    <SidebarItem v-for="subItem in item.submenu" :key="subItem.name" :icon="''"
                                        :activeIcon="''" :label="subItem.label" :isExpanded="isExpanded"
                                        :isActive="activeItem === subItem.name" :isSubMenuItem="true" :subMenuLevel="1"
                                        @click="handleSubItemClick(subItem, item)" />
                                </div>
                            </transition>
                        </div>
                    </template>
                </div>

                <!-- Settings Section -->
                <div class="pt-8">
                    <div
                        class="text-[12px] font-inter font-medium leading-[16px] tracking-[4%] uppercase mb-4 text-[#99A0AE] truncate">
                        OTHERS
                    </div>
                    <div class="space-y-1">
                        <template v-for="item in settingsNavItems" :key="item.name">
                            <div>
                                <SidebarItem :icon="item.icon" :activeIcon="item.activeIcon" :label="item.label"
                                    :isExpanded="isExpanded" :isActive="activeItem === item.name"
                                    :hasSubmenu="item.hasSubmenu" :isSubmenuExpanded="expandedMenus.includes(item.name)"
                                    @click="handleItemClick(item)" />

                                <!-- Sub-menu items -->
                                <transition enter-active-class="transition-all duration-300 ease-out"
                                    enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-screen"
                                    leave-active-class="transition-all duration-300 ease-in"
                                    leave-from-class="opacity-100 max-h-screen" leave-to-class="opacity-0 max-h-0">
                                    <div v-if="item.hasSubmenu && expandedMenus.includes(item.name) && isExpanded"
                                        class="ml-2 overflow-hidden">
                                        <SidebarItem v-for="subItem in item.submenu" :key="subItem.name" :icon="''"
                                            :activeIcon="''" :label="subItem.label" :isExpanded="isExpanded"
                                            :isActive="activeItem === subItem.name" :isSubMenuItem="true"
                                            :subMenuLevel="1" @click="handleSubItemClick(subItem, item)" />
                                    </div>
                                </transition>
                            </div>
                        </template>
                    </div>
                </div>
            </nav>

            <!-- User Profile -->
            <div class="w-[80%] mx-auto h-[1px] bg-border-dark"></div>
            <div class=" relative py-[14px] px-[12px]" ref="sidebarUserDropdown">
                <button @click="toggleSidebarUserDropdown"
                    class="w-full flex items-center transition-colors duration-200   space-x-3 ">
                    <div class="w-[40px] h-[40px] bg-orange-500 rounded-full flex items-center justify-center">
                        <img src="/avatar/1.png" alt="avatar" class="rounded-full w-[40px] h-[40px] object-cover">
                    </div>
                    <div v-show="isExpanded" class=" flex-1 w-[137px] flex flex-col items-start">
                        <div class="flex items-center space-x-2 h-[20px]">
                            <div
                                class="font-inter font-medium text-[14px] leading-[20px] tracking-[-0.006em] text-white">
                                Jhon
                                Marco</div>
                            <img src="/icons/verified.svg" alt="">
                        </div>
                        <div
                            class="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] pt-1 text-[#99A0AE]">
                            Jhonmarco@chatbookly.com
                        </div>
                    </div>
                    <div v-show="isExpanded" class="ml-2 w-[24px]">
                        <svg class="w-4 h-4 text-[#99A0AE] transition-transform duration-200 -rotate-90"
                            :class="{ 'rotate-90': isSidebarUserDropdownOpen }" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>

        <!-- Main Content Area -->
        <div :class="[
            'flex-1 flex flex-col transition-all duration-300 ease-in-out',
            isExpanded ? 'ml-[272px]' : 'ml-[88px]'
        ]">
            <!-- Header -->
            <header
                class="bg-neutral-white border-b border-border-light h-16 flex items-center justify-between px-6 sticky top-0 z-20">
                <!-- Left Section: Dynamic Title -->
                <div class="flex items-center">
                    <h1 class="font-inter text-neutral-950 font-medium text-[16px]  leading-[20px] tracking-[-1.1%]">{{
                        pageTitle }}</h1>
                </div>

                <!-- Right Section: Language Selector, Upgrade Plan Button, and User Menu -->
                <div class="flex items-center space-x-4">
                    <!-- Upgrade Plan Button -->
                    <button @click="handleUpgradePlan"
                        class="flex items-center space-x-2 px-4 py-2 bg-transparent border rounded-[8px] text-neutral-white border-border-primary2  transition-colors duration-200 label-sm">
                        <img src="/icons/gift-line.svg" alt="">
                        <span
                            class="font-inter text-brand-primary font-medium text-[14px]  leading-[20px] tracking-[-0.6%]">Upgrade
                            Plan</span>
                    </button>
                    <!-- Language Selector -->
                    <div class="relative" ref="languageDropdown">
                        <button @click="toggleLanguageDropdown"
                            class="flex p-[8px] items-center justify-between space-x-2 py-2  border  w-[120px] h-[36px] rounded-[8px] hover:bg-soft transition-colors duration-200 border-neutral-100 shadow-[0px 1px 2px 0px #0A0D1408]">
                            <img :src="selectedLanguage.flag" :alt="selectedLanguage.name" class="w-5 h-5 rounded-sm">
                            <span
                                class="font-inter font-regular text-[14px] text-strong leading-[20px] tracking-[-0.6%]">{{
                                    selectedLanguage.name }}</span>
                            <svg class="w-4 h-4 text-text-secondary transition-transform duration-200"
                                :class="{ 'rotate-180': isLanguageDropdownOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Language Dropdown -->
                        <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 scale-95 translate-y-1"
                            enter-to-class="opacity-100 scale-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 scale-100 translate-y-0"
                            leave-to-class="opacity-0 scale-95 translate-y-1">
                            <div v-if="isLanguageDropdownOpen"
                                class="absolute right-0 top-full mt-1 w-[138px] bg-neutral-white rounded-lg shadow-lg border border-border-light py-2 z-50">
                                <button v-for="language in languages" :key="language.code"
                                    @click="selectLanguage(language)"
                                    class="w-full flex items-center space-x-3 px-4 py-2 hover:bg-soft transition-colors duration-150 text-left"
                                    :class="{ 'bg-soft': selectedLanguage.code === language.code }">
                                    <img :src="language.flag" :alt="language.name" class="w-5 h-5 rounded-sm">
                                    <span
                                        class="font-inter font-regular text-[14px] text-strong leading-[20px] tracking-[-0.6%]">{{
                                            language.name }}</span>
                                    <svg v-if="selectedLanguage.code === language.code"
                                        class="w-4 h-4 text-primary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </transition>
                    </div>

                    <HeaderNotification />

                    <!-- User Menu -->
                    <div class="relative" ref="userDropdown">
                        <button @click="toggleUserDropdown"
                            class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-soft transition-colors duration-200">
                            <div
                                class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                                <img src="/avatar/1.png" alt="User Avatar" class="w-full h-full object-cover">
                            </div>
                            <span
                                class="font-inter text-neutral-950 font-medium text-[14px]  leading-[20px] tracking-[-0.6%]">Jhon
                                Marco</span>
                            <svg class="w-4 h-4 text-[#99A0AE] transition-transform duration-200"
                                :class="{ 'rotate-180': isUserDropdownOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- User Dropdown -->
                        <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 scale-95 translate-y-1"
                            enter-to-class="opacity-100 scale-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 scale-100 translate-y-0"
                            leave-to-class="opacity-0 scale-95 translate-y-1">
                            <div v-if="isUserDropdownOpen"
                                class="absolute right-0 top-full mt-1  bg-neutral-white rounded-[16px] shadow-[0px_16px_32px_-12px_#0E121B1A] border border-[#E1E4EA] py-2 z-50 w-[270px] p-[8px]">
                                <!-- User Info -->
                                <div class="px-4 py-3 border-b border-border-light">
                                    <div class="flex items-center space-x-3">
                                        <div
                                            class="w-[40px] h-[40px] bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                                            <img src="/avatar/1.png" alt="User Avatar"
                                                class="w-[40px] h-[40px] object-cover">
                                        </div>
                                        <div class="flex-1 w-[186px]">
                                            <div class="flex items-center space-x-2">
                                                <span
                                                    class="font-inter font-medium text-[14px] leading-[20px] tracking-[-0.006em] text-[#0E121B]">Jhon
                                                    Marco</span>

                                            </div>
                                            <p
                                                class="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-[#525866]">
                                                Jhonmarco@chatbookly.com</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Menu Items -->
                                <div class="py-2 px-[8px]">
                                    <button v-for="item in userMenuItems" :key="item.name"
                                        @click="handleUserMenuItem(item)"
                                        class="w-full flex items-center space-x-3  py-2 transition-colors duration-150 text-left">
                                        <img :src="item.icon" class="w-[15px] h-auto" :alt="item.label" />
                                        <span
                                            class="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-[#0E121B]">{{
                                                item.label }}</span>
                                    </button>
                                </div>

                                <!-- Logout -->
                                <div class="border-t border-border-light pt-2 px-[8px]">
                                    <button @click="handleLogout"
                                        class="w-full flex items-center space-x-2 py-2 transition-colors duration-150 text-left group">
                                        <img src="/icons/header/logout.svg" alt="" class="w-[14px] h-auto ">
                                        <span
                                            class="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-[#FB3748]">Sign
                                            Out</span>
                                    </button>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="flex-1 overflow-auto">
                <router-view />
            </main>
        </div>

        <!-- Sidebar User Dropdown -->
        <transition enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95 translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-1">
            <div v-if="isSidebarUserDropdownOpen" :class="isExpanded ? 'left-[250px]' : 'left-[92px]'"
                class="absolute bottom-5    bg-neutral-white rounded-[16px] shadow-[0px_16px_32px_-12px_#0E121B1A] border border-[#E1E4EA] py-2 z-50 p-[8px] w-[270px]">
                <!-- User Info -->
                <div class="px-4 py-3 border-b border-border-light">
                    <div class="flex items-center space-x-3">
                        <div
                            class="w-[40px] h-[40px] bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                            <img src="/avatar/1.png" alt="User Avatar" class="w-[40px] h-[40px] object-cover">
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center space-x-2">
                                <span
                                    class="font-inter font-medium text-[14px] leading-[20px] tracking-[-0.006em] text-[#0E121B]">Jhon
                                    Marco</span>
                                <img src="/icons/verified.svg" alt="">
                            </div>
                            <p class="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-[#525866]">
                                Jhonmarco@chatbookly.com</p>
                        </div>
                    </div>
                </div>

                <!-- Menu Items -->
                <div class="py-2 px-[8px]">
                    <RouterLink v-for="item in userMenuItems" :key="item.name" @click="handleSidebarUserMenuItem(item)"
                        :to="item.to"
                        class="w-full flex items-center space-x-3 px-3 py-2 hover:bg-soft transition-colors duration-150 text-left rounded-lg">
                        <img :src="item.icon" class="w-[15px] h-auto" :alt="item.label" />
                        <span
                            class="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-[#0E121B]">{{
                                item.label }}</span>
                    </RouterLink>
                </div>

                <!-- Logout -->
                <div class="border-t border-border-light pt-2 px-[8px]">
                    <button @click="handleSidebarLogout"
                        class="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-50 transition-colors duration-150 text-left group rounded-lg">
                        <img src="/icons/header/logout.svg" alt="" class="w-[14px] h-auto">
                        <span
                            class="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-[#FB3748]">Sign
                            Out</span>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import SidebarItem from '../components/SidebarItem.vue'
import HeaderNotification from './header/HeaderNotification.vue'

const route = useRoute()
const router = useRouter()

// Sidebar state
const isExpanded = ref(true)
const activeItem = ref('dashboard')
const expandedMenus = ref<string[]>([])

// Header dropdown states
const isLanguageDropdownOpen = ref(false)
const isUserDropdownOpen = ref(false)
const isSidebarUserDropdownOpen = ref(false)

// Dropdown refs for click outside detection
const languageDropdown = ref<HTMLElement>()
const userDropdown = ref<HTMLElement>()
const sidebarUserDropdown = ref<HTMLElement>()

// Language data
const selectedLanguage = ref({
    code: 'en',
    name: 'English',
    flag: '/flag/united-kingdom.png'
})

const languages = [
    {
        code: 'en',
        name: 'English',
        flag: '/flag/united-kingdom.png'
    },
    {
        code: 'es',
        name: 'Español',
        flag: '/flag/spain.png'
    },
    {
        code: 'fr',
        name: 'Français',
        flag: '/flag/france.png'
    },
    {
        code: 'de',
        name: 'Deutsch',
        flag: '/flag/german.png'
    }
]

// User menu items
const userMenuItems = [
    {
        name: 'profile',
        label: 'Profile Settings',
        icon: '/icons/header/profile.svg',
        to: '#'
    },
    {
        name: 'notifications',
        label: 'Notification Settings',
        icon: '/icons/header/notifications.svg',
        to: '#'
    },
    {
        name: 'billing',
        label: 'Billing & Subscription',
        icon: '/icons/header/billing.svg',
        to: '/plan/upgrade'
    },
]

// Icon components
const UserIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`
}

const CreditCardIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`
}

const BellIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`
}

const ShieldCheckIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`
}

const QuestionMarkCircleIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
}

const ChatBubbleLeftRightIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`
}

// Page title mapping
const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/connect': 'Connect Your Business',
    '/whatsapp-analytics': 'WhatsApp Analytics',
    '/chat': 'Chat',
    '/appointments': 'Appointments',
    '/clients': 'Clients',
    '/marketing': 'Marketing',
    '/marketing/hours': 'Opening Hours',
    '/marketing/team': 'Team Members',
    '/marketing/services': 'Services',
    '/marketing/shifts': 'Scheduled Shifts',
    '/business-settings': 'Business Settings',
    '/business-settings/profile': 'Company Profile',
    '/business-settings/hours': 'Business Hours',
    '/business-settings/locations': 'Locations & Branches',
    '/business-settings/contact': 'Contact Information',
    '/business-settings/policies': 'Business Policies',
    '/business-settings/integrations': 'Integrations',
    '/plan': 'Plan & Billing',
    '/plan/current': 'Current Plan',
    '/plan/upgrade': 'Upgrade Plan',
    '/plan/billing': 'Billing History',
    '/plan/usage': 'Usage Statistics',
    '/support': 'Support',
    '/marketplace-settings': 'Marketplace Settings',
    '/marketplace-settings/profile': 'Store Profile',
    '/marketplace-settings/products': 'Product Catalog',
    '/marketplace-settings/payments': 'Payment Settings',
    '/marketplace-settings/shipping': 'Shipping Options',
    '/marketplace-settings/analytics': 'Marketplace Analytics',
    '/about': 'About ChatBookly'
}

// Computed page title
const pageTitle = computed(() => {
    return pageTitles[route.path] || 'ChatBookly'
})

// Navigation items
const mainNavItems = [
    {
        name: 'connect',
        label: 'Connect Your Business',
        icon: '/icons/link.svg',
        activeIcon: '/icons/active/link.svg',
        route: '/connect'
    },
    {
        name: 'dashboard',
        label: 'Dashboard',
        icon: '/icons/dashboard.svg',
        activeIcon: '/icons/active/dashboard.svg',
        route: '/dashboard'
    },
    {
        name: 'chat',
        label: 'Chat',
        icon: '/icons/chat.svg',
        activeIcon: '/icons/active/chat.svg',
        route: '/chat'
    },
    {
        name: 'appointments',
        label: 'Appointments',
        icon: '/icons/appointments.svg',
        activeIcon: '/icons/active/appointments.svg',
        route: '/appointments'
    },
    {
        name: 'business-settings',
        label: 'Business Settings',
        icon: '/icons/bussinessSettings.svg',
        activeIcon: '/icons/active/bussinessSettings.svg',
        hasSubmenu: true,
        route: '/business/settings',
        submenu: [
            { name: 'opening-hours', label: 'Opening Hours', route: '/business/settings/hours' },
            { name: 'team-members', label: 'Team Members', route: '/business/settings/team' },
            { name: 'services', label: 'Services', route: '/business/settings/services' },
            { name: 'scheduled-shifts', label: 'Scheduled Shifts', route: '/business/settings/shifts' }
        ]
    },
    {
        name: 'clients',
        label: 'Clients',
        icon: '/icons/clients.svg',
        activeIcon: '/icons/active/clients.svg',
        route: '/clients'
    },
    {
        name: 'marketing',
        label: 'Marketing',
        icon: '/icons/marketing.svg',
        activeIcon: '/icons/active/marketing.svg',
        hasSubmenu: true,
        route: '/marketing',
        submenu: [
            { name: 'opening-hours', label: 'Opening Hours', route: '/marketing/hours' },
            { name: 'team-members', label: 'Team Members', route: '/marketing/team' },
            { name: 'services', label: 'Services', route: '/marketing/services' },
            { name: 'scheduled-shifts', label: 'Scheduled Shifts', route: '/marketing/shifts' }
        ]
    }
]

const settingsNavItems = [
    {
        name: 'plan',
        label: 'Plan',
        icon: '/icons/plan.svg',
        activeIcon: '/icons/active/plan.svg',
        route: '/plan',

    },
    {
        name: 'support',
        label: 'Support',
        icon: '/icons/support.svg',
        activeIcon: '/icons/active/support.svg',
        route: '/support'
    },
    {
        name: 'marketplace-settings',
        label: 'Marketplace Settings',
        icon: '/icons/marketplaceSettings.svg',
        activeIcon: '/icons/active/marketplaceSettings.svg',
        hasSubmenu: true,
        route: '/marketplace-settings',
        submenu: [
            { name: 'store-profile', label: 'Store Profile', route: '/marketplace-settings/profile' },
            { name: 'product-catalog', label: 'Product Catalog', route: '/marketplace-settings/products' },
            { name: 'payment-settings', label: 'Payment Settings', route: '/marketplace-settings/payments' },
            { name: 'shipping-options', label: 'Shipping Options', route: '/marketplace-settings/shipping' },
            { name: 'marketplace-analytics', label: 'Analytics', route: '/marketplace-settings/analytics' }
        ]
    }
]

// Watch route changes to update active item
watch(
    () => route.path,
    (newPath) => {
        // Find the active item based on current route
        const findActiveItem = (items: any[]): string | null => {
            for (const item of items) {
                if (item.route === newPath) {
                    return item.name
                }
                if (item.submenu) {
                    for (const subItem of item.submenu) {
                        if (subItem.route === newPath) {
                            return subItem.name
                        }
                    }
                }
            }
            return null
        }

        const activeMainItem = findActiveItem(mainNavItems)
        const activeSettingsItem = findActiveItem(settingsNavItems)

        if (activeMainItem) {
            activeItem.value = activeMainItem
        } else if (activeSettingsItem) {
            activeItem.value = activeSettingsItem
        } else if (newPath === '/whatsapp-analytics') {
            // Special case: WhatsApp Analytics should activate "Connect Your Business"
            activeItem.value = 'connect'
        } else {
            // Default to dashboard if no match found
            activeItem.value = 'dashboard'
        }
    },
    { immediate: true }
)

// Methods
const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value
}

const toggleSubMenu = (itemName: string) => {
    const index = expandedMenus.value.indexOf(itemName)
    if (index > -1) {
        expandedMenus.value.splice(index, 1)
    } else {
        expandedMenus.value.push(itemName)
    }
}

const setActiveItem = (itemName: string) => {
    activeItem.value = itemName
}

const handleItemClick = (item: any) => {
    if (item.hasSubmenu) {
        toggleSubMenu(item.name)
    } else {
        setActiveItem(item.name)
        if (item.route) {
            router.push(item.route)
        }
    }
}

const handleSubItemClick = (subItem: any, parentItem: any) => {
    setActiveItem(subItem.name)
    if (subItem.route) {
        router.push(subItem.route)
    }
}

// Header dropdown methods
const toggleLanguageDropdown = () => {
    isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
    if (isLanguageDropdownOpen.value) {
        isUserDropdownOpen.value = false
    }
}

const toggleUserDropdown = () => {
    isUserDropdownOpen.value = !isUserDropdownOpen.value
    if (isUserDropdownOpen.value) {
        isLanguageDropdownOpen.value = false
        isSidebarUserDropdownOpen.value = false
    }
}

const toggleSidebarUserDropdown = () => {
    isSidebarUserDropdownOpen.value = !isSidebarUserDropdownOpen.value
    if (isSidebarUserDropdownOpen.value) {
        isLanguageDropdownOpen.value = false
        isUserDropdownOpen.value = false
    }
}

const selectLanguage = (language: typeof languages[0]) => {
    selectedLanguage.value = language
    isLanguageDropdownOpen.value = false
    console.log('Language changed to:', language.name)
}

const handleUpgradePlan = () => {
    console.log('Upgrade plan clicked')
    router.push('/plan/upgrade')
}

const handleUserMenuItem = (item: typeof userMenuItems[0]) => {
    console.log('User menu item clicked:', item.name)
    isUserDropdownOpen.value = false
    isSidebarUserDropdownOpen.value = false
}

const handleLogout = () => {
    console.log('Logout clicked')
    isUserDropdownOpen.value = false
    isSidebarUserDropdownOpen.value = false
}

const handleSidebarUserMenuItem = (item: typeof userMenuItems[0]) => {
    console.log('Sidebar user menu item clicked:', item.name)
    isSidebarUserDropdownOpen.value = false
}

const handleSidebarLogout = () => {
    console.log('Sidebar logout clicked')
    isSidebarUserDropdownOpen.value = false
}

// Click outside to close dropdowns
const handleClickOutside = (event: Event) => {
    if (languageDropdown.value && !languageDropdown.value.contains(event.target as Node)) {
        isLanguageDropdownOpen.value = false
    }
    if (userDropdown.value && !userDropdown.value.contains(event.target as Node)) {
        isUserDropdownOpen.value = false
    }
    if (sidebarUserDropdown.value && !sidebarUserDropdown.value.contains(event.target as Node)) {
        isSidebarUserDropdownOpen.value = false
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom Webkit Scrollbar for Sidebar */
.sidebar::-webkit-scrollbar {
    width: 6px;
}

.sidebar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
    margin: 8px 0;
}

.sidebar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    transition: background 0.2s ease;
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
}

.sidebar::-webkit-scrollbar-thumb:active {
    background: rgba(255, 255, 255, 0.35);
}

/* Hide scrollbar on Firefox */
.sidebar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.05);
}
</style>
