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

export interface TimerModalProps extends ModalProps {
  hidden?: boolean;
  timeInSeconds: number;
  setTimeInSeconds: React.Dispatch<React.SetStateAction<number>>;
  toggle: () => void;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timerArray: Array<number | string>;
}

export interface ControlsProps {
  setTimeInSeconds: React.Dispatch<React.SetStateAction<number>>;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
}
