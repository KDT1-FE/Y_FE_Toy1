export type WikiList = {
  wikiID: string;
  parentID: string;
  title: string;
};

export type Wiki = {
  wikiID: string;
  parentID: string;
  title: string;
  content: string;
  authorID: string;
  createdAt: string;
  updatedAt: string;
};
