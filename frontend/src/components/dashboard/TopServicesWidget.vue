<script setup lang="ts">
import SimpleTable from '@/pages/tables/simple-table.vue';

</script>

<template>
<SimpleTable 
    title="Top services"
    :headers="[
      { text: 'Service', value: 'service' },
      { text: 'This Month', value: 'this_month' },
      { text: 'Last Month', value: 'last_month' }
    ]"
    :items="[
      { service: 'Laundry', this_month: 120, last_month: 95 },
      { service: 'Dry Cleaning', this_month: 85, last_month: 90 },
      { service: 'Ironing', this_month: 60, last_month: 55 }
    ]"
  />
</template>