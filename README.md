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
