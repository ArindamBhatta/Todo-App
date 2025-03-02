import { Todo } from "../Entities/Todo";
import { TodoRepository } from "../Repositories/TodoRepository";
import ITodoService, {
  ICreateTodoServiceParams,
  IUpdateTodoServiceParams
} from "./TodoService.interface";

export class TodoService implements ITodoService {
  private todoRepository: TodoRepository;
  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  public getAllTodo = (): Todo[] => {
    return this.todoRepository.getAllTodo();
  };

  public createTodo = ({
    title: title,
    description: description
  }: ICreateTodoServiceParams): Todo => {
    return this.todoRepository.createTodo({
      title: title,
      description: description
    });
  };

  public updateTodo = ({
    id: id,
    title: title,
    description: description
  }: IUpdateTodoServiceParams): Todo | null => {
    return this.todoRepository.updateTodo({
      id: id,
      title: title,
      description: description
    });
  };

  public deletedTodo(id: number) {
    return this.todoRepository.deleteTodo(id);
  }
}
