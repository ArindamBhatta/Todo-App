import { ControllerPayload } from "../../constants";
import ITodoController from "./TodoController.interface";
import { TodoService } from "../Services/TodoService";
import { Todo } from "../Entities/Todo";

export default class TodoController implements ITodoController {
  private todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  getAllTodo: any = (): Todo[] => {
    const todos = this.todoService.getAllTodo();
    return todos;
  };

  createTodo = (payload: ControllerPayload): Todo => {
    const { title: title, description: description } = payload.req.body;
    const newTodo = this.todoService.createTodo({
      title: title,
      description: description
    });
    return newTodo;
  };

  updateTodo = (payload: ControllerPayload): Todo => {
    const id: number = parseInt(payload.req.params.id);
    const { title: title, description: description } = payload.req.body;
    const updatedTodo: Todo = this.todoService.updateTodo({
      id: id,
      title: title,
      description: description
    });
    return updatedTodo;
  };

  deleteTodo = (payload: ControllerPayload): boolean => {
    const id: number = parseInt(payload.req.params.id);
    const success: boolean = this.todoService.deletedTodo(id);
    return success;
  };
}
