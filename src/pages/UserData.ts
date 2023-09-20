import { Timestamp } from  "firebase/firestore"

interface userData {
  id?: string, // : 로바꾸는건어떠세욥
  category?: string,
  title?: string,
  date?: string,
  timestamp?: Timestamp | undefined,
  writer?: string,
  desc?: string,
  thumbnail?: string,
  uid?: string
}

export default userData;