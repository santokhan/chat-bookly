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
        title: 'Chat',
        to: { name: 'BusinessChat' },
        icon: { icon: 'tabler-message' },
      },
      {
        title: 'Appointments',
        icon: { icon: 'tabler-calendar' },
        to: { name: 'BusinessAppointmentsCalendar' }
        // children: [
        //   {
        //     title: 'Calendar',
        //     to: { name: 'BusinessAppointmentsCalendar' },
        //     icon: { icon: 'tabler-calendar-event' },
        //   },
        //   {
        //     title: 'Settings',
        //     to: { name: 'BusinessAppointmentsSettings' },
        //     icon: { icon: 'tabler-settings' },
        //   },
        // ],
      },
      {
        title: 'Business Settings',
        icon: { icon: 'tabler-activity' },
        children: [
          {
            title: 'Opening hours',
            to: { name: 'BusinessActivityTimes' },
            icon: { icon: 'tabler-clock' },
          },
          {
            title: 'Team Members',
            to: { name: 'BusinessTeamMembers' },
            icon: { icon: 'tabler-users-group' },
          },
          {
            title: 'Services',
            to: { name: 'BusinessServicesOffered' },
            icon: { icon: 'tabler-briefcase' },
          },
          {
            title: 'Scheduled shifts',
            to: { name: 'BusinessTeamAvailability' },
            icon: { icon: 'tabler-calendar-time' },
          },
        ],
      },
      {
        title: 'Clients',
        icon: { icon: 'tabler-user' },
        to: { name: 'BusinessCustomersList' },
      },
      {
        title: 'Marketing',
        icon: { icon: 'tabler-crown' },
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
        title: 'Plan',
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
        title: 'Support',
        icon: { icon: 'tabler-headset' },
        children: [
          {
            title: 'Internal Chat',
            to: { name: 'BusinessSupportChat' },
            icon: { icon: 'tabler-message' },
          },
          {
            title: 'WhatsApp by Chatbookly',
            to: { name: 'BusinessSupportWhatsapp' },
            icon: { icon: 'tabler-brand-whatsapp' },
          },
        ],
      },
      {
        title: 'Marketplace Settings',
        icon: { icon: 'tabler-calendar-event' },
        to: { name: 'BusinessOnlineBooking' },
      },
    ]
  }
  
  return []
}
