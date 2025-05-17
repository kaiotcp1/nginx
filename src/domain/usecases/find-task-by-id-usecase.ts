import { Task } from "../entities/task";

export interface FindTaskByIdUseCaseInterface {
  execute(id: string): Promise<Task>;
}