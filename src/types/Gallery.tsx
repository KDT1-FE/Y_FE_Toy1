export interface AddPhotosProps {
  file: string;
  deleteFiles: string[];
  setDeleteFiles: (files: string[]) => void;
}
