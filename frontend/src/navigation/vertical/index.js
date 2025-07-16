export function getVerticalNavItems(role) {
  if (role === 'admin') {
    return [
      {
        title: 'Dashboard',
        to: { name: 'admin' },
        icon: { icon: 'tabler-smart-home' },
      },
      {
        title: 'Users',
        to: { name: 'AdminUsers' },
        icon: { icon: 'tabler-users' },
      },
      {
        title: 'Reports',
        to: { name: 'AdminReports' },
        icon: { icon: 'tabler-report' },
      },
    ]
  } else if (role === 'business') {
    return [
      {
        title: 'Dashboard',
        to: { name: 'business' },
        icon: { icon: 'tabler-smart-home' },
      },
      {
        title: 'Orders',
        to: { name: 'BusinessOrders' },
        icon: { icon: 'tabler-shopping-cart' },
      },
      {
        title: 'Analytics',
        to: { name: 'BusinessAnalytics' },
        icon: { icon: 'tabler-chart-bar' },
      },
    ]
  }
  return []
}
