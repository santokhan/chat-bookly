<script setup>
import { useTheme } from 'vuetify'
import { getLineChartSimpleConfig } from '@core/libs/apex-chart/apexCharConfig'

const vuetifyTheme = useTheme()
const balanceChartConfig = computed(() => getLineChartSimpleConfig(vuetifyTheme.current.value))

const series = [{
  data: [
    280,
    200,
    220,
    180,
    270,
    250,
    70
  ],
}]
</script>

<template>
  <VCard>
    <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
      <VCardTitle>Statistics</VCardTitle>
      <VCardSubtitle>Last 7 days</VCardSubtitle>
      <br>
      <h2 class="text-h2 me-3">
        $221,267
      </h2>
      <div class="d-flex align-center">
        <span class="me-2">Appointments:</span>
        <h6 class="text-h6 m-0">12</h6>
      </div>

      <div class="d-flex align-center">
        <span class="me-2">Appointments value:</span>
        <h6 class="text-h6 m-0">$221,267</h6>
      </div>
      <template #append>
        <div class="d-flex align-center">
          <VChip label color="success">
            <VIcon start icon="tabler-arrow-up" size="15" />
            <span>22%</span>
          </VChip>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        type="line"
        height="400"
        :options="balanceChartConfig"
        :series="series"
      />
    </VCardText>
  </VCard>
</template>