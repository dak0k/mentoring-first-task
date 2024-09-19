import {IUser} from "./iuser";

export interface ITodo {
  userId: IUser|number;
  id: number;
  title: string;
  completed: boolean;
}
