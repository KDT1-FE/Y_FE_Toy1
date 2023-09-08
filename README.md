# **📅 직원들을 위한 위키 사이트**

직원 들을 위한 위키 사이트를 만들어보세요!
위키 사이트에는 위키 뿐 아니라 여러 기능이 추가되어야 합니다!

### **[과제 수행 및 제출 방법]**

1. 현재 저장소를 로컬에 클론(Clone)합니다.
2. 자신의 팀명으로 브랜치를 생성합니다.(구분 가능하도록 팀명을 꼭 파스칼케이스로 표시하세요, git branch Y_FE_Toy1_Team13)
3. 자신의 팀명 브랜치에서 과제를 수행합니다.
4. 과제 수행이 완료되면, 자신의 팀명 브랜치를 원격 저장소에 푸시(Push)합니다.(main 브랜치에 푸시하지 않도록 꼭 주의하세요, git push origin Y_FE_Toy1_Team13)
5. 저장소에서 main 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, main <== Y_FE_Toy1_Team13)
6. Pull Request 링크를 LMS로도 제출해 주셔야 합니다.
7. main 혹은 다른 사람의 브랜치로 절대 병합하지 않도록 주의하세요!
8. Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!
9. Pull Request에서 과제 제출 후 절대 병합(Merge)하지 않도록 주의하세요!
10. 과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 담당 멘토나 강사님께 얘기하세요!

### **[필수 구현사항]**

- 문서편집, revision 기능을 제공하여 업무일지를 작성할 수 있는 직원들을 위한 위키사이트 구현(마크다운 형식)
- firebase database (Firestore) 이용
- 모달을 활용한 근무 시간을 표시하는 시계 및 타이머 창 구현
- 캐러셀을 활용한 회사 공지 페이지
- **갤러리 페이지 / 업무일지 페이지 등 메뉴를 필터링 또는 카테고리화 하는 선택바 구현**
- netlify 등을 이용한 정적 페이지 배포
- TypeScript 사용 필수
- 과제에 대한 설명을 포함한 `README.md` 파일 작성
    - 팀원별로 구현한 부분 소개

### **[선택 구현사항]**

- React 사용은 선택
- 기타 동작이 완료되기 전에 로딩 애니메이션 구현
- 페이지네이션
- 관련된 기타 기능도 고려
- eslint 설정, 커밋컨벤션, 문서화 등 팀프로젝트시 필요한 추가 작업들

---

## 가이드

아래 예시는 모두 하나의 의견입니다!

따라하는게 아니라 자신만의 결과물을 만들어보세요.

### 공지사항
[영상 1]


### **모달 타이머**
[영상 2]


https://github.com/KDT1-FE/Y_FE_Toy1/assets/38754963/20c18d28-5a01-4163-876c-be74a24f62db



### **마크다운 위키사이트**
[영상 3]


https://github.com/KDT1-FE/Y_FE_Toy1/assets/38754963/08e3efca-8137-44d8-a0af-c62a668b810b



### **갤러리**
[영상 4]

---

# **[Firestore]**

Firestore에 대한 가이드입니다.

