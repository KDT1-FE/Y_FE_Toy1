import {
  collection,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {db} from "./firebaseConfig";

// collection에 있는 데이터 다 가져온 후 배열로 반환
export async function getDocsToArr() {
  const arr: object[] = [];
  const snap = await getDocs(collection(db, "ranking"));
  snap.forEach(a => {
    arr.push(a.data());
  });

  return arr;
}

// 이름 & 공부시간 firestore에 포스트
export async function postData(n: string, t: number) {
  await setDoc(doc(db, "ranking", n), {
    name: n,
    time: t,
  });
}

// 공부량순으로 정렬하기
export function sortRanking(arr: any) {
  return arr.sort((a: any, b: any) => b.time - a.time);
}

// 데이터 리셋 함수
export async function resetCollection() {
  const result = await getDocs(collection(db, "ranking"));
  result.forEach(document => deleteDoc(doc(db, "ranking", document.id)));
}

// 데이터베이스에 저장된 요일 꺼내오기
export async function getDayFromDb() {
  const day = await getDoc(doc(db, "date", "today"));
  return day.data();
}

// 데이터베이스에 요일 업데이트
export async function setDayToDb(today: number) {
  await setDoc(doc(db, "date", "today"), {
    day: today,
  });
}

// 요일 계산; 데이터베이스와 다르면 데이터 리셋 후 요일 업데이트
export async function getDayAndReset() {
  const date = new Date();
  const today: number = date.getDay();
  const dayFromDb: any = await getDayFromDb();

  if (dayFromDb.day !== today) {
    resetCollection();
    setDayToDb(today);
  }
}

// 스트링 분(min)으로 변환 함수
