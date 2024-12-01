import { Todo } from "../Entities/Todo"

export default interface ITodoRepo {
  getAllTodo(): Todo[]
  createTodo(title: string, description: string): Todo
  updateTodo(id: number, title: string, description: string): Todo | null
  deleteTodo(id: number): boolean
}
