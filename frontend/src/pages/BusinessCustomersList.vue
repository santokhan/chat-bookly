<script setup>
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'

const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const selectedRows = ref([])

const updateOptions = options => {
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

// Headers
const headers = [
  {
    title: 'Client name',
    key: 'user',
  },
  {
    title: 'Mobile number',
    key: 'role',
  },
  {
    title: 'Reviews',
    key: 'plan',
  },
  {
    title: 'Sales',
    key: 'billing',
  },
  {
    title: 'Created at',
    key: 'status',
  }
  // ,
  // {
  //   title: 'Actions',
  //   key: 'actions',
  //   sortable: false,
  // },
]

// const {
//   data: usersData,
//   execute: fetchUsers,
// } = await useApi(createUrl('/apps/users', {
//   query: {
//     q: searchQuery,
//     status: selectedStatus,
//     plan: selectedPlan,
//     role: selectedRole,
//     itemsPerPage,
//     page,
//     sortBy,
//     orderBy,
//   },
// }))

const usersData = {value: {
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        status: '29 May 2025',
        role: '1222131',
        plan: 'pro',
        billing: '$43'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: '29 May 2025',
        role: '23212333',
        plan: 'basic',
        billing: '$1400'
      }
    ],
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        status: '29 May 2025',
        role: '321333215',
        plan: 'pro',
        billing: '$210'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'inactive',
        role: 'user',
        plan: 'basic',
      },
      // Add more mock users if needed
    ],
    meta: {
      total: 2,
      per_page: 10,
      current_page: 1,
      last_page: 1,
    },
  }

}

const fetchUsers = async () => {
  // simulate delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(usersData), 300) // 300ms delay
  })
}

const users = computed(() => usersData.value.users)
const totalUsers = computed(() => usersData.value.totalUsers)

// 👉 search filters
const roles = [
  {
    title: 'Admin',
    value: 'admin',
  },
  {
    title: 'Author',
    value: 'author',
  },
  {
    title: 'Editor',
    value: 'editor',
  },
  {
    title: 'Maintainer',
    value: 'maintainer',
  },
  {
    title: 'Subscriber',
    value: 'subscriber',
  },
]

const plans = [
  {
    title: 'Basic',
    value: 'basic',
  },
  {
    title: 'Company',
    value: 'company',
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
  },
  {
    title: 'Team',
    value: 'team',
  },
]

