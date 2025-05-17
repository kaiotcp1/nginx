import { Task } from "../entities/task";

export interface FindTaskByIdRepository {
  findById(id: string): Promise<Task | null>;
}