interface SubCategory {
  link: string;
  text: string;
}

export interface CategoryType {
  title: string;
  subCategories: SubCategory[];
}

export interface CategoriesType {
  path: string;
  categories: CategoryType[];
}

export const allCategories: CategoriesType[] = [
  {
    path: '/wiki',
    categories: [
      {
        title: '소개',
        subCategories: [
          {
            link: 'info',
            text: '기본 정보',
          },
          {
            link: 'team',
            text: '팀 정보',
          },
        ],
      },
      {
        title: '규칙',
        subCategories: [
          {
            link: 'rule',
            text: '기본 규칙',
          },
        ],
      },
    ],
  },
  {
    path: '/gallery',
    categories: [
      {
        title: '멤버',
        subCategories: [
          {
            link: 'members',
            text: '멤버 소개',
          },
        ],
      },
      {
        title: '프로젝트',
        subCategories: [
          {
            link: 'projects/ongoing',
            text: '진행 중인 프로젝트',
          },
          {
            link: 'projects/scheduled',
            text: '예정된 프로젝트',
          },
          {
            link: 'projects/completed',
            text: '종료된 프로젝트',
          },
          {
            link: 'projects/add',
            text: '프로젝트 추가',
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    categories: [
      {
        title: '로그인',
        subCategories: [
          {
            link: '',
            text: '로그인',
          },
        ],
      },
    ],
  },
  {
    path: '/join',
    categories: [
      {
        title: '회원가입',
        subCategories: [
          {
            link: '',
            text: '회원가입',
          },
        ],
      },
    ],
  },
];
