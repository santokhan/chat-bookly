<script setup>
import { useTheme } from 'vuetify'
import { getColumnChartConfig } from '@core/libs/apex-chart/apexCharConfig'

const vuetifyTheme = useTheme()
const chartConfig = computed(() => getColumnChartConfig(vuetifyTheme.current.value))

const series = [
  {
    name: 'Confirmed',
    data: [
      90,
      120,
      55,
      100,
      80,
      125,
      175,
      70,
      88,
    ],
  },
  {
    name: 'Cancelled',
    data: [
    ],
  },
]
</script>

<template>
  <VCard>
    <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
      <VCardTitle>Upcoming appointments</VCardTitle>
      <VCardSubtitle>Next 7 days</VCardSubtitle>
      <br>
      <h2 class="text-h2 me-3">
        12 booked
      </h2>
      <div class="d-flex align-center">
        <span class="me-2">Confirmed:</span>
        <h6 class="text-h6 m-0">12</h6>
      </div>

      <div class="d-flex align-center">
        <span class="me-2">Cancelled:</span>
        <h6 class="text-h6 m-0">0</h6>
      </div>
    </VCardItem>

    <VCardText>
      <VueApexCharts type="bar" height="400" :options="chartConfig" :series="series" />
    </VCardText>
  </VCard>
</template>
