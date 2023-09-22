export interface FormDataType {
  [key: string]: any; // FIXME: 인덱스 시그니처 지우깅
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  position?: string;
  team?: string;
  access?: string | boolean;
  photo?: string;
  finishtime?: Date;
  starttime?: Date;
  teamLeaderId?: string;
  teamId?: string;
}

export interface TeamType {
  id?: string;
  teamName?: string;
  leader?: string;
  desc?: string;
  photo?: string;
  userId?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
