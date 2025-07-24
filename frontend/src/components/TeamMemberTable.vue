<script setup>
// Props
const props = defineProps({
  teamMembers: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedRows: {
    type: Array,
    default: () => [],
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  page: {
    type: Number,
    default: 1,
  },
})

// Emits
const emit = defineEmits([
  'update:selectedRows',
  'update:itemsPerPage', 
  'update:page',
  'update:options',
  'viewMember',
  'editMember',
  'deleteMember',
])

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

// Methods
const updateOptions = options => {
  emit('update:options', options)
}

const handleViewMember = member => {
  emit('viewMember', member)
}

const handleEditMember = member => {
  emit('editMember', member)
}

const handleDeleteMember = member => {
  emit('deleteMember', member)
}
</script>

<template>
  <div class="team-members-table">
    <VDataTable
      :model-value="selectedRows"
      :items-per-page="itemsPerPage"
      :page="page"
      :headers="headers"
      :items="teamMembers"
      :items-length="teamMembers.length"
      show-select
      item-value="id"
      class="text-no-wrap"
      hide-default-footer
      :item-height="70"
      @update:model-value="emit('update:selectedRows', $event)"
      @update:items-per-page="emit('update:itemsPerPage', $event)"
      @update:page="emit('update:page', $event)"
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
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <VMenu>
            <template #activator="{ props }">
              <VBtn
                variant="outlined"
                color="primary"
                append-icon="tabler-chevron-down"
                v-bind="props"
                rounded="xl"
                size="small"
              >
                Actions
              </VBtn>
            </template>
            <VList>
              <VListItem @click="handleViewMember(item)">
                <VListItemTitle>
                  <VIcon
                    icon="tabler-eye"
                    class="me-2"
                    size="16"
                  />
                  View
                </VListItemTitle>
              </VListItem>
              <VListItem @click="handleEditMember(item)">
                <VListItemTitle>
                  <VIcon
                    icon="tabler-edit"
                    class="me-2"
                    size="16"
                  />
                  Edit
                </VListItemTitle>
              </VListItem>
              <VListItem @click="handleDeleteMember(item)">
                <VListItemTitle>
                  <VIcon
                    icon="tabler-trash"
                    class="me-2"
                    size="16"
                    color="error"
                  />
                  Delete
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
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
            @click="$emit('addTeamMember')"
          >
            Add Team Member
          </VBtn>
        </div>
      </template>
    </VDataTable>
  </div>
</template>

<style lang="scss" scoped>
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
</style> 
