import { ControllerPayload } from "src/constants"

export default interface ITodoController {
  getAllTodo(payload: ControllerPayload): any
  createTodo(payload: ControllerPayload): any
  updateTodo(payload: ControllerPayload): any
  deleteTodo(payload: ControllerPayload): any
}
