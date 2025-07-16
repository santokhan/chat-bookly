export function getDashboardData(role) {
  if (role === 'admin') {
    return {
      title: 'Admin Dashboard',
      stats: [
        { label: 'Users', value: 120 },
        { label: 'Revenue', value: '$10,000' },
      ],
    }
  } else if (role === 'business') {
    return {
      title: 'Business Dashboard',
      stats: [
        { label: 'Orders', value: 45 },
        { label: 'Earnings', value: '$2,500' },
      ],
    }
  } else {
    return null
  }
}
