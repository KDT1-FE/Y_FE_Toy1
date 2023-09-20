export interface OtherContentProps {
  isEditorOpen: boolean;
  dataKey: string;
  text: string;
  content: string;
  setContent: Function;
  setIsEditorOpen: Function;
}

export interface TextEditorProps {
  dataKey: string;
  content: string;
  setContent: Function;
  setIsEditorOpen: Function;
}

export interface EditButtonProps {
  isEditorOpen: boolean;
  setIsEditorOpen: Function;
}
