import { HttpMethod } from "../constants"
import { todoController } from "./Controllers"
export default {
  [HttpMethod.GET]: {
    "get-all-todo": todoController.getAllTodo
  },
  [HttpMethod.POST]: {
    "create-todo": todoController.createTodo
  },
  [HttpMethod.PUT]: {
    "update-todo": todoController.updateTodo
  },
  [HttpMethod.DELETE]: {
    "delete-todo": todoController.deleteTodo
  }
}
