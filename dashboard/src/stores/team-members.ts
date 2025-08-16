export type TeamMember = {
  id?: number
  first_name: string
  last_name: string
  role: string
  image: string
  email: string
  phone: string
  rating: number
  dob: string
}

export const db_team_members: TeamMember[] = [
  {
    "id": 1,
    "first_name": "Alice",
    "last_name": "Johnson",
    "role": "Team Member",
    "image": "https://i.pravatar.cc/300?u=alice",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "rating": 4.7,
    "dob": "1990-05-12"
  },
  {
    "id": 2,
    "first_name": "Bob",
    "last_name": "Smith",
    "role": "Team Member",
    "image": "https://i.pravatar.cc/300?u=bob",
    "email": "bob.smith@example.com",
    "phone": "+1234567891",
    "rating": 4.5,
    "dob": "1988-11-23"
  },
  {
    "id": 3,
    "first_name": "Carol",
    "last_name": "White",
    "role": "Team Member",
    "image": "https://i.pravatar.cc/300?u=carol",
    "email": "carol.white@example.com",
    "phone": "+1234567892",
    "rating": 0,
    "dob": "1992-08-07"
  },
  {
    "id": 4,
    "first_name": "David",
    "last_name": "Lee",
    "role": "Team Member",
    "image": "https://i.pravatar.cc/300?u=david",
    "email": "david.lee@example.com",
    "phone": "+1234567893",
    "rating": 4.6,
    "dob": "1985-02-18"
  }
]
