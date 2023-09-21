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
export async function getRankingDocsToArr() {
  const arr: object[] = [];
  const snap = await getDocs(collection(db, "ranking"));
  snap.forEach(a => {
    arr.push(a.data());
  });

  return arr;
}

// 이름 & 공부시간 firestore에 포스트
export async function postData(id: string) {
  const secs = Number(sessionStorage.getItem("time"));
  await setDoc(doc(db, "ranking", id), {
    name: id,
    time: secs,
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
    await resetCollection();
    setDayToDb(today);
  }
}

// 시간(초단위) 시간, 분, 초로 변환 후 반환
export function secsToMins(secs: number) {
  const hours = Math.floor(secs / 360);
  const newSecs = secs - hours * 360;
  const minutes = Math.floor(newSecs / 60);
  const seconds = newSecs % 60;

  return {
    hrs: hours,
    mins: minutes,
    secs: seconds,
  };
}

export function calculateTimer(timeInSeconds: number): Array<number | string> {
  const hours: number = Math.floor(timeInSeconds / 3600);
  const minutes: number = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds: number = timeInSeconds - hours * 3600 - minutes * 60;

  const hoursFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

  return [hoursFormat, minutesFormat, secondsFormat];
}

export const calculateStudyTime = (
  startTime: number,
  endTime: number,
  totalBreakTime: number,
): string => {
  const studyDuration = endTime - startTime - totalBreakTime;
  const hours = Math.floor(studyDuration / 3600000);
  const minutes = Math.floor((studyDuration % 3600000) / 60000);
  const seconds = Math.floor((studyDuration % 60000) / 1000);

  return `총 공부 시간 : ${hours}시간 ${minutes}분 ${seconds}초`;
};

// 시간 세션스토리지에 저장
export const saveTimeInBrowser = (time: number | null) => {
  sessionStorage.setItem("time", String(time));
};

// 랭킹 세션스토리지에 저장
export const saveRankingInBrowser = (data: object[]) => {
  sessionStorage.setItem("ranking", JSON.stringify(data));
};

// 랭킹 URL 상수
export const RANKING_URL = "https://techschool-wiki.web.app/ranking";

export const getTimeFromBrowser = (): number | null => {
  const storedTime = sessionStorage.getItem("time");
  if (storedTime !== null) {
    return parseInt(storedTime, 10);
  }
  return null;
};
