import { ControllerPayload } from "../../constants"
import ITodoController from "./TodoController.interface"
import { TodoService } from "../Services/TodoService"

export default class TodoController implements ITodoController {
  private todoService: TodoService

  constructor(todoService: TodoService) {
    this.todoService = todoService
  }

  getAllTodo = () => {
    const todos = this.todoService.getAllTodo()
    return todos
  }

  createTodo = (payload: ControllerPayload) => {
    const { title, description } = payload.req.body
    const newTodo = this.todoService.createTodo({ title, description })
    return newTodo
  }

  updateTodo = (payload: ControllerPayload) => {
    const id: number = parseInt(payload.req.params.id)
    const { title, description } = payload.req.body
    const updatedTodo = this.todoService.updateTodo({ id, title, description })
    return updatedTodo
  }

  deleteTodo = (payload: ControllerPayload) => {
    const id = parseInt(payload.req.params.id)
    const success = this.todoService.deletedTodo(id)
    return success
  }
}
