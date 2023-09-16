export interface OtherContentProps {
  isEditorOpen: boolean;
  dataKey: string;
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
