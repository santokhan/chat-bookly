import { defineStore } from "pinia"

export type Shift = {
  start: string
  end: string
}

export type OpeningHours = {
  day: string
  hours: Shift[]
  status?: string
}

export const useOpeningHoursStore = defineStore('opening-hours', () => {
  const openingHours: OpeningHours[] = [
    {
      "day": "monday",
      "hours": [
        {
          "start": "08:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "17:00"
        }
      ],
    },
    {
      "day": "tuesday",
      "hours": [
        {
          "start": "08:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "17:00"
        }
      ]
    },
    {
      "day": "wednesday",
      "hours": [
        {
          "start": "09:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "18:00"
        }
      ]
    },
    {
      "day": "thursday",
      "hours": [
        {
          "start": "08:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "17:00"
        }
      ]
    },
    {
      "day": "friday",
      "hours": [
        {
          "start": "08:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "16:00"
        }
      ]
    },
    {
      "day": "saturday",
      "hours": [
        {
          "start": "10:00",
          "end": "14:00"
        },
        {
          "start": "15:00",
          "end": "18:00"
        }
      ]
    },
    {
      "day": "sunday",
      "hours": [
        {
          "start": "10:00",
          "end": "14:00"
        },
      ],
      "status": "closed"
    }
  ]

  return { openingHours }
})