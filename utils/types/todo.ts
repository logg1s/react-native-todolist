import { FilterModeEnum } from "../enums/filterMode";

export type TodoType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type TodoListType = TodoType[];

export type TodoCountType = {
  [key in FilterModeEnum]: number;
};
