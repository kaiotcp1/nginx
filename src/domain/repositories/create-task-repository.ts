import { Task } from "../entities/task";

export interface CreateTaskRepository {
  create(task: Task): Promise<boolean>;
}