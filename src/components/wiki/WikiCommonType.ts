import { Editor } from "@toast-ui/react-editor";

export type WikiList = {
  wikiID: string;
  parentID: string;
  title: string;
};

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}
export type Wiki = {
  wikiID: string;
  parentID: string;
  title: string;
  content: string;
  authorID: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  lastUpdatedBy: string;
};

export type WikiTopProps = {
  title: string;
  isEditMode: boolean;
  isBackButtonVisible: boolean;
  onRegister: () => void;
  onSave: () => void;
  onBack?: () => void;
};

export type WikiCategoryProps = {
  WiKiList: Wiki[];
  onEntryClick: (entry: Wiki) => void;
  onArrowClick: (entry: Wiki) => void;
  isVisible: boolean;
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
  isLoading: boolean;
  onFormChange: (key: keyof Wiki, value: string) => void;
  onWikiEditButtonClick: () => void;
  onWikiDeleteButtonClick: () => void;
  toggleEditMode: () => void;
  editorRef: React.MutableRefObject<Editor | null>;
  parents: Wiki[];
};

export type RenderWikiContentProps = {
  Wiki: Wiki | null;
  onWikiEditButtonClick: () => void;
  onWikiDeleteButtonClick: () => void;
  toggleEditMode: () => void;
};
