

# FAST WIKI : 패캠 수강생을 위한 위키
## 📚프로젝트 소개
 **제작기간** : 2023.09.08 ~ 2023.09.22 
 <br>
 **제작인원** : 5명
 
- 패스트 캠퍼스 수강생을 위한 `편의 기능 제공`(QR, 줌 링크, 노션 링크 ..)
- `행정 처리 정보`(출석정정, 휴가 ..)를 수정 가능한 `위키 형태로 제공`
- 공지사항과 수강생의 랜덤 토크가 가능한 `갤러리 기능 제공`
- `랭킹 시스템`과 `등급제`로 수강생끼리의 학습을 촉진

<br>

## 👩‍💻팀원소개

| 심정아  | 이예인 | 장호진 | 정효주 | 최우혁 | 이재협 멘토님|
|--- | --- | --- | --- | --- | --- |
|[joanShim](https://github.com/joanShim)|[furaha707](https://github.com/furaha707) |[LeHiHo](https://github.com/LeHiHo)     |              [hhjs2](https://github.com/hhjs2) |[Taepoong](https://github.com/TaePoong719) | [LEEJAEHYUB](https://github.com/LEEJAEHYUB) |
| ![](https://user-images.githubusercontent.com/35457850/269966343-e033bed1-4e2f-4749-949b-e66214fa2db6.png) | ![](https://github.com/furaha707/crypto-tracker/assets/95595106/fe5fd1fb-f75d-450d-9788-71548061955f) | ![](https://avatars.githubusercontent.com/u/134940630?v=4) | ![](https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/c02c2b58-0aea-4617-861e-f590ee5f6d00) | ![](https://avatars.githubusercontent.com/u/98576512?v=4) | ![](https://avatars.githubusercontent.com/u/53159164?v=4) |
| `학습시간 기록`, `모달 컴포넌트 디자인 시안` | `갤러리 CRUD`, `에디터`, `카테고리 필터링`, `페이지네이션` | `메인페이지`, `캐러샐`, `최근게시물`, `랭킹페이지`, `다크모드` | `wiki page`, `댓글 CRUD`, `사이드바`, `wiki 반응형`, `마크다운 에디터`  | `배포`, `레이아웃 및 초기설정`, `헤더`, `회원가입/로그인` , `유저정보`, `등급 판별`  |`따스한 멘토링 및 코드리뷰`❤️   |

<br>

<div align=center>
  <a href="https://fastcampus-wiki.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/배포 링크-ed234b?style=for-the-badge&logoColor=white" alt="example"/>
  </a>
</div>

<br>

## 🎁기술 스택
<div align=center  > 
	<div> <b>✨Browser✨</b> </div>
	<div>  
			<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
		  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
		    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  </div>
  <br>
	<div> ✨<b>Library</b>✨ </div>
	<div>  
	    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
	    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
	    <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
	    <img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">
  </div>
    <br>
	<div> ✨<b>Deploy / Dev </b>✨</div>
	<div>  
		    <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=firebase&logoColor=white">
		  <img src="https://img.shields.io/badge/webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=white">
		  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=white">
  </div>
</div>

<br>

## 👤유저플로우
![image](https://github.com/TaePoong719/fastcampus-wiki/assets/98576512/1470f6e0-0cd7-447f-a808-637c89e6e34a)

<br>

## 🖼️라우터 구조
![image](https://github.com/TaePoong719/fastcampus-wiki/assets/98576512/b840308a-7db9-49e1-a32f-238e7841973b)

<br>

## ✨세부 기능 설명

### 1️⃣ 메인 홈 - 장호진

-   퀵링크(온라인강의, 노션, 줌, 슬랙, 스프레드시트)가 포함된 배너를 제작하여 react-slickd을 이용해 캐러셀을 구현
-   firebase에 저장된 studytime 상위 5명 표시
-   갤러리의 최신게시물 6개 표시
<br>

### 2️⃣ wiki 페이지 - 정효주
| 페이지별 화면 렌더링 | 회원 로그인 확인 |
|--|--|
| ![1](https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/a34059db-05af-4887-91db-b1808d26573e)| ![2](https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/284297ee-01ab-484f-a950-85ffb64c824b)|

 |마크다운 에디터  | 수정 후 작성자 시간 업데이트 |
|--|--|
| ![](https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/2937b9c0-5cea-4a33-94b4-4fd05ecb8f92)| ![](https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/357413a6-405d-4c8a-8358-cf94c0113b70)

-   페이지 별로 저장된 데이터를 Firebase로 불러와 화면에 보여짐
-   로그인 전 수정 시도 시 경고 알람창이 뜬 후 확인 버튼을 누르면 로그인 창으로 이동
-   마크다운 문법으로 수정한 후, firebase에 Update됨
-   글 수정시 수정한 사람, 수정한 날짜 Update

<br>

### 3️⃣댓글 기능 - 정효주
![https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/2a13692e-2b1e-4f0d-b893-265b2cd89b30](https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/2a13692e-2b1e-4f0d-b893-265b2cd89b30)
-   로그인 여부에 따라 댓글을 입력하면 firebase에 데이터를 등록
![3](https://github.com/TaePoong719/fastcampus-wiki/assets/102405617/8bca8f8d-b464-456d-ab40-89276f64c37c)
-   랭킹 페이지 유저의 등급 별로 Emblem 등급 다르게 표시 됨
-   firebase에서 실시간으로 데이터를 불러와 새로고침하지 않아도 작성한 댓글이 생성
-   자신이 작성한 댓글만 삭제와 수정 버튼이 보여 가능
<br>

 ### 4️⃣ 갤러리 - 이예인
- 공지 및 자유게시판의 용도의 갤러리 페이지 구현

|카테고리 필터링  | 페이징 (3x2) | 리스트 페이지 |
|--|--|--|
| ![](https://github.com/furaha707/crypto-tracker/assets/95595106/44a6b594-94a5-4356-811a-45b714a58e88) | ![](https://github.com/furaha707/crypto-tracker/assets/95595106/edda4115-ee0e-471a-bd84-dde5447a86d3)|![](https://github.com/furaha707/crypto-tracker/assets/95595106/97b834d2-5df6-49b3-8401-132c7f0e7655)|

- 게시글에 썸네일 지정, 이미지 및 텍스트 작성 및 수정 가능

| 상세페이지 | 새 게시글 등록 | 게시글 수정 |
| --- | --- | --- |
| ![](https://github.com/furaha707/crypto-tracker/assets/95595106/28633cec-bf3f-4820-a954-a1bdda3f534d) | ![](https://github.com/furaha707/crypto-tracker/assets/95595106/8e867c00-78d7-43c2-9ee3-785dd7fee43a) | ![](https://github.com/furaha707/crypto-tracker/assets/95595106/74b0bfb3-d2f8-456c-9b06-578fd536436d) |

<br>

### 5️⃣ 랭크 - 장호진
-   firebase에 저장된 유저의 공부시간을 순위별로 표시하고 댓글창 구현

<br>

### 6️⃣ 헤더, 사이드바 반응형 - 최우혁
| 데스크톱 | 모바일(로그인X) | 모바일(로그인O) |
|--|--|--|
|  ![](https://github.com/TaePoong719/LoL_Champion_Management/assets/98576512/f87ed840-d4da-4190-88c1-48ee610b9a3f)| ![](https://github.com/TaePoong719/LoL_Champion_Management/assets/98576512/fde2b995-1b54-41e6-a9eb-bb42e0ed815e) | ![](https://github.com/TaePoong719/LoL_Champion_Management/assets/98576512/25ccb66a-9a08-43b9-a114-621b7a4fc5c8) |

-   반응형 헤더 구현(별도의 모바일 헤더 컴포넌트)

![](https://github.com/TaePoong719/fastcampus-wiki/assets/98576512/8c3ca410-57b6-43cb-a5de-2c043dfb272d)

-   사이드바 반응형 애니메이션

<br>

### 7️⃣ 회원가입 / 로그인 - 최우혁

| 회원가입/로그인 | 예외처리 |
|--|--|
| ![](https://github.com/TaePoong719/LoL_Champion_Management/assets/98576512/d77839c7-42cf-429a-bc9a-86689fa938dd) | ![](https://github.com/TaePoong719/fastcampus-wiki/assets/98576512/04df1c85-5d98-4b0d-91c4-631fc3922aec) |

-   Firebase Authentication을 이용하여 유저 정보를 관리
-   Firebase Firestore 유저 컬렉션으로 프로필 사진과, 공부시간, 등급 등의 정보를 가져 동료들의 작업을 원활히 도움
-   유저의 편의성을 위해, 로그인 후 자동으로 진입 전 페이지로 돌아감(회원가입 페이지는 제외)
-   로그인, 회원가입 에러 예외처리

<br>

### 8️⃣ 학습시간 기록 - 심정아
| 초기 화면 | 학습시간 기록 시작 | 모달 off |
|--|--|--|
|![](https://user-images.githubusercontent.com/35457850/269947781-3633fd48-bb7e-4b82-9782-4b73085ff704.png)  | ![](https://user-images.githubusercontent.com/35457850/269936646-ddd7f7ba-1977-4789-8243-64ddf940a1bf.png) | ![](https://user-images.githubusercontent.com/35457850/269949144-8eb5eb19-07f0-4e83-b893-fadda48e4d8b.png) |

학습시간의 측정을 위해서 공부 시작과 종료를 측정하고 누적 공부시간을 Firebase firestore에 저장

1.  header의 학습기록 버튼 생성
2.  로그인 상태에서 학습기록 버튼을 누르면 나타나는 Modal에서 학습 기록을 시작
    1.  Modal을 닫아도 기록 상태 유지
    2.  학습 기록 시작 시 header에서 기록 중 표시
3.  Modal 내 현재시각, 현재까지의 학습시간이 표시
4.  공부 중일 경우 `기록중` 배지 표시
5.  공부 종료 시 계산 된 학습시간은 분단위로 올림되어 firestore에 저장

<br>

### 9️⃣ 유저정보 - 최우혁
| 데스크톱 | 모바일 | 사진 편집 |
|--|--|--|
| ![](https://github.com/TaePoong719/fastcampus-wiki/assets/98576512/ec22eafc-7aee-4c1e-a838-e120460f3801)|![](https://github.com/TaePoong719/LoL_Champion_Management/assets/98576512/25ccb66a-9a08-43b9-a114-621b7a4fc5c8)| ![](https://github.com/TaePoong719/LoL_Champion_Management/assets/98576512/ae51bf96-80a4-4310-a352-6c3986a26448) |
-   사진 편집 기능 : 편집 버튼을 누르면 파일 입출력이 나오고, `사진 저장` 버튼으로 바뀝니다
-   반응형에 따른 조건부 렌더링

<br>

### 🔟 등급 판별 - 최우혁

![](https://github.com/TaePoong719/LoL_Champion_Management/assets/98576512/2cd6fa07-a2d0-45b5-ab29-f37040de00ac)

-   학습시간 기록과 로그인 시에 localStorage와 firestore의 등급을 갱신
-   데이터베이스의 사용을 줄이기 위하여 localStorage를 사용
-   등급 변경 시 Alert 창을 통하여 유저에게 알림
-   여러 컴포넌트에서 사용하는 로직을 한 함수, 한 기능 원칙을 통해 간결하게 정리
<br>

### 1️⃣1️⃣ 다크모드 - 장호진

모든 요소를 전역적으로 관리하는 다크모드

<br>

### [기술문서 보러가기](/22a666a904a741b488dc774966abe344?pvs=25)
