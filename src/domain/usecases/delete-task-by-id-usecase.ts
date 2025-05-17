import { Task } from "../entities/task";

export interface DeleteTaskByIdUseCaseInterface {
  execute(id: string): Promise<DeleteTaskResponseDTO>;
}