자세한 내용은 [공식 홈페이지](https://firebase.google.com/?hl=ko) 를 찾아보길 적극 권장합니다!

### **App init**

```jsx
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(fireBaseApp);
```

### Firestore 데이터 추가하기

Firestore의 데이터를 추가하는 방법은 크게 두가지이다.

1. Firebase console에서 손수 데이터 추가해주기
2. 코드로 데이터 추가하기

### 1. Firebase console에서 손수 데이터 추가해주기

1. [Firebase console](https://console.firebase.google.com/u/0/?hl=ko)에 접속한다.
2. 자신의 프로젝트를 선택한다.
3. 왼쪽 메뉴에서 `Firestore Database`를 선택한다.
4. `+ 버튼`을 눌러 컬렉션 > 문서를 마음대로 추가해준다.
5. 필드를 추가하여 문서에 데이터를 넣어준다.

### 2. 코드로 데이터 추가하기

Firestore는 `setDoc`, `addDoc` 두 가지 함수로 데이터를 추가할 수 있다.

이제 원하는 데이터를 추가해보자.

**1. `addDoc`**

`addDoc`은 아래와 같이 사용하여 원하는 데이터를 추가할 수 있다.

```
import { addDoc, collection } from "firebase/firestore";

const writtenDoc = await addDoc(collection(db, "wiki"), {
  title: "LGH",
  description: "허먼밀러...사고싶다...",
});

console.log("Document written with ID: ", writtenDoc.id);
// 새로 생성된 Document의 ID를 반환한다.
```

원하는 데이터를 추가하기 위해선 먼저 원하는 collection을 선택해야 한다. 위 예제의 `addDoc` 안에서 사용한 `collection` 함수는 db상에 있는 collection을 선택하거나 없을 경우 새로운 collection을 생성하여 반환한다.

Firebase의 Doc는 기본적으로 ID를 가져야 하는데, addDoc을 사용하면 ID를 자동으로 만든다. 또한, 이미 존재하는 Doc에 `addDoc`을 사용하면 에러가 발생한다.

**2. `setDoc`**

`setDoc`은 아래와 같이 사용하여 원하는 데이터를 추가할 수 있다.

```
import { setDoc, doc } from "firebase/firestore";

await setDoc(doc(db, "wiki", "new-id"), {
  title: "LGH",
  description: "허먼밀러...사고싶다...",
});
```

`addDoc`과의 차이점은

1. **id** 를 지정해줘야함
2. `collection` 대신 `doc`을 사용함
3. 이미 존재하는 Doc에 사용가능

3가지 이다.

`setDoc`은 `addDoc`과 달리 collection이 아니라 doc를 선택해야 한다. 이는 `setDoc`이 데이터의 추가 뿐 아니라 데이터 덮어쓰기 기능도 가지고 있기 때문이다. 러프하게 생각해보면 `setDoc`은 데이터를 추가할 때

1. doc을 선택하거나 새로운 doc을 생성
2. doc의 내용을 덮어씀

의 방식으로 동작하는 것이다.

Doc을 선택하는 방법은 `doc` 함수를 사용하는 것이다. `[doc()](https://firebase.google.com/docs/reference/js/firestore_.md?hl=ko#doc)` 함수는 `DocumentReference` instance를 반환한다. 절대 경로를 사용하여 원하는 Document를 선택할 수 있다. 위에서 만들어둔 `wiki > completed` 문서는 아래처럼 불러올 수 있다.

```
import { doc } from "firebase/firestore";

const docRef = doc(db, "wiki", "completed");
```

`doc` 함수의 3번째 인자가 바로 **id** 이다. id는 이미 존재하는 Doc의 id를 사용할 수도 있고, 새로운 id를 사용할 수도 있다. 존재하는 id를 사용하는 경우에는 해당 Doc의 데이터를 덮어쓰게 된다. 그렇지 않은 경우엔 새로운 Doc를 생성한다.

어쨌거나 데이터를 새로 추가할 수 있는 것이다.

### Firestore 데이터 수정하기

Firestore의 데이터를 수정하는 방법은 크게 두가지이다.

1. Firebase console에서 손수 데이터 수정해주기
1. 코드로 데이터 수정하기

1번은 데이터 생성과 비슷하게 진행하면 된다.

**2. 코드로 데이터 수정하기**

Firestore는 `setDoc`, `update` 두 가지 함수로 데이터를 추가할 수 있다.

`setDoc`을 사용하는 방법은 위에 적혀있다.

### `update`

`setDoc`은 데이터를 덮어쓴다. 따라서 기존의 문서를 유지한 채 일부분의 데이터만 변경하고 싶어도 이전의 데이터를 모두 새로 입력해야 한다.

그러나 `update`는 기존의 데이터를 유지한 채 일부분의 데이터만 변경할 수 있다.

```jsx
import { updateDoc, doc } from "firebase/firestore";

await updateDoc(doc(db, "wiki", "new-id"), {
  description: "허먼밀러...200만원...",
});
```

위와 같이 코드를 작성하면 `new-id`라는 id를 가진 문서의 description만 변경된다.

---

### *참고 링크

- **[Firebase](https://firebase.google.com/docs?hl=ko)**
- [**프로토타입 프로젝트**](https://stfe.vercel.app/)
