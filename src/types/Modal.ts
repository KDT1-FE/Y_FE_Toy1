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
  onBreak: boolean;
  setOnBreak: React.Dispatch<React.SetStateAction<boolean>>;
  playTime: string | null;
  setPlayTime: React.Dispatch<React.SetStateAction<string | null>>;

  stopTime: string | null;
  setStopTime: React.Dispatch<React.SetStateAction<string | null>>;

  startTime: number | null;
  setStartTime: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface ControlsProps {
  setTimeInSeconds: React.Dispatch<React.SetStateAction<number>>;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  onBreak: boolean;
  setOnBreak: React.Dispatch<React.SetStateAction<boolean>>;
  setStudyDuration: (duration: string) => void;
  breakStartTime: number | null;
  setBreakStartTime: React.Dispatch<React.SetStateAction<number | null>>;
  setPlayTime: React.Dispatch<React.SetStateAction<string | null>>;
  setStopTime: React.Dispatch<React.SetStateAction<string | null>>;
  startTime: number | null;
  setStartTime: React.Dispatch<React.SetStateAction<number | null>>;
}
