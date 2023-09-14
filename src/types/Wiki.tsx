export interface TextEditorProps {
  dataKey: string;
  content: string;
  setIsEditorOpen: Function;
}

export interface EditButtonProps {
  isEditorOpen: boolean;
  setIsEditorOpen: Function;
}
