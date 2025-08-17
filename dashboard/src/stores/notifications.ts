// Example notifications

import { defineStore } from "pinia";
import { ref } from "vue";

// Create store
export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([
    {
      id: 1,
      user: { avatar: 'https://i.pravatar.cc/40?img=1' },
      content: '<strong>Wei Chen</strong> booked an appointment <strong>10 Aug</strong>, <strong>2025</strong> at <strong>13:00</strong> - <strong>13:45</strong>',
      created_at: '2025-08-17T10:30:00Z',
      updated_at: '2025-08-17T10:30:00Z',
      read: false
    },
    {
      id: 2,
      user: { avatar: 'https://i.pravatar.cc/40?img=1' },
      content: '<strong>Wei Chen</strong> booked an appointment <strong>10 Aug</strong>, <strong>2025</strong> at <strong>12:00</strong> - <strong>12:45</strong>',
      created_at: '2025-08-16T15:45:00Z',
      updated_at: '2025-08-16T15:45:00Z',
      read: true
    },
    {
      id: 3,
      user: { avatar: 'https://i.pravatar.cc/40?img=1' },
      content: '<strong>Wei Chen</strong> booked an appointment <strong>10 Aug</strong>, <strong>2025</strong> at <strong>11:00</strong> - <strong>12:00</strong>',
      created_at: '2025-08-15T09:20:00Z',
      updated_at: '2025-08-15T09:20:00Z',
      read: true
    }
  ])

  return { notifications }
})