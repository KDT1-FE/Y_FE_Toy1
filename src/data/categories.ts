interface SubCategory {
  link: string;
  text: string;
}

interface Category {
  title: string;
  subCategories: SubCategory[];
}

interface CategoriesType {
  path: string;
  categories: Category[];
}

export const allCategories: CategoriesType[] = [
  {
    path: '/',
    categories: [
      {
        title: '출퇴근',
        subCategories: [
          {
            link: '/commute',
            text: '시간 측정',
          },
          {
            link: '/commute',
            text: '시간 측정',
          },
        ],
      },
    ],
  },
  {
    path: '/wiki',
    categories: [
      {
        title: '회사 생활',
        subCategories: [
          {
            link: '/commute',
            text: '시간 측정',
          },
          {
            link: '/commute',
            text: '시간 측정',
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
            link: '/profile',
            text: '프로필 사진',
          },
          {
            link: '/achievement',
            text: '성취',
          },
        ],
      },
      {
        title: '사진첩',
        subCategories: [
          {
            link: '/profile',
            text: '프로필 사진',
          },
          {
            link: '/achievement',
            text: '성취',
          },
        ],
      },
    ],
  },
];
