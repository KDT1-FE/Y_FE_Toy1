export interface OtherContentProps {
  isEditorOpen: boolean;
  dataKey: string;
  text: string;
  content: string;
  setIsEditorOpen: Function;
}

export interface TextEditorProps {
  dataKey: string;
  content: string;
  setIsEditorOpen: Function;
}

export interface EditButtonProps {
  isEditorOpen: boolean;
  setIsEditorOpen: Function;
}
