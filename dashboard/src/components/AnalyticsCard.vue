<template>
    <div class="bg-white rounded-[8px] p-4 border border-gray-100">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-2">
                <component :is="icon" class="w-4 h-4 text-gray-500" />
                <h3 class="font-inter font-medium text-[13px] leading-[18px] text-[#6B7280]">
                    {{ title }}
                </h3>
            </div>
            <div class="flex items-center space-x-1">
                <component :is="trend === 'up' ? ArrowUpIcon : ArrowDownIcon"
                    :class="trend === 'up' ? 'text-green-500' : 'text-red-500'" class="w-3 h-3" />
                <span :class="trend === 'up' ? 'text-green-500' : 'text-red-500'"
                    class="font-inter font-medium text-[12px] leading-[16px]">
                    {{ changeText }}
                </span>
            </div>
        </div>

        <!-- Main Value -->
        <div class="mb-4">
            <h2 class="font-inter font-bold text-[28px] leading-[36px] text-[#111827] mb-1">
                {{ value }}
            </h2>
            <p class="font-inter font-normal text-[12px] leading-[16px] text-[#6B7280]">
                {{ subtitle }}
            </p>
        </div>

        <!-- Chart -->
        <div class="h-[50px] relative -mx-2">
            <canvas ref="chartCanvas" class="w-full h-full"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
    Chart,
    CategoryScale,
    LinearScale,
    LineElement,
    LineController,
    PointElement,
    Filler,
    type ChartConfiguration
} from 'chart.js'

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, LineElement, LineController, PointElement, Filler)

// Icons (you can replace these with your actual icons)
const ArrowUpIcon = {
    template: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 3.5L4 7.5h8L8 3.5z"/></svg>`
}

const ArrowDownIcon = {
    template: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 12.5L4 8.5h8L8 12.5z"/></svg>`
}

interface Props {
    title: string
    value: string
    subtitle: string
    changeText: string
    trend: 'up' | 'down'
    icon: any
    chartData: number[]
    chartColor: string
}

const props = defineProps<Props>()

const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: Chart | null = null

onMounted(() => {
    if (chartCanvas.value) {
        const ctx = chartCanvas.value.getContext('2d')
        if (ctx) {
            // Create gradient that matches the image exactly
            const gradient = ctx.createLinearGradient(0, 0, 0, 50)
            if (props.title === 'Incoming Messages') {
                // Special gradient for incoming messages to match your image
                gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)') // Light green at top
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0)') // Transparent at bottom
            } else if (props.chartColor === '#EF4444') {
                // Red gradient for outgoing messages
                gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)')
                gradient.addColorStop(1, 'rgba(239, 68, 68, 0)')
            } else {
                // Default green gradient
                gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)')
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
            }

            const config: ChartConfiguration = {
                type: 'line',
                data: {
                    labels: Array.from({ length: props.chartData.length }, (_, i) => i.toString()),
                    datasets: [{
                        data: props.chartData,
                        borderColor: props.chartColor,
                        backgroundColor: gradient,
                        borderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: props.chartColor,
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2,
                        pointBackgroundColor: props.chartColor,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        fill: true,
                        tension: 0.4, // Smooth curves like in your image
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            display: false,
                            grid: {
                                display: false
                            },
                            beginAtZero: false
                        }
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hoverRadius: 6
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 5,
                            bottom: 0
                        }
                    }
                }
            }

            chartInstance = new Chart(ctx, config)
        }
    }
})

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.destroy()
    }
})
</script>
