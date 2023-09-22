export const specificErrorContent = (code:string) => {
  switch(code){
    case "email-already-exists":
      return "제공된 이메일을 기존 사용자가 이미 사용 중입니다. 각 사용자마다 이메일이 고유해야 합니다."
    case "id-token-expired":
      return "제공된 Firebase ID 토큰이 만료되었습니다. 관리자에게 문의해주세요"
    case "id-token-revoked": 
      return "Firebase ID 토큰이 취소되었습니다."
    case "internal-error":
      return "인증 서버에서 요청을 처리하려고 시도하는 중에 예기치 않은 오류가 발생했습니다. 관리자에게 문의해주세요"
    case "invalid-display-name":
      return "displayName 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 비어 있지 않은 문자열이어야 합니다."
    case "invalid-email":
      return "email 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 문자열 이메일 주소여야 합니다."
    case "invalid-password":
      return "password 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 6자 이상의 문자열이어야 합니다."
    case "invalid-photo-url":
      return "photoURL 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 문자열 URL이어야 합니다. 관리자에게 문의해주세요"
    case "too-many-requests":
      return "요청 수가 최대 허용치를 초과합니다."
    case "user-not-found":
      return "유저를 찾을 수 없습니다. 이메일을 확인 해주세요."
    case "double-nickname":
      return '닉네임이 중복됐습니다. 다른 닉네임을 사용해주세요'
    case "weak-password":
      return "비밀번호를 6자 이상 입력하세요"
    default:
      return "알 수 없는 오류입니다. 관리자에게 문의해주세요"
  }
}

export class CustomError extends Error {
  public code
  constructor(code:string, message:string) {
    super(message);
    this.code = code;
  }
}

