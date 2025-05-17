import { FindAllTasksUseCaseInterface } from "../../../domain/usecases/list-all-taks-usecase";
import { ListTasksRepository } from "../../../domain/repositories/list-tasks-repository";
import { ApplicationError } from "../../../common/errors/application-error";

export class ListAllTaskUseCase implements FindAllTasksUseCaseInterface {
  constructor(private repository: ListTasksRepository) {}
  async execute() {
    const tasks = await this.repository.list();
    console.log(tasks);
     if (tasks.length === 0) throw new ApplicationError("No tasks found", 404, "NotFound");
    return tasks;
  };
};