import { Todo } from "../Entities/Todo"
import { TodoRepository } from "../Repositories/TodoRepository"
import ITodoService, {
  ICreateTodoServiceParams,
  IUpdateTodoServiceParams
} from "./TodoService.interface"

export class TodoService implements ITodoService {
  private todoRepository: TodoRepository
  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository
  }

  public getAllTodo = (): Todo[] => {
    return this.todoRepository.getAllTodo()
  }

  public createTodo = ({
    title,
    description
  }: ICreateTodoServiceParams): Todo => {
    return this.todoRepository.createTodo(title, description)
  }

  public updateTodo = ({
    id,
    title,
    description
  }: IUpdateTodoServiceParams): Todo | null => {
    return this.todoRepository.updateTodo(id, title, description)
  }

  public deletedTodo(id: number) {
    return this.todoRepository.deleteTodo(id)
  }
}
