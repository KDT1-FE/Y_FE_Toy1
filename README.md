# :sparkles: Wikinity :sparkles:

패스트캠퍼스 프론트엔트 부트캠프 1차 토이프로젝트

## :clap: Contributors

<table>
    <tr>
        <td align="center"><img alt="avatar" src="https://github.com/wowba.png" width="100"></td>
        <td align="center"><img alt="avatar" src="https://github.com/moana16.png" width="100"></td>
        <td align="center"><img alt="avatar" src="https://github.com/JiHongkyu.png" width="100"></td>
        <td align="center"><img alt="avatar" src="https://github.com/jinjoo-jung.png" width="100"></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/wowba">이영욱</a></td>
        <td align="center"><a href="https://github.com/moana16">김지민</a></td>
        <td align="center"><a href="https://github.com/JiHongkyu">지홍규</a></td>
        <td align="center"><a href="https://github.com/jinjoo-jung">정진주</a></td>
    </tr>
</table>

## :computer: 커밋 컨벤션

| 명칭     | 의미                                   |
| -------- | -------------------------------------- |
| Feat     | 새로운 기능 추가                       |
| Fix      | 버그 수정                              |
| Docs     | 문서 수정                              |
| Style    | 코드 포맷팅, 세미콜론 누락             |
| Refactor | 코드 리팩토링                          |
| Test     | 테스트 코드, 리팩토링 테스트 코드 추가 |
| Chore    | 빌드 업무 수정, 패키지 매니저 수정     |

## :file_folder: 폴더 구조

```
📦
├─ public - static 파일
├─ src
│  ├─ assets - 이미지
│  ├─ components - 공통 컴포넌트 (nav, sidebar...)
│  ├─ pages - 페이지별 컴포넌트
│  │  └─ MainPage
│  │  └─ ...
│  ├─ recoil - 상태관리 파일 폴더
│  │  ├─ atoms
│  │  └─ selectors
│  ├─ styled - styled-components (CSS)
│  ├─ types - TS interface, type 등 타입 관련
│  └─ utils - 공통 함수
└─ ©generated by Project Tree Generator

```

## :hammer: Stack

<p align="left">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Html-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/recoil-007AF4?style=for-the-badge&logo=recoil&logoColor=black"/>
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Eslint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge"/>
</p>

## UserFlow

<p align="left">
  <img src="https://github.com/wowba/Wikinity/assets/87873821/d03cd6fe-245e-4918-876a-dab3d44cfbad" />
</p>

## Git Branches

- main: 배포용 브랜치
- feature: 개별 개발용 브랜치

## 개인별 작업 내역

<details>
<summary>이영욱</summary>

## 개발환경 설정

- Firebase 프로젝트 생성 및 FireStore(DB), Storage, Auth 설정.
- Github을 이용한 CI 및 Github Action, Firebase Hosting을 연계하여 CD 설정.

## private, public router 설정

- Route의 중첩 라우팅을 이용하여 publicRoute, PrivateRoute 컴포넌트를 생성하여
  로그인 여부에 따라 각 페이지별 접근 권한 판단할 수 있는 기능 추가.

