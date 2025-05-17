import { Task } from "../entities/task";

export interface FindAllTasksUseCaseInterface {
  execute(): Promise<Task[]>;
}