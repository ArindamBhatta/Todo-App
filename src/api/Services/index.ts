import { TodoService } from "./TodoService"
import { todoRepository } from "../Repositories"
const todoService = new TodoService(todoRepository)
export { todoService }
