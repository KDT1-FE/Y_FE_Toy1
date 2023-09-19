// src/redux/types.ts

export interface RootState {
    uid: string | null;
    email: string | null;
    nickname: string | null;
    image: string | null;
    // // 기타 상태 필드 추가
    user: {
      uid: string | null;
      email: string | null;
      nickname: string | null;
      image: string | null;
      // 기타 사용자 관련 상태 필드 추가
    } | null;
  }
  
  export type UserData = {
    uid: string;
    username: string;
    // 기타 필요한 필드 추가
  };
  
  export interface FirestorePostData {
    id: string; // 이 필드를 추가
    title: string;
    content: string;
    username: string; // 이 필드를 추가
    // 기타 필요한 속성 추가
  }

  