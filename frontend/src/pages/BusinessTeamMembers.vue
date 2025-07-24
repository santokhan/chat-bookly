<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'

// Sample team members data (in a real app, this would come from an API)
const teamMembers = ref([
  {
    id: 1,
    name: 'marco Agency',
    email: 'mcbbook@gmail.com',
    phone: '+39 327 192 7674',
    avatar: null,
    rating: 0,
    status: 'active',
  },
  {
    id: 2,
    name: 'Wendy Smith',
    email: 'wendy.smith@example.com', 
    phone: '+1 555 0123',
    avatar: '/images/avatars/avatar-2.png',
    rating: 4.5,
    status: 'active',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 555 0456',
    avatar: null,
    rating: 5,
    status: 'active',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 555 0789',
    avatar: '/images/avatars/avatar-1.png',
    rating: 3.5,
    status: 'inactive',
  },
])

// Reactive data
const search = ref('')
const selectedRows = ref([])
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

// Table headers
const headers = [
  {
    title: 'Name',
    key: 'name',
    sortable: true,
  },
  {
    title: 'Contact',
    key: 'contact',
    sortable: false,
  },
  {
    title: 'Rating',
    key: 'rating',
    sortable: true,
  },
  {
    title: '',
    key: 'actions',
    sortable: false,
    align: 'center',
  },
]

// Filtered team members
const filteredMembers = computed(() => {
  if (!search.value) return teamMembers.value
  
  return teamMembers.value.filter(member => 
    member.name.toLowerCase().includes(search.value.toLowerCase()) ||
    member.email.toLowerCase().includes(search.value.toLowerCase()) ||
    member.phone.includes(search.value),
  )
})

