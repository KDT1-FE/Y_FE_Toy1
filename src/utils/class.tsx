import { db } from '../firebase';
import { updateDoc ,getDoc, doc } from "firebase/firestore"
import { User } from "@firebase/auth";
import Swal from 'sweetalert2';

/* 클래스를 결정, studyTime(단위 m)을 받아 class(1,2,3)를 리턴 */
export const determineClass = (studyTime:number) => {
  if(typeof studyTime !== 'number') new ClassError('class/invalid_type',',study time의 형식을 확인해주세요')

  if(studyTime === 0){
    return 0
  }else if(studyTime < 60){
    return 1
  }else if(studyTime >= 60 ){
    return 2
  }
  
  new ClassError("class/class_not_determine", "study time")
}

// 현재 uid의 계급이 localStorage에 있는지 chk, 없으면 다시 초기화
export const getClassLocalStorage = (uid:string) => {
  const userClass = localStorage.getItem(uid)
  if(userClass === null){
    localStorage.setItem(uid, "0")
    return 0
  }
  return userClass
}

// localStorage와 Db가 변경됐는지 chk, 있으면 alert 창 + 정보 업데이트
export const chkClassChangeAndAlert = (userClass:number, databaseClass:number) => {
  if(userClass !== databaseClass){
    Swal.fire({
      icon:"success",
      title: `${getClassName(userClass)} 승급을 축하드립니다 다음 승급까지 ${getClassMin(userClass+1)}분 만큼 남으셨습니다.`
    })
    return true
  }else{
    return false
  }
}

// 로그인이 이루어진 상태에서만 호출할 것
// ex)로그인 후 호출 or 공부시간 타이머 사용
// firestore에 있는 studytime을 확인해, database에 저장된 class 값과 비교하고 달라졌다면 alert 창을 띄움
export const SynchroClassAndAlert = async (user:User) => {
  const userSnapShot = await getDoc(doc(db, "user", user!.uid));
  const databaseUser = userSnapShot.data()

  if(databaseUser){
    const userClass = determineClass(databaseUser.studyTime)
    if(userClass){
      // 계급의 변화를 감지하여 로컬에 반영
      if(chkClassChangeAndAlert(userClass, databaseUser.class)){
        localStorage.setItem(user!.uid, JSON.stringify(userClass))
        // 데이터베이스에 적용
        const userDocRef = doc(db, "user", user.uid);
          updateDoc(userDocRef, {
            class: userClass
          })
      }
    }   
  }
}

export const getClassName = (classCode:number) => {
  const userClassAry = ["브론즈","실버","골드"]
  return userClassAry[classCode]
}

export const getClassMin = (classCode:number) => {
  const classMin = [0,1,60]
  if(classMin.length <= classCode){
    return 10000
  }
  return classMin[classCode]
}

class ClassError extends Error {
  public code
  constructor(code:string, message:string) {
    super(message);
    this.code = code;
  }
}
