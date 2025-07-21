<template>
  <nav class="business-nav d-flex align-center gap-x-4">
    <RouterLink to="/business" class="nav-link">Dashboard</RouterLink>
    <RouterLink to="/business/orders" class="nav-link">Orders</RouterLink>
    <RouterLink to="/business/analytics" class="nav-link">Analytics</RouterLink>
  </nav>
</template>

<style scoped>
.business-nav .nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}
.business-nav .nav-link.router-link-exact-active {
  color: #1976d2;
}
</style>
