/* 클래스를 결정, studyTime(단위 m)을 받아 class(1,2,3)를 리턴 */
export const determineClass = (studyTime:number) => {
  if(typeof studyTime !== 'number') return new ClassError('class/invalid_type',',study time의 형식을 확인해주세요')

  if(studyTime === 0){
    return 0
  }else if(studyTime < 60){
    return 1
  }else if(studyTime >= 60 ){
    return 2
  }
  
  return new ClassError("class/class_not_determine", "study time")
}

export class ClassError extends Error {
  public code
  constructor(code:string, message:string) {
    super(message);
    this.code = code;
  }
}