export type TeacherView = {
  _id: string
  name: string
  subject: string
  photoUrl: string | null
  photoAlt: string
  credential?: string | null
  years?: string | null
  philosophy?: string | null
  classes?: string[] | null
  experience?: string[] | null
}
