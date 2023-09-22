export interface slideInfos {
  key: string;
  subText: string;
  title: string;
  description: string;
  background: string;
  bgColor: string;
  paddingRight: string;
}

export interface teamInfos {
  id: string;
  name: string;
  profile: string;
  part: string;
  mbti: string;
  desc: string;
  isLeader: boolean;
}

export const MAIN_SLIDES: slideInfos[] = [
  {
    key: "1",
    subText: "첫번째 소식",
    title: "추석(秋夕): 가을 달빛이 가장 좋은 밤",
    description:
      "추석을 글자대로 풀이하면, '가을 달빛이 유난히 밝아 보기 좋은 날'이라는 뜻이라고 합니다. 사랑하는 가족들과 함께 밤 하늘에 가득 찬 보름달처럼 풍요로운 연휴 보내세요.",
    background:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2Fslide-bg01.jpg?alt=media&token=1248f549-8f0f-4710-b3d5-ef0b648a9394",
    bgColor: "#FB783B",
    paddingRight: "10px",
  },
  {
    key: "2",
    subText: "두번째 소식",
    title: "새로워진 우리의 공간, 위키",
    description:
      "지난 2주간 FE팀에서 진행한 '우리 임직원들을 위한 위키 앱 개발프로젝트'가 무사히 끝났습니다. 더욱 새롭고 다채로워진 우리의 위키를 만나보세요!",
    background:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2Fslide-bg02.jpg?alt=media&token=cefb50fc-fb97-4017-96ea-bd06ea7571f0",
    bgColor: "#00b96b",
    paddingRight: "10px",
  },
  {
    key: "3",
    subText: "세번째 소식",
    title: "이 달의 우수 개발팀, FE3 이정도면껌이조",
    description:
      "이번 달에 진행된 우수 개발팀 투표에서, FE 3팀인 '이정도면껌이조'팀이 선정되었습니다! 모두 기쁜 마음으로 축하해주시고, 어제보다 오늘 더 성장해나가는 우리가 됩시다.",
    background:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2Fslide-bg03.jpg?alt=media&token=bfa144f8-5126-4461-853c-3797580c063b",
    bgColor: "#6B62FF",
    paddingRight: "10px",
  },
];

export const TEAM3: teamInfos[] = [
  {
    id: "1",
    name: "박나영",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2F%EB%B0%95%EB%82%98%EC%98%81.jpeg?alt=media&token=3aafc118-153a-4323-977c-a90b92dbf168",
    part: "임직원 페이지 담당",
    mbti: "ISFP",
    desc: "잘 부탁드립니다 😎~!",
    isLeader: true,
  },
  {
    id: "2",
    name: "김미정",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2F%EA%B9%80%EB%AF%B8%EC%A0%95.jpg?alt=media&token=f534456b-600d-44de-b834-992e94e00076",
    part: "출퇴근 기록 페이지 담당",
    mbti: "INFJ",
    desc: "열심히 하겠습니다!!",
    isLeader: false,
  },
  {
    id: "3",
    name: "김성겸",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2F%EA%B9%80%EC%84%B1%EA%B2%B8.jpg?alt=media&token=f371b0f4-2e50-4069-9db3-da30320ed145",
    part: "프로젝트 페이지 담당",
    mbti: "ISFJ",
    desc: "어려움이 있으면 서로 공유해서 같이 해결해보아요!",
    isLeader: false,
  },
  {
    id: "4",
    name: "노욱진",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2F%E1%84%82%E1%85%A9%E1%84%8B%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%B5%E1%86%AB.jpg?alt=media&token=f01bbe93-0263-457a-aeac-b3d657a5bfa4",
    part: "위키 페이지 담당",
    mbti: "ISFJ",
    desc: "열심히 해보겠습니다!",
    isLeader: false,
  },
  {
    id: "5",
    name: "진종수",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/fe3-wiki.appspot.com/o/main%2F%EC%A7%84%EC%A2%85%EC%88%98.png?alt=media&token=06f11583-f2a7-450f-a275-92332677c94a",
    part: "로그인/회원가입 페이지 담당",
    mbti: "ESTJ",
    desc: "최선을 다하겠습니다! 잘 부탁드립니다!",
    isLeader: false,
  },
];
