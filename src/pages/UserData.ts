import { Timestamp } from  "firebase/firestore"

interface userData {
  id?: string,
  category?: string,
  title?: string,
  date?: string,
  timestamp?: Timestamp,
  writer?: string,
  desc?: string,
  thumbnail?: string,
  uid?: string
}

export default userData;