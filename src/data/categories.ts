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
    ],
  },
  {
    path: '/gallery',
    categories: [
      {
        title: '사진첩',
        subCategories: [
          {
            link: 'profile',
            text: '프로필 사진',
          },
          {
            link: 'achievement',
            text: '성취',
          },
        ],
      },
      {
        title: '사진첩',
        subCategories: [
          {
            link: 'profile',
            text: '프로필 사진',
          },
          {
            link: 'achievement',
            text: '성취',
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