const status = [
  {
    title: 'Pending',
    value: 'pending',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
  },
]

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber')
    return {
      color: 'success',
      icon: 'tabler-user',
    }
  if (roleLowerCase === 'author')
    return {
      color: 'error',
      icon: 'tabler-device-desktop',
    }
  if (roleLowerCase === 'maintainer')
    return {
      color: 'info',
      icon: 'tabler-chart-pie',
    }
  if (roleLowerCase === 'editor')
    return {
      color: 'warning',
      icon: 'tabler-edit',
    }
  if (roleLowerCase === 'admin')
    return {
      color: 'primary',
      icon: 'tabler-crown',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = async userData => {
  await $api('/apps/users', {
    method: 'POST',
    body: userData,
  })

  // Refetch User
  fetchUsers()
}

const deleteUser = async id => {
  await $api(`/apps/users/${ id }`, { method: 'DELETE' })

  // Delete from selectedRows
  const index = selectedRows.value.findIndex(row => row === id)
  if (index !== -1)
    selectedRows.value.splice(index, 1)

  // Refetch User
  fetchUsers()
}

const widgetData = ref([
  {
    title: 'Session',
    value: '21,459',
    change: 29,
    desc: 'Total Clients',
    icon: 'tabler-users',
    iconColor: 'primary',
  },
  {
    title: 'Paid Clients',
    value: '4,567',
    change: 18,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-plus',
    iconColor: 'error',
  },
  {
    title: 'Active Clients',
    value: '19,860',
    change: -14,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-check',
    iconColor: 'success',
  },
  {
    title: 'Pending Clients',
    value: '237',
    change: 42,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-search',
    iconColor: 'warning',
  },
])
</script>

<template>
  <BusinessLayout>
    <section>
      <VCard class="mb-6">
        <VDivider />
        <VCardText>
          <VCardTitle class="pl-0">Clients List</VCardTitle>
          <VCardSubtitle class="pl-0">View, add, edit and delete your client's details.</VCardSubtitle>
        </VCardText>
        
        

        <VCardText class="d-flex flex-wrap gap-4">

          <div style="inline-size: 15.625rem;">
              <AppTextField
                v-model="searchQuery"
                placeholder="Name, email or phone"
                show-search-icon="true"
              />
            </div>
          <VSpacer />

          <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
            <!-- 👉 Export button -->
            <VBtn
              append-icon="tabler-chevron-down"
              variant="tonal"
              color="secondary"
            >
              Options
              <VMenu activator="parent">
                <VList>
                  <VListItem link>
                    <template #prepend>
                      <VIcon icon="tabler-file-import" />
                    </template>
                    <VListItemTitle>Import Clients</VListItemTitle>
                  </VListItem>

                  <!-- Divider -->
                  <VDivider class="my-1" />

                  <!-- Subheader -->
                  <VListSubheader>Exports</VListSubheader>

                  <VListItem @click="exportExcel()">
                    <template #prepend>
                      <VIcon icon="tabler-file-spreadsheet" />
                    </template>
                    <VListItemTitle>Excel</VListItemTitle>
                  </VListItem>

                  <VListItem @click="exportCSV()">
                    <template #prepend>
                      <VIcon icon="tabler-file-text" />
                    </template>
                    <VListItemTitle>CSV</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>

            <!-- 👉 Add user button -->
            <VBtn
              @click="isAddNewUserDrawerVisible = true"
            >
              Add
            </VBtn>
          </div>
        </VCardText>

        <VDivider />

        <!-- SECTION datatable -->
        <VDataTableServer
          v-model:items-per-page="itemsPerPage"
          v-model:model-value="selectedRows"
          v-model:page="page"
          :items="users"
          item-value="id"
          :items-length="totalUsers"
          :headers="headers"
          class="text-no-wrap"
          show-select
          @update:options="updateOptions"
        >
          <!-- User -->
          <template #item.user="{ item }">
            <div class="d-flex align-center gap-x-4">
              <VAvatar
                size="34"
                :variant="!item.avatar ? 'tonal' : undefined"
                :color="!item.avatar ? resolveUserRoleVariant(item.role).color : undefined"
              >
                <VImg
                  v-if="item.avatar"
                  :src="item.avatar"
                />
                <span v-else>{{ avatarText(item.fullName) }}</span>
              </VAvatar>
              <div class="d-flex flex-column">
                <div class="text-sm">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </template>

          <!-- 👉 Role -->
          <template #item.role="{ item }">
            <div class="d-flex align-center gap-x-2">
              <div class="text-capitalize text-high-emphasis text-body-1">
                {{ item.role }}
              </div>
            </div>
          </template>

          <!-- Plan -->
          <template #item.plan="{ item }">
            <div class="text-body-1 text-high-emphasis text-capitalize">
              <!-- {{ item.currentPlan }} -->
                -
            </div>
          </template>

          <!-- Status -->
          <template #item.status="{ item }">
            {{ item.status }}
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <IconBtn @click="deleteUser(item.id)">
              <VIcon icon="tabler-trash" />
            </IconBtn>

            <IconBtn>
              <VIcon icon="tabler-eye" />
            </IconBtn>

            <VBtn
              icon
              variant="text"
              color="medium-emphasis"
            >
              <VIcon icon="tabler-dots-vertical" />
              <VMenu activator="parent">
                <VList>
                  <VListItem link>
                    <template #prepend>
                      <VIcon icon="tabler-pencil" />
                    </template>
                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>

                  <VListItem @click="deleteUser(item.id)">
                    <template #prepend>
                      <VIcon icon="tabler-trash" />
                    </template>
                    <VListItemTitle>Delete</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </template>

          <!-- pagination -->
          <template #bottom>
            <TablePagination
              v-model:page="page"
              :items-per-page="itemsPerPage"
              :total-items="totalUsers"
            />
          </template>
        </VDataTableServer>
        <!-- SECTION -->
      </VCard>
      <!-- 👉 Add New User -->
      <AddNewUserDrawer
        v-model:is-drawer-open="isAddNewUserDrawerVisible"
        @user-data="addNewUser"
      />
    </section>
  </BusinessLayout>
</template>
