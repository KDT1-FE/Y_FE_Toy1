interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export default function convertTimestampToDate(timestamp: Timestamp | null) {
  if (!timestamp || !timestamp.seconds) return null;
  return new Date(timestamp.seconds * 1000);
}
