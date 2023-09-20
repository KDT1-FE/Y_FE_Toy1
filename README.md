
<div align="center">
  <h1>야놀자 Tech School Wiki</h1>
  <img src="https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202305/022257-932/comp-1-1.gif" />
</div>


## 🧑🏻‍💻 기술 스택

### Enviroment & Config

<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visual studio&logoColor=white" />
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />

### Development & FrontEnd
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/react (CRA)-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    
### Deploy
<img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase" />
<img src="https://img.shields.io/badge/github actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" />

### Communication
<img src="https://img.shields.io/badge/jirasoftware-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white" />
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
<img src="https://img.shields.io/badge/googlesheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" />

## ✨ 화면 구성
- 메인 (카러셀)
- 위키 (미리보기 + 수정 및 업로드)
- 갤러리 (업로드 및 삭제)
- 타이머 + 랭킹 (시간 기록 및 업로드 후 랭킹 화면)

## 📐 아키텍쳐 디자인

## 🗂 파일 구조

```
# CRA 사용

my-wiki-app/
├── src/
│   ├── assets/         # 폰트, 이미지, 아이콘
|   |    ├── fonts/
|   |    ├── icons/
|   |    └── images/
|   |   
│   ├── components/      # 리액트 컴포넌트
│   │    ├── Home/
│   │    ├── Timer/
│   │    ├── Wiki/
│   │    ├── Gallery/
|   |    |   .
|   |    |   .
|   |    |   .
│   │    ├── Header.tsx
│   │    └── Footer.tsx
│   │ 
|   ├── hooks/           # 커스텀 hook
│   ├── pages/           # 라우터
│   ├── styles/          # css styles
│   ├── types/           # typescripts interface
│   ├── utils/           # db, storgae
│   │ 
│   ├── App.tsx
│   ├── index.tsx
│   └── custom.d.ts
│
├── public/
├── node_modules/
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── README.md
└── ...
```

## 💻 Script

### Development Mode
```
$ git clone https://github.com/turkey-kim/techschool_wiki.git
$ nvm install v18.16.1
$ nvm use 18.16.1
$ npm ci
$ npm run start
```

## 🙌🏻 팀 소개

<div align="center">
  <table align="center"  style="border-radius: 10px;">
    <tr style="border-radius: 10px;">
      <td align="center" style="vertical-align: middle;">
        <a href="https://github.com/minjang" target="_blank">
          <img src="https://ca.slack-edge.com/T057XJP4T34-U05F6EF84G5-0a8c83659882-512" alt="구영표 멘토님"  style="border-radius: 10px; width: 150px;" />
        </a>
      </td>
      <td align="center" style="vertical-align: middle;">
        <a href="https://github.com/JitHoon" target="_blank">
          <img src="https://github.com/JitHoon/Jithoon/assets/101972330/fcb2018b-19eb-4dfe-bd2d-ac7d89e7da9f" alt="최지훈 프로필" style="border-radius: 10px; width: 150px; height: 150px"/>
        </a>
      </td>
      <td align="center" style="vertical-align: middle;">
        <a href="https://github.com/suyeonnnnnnn" target="_blank">
          <img src="https://ca.slack-edge.com/T057XJP4T34-U05EZRTQN8N-g06f35856b05-512" alt="박수연 프로필"  style="border-radius: 10px; width: 150px; height: 150px"/>
        </a>
      </td>
      <td align="center" style="vertical-align: middle;">
        <a href="https://github.com/turkey-kim" target="_blank">
          <img src="https://ca.slack-edge.com/T057XJP4T34-U05EZRTQN8N-g06f35856b05-512" alt="김특희 프로필"  style="border-radius: 10px; width: 150px; height: 150px"/>
        </a>
      </td>
      <td align="center" style="vertical-align: middle;">
        <a href="https://github.com/jinuk0316" target="_blank">
          <img src="https://user-images.githubusercontent.com/59171592/268547911-a7e5fe9f-9cad-4f46-a052-3e9e189e2234.jpeg" alt="이진욱 프로필"  style="overflow: hidden; border-radius: 10px; width: 150px" />
        </a>
      </td>
      <td align="center" style="vertical-align: middle;">
        <a href="https://github.com/yangjaehyuk" target="_blank">
          <img src="https://ca.slack-edge.com/T057XJP4T34-U05EZRTQN8N-g06f35856b05-512" alt="양재혁  프로필" style="border-radius: 10px; width: 150px; height: 150px" />
        </a>
      </td>
    </tr>
    <tr> 
      <td align="center">
        <a href="https://github.com/dobestan" target="_blank">
          구영표 멘토님<br /> 
          멘토링
        </a>
      </td>
    <td align="center">
        <a href="https://github.com/JitHoon" target="_blank">
          최지훈<br /> 
          Frontend
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/suyeonnnnnnn" target="_blank">
          박수연<br />
          Frontend
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/turkey-kim" target="_blank">
          김특희<br />
          Frontend
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/jinuk0316" target="_blank">
          이진욱<br />
          Frontend
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/yangjaehyuk" target="_blank">
          양재혁<br />
          Frontend
        </a>
      </td>
    </tr>
  </table>
</div>