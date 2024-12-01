import { Todo } from "../Entities/Todo"
import ITodoRepo from "./TodoRepository.interface"

export class TodoRepository implements ITodoRepo {
  private globalObj: { [key: number]: Todo } = {}
  private globalId: number = 0

  public getAllTodo = (): Todo[] => {
    return Object.values(this.globalObj)
  }

  public createTodo = (title: string, description: string): Todo => {
    const newTodo = {
      id: ++this.globalId,
      title: title,
      description: description
    }
    this.globalObj[newTodo.id] = newTodo
    return newTodo
  }

  public updateTodo = (
    id: number,
    title: string,
    description: string
  ): Todo | null => {
    if (id in this.globalObj) {
      const updateTodo = { id, title, description }
      this.globalObj[id] = updateTodo
      return updateTodo
    }
    return null
  }

  public deleteTodo(id: number): boolean {
    if (id in this.globalObj) {
      delete this.globalObj[id]
      return true
    }
    return false
  }
}
