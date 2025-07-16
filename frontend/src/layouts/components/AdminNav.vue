<template>
  <nav class="admin-nav d-flex align-center gap-x-4">
    <RouterLink to="/admin" class="nav-link">Dashboard</RouterLink>
    <RouterLink to="/admin/users" class="nav-link">Users</RouterLink>
    <RouterLink to="/admin/reports" class="nav-link">Reports</RouterLink>
  </nav>
</template>

<style scoped>
.admin-nav .nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}
.admin-nav .nav-link.router-link-exact-active {
  color: #1976d2;
}
</style> 
