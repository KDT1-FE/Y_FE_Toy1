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
        title: '회사 생활',
        subCategories: [
          {
            link: 'commute',
            text: '시간 측정',
          },
          {
            link: 'commute',
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
            link: 'members',
            text: '멤버 소개',
          },
          {
            link: 'projects',
            text: '프로젝트',
          },
        ],
      },
    ],
  },
];
