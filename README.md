# WIKI

![Logo](https://github.com/energizer-develop/Y_FE_WIKI/assets/81469686/e408911e-d4c6-43e5-8260-744781fceb7b)

> 직원들을 위한 WIKI 서비스 <br>
> 개발기간: 2022.09.11 ~ 2022.09.22

**[WIKI 바로 가기](https://energizer-wiki.vercel.app)**

**[WIKI repositories 바로가기](https://github.com/energizer-develop/Y_FE_WIKI)**

<br>

# 🔖 프로젝트 소개

WIKI는 사내 업무 효율성을 극대화하는 종합적인 서비스입니다.

직원들의 업무 시간 체크, 이미지 및 캐러셀을 통한 회사 공지 제공, 개인 캘린더 관리 등 다양한 기능을 통해 원활한 커뮤니케이션과 정보 공유를 지원합니다.

<br>

# 💻 기능 소개

### Main

![main](https://github.com/energizer-develop/Y_FE_WIKI/assets/81469686/e62b2fe5-b971-47a3-97c6-de1912facdcc)

메인 페이지의 캐러셀 기능을 react-slick 라이브러리를 사용하여 구현하였습니다. 다양한 커스터마이징을 통해 동적인 캐러셀을 만들었습니다.<br>
react-lottie 라이브러리를 사용해 로티 애니메이션을 만들었고, 사용자에게 조금 더 다양한 경험을 하게 해줄 수 있었습니다.<br>
date-fns를 통한 업무 기록 리스트 렌더링에서도 사용자가 자신이 언제 통근 했는지 수치적으로 더 알기 쉽게 만들었습니다

<br>

### Modal

![commute](https://github.com/energizer-develop/Y_FE_WIKI/assets/81469686/74be0d75-3130-4f25-af83-cc2d47fccae0)
타이머 모달을 통해 현재 시간을 출력, 업무 시간 측정, 휴게시간 (정지) 기능을 구현하였습니다<br>
업무 시간은 database에 저장 후 메인 페이지에서 출력합니다

<br>

### Wiki

![wiki](https://github.com/energizer-develop/Y_FE_WIKI/assets/81469686/9834f001-653b-4200-b2ad-7db5fe9b3a04)

선택한 카테고리에 대해 새롭게 글을 등록하거나, 등록된 글을 수정/삭제할 수 있는 기능을 구현하였습니다.<br>
@uiw/react-md-editor 패키지를 사용해서 작성한 텍스트를 마크다운 양식으로 보여줄 수 있게 구현하였습니다.<br>
페이지 내 네비게이션 바와 컨텐츠 영역의 크기를 해상도에 따라 분기해 반응형 웹 구현을 진행하였습니다.

<br>

### Gallery

![gallery](https://github.com/energizer-develop/Y_FE_WIKI/assets/81469686/c3e9fdb6-eccb-425b-9bc2-c400cf70c900)

갤러리 페이지에서 파이어베이스를 사용하여 시간 순으로 사진을 등록/삭제 할 수 있도록 구현하였고, 카테고리 별로 필터링하여 해당 사진들만 보여줍니다. <br>
사진을 업로드할 수 있는 모달창을 구현하였고, 파일 업로드시 선택한 사진의 프리뷰를 미리 볼 수 있습니다.<br>
반응형을 구현하여 기기별로 사용자가 이용하기 편리하게 작업하였습니다.

<br>

### Calendar

![calendar](https://github.com/energizer-develop/Y_FE_WIKI/assets/81469686/aabc4d1c-27bd-4a60-9d5d-c9e61591e503)

fullCalendar 라이브러리를 사용하여 개인 캘린더를 구현하였습니다<br>
모달창을 통해 일정 등록이 가능하며 일정 확인과 일정 삭제는 sweetalert를 통해 구현하였습니다<br>
모든 일정은 database에 저장됩니다

<br>

### Login

<img width="422" alt="image" src="https://github.com/energizer-develop/Y_FE_WIKI/assets/81469686/17503d00-96cd-406d-816f-2e2d869f5477">
<br>
구글 로그인 기능을 도입하였고 로그인 여부에 따라 페이지 접근 권한을 분기 처리 하였습니다

(백오피스이므로 로그인을 하지 않으면 모든 페이지 접근 불가합니다)

<br>
<br>

# 🔨기술 스택

|            | Stack                                                                                                                                                                                                                                                                                                                      |
| :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    언어    | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">                                                                                                                                                                                                             |
|   디자인   | <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">                                                                                                                                                                                                                       |
|    서버    | <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">                                                                                                                                                                                                                 |
| 라이브러리 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">                                                                                           |
|   협업툴   | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">                                                                                                                    |
| 개발 환경  | <img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> |

<br>

# 📘Convention

- [개발 Convention](https://quickest-asterisk-75d.notion.site/4a1661d464a44816b62c08b23fbe4a7e?pvs=4)
- [작업플로우 및 브랜치 전략](https://quickest-asterisk-75d.notion.site/Workflow-Branch-0a654a96d0b443d495352250dbaff189?pvs=4)
- [커밋 Convention](https://quickest-asterisk-75d.notion.site/Commit-Convention-17a71a2480644014809d46becb8cbe35?pvs=4)
- [이슈 라벨 Convention](https://quickest-asterisk-75d.notion.site/Issue-label-7fd9b28e99874534904b68d41409bb7b?pvs=4)
- [코드 리뷰](https://quickest-asterisk-75d.notion.site/Code-review-deb0a14b3d754b28a026b164f8ae5598?pvs=4)
- [업무 공유](https://quickest-asterisk-75d.notion.site/6c91076758cc4fc4a697f16d31f590a5?pvs=4)

- <span style="color:yellow">디렉토리 구조</span>

```
.github
├── CODEOWNERS
├── PULL_REQUEST_TEMPLATE.md
└── ISSUE_TEMPLATE
    └── docs.md
    └── feat.md
    ...
public
└── images
src
├── apis
├── assets
│	  └── lottieJSON
      └── icons
├── components
│	  └── [componentsName]
│	           └── index.tsx
├── constants
├── hooks
├── pages
│   └── [PageName]
└── styles
│		└── GlobalStyle.tsx
├── types
└── _app.tsx
└── index.tsx
...
```

<br>

# 🙋‍♀️Contributors

|                                                                                           <img src="https://avatars.githubusercontent.com/u/81469686?v=4" width="150px" />                                                                                            |              <img src="https://avatars.githubusercontent.com/u/38286505?v=4" width="150px" />               |                    <img src="https://avatars.githubusercontent.com/u/83440978?v=4" width="150px" />                     |     <img src="https://avatars.githubusercontent.com/u/62874043?v=4" width="150px" />      |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
|                                                                                                               FE: [박가현](https://github.com/gahyuun)                                                                                                                |                                FE: [최재훈](https://github.com/zoeyourlife)                                 |                                      FE: [장수빈](https://github.com/wkdtnqls0506)                                      |                       FE: [남현준](https://github.com/applevalley)                        |
| -모달<br>-live clock 출력<br>-업무 시간 기록<br> -휴게시간(정지) 구현<br>-로그인 페이지<br>-소셜 로그인 구현<br> -페이지 접근 권한 <br>분기처리<br>-캘린더 페이지<br>-일정 CRD 구현<br> -헤더 구현<br>-wiki 로딩 로직 구현<br>-gallery로딩 로직 구현 <br>-반응형 구현 | -메인페이지<br>-캐러셀 기능<br>-작성 시간 계산<br>-404 페이지 구현 <br>-로딩애니메이션 구현<br>-반응형 구현 | - 갤러리 페이지<br>-사진 CRD 작업<br>-업로드 모달 구현 <br> -카테고리 별 필터링<br>-로딩애니메이션 구현<br>-반응형 구현 | -위키 페이지<br>- 위키 CRUD 작업<br>-카테고리 별 필터링<br>-마크다운 구현<br>-반응형 구현 |

<br/>

<br>

# 🤲느낀 점

### 가현

- 타이머, 캘린더 등 평소에 도전해보지 않은 기능들을 구현하게 되었고 이 과정을 통해 많은 것을 배워갔습니다. 이미지를 처리하는 과정이 다소 느려 아쉬움이 남고 추후에 기회가 된다면 이 부분에 대해 개선해보고 싶습니다.

### 수빈

- 처음으로 진행해보는 팀 프로젝트였는데 좋은 팀원분들을 만나 깃허브를 사용하여 협업을 어떤 식으로 진행해야 하는지 알게 되었고, 꼼꼼한 코드 리뷰 덕분에 많이 배워갑니다! 🙇🏻‍♀️👏🏻👍

### 재훈

- 맡은 기능들을 구현하면서, 라이브러리를 사용하지 않고 직접 구현해보고 싶은 욕구가 생겼고, 저희 팀의 프로젝트 진행과정이 상당히 좋았고, 팀원분들과 같이 소통을 하면서 컨벤션을 제대로 지켜가며 잘 마무리된 프로젝트여서 추후 더 열심히 할 계기가 됐습니다. !

### 현준

- 프로젝트를 진행하며 기본적인 내용부터 상황에 따라 어떻게 기능을 구현하는 것이 좋은지 등에 대해 많이 배울 수 있었습니다! 항상 부족한 코드였음에도 매번 꼼꼼하게 코드 리뷰 진행해주시고, 더 좋은 방향으로 개선할 수 있게 도와주셔서 감사드립니다!!

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
import { getFirestore } from 'firebase/firestore';

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
import { updateDoc, doc } from 'firebase/firestore';

await updateDoc(doc(db, 'wiki', 'new-id'), {
  description: '허먼밀러...200만원...',
});
```

위와 같이 코드를 작성하면 `new-id`라는 id를 가진 문서의 description만 변경된다.

---

### \*참고 링크

- **[Firebase](https://firebase.google.com/docs?hl=ko)**
- [**프로토타입 프로젝트**](https://stfe.vercel.app/)
