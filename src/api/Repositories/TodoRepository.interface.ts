import { Todo } from "../Entities/Todo";

export default interface ITodoRepo {
  getAllTodo(): Todo[];
  createTodo(todo: ICreateTodoRepoParameters): Todo;
  updateTodo(todo: IUpdateTodoRepoParameters): Todo | null;
  deleteTodo(id: number): boolean;
}

export interface ICreateTodoRepoParameters {
  title: string;
  description: string;
}
export interface IUpdateTodoRepoParameters {
  id: number;
  title: string;
  description: string;
}
