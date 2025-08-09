const date = new Date()
console.log('Date: ', date);
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
console.log('Next Day: ', nextDay);
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)
export const db = {
  events: [
    // {
    //   id: 1,
    //   url: '',
    //   title: 'Design Review',
    //   start: date,
    //   end: nextDay,
    //   allDay: false,
    //   extendedProps: {
    //     calendar: 'Business',
    //   },
    // },
    {
      id: 1,
      url: '',
      title: 'Design Review',
      start: '2025-08-07T13:00:00', // YYYY-MM-DDTHH:mm:ss
      end: '2025-08-07T14:00:00',
      allDay: false,
      extendedProps: {
        status: 'completed',
        calendar: 'Business',
        client: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-1.png",
        },
        teamMemeber: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-2.png",
        },
        service: {
          type: 'Balayage',
          duration: '45 min'
        }
      },
    },
    {
      id: 2,
      url: '',
      title: 'Offfice Meeting',
      start: '2025-08-07T11:00:00', // YYYY-MM-DDTHH:mm:ss
      end: '2025-08-07T12:00:00',
      allDay: false,
      extendedProps: {
        status: 'booked',
        calendar: 'Business',
        client: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-1.png",
        },
        teamMemeber: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-2.png",
        },
        service: {
          type: 'Balayage',
          duration: '45 min'
        }
      },
    },
    {
      id: 3,
      url: '',
      title: 'Lunch Break',
      start: '2025-08-10T09:00:00', // YYYY-MM-DDTHH:mm:ss
      end: '2025-08-10T10:00:00',
      allDay: false,
      extendedProps: {
        status: 'blocked',
        calendar: 'Business',
        client: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-1.png",
        },
        teamMemeber: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-2.png",
        },
        blockedTime: '1 Hour'
      },
    },
    {
      id: 4,
      url: '',
      title: 'Consulting',
      start: '2025-08-05T13:00:00', // YYYY-MM-DDTHH:mm:ss
      end: '2025-08-05T14:00:00',
      allDay: false,
      extendedProps: {
        status: 'completed',
        calendar: 'Business',
        client: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-1.png",
        },
        teamMemeber: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-2.png",
        },
        service: {
          type: 'Balayage',
          duration: '45 min'
        }
      },
    },
    {
      id: 5,
      url: '',
      title: 'Haircut',
      start: '2025-08-07T22:00:00', // YYYY-MM-DDTHH:mm:ss
      end: '2025-08-07T24:00:00',
      allDay: false,
      extendedProps: {
        status: 'booked',
        calendar: 'Business',
        client: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-1.png",
        },
        teamMemeber: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-2.png",
        },
        service: {
          type: 'Balayage',
          duration: '45 min'
        }
      },
    },
    {
      id: 6,
      url: '',
      title: 'Prayer Break',
      start: '2025-08-09T04:00:00', // YYYY-MM-DDTHH:mm:ss
      end: '2025-08-09T05:00:00',
      allDay: false,
      extendedProps: {
        status: 'blocked',
        calendar: 'Business',
        client: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-1.png",
        },
        teamMemeber: {
          name: "John Doe",
          avatar: "/images/avatars/avatar-2.png",
        },
        blockedTime: '1 Hour'
      },
    },
  ],
}
