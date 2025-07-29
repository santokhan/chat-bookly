<script setup>
import TeamMemberTable from '@/components/TeamMemberTable.vue'
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
const options = ref([])

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
                color="#000000"
                append-icon="tabler-chevron-down"
                v-bind="props"
                size="large"
                class="flex-grow-1 flex-sm-grow-0 options-btn"
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
            color="#000000"
            size="large"
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
        <div class="d-flex justify-start align-center">
          <!-- Search field with enhanced styling -->
          <div class="search-wrapper w-100 w-sm-auto">
            <VTextField
              v-model="search"
              placeholder="Search team members"
              prepend-inner-icon="tabler-search"
              variant="outlined"
              density="comfortable"
              class="search-input search-field"
              hide-details
              rounded="xl"
              color="#000000"
            />
          </div>
        </div>
      </div>

      <!-- Team Member Table Component -->
      <div class="px-3 px-sm-6">
        <TeamMemberTable
          v-model:selected-rows="selectedRows"
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :team-members="filteredMembers"
          @update:options="updateOptions"
          @view-member="viewMember"
          @edit-member="editMember"
          @delete-member="deleteMember"
          @add-team-member="addTeamMember"
        />
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
      border-color: #000000 !important;
    }

    :deep(.v-field__input) {
      font-size: 14px;
      padding-block: 12px;
      padding-inline: 16px;
    }

    :deep(.v-field__prepend-inner) {
      display: flex !important;
      align-items: center;
      padding-inline-start: 16px;
    }

    :deep(.v-field__prepend-inner .v-icon) {
      display: block !important;
      font-size: 20px;
      margin-inline-end: 8px;
      opacity: 0.6;
    }

    :deep(.v-field--focused) {
      box-shadow: 0 0 0 2px #000000 !important;
      border-color: #000000 !important;
    }
    
    :deep(.v-field__outline) {
      border-color: #000000 !important;
    }
    
    :deep(.v-field__outline__start),
    :deep(.v-field__outline__end),
    :deep(.v-field__outline__notch) {
      border-color: #000000 !important;
    }

    // Ensure icon is visible
    :deep(.v-input__prepend-inner) {
      display: flex !important;
      align-items: center;
    }
  }
}

.search-field {
  :deep(.v-input__control) {
    border: 2px solid black;
    border-radius: 30px;
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

.options-btn {
  border-color: #000000 !important;
  color: #000000 !important;
}

.options-btn:hover {
  background-color: rgba(0, 0, 0, 0.04) !important;
}

.search-field {
  border-color: #000000 !important;
  color: #000000 !important;
}

.search-field:hover {
  background-color: rgba(0, 0, 0, 0.04) !important;
}
</style>
