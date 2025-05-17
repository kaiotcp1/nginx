import { FindTaskByIdRepository } from '../../../domain/repositories/find-taskby-id-repository';
import { FindTaskByIdUseCaseInterface } from '../../../domain/usecases/find-task-by-id-usecase';
import { ApplicationError } from '../../../common/errors/application-error';
import { Task } from '../../../domain/entities/task';

export class FindTaskByIdUseCase implements FindTaskByIdUseCaseInterface {
  constructor(private repo: FindTaskByIdRepository) {}

  async execute(id: string): Promise<Task> {
    const task = await this.repo.findById(id);
    if (!task) throw new ApplicationError(`Task with id "${id}" not found`);
    return task;
  };
};