// Methods
const updateOptions = options => {
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const addTeamMember = () => {
  // TODO: Implement add team member functionality
  console.log('Add team member')
}

const editMember = member => {
  // TODO: Implement edit member functionality
  console.log('Edit member:', member)
}

const deleteMember = member => {
  // TODO: Implement delete member functionality
  const index = teamMembers.value.findIndex(m => m.id === member.id)
  if (index !== -1) {
    teamMembers.value.splice(index, 1)
  }
}

const viewMember = member => {
  // TODO: Implement view member functionality
  console.log('View member:', member)
}

const options = ref([])
</script>

<template>
  <BusinessLayout>
    <VCard>
      <!-- Header -->
      <VCardText class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center gap-4 pb-4">
        <div class="w-100 w-sm-auto">
          <h4 class="text-h4 text-sm-h4 text-h5 mb-1">
            Team members
            <VChip 
              size="small" 
              color="primary" 
              variant="tonal"
              class="ms-2"
            >
              {{ filteredMembers.length }}
            </VChip>
          </h4>
        </div>
        
        <div class="d-flex gap-2 gap-sm-3 align-center flex-wrap w-100 w-sm-auto justify-start justify-sm-end">
          <!-- Options Button -->
          <VMenu>
            <template #activator="{ props }">
              <VBtn
                variant="outlined"
                color="primary"
                append-icon="tabler-chevron-down"
                v-bind="props"
                size="default"
                class="flex-grow-1 flex-sm-grow-0"
              >
                Options
              </VBtn>
            </template>
            <VList>
              <VListItem
                v-for="(item, index) in options"
                :key="index"
                :value="index"
              >
                <VListItemTitle>{{ item.title }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
          
          <!-- Add Button -->
          <VBtn
            color="primary"
            size="default"
            class="flex-grow-1 flex-sm-grow-0"
            @click="addTeamMember"
          >
            Add
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- Search and Table Header -->
      <div class="search-container mx-3 mx-sm-6 my-4">
        <div class="d-flex justify-start  align-center">
          <!-- Search field with enhanced styling -->
          <div class="search-wrapper w-100 w-sm-auto">
            <AppTextField
              v-model="search"
              placeholder="Search team members"
              prepend-inner-icon="tabler-search"
              variant="outlined"
              density="comfortable"
              class="search-input"
              hide-details
              rounded="xl"
            />
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="px-3 px-sm-6">
        <VDataTable
          v-model="selectedRows"
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="filteredMembers"
          :items-length="filteredMembers.length"
          show-select
          item-value="id"
          class="text-no-wrap team-members-table"
          hide-default-footer
          :item-height="70"
          @update:options="updateOptions"
        >
          <!-- Name Column -->
          <template #item.name="{ item }">
            <div class="d-flex align-center gap-3">
              <VAvatar
                size="40"
                :color="!item.avatar ? 'primary' : undefined"
                :variant="!item.avatar ? 'tonal' : undefined"
              >
                <VImg
                  v-if="item.avatar"
                  :src="item.avatar"
                />
                <span
                  v-else
                  class="text-sm font-weight-medium"
                >
                  {{ avatarText(item.name) }}
                </span>
              </VAvatar>
              <div>
                <h6 class="text-base font-weight-medium mb-0">
                  {{ item.name }}
                </h6>
                <div class="text-body-2 text-medium-emphasis">
                  Team Member
                </div>
              </div>
            </div>
          </template>

          <!-- Contact Column -->
          <template #item.contact="{ item }">
            <div>
              <div class="text-body-1 mb-1">
                {{ item.email }}
              </div>
              <div class="text-body-2 text-medium-emphasis">
                {{ item.phone }}
              </div>
            </div>
          </template>

          <!-- Rating Column -->
          <template #item.rating="{ item }">
            <div
              v-if="item.rating > 0"
              class="d-flex align-center gap-2"
            >
              <VRating
                :model-value="item.rating"
                readonly
                size="small"
                density="compact"
              />
              <span class="text-body-2 text-medium-emphasis">
                ({{ item.rating }})
              </span>
            </div>
            <div
              v-else
              class="text-body-2 text-medium-emphasis"
            >
              No reviews yet
            </div>
          </template>

          <!-- Actions Column -->
          <template #item.actions>
            <div class="d-flex gap-1">
              <VBtn
                variant="outlined"
                color="primary"
                append-icon="tabler-chevron-down"
                v-bind="props"
                rounded="xl"
              >
                Actions
              </VBtn>
            </div>
          </template>


          <!-- Empty state -->
          <template #no-data>
            <div class="text-center py-8">
              <VIcon
                size="48"
                icon="tabler-users"
                class="mb-4 text-disabled"
              />
              <h6 class="text-h6 mb-2">
                No team members found
              </h6>
              <p class="text-body-2 text-medium-emphasis mb-4">
                Start by adding your first team member
              </p>
              <VBtn
                color="primary"
                @click="addTeamMember"
              >
                Add Team Member
              </VBtn>
            </div>
          </template>
        </VDataTable>
      </div>
    </VCard>
  </BusinessLayout>
</template>

<style lang="scss" scoped>
.search-container {
  border-radius: 12px;
  background-color: #f8f8fb;
  margin-block-end: 0;
  padding-block: 16px;
  padding-inline: 16px;

  @media (min-width: 600px) {
    padding-block: 20px;
    padding-inline: 24px;
  }
}

.search-wrapper {
  .search-input {
    min-inline-size: 100%;

    @media (min-width: 600px) {
      min-inline-size: 350px;
    }

    :deep(.v-field) {
      background-color: rgb(var(--v-theme-background));
      box-shadow: 0 1px 3px rgba(0, 0, 0, 8%);
    }

    :deep(.v-field__input) {
      font-size: 14px;
      padding-block: 12px;
      padding-inline: 16px;
    }

    :deep(.v-field__prepend-inner) {
      align-items: center;
      padding-inline-start: 16px;
    }

    :deep(.v-field__prepend-inner .v-icon) {
      margin-inline-end: 8px;
      opacity: 0.6;
    }

    :deep(.v-field--focused) {
      box-shadow: 0 0 0 2px rgb(var(--v-theme-primary), 0.2);
    }
  }
}

.team-members-table {
  // Mobile responsive table
  @media (max-width: 768px) {
    :deep(.v-data-table) {
      border-radius: 0;
    }

    :deep(.v-data-table__wrapper) {
      overflow-x: auto;
    }

    // Stack table content on very small screens
    :deep(.v-data-table__tr) {
      block-size: auto !important;
      min-block-size: 60px;
    }

    :deep(.v-data-table__td),
    :deep(.v-data-table__th) {
      font-size: 13px;
      padding-block: 12px !important;
      padding-inline: 8px !important;
    }

    // Hide less important columns on mobile
    :deep(.v-data-table__td):nth-child(3),
    :deep(.v-data-table__th):nth-child(3) {
      display: none;
    }
  }

  @media (min-width: 769px) {
    :deep(.v-data-table__tr) {
      block-size: 70px !important;
    }

    :deep(.v-data-table__td),
    :deep(.v-data-table__th) {
      padding-block: 16px !important;
    }
  }

  :deep(.v-data-table-rows-loading),
  :deep(.v-data-table-rows-no-data) {
    block-size: auto !important;
  }

  :deep(.v-data-table__td) {
    padding-block: 16px !important;
  }

  :deep(.v-data-table tbody tr:hover) {
    background-color: rgb(var(--v-theme-surface-variant), 0.04) !important;
  }

  // Mobile-specific avatar sizing
  @media (max-width: 768px) {
    :deep(.v-avatar) {
      block-size: 32px !important;
      font-size: 12px !important;
      inline-size: 32px !important;
    }
  }

  // Responsive action button
  :deep(.v-btn) {
    @media (max-width: 480px) {
      min-inline-size: auto !important;
      padding-block: 0 !important;
      padding-inline: 8px !important;
    }
  }
}

// Mobile responsive utilities
@media (max-width: 600px) {
  :deep(.text-h4) {
    font-size: 1.5rem !important;
  }

  :deep(.v-chip) {
    font-size: 0.75rem;
  }
}

// Tablet responsive adjustments
@media (min-width: 601px) and (max-width: 960px) {
  .search-wrapper .search-input {
    min-inline-size: 300px;
  }
}
</style>
