<template>
    <button @click="$emit('click')" :class="[
        'w-full flex items-center justify-between text-left transition-all duration-200 rounded-[8px] relative mb-2',
        isSubMenuItem
            ? 'px-4 py-1.5 h-8 sub-menu-item'
            : 'px-3 py-2 h-9',
        'hover:bg-menu',
        isActive
            ? (isSubMenuItem ? 'bg-menu text-neutral-white sub-menu-active' : 'bg-menu text-neutral-white side-btn')
            : 'text-neutral-300 hover:text-neutral-white',
        isExpanded ? (isSubMenuItem ? 'px-4 py-1' : 'px-3 py-2') : 'p-2 justify-center'
    ]">
        <div class=" absolute top-0 left-0 h-full flex items-center" v-if="isSubMenuItem">
            <div class="h-full w-[1px] bg-border-primary"></div>
            <img src="/icons/line.svg" alt="icon">
        </div>

        <div class="flex items-center relative">
            <!-- Icon (only show for main items, not sub menu items) -->
            <div v-if="!isSubMenuItem" class="flex-shrink-0">
                <img :src="isActive ? activeIcon : icon" alt="">
            </div>

            <!-- Label -->
            <div v-show="isExpanded" class="text-sm" :class="[
                isActive ? 'text-neutral-white' : 'text-tertiary',
                isSubMenuItem
                    ? 'font-medium transition-opacity duration-200 leading-[1.125rem] tracking-[-0.4%]'
                    : 'ml-3 font-medium transition-opacity duration-200 leading-[1.25rem] tracking-[-0.6%]'
            ]">
                {{ label }}
            </div>
        </div>
        <img v-if="hasSubmenu && isExpanded && !isSubMenuItem" src="/icons/arrowRight.svg" alt="" :class="[
            'transition-transform duration-200 w-3 h-3',
            isSubmenuExpanded ? 'rotate-90' : ''
        ]">
    </button>
</template>

<script setup lang="ts">
interface Props {
    icon: string
    activeIcon: string
    label: string
    isExpanded: boolean
    isActive?: boolean
    hasSubmenu?: boolean
    isSubmenuExpanded?: boolean
    isSubMenuItem?: boolean
    subMenuLevel?: number
}

defineProps<Props>()
defineEmits<{
    click: []
}>()
</script>

<style scoped>
.side-btn::before {
    content: '';
    position: absolute;
    left: -20px;
    width: 4px;
    height: 20px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: var(--color-brand-primary);
}

/* Sub menu item styles */
.sub-menu-item {
    margin-left: 18px;
    margin-bottom: 0;
}





.sub-menu-active::before {
    content: none;
    /* Remove the main item indicator */
}
</style>