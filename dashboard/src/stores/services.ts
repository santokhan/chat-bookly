import { db_team_members, type TeamMember } from "./team-members"

export type ServiceType = {
  id?: number
  name: string
}

export type Service = {
  category_id: string
  category?: string
  id?: number
  name: string
  description?: string
  types: ServiceType[]
  team_members: TeamMember[] // use [] everywhere
  price: number
  duration: number
  status?: string
}

export const db_services: Service[] = [
  {
    "category_id": "1",
    "category": "Category 1",
    "id": 1,
    "name": "Service 1",
    "description": "Description 1",
    "types": [
      {
        "id": 1,
        "name": "Spa"
      },
      {
        "id": 2,
        "name": "Manicure"
      }
    ],
    "team_members": [
      db_team_members[0],
      db_team_members[1]
    ],
    "price": 100,
    "duration": 60,
    "status": "active"
  },
  {
    "category_id": "2",
    "category": "Category 2",
    "id": 2,
    "name": "Service 2",
    "description": "Description 2",
    "types": [
      {
        "id": 3,
        "name": "Hair"
      },
      {
        "id": 4,
        "name": "Nails"
      }
    ],
    "team_members": [
      db_team_members[2],
      db_team_members[3]
    ],
    "price": 200,
    "duration": 120,
    "status": "active"
  },
  {
    "category_id": "3",
    "category": "Category 3",
    "id": 3,
    "name": "Service 3",
    "description": "Description 3",
    "types": [
      {
        "id": 5,
        "name": "Lashes"
      },
      {
        "id": 6,
        "name": "Pedicures"
      }
    ],
    "team_members": [
      db_team_members[3],
      db_team_members[1]
    ],
    "price": 300,
    "duration": 180,
    "status": "inactive"
  },
]