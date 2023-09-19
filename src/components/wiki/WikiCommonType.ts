import { Editor } from "@toast-ui/react-editor";

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
  lastUpdatedBy: string;
};

export type WikiTopProps = {
  title: string;
  isEditMode: boolean;
  onRegister: () => void;
  onSave: () => void;
};

export type WikiCategoryProps = {
  WiKiList: Wiki[];
  onEntryClick: (entry: Wiki) => void;
  onArrowClick: (entry: Wiki) => void;
  style?: React.CSSProperties;
};

export type WikiFormProps = {
  form: Wiki;
  onFormChange: (key: keyof Wiki, value: string) => void;
  editorRef: React.MutableRefObject<Editor | null>;
  parents: Wiki[];
};

export type WikiContentProps = {
  Wiki: Wiki | null;
  form: Wiki;
  isEditMode: boolean;
  onFormChange: (key: keyof Wiki, value: string) => void;
  onWikiEditButtonClick: () => void;
  onWikiDeleteButtonClick: () => void;
  toggleEditMode: () => void;
  editorRef: React.MutableRefObject<Editor | null>;
  parents: Wiki[];
};
