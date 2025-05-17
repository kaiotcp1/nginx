import { CreateTaskRepository } from "../../../domain/repositories/create-task-repository";
import { CreateTaskResponseDTO } from "../../dtos/create-task-response-dto";
import { ApplicationError } from "../../../common/errors/application-error";
import { CreateTaskDTO } from "../../dtos/create-task-dto";
import { randomUUID } from "crypto";

export class CreateTaskUseCase {
  constructor(private repository: CreateTaskRepository) {}

  async execute(params: CreateTaskDTO): Promise<CreateTaskResponseDTO> {
    if (!params.title) {
      throw new ApplicationError("Title is required", 400, "BadRequest");
    }
    if (params.title.length < 3) {
      throw new ApplicationError(
        "Title must be at least 3 characters long",
        400,
        "BadRequest"
      );
    };

    const task = {
      id: randomUUID(),
      title: params.title,
      completed: params.completed ?? false,
    };

    const ok = await this.repository.create(task);
    if (!ok) {
      throw new ApplicationError(
        "Task not created",
        500,
        "InternalServerError"
      );
    };

    return {
      message: "Task created successfully",
      task: {
        title: task.title,
        completed: task.completed,
      },
    };
  };
};
