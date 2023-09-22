export interface AddPhotosProps {
  file: string;
  name: string;
  deleteFiles: string[];
  setDeleteFiles: (files: string[]) => void;
}

export interface ImageInfo {
  name: string;
  imageUrl: string;
}
