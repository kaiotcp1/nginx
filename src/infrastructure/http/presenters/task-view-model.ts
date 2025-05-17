import { Task } from "../../../domain/entities/task";

export class TaskViewModel {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
    };
  }
}
