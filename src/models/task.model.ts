export enum Status {
  TODO,
  IN_PROGRESS,
  DONE,
}

export type Filter = Status | null;

export type HistoryId = string;

export interface History {
  id: HistoryId;
  start: Date;
  end: Date;
}

export interface TaskSeed {
  title: string;
}

export type TaskId = string;

export type Task = TaskSeed & {
  status: Status;
  id: TaskId;
  history: History[]
};
