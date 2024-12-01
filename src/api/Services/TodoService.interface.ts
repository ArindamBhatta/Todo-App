export default interface ITodoService {
  getAllTodo(): any
  createTodo(todo: ICreateTodoServiceParams): any
  updateTodo(todo: IUpdateTodoServiceParams): any
  deletedTodo(id: number): any
}

export interface ICreateTodoServiceParams {
  title: string
  description: string
}

export interface IUpdateTodoServiceParams {
  id: number
  title: string
  description: string
}
