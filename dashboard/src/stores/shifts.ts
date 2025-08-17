import { dateGenerator } from "@/utils/date"
import type { Shift } from "./opening-hours"
import { db_team_members, type TeamMember } from "./team-members"
import { defineStore } from "pinia"

export type TeamMemberShift = {
  id?: number
  team_member_id: number
  team_member: TeamMember
  date: string
  hours: Shift[]
}

const nextDate = dateGenerator(new Date())

export const useTeamMemberStore = defineStore('team_member_shifts', () => {
  const team_member_shifts: TeamMemberShift[] = [
    {
      "id": 1,
      "team_member_id": 1,
      "team_member": db_team_members[0],
      "date": nextDate.next().value.toLocaleDateString(),
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
      "id": 2,
      "team_member_id": 2,
      "team_member": db_team_members[1],
      "date": nextDate.next().value.toLocaleDateString(),
      "hours": [
        {
          "start": "08:00",
          "end": "12:00"
        },
        {
          "start": "13:00",
          "end": "17:00"
        },
        {
          "start": "18:00",
          "end": "22:00"
        }
      ]
    },
    {
      "id": 3,
      "team_member_id": 3,
      "team_member": db_team_members[2],
      "date": nextDate.next().value.toLocaleDateString(),
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
  ]

  const team_member_ids = team_member_shifts.reduce((acc, item) => {
    if (acc.includes(item.team_member_id)) {
      return acc
    }
    acc.push(item.team_member_id)
    return acc
  }, [] as number[])

  return {
    team_member_shifts,
    team_member_ids
  }
})