|                                     로그인 시 publicRouter 이동 방지                                     |                                   로그아웃 시 privateRouter 이동 방지                                   |
| :------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| ![privateRouter](https://github.com/wowba/Wikinity/assets/87873821/972183ef-3738-425c-9506-dc4d7b1d0ed6) | ![publicRouter](https://github.com/wowba/Wikinity/assets/87873821/47618172-79df-4404-bfd2-3adaf381df6e) |

## 로그인 / 회원가입 페이지

- Firebase의 Auth 기능을 이용하여 로그인 기능 구현.
- Recoil을 이용하여 userState, isLoginState를 각각 생성하여
  router에서 로그인 판단 여부 및 유저 정보 저장.

|                        로그인 실패시 시각적으로 확인할 수 있는 애니메이션                        |                            회원가입 중 잘못된 정보 기입시 alert 및 애니메이션                            |
| :----------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| ![login](https://github.com/wowba/Wikinity/assets/87873821/21125cc7-c506-44a8-8028-b65986ae46e5) | ![createAccount](https://github.com/wowba/Wikinity/assets/87873821/3e2368fb-d6b0-4067-aaf1-a996143e5471) |

## NavBar 공통 컴포넌트 작성 / 유저 프로필 모달

- 여러 페이지로 이동할 수 있는 링크 및 모달 이미지를 가진 상단 NavBar 컴포넌트 작성
- 유저 정보 확인 및 수정할 수 있는 ProfileModal 컴포넌트 작성
  - 로그아웃 시 유저 관련 state 초기화 및 publicRouter로 이동

|                                              NavBar                                               |                                              Profile Modal                                              |
| :-----------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| ![navBar](https://github.com/wowba/Wikinity/assets/87873821/4865c26e-2e1f-432a-a2e3-f9847bcbc84a) | ![profileModal](https://github.com/wowba/Wikinity/assets/87873821/67e6dc77-3ad1-4f6a-95e4-9d4375d4c292) |

## Firebase Auth / Recoil 이슈

Firebase의 Auth를 이용해 유저 로그인 정보를 받아올 시, Recoil을 이용해 해당 정보를 저장할 때
Auth에서 받아온 로그인 정보가 불변 객체가 되어 후에 로그아웃시 에러가 발생하는 이슈가 있었다.
검색해보니 해당 이슈는 상태관리 라이브러리 중 Recoil만 있는 듯 하였다.

이를 해결하기 위해 받아온 유저 정보를 그대로 저장하는 것이 아닌,
객체를 변경 가능하도록 깊은 복사하여 새로 생성한 뒤 저장하도록 하였다.
Recoil에 저장하기 전, 받아온 유저 정보 객체를 깊은복사를 한 뒤 State에 저장하여
후에 Firebase에서 해당 정보에 접근하여 정보를 수정할 수 있도록 변경했다.

```javascript
signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
  // Signed in
  const { user } = userCredential;
  const userId = userCredential.user.uid;
  const docRef = doc(db, 'user', userId);
  const docSnap = await getDoc(docRef);
  const userCopy = JSON.parse(JSON.stringify(user)); // 깊은복사 후 state 저장
  setUserState({
    userCredential: userCopy,
    userData: docSnap.data()
  });
  setLoginState(true);
  navigate('/');
});
```

## 후기

- 처음으로 Firebase를 이용하여 개발 환경설정 및 기능구현을 진행하였는데, 토이 프로젝트로 사용하기에 매우 적합한 서비스를 경험해볼 수 있어서 좋았다.
- 프론트엔드 프로젝트는 처음 협업을 해 보았는데, 코딩을 시작하기 전 UserFlow를 통해 페이지 및 사용될 컴포넌트 까지 사전에 대략적으로 구분해 놓으면 추후에 진행할 때 크게 도움이 될 것이다.
- 개발하기에 급급해 공통된 컴포넌트 및 로직을 추상화 하는데 소흘하였다. 추후에는 화면 내 구조를 구상할 때 공통으로 사용될 컴포넌트들을 먼저 추상화 한 뒤,  
  다른 구체적인 컴포넌트를 생각해 보아야 겠다.
- 코드리뷰를 진행하지 않고 화면상으로만 리뷰를 진행했는데, 다음에는 적극적인 코드리뷰를 통해 더 좋은 코드를 작성하도록 노력해야겠다.

</details>

<details>
<summary>김지민</summary>

## :key: Wiki 페이지 주요 기능

|                                           글 작성하기                                            |                                           글 수정하기                                           |
| :----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| ![write](https://github.com/wowba/Wikinity/assets/65649035/1c8795f8-dabb-4f13-b874-7dc057578a15) | ![edit](https://github.com/wowba/Wikinity/assets/65649035/35f2ef39-bb2c-4c30-9a8b-691f0643642e) |
|              Markdown Editor를 이용해 글 작성 가능,<br/> 실제 firestore에 업로드됨               |             Markdown Editor를 이용해 글 수정 가능, <br/>firestore 데이터도 수정 됨              |

<br/>

|                                              글 삭제하기                                              |                                           제목으로 검색하기                                           |
| :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| ![delete (1)](https://github.com/wowba/Wikinity/assets/65649035/2f534f86-303c-4c3d-97b3-1ac21341c6bd) | ![search (2)](https://github.com/wowba/Wikinity/assets/65649035/6117b23c-8c51-4e3c-b71f-8889c433e9b3) |
|                     삭제 버튼 누르면 글 삭제가능<br/> 실제 firestore에서도 삭제됨                     |                                      제목을 이용한 글 찾기 가능                                       |

<br/>

|                                      카테고리 별 글 목록 변경                                       |                                            카테고리 추가                                            |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| ![category](https://github.com/wowba/Wikinity/assets/65649035/ebc4d08b-b4b7-4ea1-9635-ca3a8a2e24e0) | ![cate_add](https://github.com/wowba/Wikinity/assets/65649035/ad8fe207-d9d6-4308-a30a-2e3520d7c420) |
|                   카테고리 별 선택된 카테고리에 해당하는 목록 보여주는 기능 구현                    |                                     카테고리 명 추가 기능 구현                                      |

<br/>

## :key: Main 페이지 모달 주요 기능

|                                                           출퇴근 모달                                                            |                                                 투두리스트 모달                                                 |
| :------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
|                ![commute](https://github.com/wowba/Wikinity/assets/65649035/15793d0b-e56d-45d3-b8fd-24cf2a5f3ae9)                |         ![todo](https://github.com/wowba/Wikinity/assets/65649035/3e84563a-86a8-4248-b423-e1165fc33010)         |
| 출퇴근 버튼으로 출근 시간 측정하는 모달 구현, <br/>Recoil의 state를 사용해 모달을 종료하고 다시 들어가도 출근 시간 기록하게 구현 | 투두 기능 구현, <br/>Recoil로 구현하여 투두 모달을 종료하고 다시 들어가도 투두 리스트 상태가 변경되지 않게 구현 |

<br/>

## 느낀점

React 초보라 상태 관리 라이브러리나 관련된 툴을 사용해 본적이 없었는데 이번에 Recoil을 사용해 보았다.
처음에는 잘 이해가 가지않아 코드를 짜는데 어려움을 겪었는데 시간이 지날수록 오히려 Recoil을 사용해 관리하는게 코드 가독성이 높아지고
여러모로 재사용할 수 있어서 좋았다. 다른 상태관리 라이브러리도 사용해 볼 수 있겠다는 자신감이 생겼다.
또한, firebase에서 auth기능이나 storage는 사용해 보았지만 firestore기능은 처음 사용해 보았는데
생각보다 접근성이 좋고 이렇게 간단한 데이터를 다루는데 사용이 편리하여서 좋았다
아쉬운 점은 firestore에서 addDoc을 하면 아이디가 자동으로 생성이 되는데 인덱스 값이 아닌 랜덤형식의 string값으로 배정이 되어
더 복잡한 테이블을 구성하기가 어려웠다는 점이다.
하지만 협업을 진행하면서 다양한 코드도 접하게 되고 또한 개발 관련해 시야가 넓어진 것 같아서 좋은 경험으로 남을 것 같다

</details>

<details>
<summary>지홍규</summary>

## Notice페이지 주요 기능

|                                                                              **공지 등록하기**                                                                               |                                              **공지 수정하기**                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------- |
|                                     ![공지등록](https://github.com/wowba/Wikinity/assets/121606131/0af8eb54-203f-41fb-8a63-a0a2e66a1329)                                     |    ![공지수정](https://github.com/wowba/Wikinity/assets/121606131/7b11a338-39bd-438b-aad8-791691620189)     | ![ezgif-4-c21991c473](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/5ef7c8a8-4d4d-49c9-a4e0-18421f6836c5) |
| 📌 공지 등록 시 firestore에 데이터 저장 <br> 📌 공백문자 submit 방어코드 <br> 📌 firebase Storage에 이미지 저장 <br> (uuid로 storage에 저장 시 이미지 이름 중복 안도록 구현) |            📌 등록할 때 저장한 비밀번호 검사 <br>📌 공지 수정 시 firestore에 저장된 데이터 수정             |
|                                                                             **공지 상세페이지**                                                                              |                                              **공지 삭제하기**                                              |
|                                     ![공지상세](https://github.com/wowba/Wikinity/assets/121606131/c2c08eaf-b72c-4e1f-971b-9a45cbc0dcca)                                     |    ![공지삭제](https://github.com/wowba/Wikinity/assets/121606131/b0abceb8-50cb-46dc-9e08-c48c4f22c017)     |
|                                                                 📌 해당 공지 클릭 시 공지 상세페이지로 이동                                                                  |            📌 등록할 때 저장한 비밀번호 검사 <br> 📌 공지 삭제 시 firestore에 저장된 데이터 삭제            |
|                                                                              **공지 검색하기**                                                                               |                                              **페이지네이션**                                               |
|                                     ![공지검색](https://github.com/wowba/Wikinity/assets/121606131/6aa3afc2-f855-4cec-923a-1b070d69684a)                                     |  ![페이지네이션](https://github.com/wowba/Wikinity/assets/121606131/abfe4f35-f6ab-43cc-b668-9474f9622b19)   |
|                                     📌 Enter키 or 검색하기 버튼 클릭 시 검색 동작 <br> 📌 검색어와 일치하는 공지 없다면 명시적으로 표시                                      | 📌 페이지버튼 클릭 시 페이지에 해당하는 공지 보여주기 <br>📌 이전 or 다음 버튼 클릭 시 페이지 넘어가게 구현 |

**Carousel**

![캐러셀](https://github.com/wowba/Wikinity/assets/121606131/827ce579-c651-4a33-aac3-89329537259c)
📌 캐러셀 클릭 시 해당 공지 상세페이지로 이동

## 느낀점

- 구현은 어렵지 않았지만 TypeScript나 ESLint가 너무 까다로워서 진을 뺏던 것 같다. 그러나 이러한 도구들을 사용하면서 확실히 코드의 품질이 향상되는 것을 느낄 수 있었다.

- Firebase를 처음 사용해봤는데, 정말 간편하게 백엔드 서비스를 구축할 수 있어서 놀랐다. 앞으로 혼자 프로젝트를 진행할 때 Firebase를 애용할 것 같다.

- 이번 프로젝트가 처음 해보는 협업 프로젝트였는데 혼자 프로젝트를 진행할 때보다 신경써야할 게 훨씬 많다는 것을 깨달았다.<br>
  그래도 이번 프로젝트를 통해 어떻게 협업을 진행해야하는지 어느정도 감이 잡힌 것 같다.<br>

- 아쉬운 점이 있다면, 코드리뷰를 해보지 못한 것이다. 코드리뷰를 통해 피드백을 주고 받으면서 코드 품질을 높일 수 있었을 텐데 못해본 것이 너무 아쉽다. 다음 프로젝트에서는 꼭 코드리뷰 해보고싶다.

</details>

<details>
<summary>정진주</summary>

## ProjectPage 주요 기능

|프로젝트 리스트 페이지|프로젝트 작성 페이지|
|:--:|:--:|
|<img width="1512" alt="스크린샷 2023-09-22 오후 3 52 34" src="https://github.com/wowba/Wikinity/assets/85981963/42649bf5-ba4d-4100-a530-bfdec1b2d2e8">|<img width="1512" alt="스크린샷 2023-09-22 오후 3 52 42" src="https://github.com/wowba/Wikinity/assets/85981963/b575a560-a2e7-4e81-abb2-be91954e4832">|
|프로젝트의 리스트 들<br/>미리보기에는 주제, 마감일, 인원 표시|팀명, 프로젝트 주제, 프로젝트 설명,<br/> 프로젝트 마감일, 참여인원을 작성할 수 있는 페이지 , <br/>상단의 진행중/완료를 클릭을 통해서 변경 가능|

|프로젝트 상세 글 페이지 |프로젝트 수정 페이지 |
|:--:|:--:|
|<img width="1512" alt="스크린샷 2023-09-22 오후 3 53 08" src="https://github.com/wowba/Wikinity/assets/85981963/3353d31a-0cf3-4ea1-9290-c90053cbf3cb">|<img width="1512" alt="스크린샷 2023-09-22 오후 3 53 16" src="https://github.com/wowba/Wikinity/assets/85981963/5d5e6fce-aca3-463f-9f78-75ee0f519175">|
|작성한 프로젝트 상세 페이지 | 수정 페이지를 통해 글 수정 가능, <br/> 진행중/완료 변경 가능|

## 진행중/ 완료 표시

<img width="248" alt="스크린샷 2023-09-22 오후 2 35 46" src="https://github.com/wowba/Wikinity/assets/85981963/0da589b0-2ecc-4d3b-9c7f-e418cce8a61f">
<img width="246" alt="스크린샷 2023-09-22 오후 3 22 06" src="https://github.com/wowba/Wikinity/assets/85981963/d4077873-c0eb-4217-b6ae-71703f26986b">

- firestore에서도 project 컬렉션을 통해 데이터 crud가 가능하도록 구현하였다.

## 캘린더 기능

- react-calendar 라이브러리를 이용한 캘린더
- styled-component를 통해 디자인 변경
  <img width="1435" alt="스크린샷 2023-09-22 오후 3 50 32" src="https://github.com/wowba/Wikinity/assets/85981963/a9256821-2287-4b46-a85f-785fdd029b99">

## 구현 영상:

- 프로젝트 페이지 crud 구현 영상
  https://github.com/wowba/Wikinity/assets/85981963/278d563d-8732-4b0e-b681-061d5af902c5

### 아쉬운 점 & 배운점

- react와 typescript를 사용하여 만든 첫 토이프로젝트였기 때문에 react+ts의 문법을 익히는데 시간이 오래걸렸던 것 같아 아쉬웠다.
- 또한 상태관리를 위한 recoil을 처음 접했어서 더 공부한 뒤에 잘 사용하고 싶다.
- firebase를 처음 사용해봤지만 문서나 블로그를 보며 사용했는데 생각보다 접근성이 좋고 익숙해지는데 얼마 걸리지 않아
  사용하기 편리하다고 느꼈다.

</details>

## CRA - typescript && libraries

- npx create-react-app <프로젝트 명 or ./ > --template typescript
- npm install recoil styled-components react-router-dom
- prettier & eslint setting

## Firebase setting

0. firebase 프로젝트 생성 및 앱 등록
1. curl -sL https://firebase.tools | bash (firebase mac설치)
2. npm install firebase
3. firebase login
4. firebase init (storage, hosting, firestore)
