# 💻 Toy Project1

## 📌 개요
- 직원들을 위한 위키 사이트를 만든다.
- Firebase Storage, DataBase, Auth를 활용하여 리소스를 관리한다. 
- TypeScipt 사용을 익힌다.  
<br><br>  

## 🐱 사이트 
<a href="https://toy13-b5244.firebaseapp.com/">
  <img alt="Static Badge" src="https://img.shields.io/badge/포켓몬스터 위키 사이트-ffcb09?style=for-the-badge">  
</a>
<a href="https://github.com/JSH99/Toy1_Team13">
  <img alt="Static Badge" src="https://img.shields.io/badge/%EC%9B%90%EB%B3%B8%20Repository-3267B1?style=for-the-badge">
</a>  

포켓몬스터를 주제로 포켓몬들을 위한 위키 사이트를 제작.  
<br><br>  

## 🧚‍♂️ 역할 분담
|[김민서](https://github.com/minseokiim)|[신하연](https://github.com/gkdus2217)|[윤석민](https://github.com/dbstjrals)|[이재준](https://github.com/Gaoridang)|[정서현](https://github.com/JSH99)|
|--|--|--|--|--|
|wiki page ・ about page 구현, 피그마 디자인, firebase 호스팅 및 배포|footer ・ login page ・ my page 구현, firebase 기본 설정 및 연결, 디자인 통합 및 모바일 반응형 구현|gallery page (members 소개 ・ projects 관리) 구현, 피그마 디자인 및 정리|header ・ nav bar ・ commute modal 구현, 피그마 디자인, 프로젝트 생성 및 기본 설정, 공통 util 관리, 유저플로우 작성|main page ・ notice page 구현, 캐러셀 배너 이미지 제작, 회의록 관리, 리드미 작성|  

<br><br>  

## ✨ 구현 내용
### 회원 정보 관리 
![회원 정보 관리](https://github.com/JSH99/Toy1_Team13/assets/63582234/faa9d3b3-f597-41bb-a3dc-4663be46887f)  
[ 담당 개발자: **신하연** ]
- 헤더의 로그인 클릭 시 회원 인증 페이지로 이동 (로그인, 회원가입)
- 회원가입 시 휴대폰 인증 가능
- 로그인한 경우 헤더에서 아이콘 클릭 시 회원 정보 확인 및 마이페이지 이동
- 마이페이지에서 회원 정보 확인 및 수정 
- 마이페이지에서 이메일 인증, 휴대폰 인증, 회원 탈퇴
- 마이페이지에서 이메일 인증 시 비밀번호 변경 가능
<br>  

### 공지 캐러셀 
![공지 캐러셀](https://github.com/JSH99/Toy1_Team13/assets/63582234/317f1a74-9d6b-4ad5-b7da-bf2a1fc31554)  
[ 담당 개발자: **정서현** ]
- 캐러셀 이미지 5초마다 자동으로 무한 슬라이드
- 화살표 버튼, 동그라미 버튼으로 이미지 이동 
- 캐러셀 이미지 클릭 시 해당 공지 상세 페이지로 이동
- 파이어베이스 데이터 가져오는 동안 로딩 스피너 동작
<br>  

### 위키 페이지 
![위키 페이지](https://github.com/JSH99/Toy1_Team13/assets/63582234/0d224048-efa9-480b-ba51-024c2288c3f6)   
[ 담당 개발자: **김민서** ]
- 마크다운 형식의 위키 글 편집
- GUI를 통해 쉬운 편집 기능 제공
- 편집 시 마크다운 미리보기 기능 제공
- 수정한 글 저장 시 작성자 및 작성 시간 업데이트
<br>  

### 갤러리 페이지
![갤러리 페이지](https://github.com/JSH99/Toy1_Team13/assets/63582234/efa46669-33ce-4f2a-a2fc-274419fb0e88)  
[ 담당 개발자: **윤석민** ]
- 멤버 소개 페이지에서 회원가입한 멤버들의 프로필 조회
- 프로젝트 진행 상황 별로 예정, 진행중, 완료된 프로젝트 조회
- 프로젝트 추가를 통한 새로운 프로젝트 생성 
- 등록되어 있는 프로젝트 상태 및 내용 수정
- 프로젝트 생성자 표시 및 프로젝트 참여 가능
<br><br>  

### 출퇴근 기록
![토이1_출퇴근](https://github.com/JSH99/Toy1_Team13/assets/63582234/78f0dcd8-5bec-40aa-adab-7652df21135b)  
[ modal 개발자: **이재준**, table 개발자: **정서현** ]
- 출퇴근 모달 클릭 시 타이머를 통해 출근 시간, 퇴근 시간 기록 
- 퇴근 클릭 시 총 근무시간 확인
- 당일 출근 기록이 이미 있을 경우 재출근할 건지 확인  
- 같은 날 출퇴근 여러 번 기록 가능
- 퇴근 완료했을 경우 해당 날짜의 가장 최근 출퇴근 기록 출퇴근 테이블에 추가 (메인 페이지)  
<br><br>

## 🙋🏻‍♀️ 유저 플로우
<img width="2856" alt="user flow" src="https://github.com/JSH99/Toy1_Team13/assets/63582234/44b158fa-ad25-452c-85c1-9089283cce89">  

<br><br>

## 🛠️ Stack
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-%2335495e.svg?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)