import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export class ProjectInfo {
  constructor(
    public id: string,
    public title: string,
    public status: "progress" | "completed" | "plus",
    public order: number,
    public assignees: string[],
    public duration: string[],
    public teams: string[],
    public createdAt: Timestamp,
  ) {}
  toString() {
    return this.id + ", " + this.title + ", " + this.status + ", " + this.order;
  }
}
export class ProjectDetail {
  constructor(
    public title: string,
    public status: "progress" | "completed" | "plus",
    public order: number,
    public assignees: string[],
    public duration: string[],
    public teams: string[],
    public data: string,
    public createdAt: Timestamp,
    public id?: string,
  ) {}
  toString() {
    return this.id + ", " + this.title + ", " + this.status + ", " + this.order;
  }
}

export const projectConverter: FirestoreDataConverter<ProjectInfo> = {
  toFirestore: (docData: ProjectInfo): DocumentData => {
    return {
      title: docData.title,
      status: docData.status,
      order: docData.order,
      assignees: docData.assignees,
      duration: docData.duration,
      teams: docData.teams,
      createdAt: docData.createdAt,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const sn = snapshot;
    const data = snapshot.data(options);
    return new ProjectInfo(
      sn.id,
      data.title,
      data.status,
      data.order,
      data.assignees,
      data.duration,
      data.teams,
      data.createdAt,
    );
  },
};

export const projectDetailConverter: FirestoreDataConverter<ProjectDetail> = {
  toFirestore: (docData: ProjectDetail): DocumentData => {
    return {
      title: docData.title,
      status: docData.status,
      order: docData.order,
      assignees: docData.assignees,
      duration: docData.duration,
      teams: docData.teams,
      data: docData.data,
      createdAt: docData.createdAt,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const sn = snapshot;
    const data = snapshot.data(options);
    return new ProjectDetail(
      data.title,
      data.status,
      data.order,
      data.assignees,
      data.duration,
      data.teams,
      data.data,
      data.createdAt,
      sn.id,
    );
  },
};

// 위키 페이지 컨버터를 위한 타입 정의
export class WikiItem {
  constructor(
    public date: Timestamp,
    public name: string,
    public subName: string,
  ) {}
}
export class WikiList {
  constructor(
    public items: WikiItem[],
    public title: string,
  ) {}
}

export const wikiListConverter: FirestoreDataConverter<WikiList> = {
  toFirestore: (docData: WikiList): DocumentData => {
    return {
      items: docData.items,
      title: docData.title,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return new WikiList(data.items, data.title);
  },
};

// 팀, 멤버 컨버터를 위한 타입 정의
export class TeamList {
  constructor(
    public teamName: string,
    public userId: string[],
  ) {}
}

export class UserList {
  constructor(
    public department: string,
    public email: string,
    public name: string,
    public phonenumber: string,
    public photoUrl: string,
    public position: string,
    public team: string,
  ) {}
}

export const teamListConverter: FirestoreDataConverter<TeamList> = {
  toFirestore: (docData: TeamList): DocumentData => {
    return {
      teamName: docData.teamName,
      userId: docData.userId,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return new TeamList(data.teamName, data.userId);
  },
};

export const userListConverter: FirestoreDataConverter<UserList> = {
  toFirestore: (docData: UserList): DocumentData => {
    return {
      department: docData.department,
      email: docData.email,
      name: docData.name,
      phonenumber: docData.phonenumber,
      photoUrl: docData.photoUrl,
      position: docData.position,
      team: docData.team,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return new UserList(
      data.department,
      data.email,
      data.name,
      data.phonenumber,
      data.photoUrl,
      data.position,
      data.team,
    );
  },
};

// 출퇴근 시간 컨버터를 위한 타입 정의
export class WorkTimeInfo {
  constructor(
    public starttime: Timestamp,
    public finishtime: Timestamp,
  ) {}
}

export const workTimeConverter: FirestoreDataConverter<WorkTimeInfo> = {
  toFirestore: (docData: WorkTimeInfo): DocumentData => {
    return {
      starttime: docData.starttime,
      finishtime: docData.finishtime,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return new WorkTimeInfo(data.starttime, data.finishtime);
  },
};
