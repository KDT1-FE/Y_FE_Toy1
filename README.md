# 직원들을 위한 위키 사이트

<br>

## 💁 프로젝트 정보

> **회사 공지와 이미지들을 쉽게 수정하고 확인할 수 있고, <br>
> 출퇴근 시간을 확인할 수 있는 직원들을 위한 위키 사이트 입니다.** <br>
> 개발기간: 2023.09.15 ~ 2023.09.22
> <br>

<br>

## 🌐 배포 주소

> 배포 주소: 추가 예정
> <br>

<br>

## 🚖 개발 팀 소개

|                           이용훈                           |                           이승연                           |                          양재준                           |                           김소정                           |                          서지수                           |
| :--------------------------------------------------------: | :--------------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------------: | :-------------------------------------------------------: |
|             [@2YH02](https://github.com/2YH02)             |          [@ewinkite](https://github.com/ewinkite)          |       [@yangjaejun](https://github.com/yangjaejun)        |              [@KSJT](https://github.com/KSJT)              |         [@jseo9732](https://github.com/jseo9732)          |
| ![](https://avatars.githubusercontent.com/u/125336070?v=4) | ![](https://avatars.githubusercontent.com/u/139189610?v=4) | ![](https://avatars.githubusercontent.com/u/79828541?v=4) | ![](https://avatars.githubusercontent.com/u/118329943?v=4) | ![](https://avatars.githubusercontent.com/u/79249376?v=4) |
|              갤러리 페이지 CRUD 및 세부 기능               |  로그인 페이지 로그인, 회원가입 기능 및 유저 플로우 작성   |               WIKI 페이지 CRUD 및 세부 기능               |         메인 페이지 이미지, WIKI 연동 및 세부 기능         |            메인 페이지 출퇴근 기록 및 세부기능            |

<br>

## 💻 개발 스택

### 🌙 환경

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### 🌙 개발

<img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

### 🌙 소통

<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<br>
<br>

## 💡 User Flow
![230921_WIKI_userflow](https://github.com/toy-1/wiki/assets/139189610/c02df72b-32d0-4865-ab16-e7fd9a200576)

<br>

## 🗂 디렉토리 구조

```
📦 public
📦 src                             
 ┣📦 components        공통 또는 페이지별로 활용되는 컴포넌트가 포함된 폴더입니다.
 ┃ ┣ 📦 common
 ┃ ┣ 📦 gallery
 ┃ ┣ 📦 home
 ┃ ┣ 📦 login
 ┃ ┣ 📦 wiki
 ┃ ┣ 📦 styles
 ┃ ┣ 📦 utils
 ┣📦 db/wiki                             
 ┣📦 pages              Router를 사용하여 이동할 큰 단위의 컴포넌트가 포함된 폴더입니다.  
 ┃ ┣ 📦 gallery
 ┃ ┣ 📦 home
 ┃ ┣ 📦 login
 ┃ ┣ 📦 wiki
 ┃ ┣ 📦 styles
 ┃ ┣ 📦 utils
 ┣📜 App.tsx
 ┣📜 AppRouter.tsx
 ┣📜 main.tsx
 ...
```

<br/>
<br/>

## 🤝 협업 방식
커밋 컨벤션, 코딩 컨벤션, 깃허브 규칙 등의 내용은 아래의 노션 페이지를 참고해주세요! </br>
 
 ### [🔗 노션 페이지](https://www.notion.so/2a7d2563e69f48ae93f71c4f4e382e45?pvs=4) </br>

<br/>
<br/>


## 🛠️ 주요기능

### ⭐ 출퇴근 기록

- 출근 시간과 퇴근 시간을 기록할 수 있고 헤더에 출근 경과시간이 표시됩니다.

### ⭐ 메인페이지 와 WIKI, Gallery 페이지 연동

- 메인 페이지에서 WIKI에 있는 중요한 공지사항을 슬라이드로 보여줍니다.
- 메인 페이지에서 Gallery 페이지에 등록된 최신 사진 3개를 가져와 보여줍니다.

### ⭐ 회원가입, 로그인 기능 및 인증

- 회원가입과 로그인이 가능합니다.
- 인증이 안된 유저가 다른 페이지로 접근할 시 로그인 페이지로 이동됩니다.

### ⭐ WIKI 페이지 게시물 CRUD

- WIKI 페이지에서 게시물을 CRUD 할 수 있습니다.

### ⭐ Gallery 페이지 게시물 CRUD

- Gallery 페이지에서 게시물을 CRUD 할 수 있습니다.
  <br>

  <br>


## 🔍 팀원별 세부 구현 사항

<details>
<summary style="font-size: 18px">이용훈: 📷 갤러리 페이지</summary>
<div markdown="1">

### 1. 카테고리 추가

#### 앨범 상위 카테고리 추가

![카테고리등록](https://github.com/toy-1/wiki/assets/125336070/41b35c67-9a33-42c8-8acd-368f4671acad)

```
💡 카테고리 편집에서 원하는 앨범 카테고리를 만들 수 있습니다.
카테고리를 생성하면 파이어베이스 데이터베이스에 생성 날짜와 고유한 ID 값을 가지고 저장이 됩니다.
```

### 2. 앨범 추가

#### 이미지들을 저장할 앨범 카테고리(폴더) 생성

![앨범등록](https://github.com/toy-1/wiki/assets/125336070/6efde1b1-d80a-4280-a531-b248e9eaa4da)

```
💡 카테고리 편집에서 원하는 앨범을 만들 수 있습니다. 앨범을 생성하면
파이어베이스 데이터베이스에 생성 날짜, 상위 카테고리 ID, ID 값을 가지고 저장이 됩니다.
```

### 3. 이미지 추가

#### 앨범 폴더 내부에 이미지 추가

![이미지등록](https://github.com/toy-1/wiki/assets/125336070/c82f42d6-f986-4eed-8221-1329e90f7e7e)

```
💡 원하는 앨범 카테고리에 원하는 이미지를 추가합니다.
추가 시 파이어베이스 스토리지에 해당 앨범의 ID 값을 이름으로 하는 폴더에 저장됩니다.
```

### 4. 이미지 삭제

#### 앨범 폴더 내부에 이미지 삭제

![이미지삭제](https://github.com/toy-1/wiki/assets/125336070/c3689b49-465e-4c0f-ae3e-3eaff2dca87e)

```
💡 앨범에 있는 이미지를 삭제합니다.
삭제 시 파이어베이스 스토리지에 저장 돼 있던 해당 이미지가 삭제됩니다
```

### 5. 이미지 상세보기

#### 이미지 방향 전환 및 크기 조절

![이미지전환](https://github.com/toy-1/wiki/assets/125336070/fefe12c3-2b97-43c1-8bf1-8107dc115d77)

```
💡 이미지 클릭 시 상세보기가 가능하고 버튼 클릭과 화살표 키보드로 다음 이미지로의 방향 전환이 가능합니다.
또한 이미지 크기 조절이 가능하도록 기능을 추가하였습니다.
```

</div>
</details>

<br>

<details>
<summary style="font-size: 18px">이승연: 🔑 로그인 페이지</summary>
<div markdown="1">

### 1. 접근 제한 라우팅

#### 로그인 여부에 따른 제한 접근 라우팅

![1라우팅](https://github.com/toy-1/wiki/assets/139189610/1c80fc0a-44f7-415f-8dab-a77803aa2f5f)


```
💡 해당 홈페이지는 사내 사이트로, 로그인 정보가 없는 경우 login페이지로 이동합니다.
로그아웃하지 않았다면 탭 종료 후 재접속하여도 로그인 상태를 유지합니다.
```

### 2. 회원 가입

#### 회원 가입

![2회원가입성공](https://github.com/toy-1/wiki/assets/139189610/1e90a153-3c2a-495d-9d10-d17f12e0a4a3)


```
💡 회원 가입 버튼 클릭시 회원 가입이 가능한 다이얼로그가 노출됩니다.
ID와 PW 값을 입력후 가입하기 버튼을 클릭시 User로 저장되며 해당 계정으로 사이트 로그인이 가능합니다.
```

#### 회원가입 유효성 검사

![5회원가입유효성검사](https://github.com/toy-1/wiki/assets/139189610/53ef774c-dda4-4433-ab7e-bd6cfc9cda8f)

```
💡 프로세스에 따라 회원가입 유효성 검사 후 얼럿을 노출합니다. 
정상적으로 입력이 완료되었다면 로그인 페이지로 진입합니다.
```

### 3. 로그인

#### 로그인

![3로그인성공](https://github.com/toy-1/wiki/assets/139189610/202a3736-b97d-4bf4-b656-90698c55380a)


```
💡 회원가입한 계정의 ID와 PW 값을 입력후 들어가기 버튼을 클릭하여 사이트 로그인이 가능합니다.
```

#### 로그인 유효성 검사

![6로그인유효성검사](https://github.com/toy-1/wiki/assets/139189610/b29d9537-f53e-439d-bf0d-53dc460ba08e)

```
💡 프로세스에 따라 로그인 유효성 검사 후 얼럿을 노출합니다. 
정상적으로 입력이 완료되었다면 메인 페이지로 진입합니다.
```

### 4. 로그인 정보 전달 

#### 로그인한 유저 정보 전달

![4인증정보내려주기](https://github.com/toy-1/wiki/assets/139189610/e9944d13-203d-469f-9f73-908cf05ef495)

```
💡 현재 사이트 로그인 중인 User 정보를 전달합니다.
이를 통해 Header와 WIKI페이지의 등록/수정/삭제 등의 기능 구현을 지원합니다.
```


</div>
</details>

<br>

<details>
<summary style="font-size: 18px">양재준: 📂 WIKI 페이지</summary>
<div markdown="1">

</div>
</details>

<br>

<details>
<summary style="font-size: 18px">서지수: 🌐 메인 페이지</summary>
<div markdown="1">

</div>
</details>

<br>

<details>
<summary style="font-size: 18px">김소정: 🌐 메인 페이지</summary>
<div markdown="1">

### 1. 메인 캐러셀 

#### 홈 화면 공지사항을 보여주는 캐러셀 구현

![carousel](https://github.com/toy-1/wiki/assets/118329943/801f4dc3-3bf8-4e74-8740-e6431a318383)

```
💡 캐러셀이 3초마다 다음 슬라이드를 보여줍니다.
```

![carouseljumping](https://github.com/toy-1/wiki/assets/118329943/dcc4d9f4-9c61-496d-9a00-305466fdbdf3)

```
💡 하단의 버튼을 클릭하면 해당 인덱스의 슬라이드로 캐러셀이 점프합니다.
```

![carouselreacting](https://github.com/toy-1/wiki/assets/118329943/2b35b51e-4f16-4809-95c5-47b6cd89d489)

```
💡 윈도우가 resize할 때마다 캐러셀의 width가 변화합니다.
```

### 2. 홈 화면 갤러리 미리보기 구현

![gallerypreview](https://github.com/toy-1/wiki/assets/118329943/5bbeefbd-950e-45bd-88fe-2c3e6feedd83)


```
💡 갤러리에 최근 업데이트 된 사진을 3개까지 미리 보여줍니다.
클릭하면 갤러리 페이지로 이동합니다. 최초 로딩 시에는 스켈레톤 애니메이션이 보입니다. 
```


</div>
</details>

<br>


