import { CreateTaskResponseDTO } from "../../application/dtos/create-task-response-dto";
import { CreateTaskDTO } from "../../application/dtos/create-task-dto";
import { Task } from "../entities/task";

export interface CreateTaskUseCaseInterface {
  execute(params: CreateTaskDTO): Promise<Task>;
}