<script setup>
import {
  basic,
  density,
  fixedHeader,
  height,
  theme,
} from '@/views/forms/tables/demoCodeSimpleTable';

defineProps({
  title: String,
  headers: Array,
  items: Array
})

const desserts = [
  {
    dessert: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Ice cream sandwich',
    calories: 237,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Eclair',
    calories: 262,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Cupcake',
    calories: 305,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Gingerbread',
    calories: 356,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard
        :title="title"
        :code="basic"
        no-padding
      >
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.value">
              {{ header.text }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="header in headers" :key="header.value">
              {{ item[header.value] }}
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
    </VCol>
  </VRow>
</template>
