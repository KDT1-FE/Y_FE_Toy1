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
];
