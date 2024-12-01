import TodoController from "./TodoController"
import { todoService } from "../Services"

const todoController = new TodoController(todoService)

export { todoController }
