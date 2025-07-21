<script setup lang="ts">
import SimpleTable from '@/pages/tables/simple-table.vue';

</script>

<template>
<SimpleTable
    title="Top team member"
    :headers="[
      { text: 'Team Member', value: 'member' },
      { text: 'This Month', value: 'this_month' },
      { text: 'Last Month', value: 'last_month' }
    ]"
    :items="[
      { member: 'Alice', this_month: 45, last_month: 30 },
      { member: 'Bob', this_month: 38, last_month: 42 },
      { member: 'Charlie', this_month: 32, last_month: 28 }
    ]"
  />
</template>