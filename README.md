# **📅 직원들을 위한 위키 사이트**

직원 들을 위한 위키 사이트를 만들어보세요!
위키 사이트에는 위키 뿐 아니라 여러 기능이 추가되어야 합니다!

### 초기 설정 관련 상세 설명
[공지사항 바로가기](https://www.notion.so/47d290d28ffd445396f7021d1c84c4bd)

### 배포
[배포링크 바로가기](https://fastcampus-wiki.netlify.app)

### Commit Convention
```
Feat : 새로운 기능 추가
Fix : 버그 수정
Env : 개발 환경 관련 설정
Style : 코드 스타일 수정 (세미 콜론, 인덴트 등의 스타일적인 부분만)
Refactor : 코드 리팩토링 (더 효율적인 코드로 변경 등)
Design : CSS 등 디자인 추가/수정
Comment : 주석 추가/수정
Docs : 내부 문서 추가/수정
Test : 테스트 추가/수정
Chore : 빌드 관련 코드 수정
Rename : 파일 및 폴더명 수정
Remove : 파일 삭제
```

### Pull Request Convention
```
## 작업 개요 (이슈 번호)
## 작업 내용 (변경 사항)
## 스크린샷
## 테스트 결과
## 리뷰 요청 사항
```

### Issue Convention
```
## 목적
## 세부 내용
```

### 팀 요청사항
```
** 팀 요청사항 **

1. 현재 레포지토리 Clone (https://github.com/TaePoong719/fastcampus-wiki)
git clone https://github.com/TaePoong719/fastcampus-wiki
✨레포지토리 설치 과정 시 npm install --force 사용하셔야 합니다. 뒤에서 설명드리겠습니다
2. Dev 브랜치로 이동 git checkout dev
3. 각자 개별 기능 이슈 등록
4. 각자 기능 별로 브랜치 생성 git checkout -b feature/#이슈번호
5. 개별 기능 구현 후 커밋
6. 개인 브랜치로 푸쉬 git push origin feature/#이슈번호
7. Dev 브랜치로 Pull Request 진행
8. 팀원 리뷰 참여
9. 하루에 한번씩 모든 작업 끝나면 제가 Main 브랜치로 옮기겠습니다
10. 그 후 자동 배포된 웹사이트 확인하면 될 것 같습니다
```