export interface ModalType {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalProps {
  onClose: () => void;
}

export interface UploadModalProps extends ModalProps {
  albumKey: string;
}

export interface DeleteModalProps extends UploadModalProps {
  allArray: string[];
}

export interface SelectedArrayProps {
  selectedArray: string[];
}
