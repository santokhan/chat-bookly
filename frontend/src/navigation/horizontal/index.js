export default [
  {
    title: 'Connect Your Business',
    to: { name: 'BusinessConnect' },
    icon: { icon: 'tabler-link' },
  },
  {
    title: 'Dashboard',
    to: { name: 'business' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Appointments',
    icon: { icon: 'tabler-calendar' },
    children: [
      {
        title: 'Calendar',
        to: { name: 'BusinessAppointmentsCalendar' },
        icon: { icon: 'tabler-calendar-event' },
      },
      {
        title: 'Settings',
        to: { name: 'BusinessAppointmentsSettings' },
        icon: { icon: 'tabler-settings' },
      },
    ],
  },
  {
    title: 'Activity Management',
    icon: { icon: 'tabler-activity' },
    children: [
      {
        title: 'Opening and Closing Times',
        to: { name: 'BusinessActivityTimes' },
        icon: { icon: 'tabler-clock' },
      },
      {
        title: 'Team Members',
        to: { name: 'BusinessTeamMembers' },
        icon: { icon: 'tabler-users-group' },
      },
      {
        title: 'Services Offered',
        to: { name: 'BusinessServicesOffered' },
        icon: { icon: 'tabler-briefcase' },
      },
      {
        title: 'Team Availability & Times',
        to: { name: 'BusinessTeamAvailability' },
        icon: { icon: 'tabler-calendar-time' },
      },
    ],
  },
  {
    title: 'Customer Management',
    icon: { icon: 'tabler-user' },
    children: [
      {
        title: 'List of All Customers',
        to: { name: 'BusinessCustomersList' },
        icon: { icon: 'tabler-list-details' },
      },
      {
        title: 'Customers who Spent the Most',
        to: { name: 'BusinessTopCustomers' },
        icon: { icon: 'tabler-crown' },
      },
    ],
  },
  {
    title: 'Marketing',
    icon: { icon: 'tabler-megaphone' },
    children: [
      {
        title: 'Generate QR codes & Activity Links',
        to: { name: 'BusinessMarketingQR' },
        icon: { icon: 'tabler-qrcode' },
      },
      {
        title: 'Extra SMS & Email Services',
        to: { name: 'BusinessMarketingSMS' },
        icon: { icon: 'tabler-mail' },
      },
      {
        title: 'Reminder for Customers',
        to: { name: 'BusinessMarketingReminders' },
        icon: { icon: 'tabler-bell' },
      },
    ],
  },
  {
    title: 'My Plan',
    icon: { icon: 'tabler-credit-card' },
    children: [
      {
        title: 'Monthly Plan Routes',
        to: { name: 'BusinessPlanMonthly' },
        icon: { icon: 'tabler-calendar-month' },
      },
      {
        title: 'Invoice Management & Downloads',
        to: { name: 'BusinessPlanInvoices' },
        icon: { icon: 'tabler-file-invoice' },
      },
    ],
  },
  {
    title: '24/7 Support',
    icon: { icon: 'tabler-headset' },
    children: [
      {
        title: 'Internal Chat',
        to: { name: 'BusinessSupportChat' },
        icon: { icon: 'tabler-message' },
      },
      {
        title: 'Whatsapp by Chatbookly',
        to: { name: 'BusinessSupportWhatsapp' },
        icon: { icon: 'tabler-brand-whatsapp' },
      },
    ],
  },
]
