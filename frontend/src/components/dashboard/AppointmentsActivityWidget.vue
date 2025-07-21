<script setup>
import auFlag from '@images/icons/countries/au.png'
import brFlag from '@images/icons/countries/br.png'
import cnFlag from '@images/icons/countries/cn.png'
import frFlag from '@images/icons/countries/fr.png'
import inFlag from '@images/icons/countries/in.png'
import usFlag from '@images/icons/countries/us.png'

// sample data, need to customize according api data later.
const salesByCountries = [
  {
    avatarImg: usFlag,
    stats: '$8,567k',
    subtitle: 'United states',
    profitLoss: 25.8,
  },
  {
    avatarImg: brFlag,
    stats: '$2,415k',
    subtitle: 'Brazil',
    profitLoss: -6.2,
  },
  {
    avatarImg: inFlag,
    stats: '$865k',
    subtitle: 'India',
    profitLoss: 12.4,
  },
  {
    avatarImg: auFlag,
    stats: '$745k',
    subtitle: 'Australia',
    profitLoss: -11.9,
  },
  {
    avatarImg: frFlag,
    stats: '$45',
    subtitle: 'France',
    profitLoss: 16.2,
  },
  {
    avatarImg: cnFlag,
    stats: '$12k',
    subtitle: 'China',
    profitLoss: 14.8,
  },
]

const moreList = [
  {
    title: 'Refresh',
    value: 'refresh',
  },
  {
    title: 'Download',
    value: 'Download',
  },
  {
    title: 'View All',
    value: 'View All',
  },
]
</script>

<template>
  <VCard
    title="Appointments activity"
    subtitle=""
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <MoreBtn
          size="small"
          :menu-list="moreList"
        />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <template v-for="(country, index) in salesByCountries" :key="country.stats">
          <VListItem>
            <template #prepend>
              <div class="d-flex flex-column align-center justify-center me-2" style="min-width: 34px;">
                <div class="text-h6 font-weight-bold" style="line-height: 1;">25</div>
                <div class="text-caption text-secondary">Jul</div>
              </div>
            </template>

            <VListItemSubtitle>
              Fri, 25 Jul 2025 21:30
            </VListItemSubtitle>
            <VListItemTitle class="font-weight-medium">
              Fold
            </VListItemTitle>
            <VListItemSubtitle>
              Walkin, 1h 30min with marco
            </VListItemSubtitle>

            <template #append>
              <div :class="`d-flex align-center`">
                <div class="font-weight-medium">
                  30$
                </div>
              </div>
            </template>
          </VListItem>

          <VDivider v-if="index !== salesByCountries.length - 1" class="my-1 mx-n4" />

        </template>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1rem;
}
</style>
