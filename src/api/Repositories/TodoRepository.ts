import { Todo } from "../Entities/Todo";
import ITodoRepo, {
  ICreateTodoRepoParameters,
  IUpdateTodoRepoParameters
} from "./TodoRepository.interface";

export class TodoRepository implements ITodoRepo {
  private globalObj: { [key: number]: Todo } = {};
  private globalId: number = 0;

  public getAllTodo = (): Todo[] => {
    return Object.values(this.globalObj);
  };

  public createTodo = ({
    title: title,
    description: description
  }: ICreateTodoRepoParameters): Todo => {
    const newTodo = {
      id: ++this.globalId,
      title: title,
      description: description
    };
    this.globalObj[newTodo.id] = newTodo;
    return newTodo;
  };

  public updateTodo = ({
    id: id,
    title: title,
    description: description
  }: IUpdateTodoRepoParameters): Todo | null => {
    if (id in this.globalObj) {
      const updateTodo = { id: id, title: title, description: description };
      this.globalObj[id] = updateTodo;
      return updateTodo;
    }
    return null;
  };

  public deleteTodo = (id: number): boolean => {
    if (id in this.globalObj) {
      delete this.globalObj[id];
      return true;
    }
    return false;
  };
}
